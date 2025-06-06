package com.anonymous.guardianproject

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.*
import androidx.core.content.edit

class StorageModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val prefs: SharedPreferences =
        reactContext.getSharedPreferences("guardian", Context.MODE_PRIVATE)

    override fun getName(): String = "Storage"

    @ReactMethod
    fun saveMac(mac: String, promise: Promise) {
        prefs.edit { putString("mac", mac) }
        promise.resolve(true)
    }

    @ReactMethod
    fun getMac(promise: Promise) {
        val mac = prefs.getString("mac", null)
        promise.resolve(mac)
    }
    @ReactMethod
    fun saveToken(token: String, promise: Promise) {
        prefs.edit { putString("token", token) }
        promise.resolve(true)
    }

    @ReactMethod
    fun getToken(promise: Promise) {
        val token = prefs.getString("token", null)
        promise.resolve(token)
    }
}