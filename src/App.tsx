import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import Routes from "routes";

const App = () => {
  const [fontsLoaded] = useFonts({
    Kreon: require("./assets/fonts/Kreon-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Routes></Routes>
      </NavigationContainer>
      <Toast></Toast>
    </>
  );
};

registerRootComponent(App);
