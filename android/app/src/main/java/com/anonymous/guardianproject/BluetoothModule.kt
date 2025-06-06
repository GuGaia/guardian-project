package com.anonymous.guardianproject

import android.Manifest
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import androidx.annotation.RequiresPermission
import com.facebook.react.bridge.*

class BluetoothModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "BluetoothModule"

    @RequiresPermission(Manifest.permission.BLUETOOTH_CONNECT)
    @ReactMethod
    fun isDeviceConnected(macAddress: String, promise: Promise) {
        try {
            val bluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
            val bondedDevices = bluetoothAdapter?.bondedDevices

            bondedDevices?.forEach { device ->
                if (device.address == macAddress) {
                    promise.resolve(true)
                    return
                }
            }

            promise.resolve(false)
        } catch (e: Exception) {
            promise.reject("ERRO_BLUETOOTH", e.message, e)
        }
    }
}
