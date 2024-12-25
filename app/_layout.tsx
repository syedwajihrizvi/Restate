import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./globals.css"
import GlobalProvider from "@/lib/global-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {

  const [fonts] = useFonts({
    'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
    'Rubik-ExtraBold': require('../assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-Light': require('../assets/fonts/Rubik-Light.ttf'),
    'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Semibold': require('../assets/fonts/Rubik-SemiBold.ttf')
  })

  useEffect(() => {
    if (fonts) {
      SplashScreen.hideAsync()
    }
  }, [fonts])

  if (!fonts) {
    return null
  }
  return (
    <GlobalProvider>
      <GestureHandlerRootView>
        <Stack screenOptions={{headerShown: false}}/>
      </GestureHandlerRootView>
    </GlobalProvider>
  );
}
