package com.nauthix.ampara

import android.content.Context
import android.content.Intent
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
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webview: WebView
    private var mediaPlayer: MediaPlayer? = null
    private lateinit var audioManager: AudioManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webview = findViewById(R.id.webview)

        // OBTENER AUDIOMANAGER
        audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager

        // ------------------------
        // CONFIGURACIONES WEBVIEW
        // ------------------------
        val settings = webview.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        settings.databaseEnabled = true
        settings.cacheMode = android.webkit.WebSettings.LOAD_DEFAULT

        // Solo habilitar en desarrollo
        settings.allowFileAccessFromFileURLs = true
        settings.allowUniversalAccessFromFileURLs = true

        // Permite reproducir audio/video sin interacción previa
        settings.mediaPlaybackRequiresUserGesture = false

        // Configuraciones adicionales
        settings.setSupportZoom(false)
        settings.loadWithOverviewMode = true
        settings.useWideViewPort = true

        // ------------------------
        // INTERFAZ JAVASCRIPT PARA AUDIO
        // ------------------------
        webview.addJavascriptInterface(AudioInterface(), "AndroidAudio")

        // ------------------------
        // WebChromeClient para permisos
        // ------------------------
        webview.webChromeClient = object : WebChromeClient() {
            override fun onPermissionRequest(request: PermissionRequest) {
                runOnUiThread {
                    request.grant(request.resources)
                }
            }
        }

        // ------------------------
        // WebViewClient para enlaces tel:
        // ------------------------
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

        // ------------------------
        // CARGA HTML LOCAL
        // ------------------------
        webview.loadUrl("file:///android_asset/index.html")
    }

    // ------------------------
    // CLASE INTERNA PARA JAVASCRIPT INTERFACE
    // ------------------------
    inner class AudioInterface {

        // ========================================
        // MÉTODO GENÉRICO PARA TODOS LOS AUDIOS
        // ========================================
        @JavascriptInterface
        fun playAudio(audioPath: String) {
            runOnUiThread {
                try {
                    // Liberar el MediaPlayer anterior si existe
                    mediaPlayer?.release()
                    mediaPlayer = null

                    android.util.Log.d("AMPARA_AUDIO", "Reproduciendo: $audioPath")

                    // Crear nuevo MediaPlayer con el audio desde assets
                    mediaPlayer = MediaPlayer().apply {
                        val afd = try {
                            assets.openFd(audioPath)
                        } catch (e: Exception) {
                            android.util.Log.e("AMPARA_AUDIO", "Error al cargar archivo: $audioPath - ${e.message}")
                            // Intentar sin la carpeta audio/ si falla
                            val simplePath = audioPath.substringAfter("audio/")
                            try {
                                assets.openFd(simplePath)
                            } catch (e2: Exception) {
                                android.util.Log.e("AMPARA_AUDIO", "Error en fallback: $simplePath - ${e2.message}")
                                throw Exception("No se pudo cargar el audio: $audioPath")
                            }
                        }

                        setDataSource(afd.fileDescriptor, afd.startOffset, afd.length)
                        afd.close()

                        // CONFIGURAR TIPO DE AUDIO
                        setAudioStreamType(AudioManager.STREAM_MUSIC)

                        // VOLUMEN AL MÁXIMO EN EL MEDIAPLAYER
                        setVolume(1.0f, 1.0f)

                        // PREPARAR Y REPRODUCIR
                        prepare()

                        // LOG: Verificar volumen
                        val currentVolume = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC)
                        val maxVolume = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
                        android.util.Log.d("AMPARA_AUDIO", "Volumen sistema: $currentVolume/$maxVolume")

                        start()

                        android.util.Log.d("AMPARA_AUDIO", "Audio iniciado correctamente")

                        // Notificar al JavaScript cuando termine
                        setOnCompletionListener {
                            android.util.Log.d("AMPARA_AUDIO", "Audio completado")
                            it.release()
                            mediaPlayer = null
                        }

                        // MANEJO DE ERRORES
                        setOnErrorListener { mp, what, extra ->
                            android.util.Log.e("AMPARA_AUDIO", "Error: what=$what, extra=$extra")
                            webview.post {
                                webview.evaluateJavascript(
                                    "alert('Error al reproducir audio: código $what');",
                                    null
                                )
                            }
                            true
                        }
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                    android.util.Log.e("AMPARA_AUDIO", "Excepción: ${e.message}")

                    webview.post {
                        webview.evaluateJavascript(
                            "alert('Error al reproducir audio: ${e.message?.replace("'", "\\'")}');",
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
                        if (it.isPlaying) {
                            it.stop()
                        }
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
                        if (it.isPlaying) {
                            it.pause()
                        }
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
                        if (!it.isPlaying) {
                            it.start()
                        }
                    } catch (e: Exception) {
                        android.util.Log.e("AMPARA_AUDIO", "Error al reanudar: ${e.message}")
                    }
                }
            }
        }

        // ========================================
        // MÉTODOS LEGACY PARA RCP (MANTENER COMPATIBILIDAD)
        // ========================================
        @JavascriptInterface
        fun playRCP(language: String) {
            val audioFileName = when(language) {
                "es" -> "audio/RCP_es.mp3"
                "qu" -> "audio/RCP_qu.mp3"
                "ay" -> "audio/RCP_ay.mp3"
                else -> "audio/RCP_es.mp3"
            }
            playAudio(audioFileName)
        }

        @JavascriptInterface
        fun playRCP() {
            playRCP("es")
        }

        @JavascriptInterface
        fun stopRCP() {
            stopAudio()
        }

        @JavascriptInterface
        fun pauseRCP() {
            pauseAudio()
        }

        @JavascriptInterface
        fun resumeRCP() {
            resumeAudio()
        }

        @JavascriptInterface
        fun isPlayingRCP(): Boolean {
            return mediaPlayer?.isPlaying ?: false
        }

        @JavascriptInterface
        fun getSystemVolume(): String {
            val current = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC)
            val max = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
            return "$current/$max"
        }
    }

    // ------------------------
    // MANEJO DEL BOTÓN ATRÁS
    // ------------------------
    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (webview.canGoBack()) {
            webview.goBack()
        } else {
            super.onBackPressed()
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
            if (it.isPlaying) {
                it.pause()
            }
        }
    }

    override fun onResume() {
        super.onResume()
        webview.onResume()
    }
}