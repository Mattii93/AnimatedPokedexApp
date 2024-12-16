import React, {useCallback, useEffect, useState} from "react";
import PokedexBackground from "@/components/pokedex/PokedexBackground";
import {StyleSheet, View} from "react-native";
import PokedexHeader from "@/components/pokedex/PokedexHeader";
import PokedexScreen from "@/components/pokedex/PokedexScreen";
import PokedexControls from "@/components/pokedex/PokedexControls";
import pokemonClient from "@/service/networkClient";
import {Pokemon} from "pokenode-ts";

enum ImageType {
    FRONT_DEFAULT = 'front_default',
    BACK_DEFAULT = 'back_default',
}
const Pokedex = () => {
    const [selectedPokemonIndex, setSelectedPokemonIndex] = React.useState(1);
    const [selectedPokemonData, setSelectedPokemonData] = React.useState<Pokemon | null>(null);
    const [imageType, setImageType] = React.useState<ImageType>(ImageType.FRONT_DEFAULT)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        pokemonClient.getPokemonById(selectedPokemonIndex).then((response) => {
            setSelectedPokemonData(response)
            setImageType(ImageType.FRONT_DEFAULT)
        }).catch((error) => {
            console.log('error', error)
        }).finally(() => {
                setLoading(false)
            }
        )
    }, [selectedPokemonIndex]);
    const onPrev = useCallback(() => {
        setSelectedPokemonIndex(prevState => {
            if (prevState === 1) return 1
            return prevState - 1
        })
    }, [])
    const onNext = useCallback(() => {
        setSelectedPokemonIndex(prevState => prevState + 1)
    }, [])
    const onSwitchImageType = useCallback(() => {
        setImageType(prevState => {
            if (prevState === ImageType.FRONT_DEFAULT) return ImageType.BACK_DEFAULT
            return ImageType.FRONT_DEFAULT
        })
    },[])
    return (
        <View style={styles.container}>
            <PokedexBackground>
                <>
                    <PokedexHeader loading={loading}/>
                    <View style={styles.backgroundContent}>
                        <PokedexScreen image={selectedPokemonData?.sprites[imageType] ?? null}/>
                        <PokedexControls next={onNext} prev={onPrev} pokemon={selectedPokemonData} onSwitchImageType={onSwitchImageType}/>
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
        flex: 1,
        justifyContent: 'space-between',
    }
})

