import React, {useCallback, useEffect} from "react";
import PokedexBackground from "@/components/pokedex/PokedexBackground";
import {StyleSheet, View} from "react-native";
import PokedexHeader from "@/components/pokedex/PokedexHeader";
import PokedexScreen from "@/components/pokedex/PokedexScreen";
import PokedexControls from "@/components/pokedex/PokedexControls";
import pokemonClient from "@/service/networkClient";
import {Pokemon} from "pokenode-ts";


const Pokedex = () => {
    const [selectedPokemonIndex, setSelectedPokemonIndex] = React.useState(1);
    const [selectedPokemonData, setSelectedPokemonData] = React.useState<Pokemon|null>(null);
    useEffect(() => {
        pokemonClient.getPokemonById(selectedPokemonIndex).then((response)=>{
            setSelectedPokemonData(response)
        }).catch((error)=>{
            console.log('error',error)
        })
    }, [selectedPokemonIndex]);
    const onPrev = useCallback(() => {
        setSelectedPokemonIndex(prevState => {
            if(prevState===1)return 1
            return prevState-1
        })
    },[])
    const onNext = useCallback(() => {
        setSelectedPokemonIndex(prevState => prevState+1)
    },[])
    return (
        <View style={styles.container}>
            <PokedexBackground>
                <>
                    <PokedexHeader />
                    <View style={styles.backgroundContent}>
                        <PokedexScreen image={selectedPokemonData?.sprites.front_default??null}/>
                        <PokedexControls next={onNext} prev={onPrev} pokemon={selectedPokemonData}/>
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

