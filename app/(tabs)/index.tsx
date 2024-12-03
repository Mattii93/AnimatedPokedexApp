import {StyleSheet} from 'react-native-unistyles'

import {useEffect, useState} from "react";
import pokemonClient from "@/service/networkClient";
import {SafeAreaView} from "react-native-safe-area-context";
import {Pokemon} from "pokenode-ts";
import Pokedex from "@/components/pokedex/Pokedex";

export default function Index() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    useEffect(() => {
        pokemonClient.listPokemons().then((response) => {
            setPokemonList(response.results as unknown as Pokemon[])
        }).catch(e => console.log(e))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Pokedex/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})


