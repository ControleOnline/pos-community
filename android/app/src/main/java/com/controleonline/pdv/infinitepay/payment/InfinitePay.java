package com.controleonline.pdv.infinitepay.payment;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Base64;

import androidx.annotation.NonNull;

import java.nio.charset.StandardCharsets;

public class InfinitePay extends ReactContextBaseJavaModule {
    private static final String CALLBACK = "ControleOnline://PDV";
    private static final String SCHEME = "infinitepaydash";
    private static final String PAYMENT = "infinitetap-app";

    private Promise mPromise;
    private ReactApplicationContext mContext;

    public InfinitePay(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        mContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "InfinitePay";
    }

    @ReactMethod
    public void payment(@NonNull String json, Promise promise) {
        try {
            mPromise = promise;
            String base64 = Base64.encodeToString(json.getBytes(), Base64.NO_WRAP);

            Uri.Builder uriBuilder = new Uri.Builder();
            uriBuilder.scheme(SCHEME)
                    .authority(PAYMENT)
                    .appendQueryParameter("request", base64)
                    .appendQueryParameter("result_url", CALLBACK)
                    .appendQueryParameter("af_force_deeplink", "true");

            final Activity activity = getCurrentActivity();

            if (activity == null) {
                throw new Exception("Not found activity");
            }

            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.setData(uriBuilder.build());
            activity.startActivity(intent);
        } catch (Exception e) {
            WritableMap params = Arguments.createMap();
            params.putInt("code", 5000);
            params.putString("result", e.getMessage());
            params.putBoolean("success", false);

            mPromise.resolve(params);
            mPromise = null;
        }
    }

    private WritableMap createParams(Intent intent) {
        WritableMap params = Arguments.createMap();

        try {
            if (intent != null) {
                Uri data = intent.getData();
                if (data != null) {
                    String response = data.getQueryParameter("response");
                    if (response != null) {
                        try {
                            byte[] decoded = Base64.decode(response, Base64.DEFAULT);
                            String json = new String(decoded, StandardCharsets.UTF_8);
                            
                            params.putString("result", json);
                            params.putString("code", "0");
                            params.putBoolean("success", true);
                        } catch (Exception ex) {
                            params = Arguments.createMap();
                            params.putString("result", ex.toString());
                            params.putString("code", "5010");
                            params.putBoolean("success", false);
                        }
                    }
                }
            }
        } catch (Exception ex) {
            params.putString("code", "5005");
            params.putString("result", ex.toString());
            params.putBoolean("success", false);
        }

        return params;
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onNewIntent(Intent intent) {
            super.onNewIntent(intent);

            WritableMap params = createParams(intent);

            if (mPromise != null && params != null) {
                mPromise.resolve(params);
                mPromise = null;
            }
        }
    };
}