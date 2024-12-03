import React from "react";
import PokedexBackground from "@/components/pokedex/PokedexBackground";
import { View} from "react-native";
import {StyleSheet} from "react-native-unistyles";
import PokedexHeader from "@/components/pokedex/PokedexHeader";
import PokedexScreen from "@/components/pokedex/PokedexScreen";

const Pokedex = () => {

    return (
        <View style={styles.container}>
            <PokedexBackground>
                <>
                    <PokedexHeader />
                    <PokedexScreen/>
                </>
            </PokedexBackground>
        </View>


    );
};

export default Pokedex

const styles = StyleSheet.create({
    container: {flex: 1}
})

