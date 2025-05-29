import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Ubuntu-Light': require('@assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu-Regular': require('@assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Medium': require('@assets/fonts/Ubuntu-Medium.ttf'),
    'Ubuntu-Bold': require('@assets/fonts/Ubuntu-Bold.ttf'),
    'Inter-Bold': require('@assets/fonts/Inter-Bold.ttf'),
    'Inter-Regular': require('@assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('@assets/fonts/Inter-Medium.ttf'),
  });
}; 