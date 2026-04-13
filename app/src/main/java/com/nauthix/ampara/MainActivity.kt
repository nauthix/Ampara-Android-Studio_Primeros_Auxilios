// Copyright (C) 2026 [Fredy Mamani Ramos]
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.


package com.nauthix.ampara

import android.content.Context
import android.content.Intent
import android.media.AudioAttributes
import android.media.AudioManager
import android.media.MediaPlayer
import android.net.Uri
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {

    private lateinit var webview: WebView
    private var mediaPlayer: MediaPlayer? = null
    private lateinit var audioManager: AudioManager

    override fun onCreate(savedInstanceState: Bundle?) {
        // Splash Screen: debe llamarse antes de setContentView
        installSplashScreen()

        super.onCreate(savedInstanceState)

        // Edge-to-edge: permite que el contenido se extienda bajo las barras del sistema
        WindowCompat.setDecorFitsSystemWindows(window, false)

        setContentView(R.layout.activity_main)

        webview = findViewById(R.id.webview)

        // Aplicar padding según las barras del sistema para que el WebView no quede tapado
        ViewCompat.setOnApplyWindowInsetsListener(webview) { view, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            view.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Obtener AudioManager
        audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager

        // --------------------------------------------------------
        // Configuraciones WebView
        // --------------------------------------------------------
        val settings = webview.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.allowFileAccess = true
        settings.cacheMode = android.webkit.WebSettings.LOAD_DEFAULT

        // Reproducir audio/video sin interacción previa del usuario
        settings.mediaPlaybackRequiresUserGesture = false

        settings.setSupportZoom(false)
        settings.loadWithOverviewMode = true
        settings.useWideViewPort = true

        // --------------------------------------------------------
        // Interfaz JavaScript para audio
        // --------------------------------------------------------
        webview.addJavascriptInterface(AudioInterface(), "AndroidAudio")

        // --------------------------------------------------------
        // WebChromeClient para permisos
        // --------------------------------------------------------
        webview.webChromeClient = object : WebChromeClient() {
            override fun onPermissionRequest(request: PermissionRequest) {
                runOnUiThread {
                    request.grant(request.resources)
                }
            }
        }

        // --------------------------------------------------------
        // WebViewClient para enlaces tel:
        // --------------------------------------------------------
        webview.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean {
                val url = request?.url?.toString()
                return handleUrl(url)
            }

            @Suppress("DEPRECATION")
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                return handleUrl(url)
            }

            private fun handleUrl(url: String?): Boolean {
                if (url != null && url.startsWith("tel:")) {
                    val intent = Intent(Intent.ACTION_DIAL, Uri.parse(url))
                    startActivity(intent)
                    return true
                }
                return false
            }
        }

        // --------------------------------------------------------
        // Botón Atrás con OnBackPressedDispatcher
        // --------------------------------------------------------
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webview.canGoBack()) {
                    webview.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })

        // --------------------------------------------------------
        // Carga HTML local
        // --------------------------------------------------------
        webview.loadUrl("file:///android_asset/index.html")
    }

    // --------------------------------------------------------
    // Clase interna para JavaScript interface
    // --------------------------------------------------------
    inner class AudioInterface {

        @JavascriptInterface
        fun playAudio(audioPath: String) {
            runOnUiThread {
                try {
                    mediaPlayer?.release()
                    mediaPlayer = null

                    android.util.Log.d("AMPARA_AUDIO", "Reproduciendo: $audioPath")

                    mediaPlayer = MediaPlayer().apply {
                        val afd = try {
                            assets.openFd(audioPath)
                        } catch (e: Exception) {
                            android.util.Log.e("AMPARA_AUDIO", "Error al cargar: $audioPath - ${e.message}")
                            val simplePath = audioPath.substringAfter("audio/")
                            try {
                                assets.openFd(simplePath)
                            } catch (e2: Exception) {
                                android.util.Log.e("AMPARA_AUDIO", "Error fallback: $simplePath - ${e2.message}")
                                throw Exception("No se pudo cargar el audio: $audioPath")
                            }
                        }

                        setDataSource(afd.fileDescriptor, afd.startOffset, afd.length)
                        afd.close()

                        // AudioAttributes reemplaza el API deprecado setAudioStreamType
                        setAudioAttributes(
                            AudioAttributes.Builder()
                                .setUsage(AudioAttributes.USAGE_MEDIA)
                                .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                                .build()
                        )

                        setVolume(1.0f, 1.0f)
                        prepare()
                        start()

                        android.util.Log.d("AMPARA_AUDIO", "Audio iniciado correctamente")

                        setOnCompletionListener {
                            android.util.Log.d("AMPARA_AUDIO", "Audio completado")
                            it.release()
                            mediaPlayer = null
                        }

                        setOnErrorListener { _, what, extra ->
                            android.util.Log.e("AMPARA_AUDIO", "Error: what=$what, extra=$extra")
                            webview.post {
                                webview.evaluateJavascript(
                                    "if(typeof showToast === 'function') showToast('Error al reproducir audio ($what)');",
                                    null
                                )
                            }
                            true
                        }
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                    android.util.Log.e("AMPARA_AUDIO", "Excepción: ${e.message}")

                    val safeMsg = e.message?.replace("'", "\\'") ?: "desconocido"
                    webview.post {
                        webview.evaluateJavascript(
                            "if(typeof showToast === 'function') showToast('Error de audio: $safeMsg');",
                            null
                        )
                    }
                }
            }
        }

        @JavascriptInterface
        fun stopAudio() {
            runOnUiThread {
                mediaPlayer?.let {
                    try {
                        if (it.isPlaying) it.stop()
                        it.release()
                    } catch (e: Exception) {
                        android.util.Log.e("AMPARA_AUDIO", "Error al detener: ${e.message}")
                    }
                    mediaPlayer = null
                }
            }
        }

        @JavascriptInterface
        fun pauseAudio() {
            runOnUiThread {
                mediaPlayer?.let {
                    try {
                        if (it.isPlaying) it.pause()
                    } catch (e: Exception) {
                        android.util.Log.e("AMPARA_AUDIO", "Error al pausar: ${e.message}")
                    }
                }
            }
        }

        @JavascriptInterface
        fun resumeAudio() {
            runOnUiThread {
                mediaPlayer?.let {
                    try {
                        if (!it.isPlaying) it.start()
                    } catch (e: Exception) {
                        android.util.Log.e("AMPARA_AUDIO", "Error al reanudar: ${e.message}")
                    }
                }
            }
        }

        @JavascriptInterface
        fun getSystemVolume(): String {
            val current = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC)
            val max = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
            return "$current/$max"
        }

        /**
         * Lee un archivo desde assets y retorna su contenido como String.
         * Usado por el cargador lazy de secciones HTML en script.js.
         */
        @JavascriptInterface
        fun readAsset(path: String): String {
            return try {
                assets.open(path).bufferedReader().use { it.readText() }
            } catch (e: Exception) {
                android.util.Log.e("AMPARA_ASSET", "No se pudo leer: $path - ${e.message}")
                ""
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        mediaPlayer?.release()
        mediaPlayer = null
        webview.destroy()
    }

    override fun onPause() {
        super.onPause()
        webview.onPause()
        mediaPlayer?.let {
            if (it.isPlaying) it.pause()
        }
    }

    override fun onResume() {
        super.onResume()
        webview.onResume()
    }
}
