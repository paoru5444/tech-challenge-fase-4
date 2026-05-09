import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../context/auth.context";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Lexend Deca": require("@/assets/fonts/lexend-deca/LexendDeca-Regular.ttf"),
    "Lexend Deca Medium": require("@/assets/fonts/lexend-deca/LexendDeca-Medium.ttf"),
    "Lexend Deca Semi Bold": require("@/assets/fonts/lexend-deca/LexendDeca-SemiBold.ttf"),
    "Lexend Deca Bold": require("@/assets/fonts/lexend-deca/LexendDeca-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: "transparent" }}
            edges={["top"]}
          >
            <Slot />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
}
