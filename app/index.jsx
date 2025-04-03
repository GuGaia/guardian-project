import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { HomeScreen } from "./src/screens/HomeScreen";
import { loadFonts } from './src/utils/loadFonts';

export default function Page() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <HomeScreen />;
}