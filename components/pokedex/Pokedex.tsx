import React from "react";
import PokedexBackground from "@/components/pokedex/PokedexBackground";
import {StyleSheet, View} from "react-native";
import PokedexHeader from "@/components/pokedex/PokedexHeader";
import PokedexScreen from "@/components/pokedex/PokedexScreen";
import PokedexControls from "@/components/pokedex/PokedexControls";

const Pokedex = () => {

    return (
        <View style={styles.container}>
            <PokedexBackground>
                <>
                    <PokedexHeader />
                    <View style={styles.backgroundContent}>
                        <PokedexScreen/>
                        <PokedexControls/>
                    </View>
                </>
            </PokedexBackground>
        </View>


    );
};

export default Pokedex

const styles = StyleSheet.create({
    container: {flex: 1},
    backgroundContent: {
        flex:1,
        justifyContent:'space-between',
    }
})

