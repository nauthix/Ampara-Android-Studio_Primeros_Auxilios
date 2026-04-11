plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.nauthix.ampara"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.nauthix.ampara"
        minSdk = 24
        targetSdk = 35
        versionCode = 2
        versionName = "1.1"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }

    // ❌ ELIMINADO: Bloques buildFeatures, composeOptions, y packaging

}

dependencies {

    // ✅ VISTAS ESENCIALES PARA WEBLVIEW Y APPCOMPATACTIVITY:
    implementation("androidx.appcompat:appcompat:1.6.1") // Soporte para AppCompatActivity
    implementation("com.google.android.material:material:1.11.0") // Material Design básico
    implementation("androidx.core:core-ktx:1.12.0")

    // ❌ ELIMINADO: Todas las dependencias de Compose (activity-compose, compose-bom, ui, material3, etc.)

    // Dependencias de testing (déjalas):
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}