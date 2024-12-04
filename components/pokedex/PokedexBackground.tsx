import {StyleSheet, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {ReactElement} from "react";

interface PokedexBackgroundProps {
    children:ReactElement
}
const PokedexBackground = ({children}:PokedexBackgroundProps) => {

    return (
        <View style={styles.container}>
            <View style={styles.inner}>{children}</View>
        </View>
    );
};

export default PokedexBackground

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 4,
        backgroundColor: Colors.darkRed,
        borderWidth: 8,
        borderBottomEndRadius: 48,
        borderBottomStartRadius: 36,
        borderTopEndRadius: 24,
        borderTopStartRadius: 48
    },
    inner: {
        flex: 1,
        borderWidth: 3,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomEndRadius: 22,
        borderBottomStartRadius: 24,
        borderTopEndRadius: 24,
        borderTopStartRadius: 20,
        marginLeft: 12,
        marginBottom: 12,
        backgroundColor: Colors.red,

    }
});
