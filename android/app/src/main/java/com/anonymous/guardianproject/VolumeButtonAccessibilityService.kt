package com.anonymous.guardianproject

import android.Manifest
import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.AccessibilityServiceInfo
import android.annotation.SuppressLint
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.location.Location
import android.util.Log
import android.view.KeyEvent
import android.view.accessibility.AccessibilityEvent
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import java.net.HttpURLConnection
import java.net.URL
import android.content.Context
import android.content.pm.ServiceInfo
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.annotation.RequiresPermission
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlin.math.log


class VolumeButtonAccessibilityService : AccessibilityService() {

    private val pressTimes = LongArray(3)
    private var pressCount = 0
    private lateinit var fusedLocationClient: FusedLocationProviderClient

    private val CHANNEL_ID = "panic_channel"
    private val NOTIFICATION_ID = 1

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        startForegroundIfNeeded()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Serviço de Emergência",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Monitoramento contínuo do botão de volume"
            }

            val manager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
            manager.createNotificationChannel(channel)
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun startForegroundIfNeeded() {
    val notification = Notification.Builder(this, CHANNEL_ID)
        .setContentTitle("Serviço Ativo")
        .setContentText("Pronto para detectar emergências")
        .build()

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        // A partir do Android 10 (API 29), é possível informar o tipo
        startForeground(
            NOTIFICATION_ID,
            notification,
            ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE // ou LOCATION, CONNECTED_DEVICE, etc.
        )
    } else {
        // Antes do Android 10
        startForeground(NOTIFICATION_ID, notification)
    }
}




    @RequiresPermission(Manifest.permission.BLUETOOTH_CONNECT)
    override fun onKeyEvent(event: KeyEvent): Boolean {
        if (event.keyCode == KeyEvent.KEYCODE_VOLUME_UP && event.action == KeyEvent.ACTION_DOWN) {
            
            if (pressCount < 2) {
                pressCount++
            }

            if (pressCount == 2) {     
                Log.d("VolumeService", "2 cliques detectados")
                checkLongPress() 
                pressCount = 0
            }

            return false // Consome o evento
        }

        return super.onKeyEvent(event)
    }


    private val prefs by lazy {
        getSharedPreferences("guardian", Context.MODE_PRIVATE)
    }
    @RequiresPermission(Manifest.permission.BLUETOOTH_CONNECT)
    private fun checkLongPress() {
        // Substitua pelo MAC address do seu dispositivo
        val macAddress = prefs.getString("mac", null) ?: ""

        if (isDeviceConnected(macAddress)) {
            Log.d("entrou","no lugar certo")
            sendHttpRequestWithLocation()
        } else {
            Log.d("VolumeService", "Dispositivo Bluetooth não está conectado")
        }
    }

    @RequiresPermission(Manifest.permission.BLUETOOTH_CONNECT)
    private fun isDeviceConnected(macAddress: String): Boolean {
        val bluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
        val bondedDevices: Set<BluetoothDevice>? = bluetoothAdapter?.bondedDevices

        bondedDevices?.forEach { device ->
            if (device.address == macAddress) {
                return true
            }
        }

        return false
    }

    @SuppressLint("MissingPermission")
    private fun sendHttpRequestWithLocation() {
        fusedLocationClient.lastLocation
            .addOnSuccessListener { location: Location? ->
                if (location != null) {
                    val latitude = location.latitude
                    val longitude = location.longitude
                    val token = prefs.getString("token", null) ?: ""
                    Log.d("VolumeService", "Localização: $latitude, $longitude")
                    postHttp(latitude, longitude, token)
                } else {
                    Log.e("VolumeService", "Localização não encontrada")
                    postHttp(null, null,null)
                }
            }
    }

    // private fun postHttp(latitude: Double?, longitude: Double?, token: String?) {
    //     Thread {
    //         try {
    //             val url = URL("https://exemplo.com/api/alerta") // Altere para sua URL
    //             val connection = url.openConnection() as HttpURLConnection
    //             connection.requestMethod = "POST"
    //             connection.setRequestProperty("Content-Type", "application/json")
    //             connection.setRequestProperty("Authorization", "Bearer $token")
    //             connection.doOutput = true

    //             val body = """
    //                 {
    //                     "latitude": ${latitude ?: "null"},
    //                     "longitude": ${longitude ?: "null"}
    //                 }
    //             """.trimIndent()

    //             connection.outputStream.use { os ->
    //                 os.write(body.toByteArray())
    //             }

    //             val responseCode = connection.responseCode
    //             Log.d("VolumeService", "HTTP response: $responseCode")
    //             connection.disconnect()
    //         } catch (e: Exception) {
    //             Log.e("VolumeService", "Erro na requisição HTTP", e)
    //         }
    //     }.start()
    // }


    private fun postHttp(latitude: Double?, longitude: Double?, token: String?) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val url = URL("http://192.168.0.4:8000/api/alert/")
                val connection = url.openConnection() as HttpURLConnection
                connection.requestMethod = "POST"
                connection.setRequestProperty("Content-Type", "application/json")
                connection.setRequestProperty("Authorization", "Bearer $token")
                connection.doOutput = true

                val body = """
                    {
                        "latitude": ${latitude ?: "null"},
                        "longitude": ${longitude ?: "null"}
                    }
                """.trimIndent()

                connection.outputStream.use { os ->
                    os.write(body.toByteArray())
                }

                val responseCode = connection.responseCode
                Log.d("VolumeService", "HTTP response: $responseCode")
                connection.disconnect()
            } catch (e: Exception) {
                Log.e("VolumeService", "Erro na requisição HTTP", e)
            }
        }
    }

    override fun onServiceConnected() {
        super.onServiceConnected()

        // Inicializa cliente de localização
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        // Configura o AccessibilityService
        val info = AccessibilityServiceInfo().apply {
            eventTypes = AccessibilityEvent.TYPES_ALL_MASK
            feedbackType = AccessibilityServiceInfo.FEEDBACK_SPOKEN
            flags = AccessibilityServiceInfo.FLAG_REQUEST_FILTER_KEY_EVENTS
        }

        serviceInfo = info
    }


    override fun onAccessibilityEvent(event: AccessibilityEvent?) {}
    override fun onInterrupt() {}
}