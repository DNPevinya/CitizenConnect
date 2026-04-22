export default {
  "expo": {
    "name": "UrbanSync", 
    "slug": "urbansync", 
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png", 
    "scheme": "urbansync", 
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "config": {
        "googleMapsApiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
      }
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#ffffff",
        "foregroundImage": "./assets/images/adaptive-icon.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.yourname.urbansync",
      "config": {
        "googleMaps": {
          "apiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      }
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash.png", 
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
};