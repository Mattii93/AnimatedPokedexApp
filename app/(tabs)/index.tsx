import {SafeAreaView} from "react-native-safe-area-context";
import Pokedex from "@/components/pokedex/Pokedex";
import {StyleSheet} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {VT323_400Regular} from "@expo-google-fonts/vt323"
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from "expo-font";
import {useEffect} from "react";

export default function Index() {

    const [loaded, error] = useFonts({
        VT323_400Regular,
    });
    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }
    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView>
                <Pokedex/>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})


