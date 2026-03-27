import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Predictor from './Predictor';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <View style={{position:"absolute", top:10, left:10, zIndex:10}}>
        <Predictor />
</View>
    </SafeAreaProvider>
  );
}


export default App;
