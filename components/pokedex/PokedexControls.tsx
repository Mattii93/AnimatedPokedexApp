import {LayoutChangeEvent, StyleSheet, Text, View} from "react-native";
import {Canvas, Circle, Group, Paint, PaintStyle, Path, RoundedRect, Shadow, Skia} from "@shopify/react-native-skia";
import {useCallback, useRef, useState} from "react";
import {Colors} from "@/constants/Colors";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {runOnJS} from "react-native-reanimated";
import {Pokemon} from "pokenode-ts";
import * as Haptics from 'expo-haptics';
import {ImpactFeedbackStyle} from 'expo-haptics';

interface PokedexControlsProps {
    next: () => void;
    prev: () => void;
    pokemon: Pokemon | null;
    onSwitchImageType: () => void;
}

const HEIGHT = 150
const CONFIRM_BUTTON_RADIUS = 26;
const CONFIRM_BUTTON_BORDER = 4;
const LIGHT_HEIGHT = 12
const LIGHT_WIDTH = 60
const CONTROL_WIDTH = 24
const CONTROL_LENGTH = CONTROL_WIDTH * 1.3
const CONTROL_BORDER_WIDTH = 3
const CONTROL_SIZE = CONTROL_LENGTH * 2 + CONTROL_WIDTH + CONTROL_BORDER_WIDTH * 2

const PokedexControls = ({next, prev, pokemon,onSwitchImageType}: PokedexControlsProps) => {
    const [elementWidth, setElementWidth] = useState<number>(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const onNextPokemonPress = (impactType: ImpactFeedbackStyle) => {
        next()
        Haptics.impactAsync(impactType)
    }
    const onPrevPokemonPress = (impactType: ImpactFeedbackStyle) => {
        prev()
        Haptics.impactAsync(impactType)
    }

    const loopPokemons = (type: 'back' | 'forward') => {
        intervalRef.current = setInterval(() => {
            if (type == "back") {
                onPrevPokemonPress(ImpactFeedbackStyle.Light)
            } else {
                onNextPokemonPress(ImpactFeedbackStyle.Light)
            }
        }, 200);
    };

    const clearRefs = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const getControlPath = useCallback((shiftX: number, shiftY: number) => {
        const path = Skia.Path.Make();
        const initX = shiftX + CONTROL_BORDER_WIDTH;
        const initY = shiftY + CONTROL_BORDER_WIDTH / 2;
        path.moveTo(initX + CONTROL_LENGTH, initY)
        path.lineTo(initX + CONTROL_LENGTH + CONTROL_WIDTH, initY)
        path.lineTo(initX + CONTROL_LENGTH + CONTROL_WIDTH, initY + CONTROL_LENGTH)
        path.lineTo(initX + 2 * CONTROL_LENGTH + CONTROL_WIDTH, initY + CONTROL_LENGTH)
        path.lineTo(initX + 2 * CONTROL_LENGTH + CONTROL_WIDTH, initY + CONTROL_LENGTH + CONTROL_WIDTH)
        path.lineTo(initX + CONTROL_LENGTH + CONTROL_WIDTH, initY + CONTROL_LENGTH + CONTROL_WIDTH)
        path.lineTo(initX + CONTROL_LENGTH + CONTROL_WIDTH, initY + 2 * CONTROL_LENGTH + CONTROL_WIDTH)
        path.lineTo(initX + CONTROL_LENGTH, initY + 2 * CONTROL_LENGTH + CONTROL_WIDTH)
        path.lineTo(initX + CONTROL_LENGTH, initY + CONTROL_LENGTH + CONTROL_WIDTH)
        path.lineTo(initX, initY + CONTROL_LENGTH + CONTROL_WIDTH)
        path.lineTo(initX, initY + CONTROL_LENGTH)
        path.lineTo(initX + CONTROL_LENGTH, initY + CONTROL_LENGTH)
        path.lineTo(initX + CONTROL_LENGTH, initY)
        path.close()
        return path
    }, [elementWidth])

    const getPaint = useCallback((color: string, stroke?: boolean) => {
        const p = Skia.Paint();
        if (stroke) {
            p.setStyle(PaintStyle.Stroke)
            p.setStrokeWidth(CONTROL_BORDER_WIDTH)
        }
        p.setColor(Skia.Color(color));
        return p
    }, [])

    const hapticFeedback = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    }, [])

    const tapGesture = Gesture.Tap().onBegin((event) => {
        if (event.y < CONTROL_LENGTH && event.x > CONTROL_LENGTH && event.x < CONTROL_LENGTH + CONTROL_WIDTH) {
            runOnJS(onPrevPokemonPress)(Haptics.ImpactFeedbackStyle.Heavy)
        } else if (event.y > CONTROL_LENGTH && event.y < CONTROL_LENGTH + CONTROL_WIDTH && event.x > CONTROL_LENGTH) {
            runOnJS(onSwitchImageType)()
            runOnJS(hapticFeedback)()
        } else if (event.y > CONTROL_LENGTH && event.y < CONTROL_LENGTH + CONTROL_WIDTH && event.x < CONTROL_LENGTH) {
            runOnJS(onSwitchImageType)()
            runOnJS(hapticFeedback)()
        } else if (event.y > CONTROL_LENGTH + CONTROL_WIDTH && event.x > CONTROL_LENGTH && event.x < CONTROL_LENGTH + CONTROL_WIDTH) {
            runOnJS(onNextPokemonPress)(Haptics.ImpactFeedbackStyle.Heavy)
        }
    })

    const longPressGesture = Gesture.LongPress().onStart((event) => {
        if (event.y < CONTROL_LENGTH && event.x > CONTROL_LENGTH && event.x < CONTROL_LENGTH + CONTROL_WIDTH) {
            runOnJS(loopPokemons)("back")
        } else if (event.y > CONTROL_LENGTH + CONTROL_WIDTH && event.x > CONTROL_LENGTH && event.x < CONTROL_LENGTH + CONTROL_WIDTH) {
            runOnJS(loopPokemons)("forward")
        }
    }).onEnd(() => {
        runOnJS(clearRefs)()
    })

    const onLayout = (event: LayoutChangeEvent) => {
        setElementWidth(event.nativeEvent.layout.width)
    }
    return (
        <View style={styles.container} onLayout={onLayout}>
            <View>
                <Canvas style={{
                    width: CONFIRM_BUTTON_RADIUS * 2 + CONFIRM_BUTTON_BORDER * 1.5,
                    height: CONFIRM_BUTTON_RADIUS * 2 + CONFIRM_BUTTON_BORDER * 1.5
                }}>
                    <Circle cx={CONFIRM_BUTTON_RADIUS + CONFIRM_BUTTON_BORDER}
                            cy={CONFIRM_BUTTON_RADIUS + CONFIRM_BUTTON_BORDER * 0.5}
                            r={CONFIRM_BUTTON_RADIUS} color={'#58595b'}>
                        <Paint color={Colors.black} style="stroke" strokeWidth={CONFIRM_BUTTON_BORDER}/>
                        <Shadow color={Colors.black} dx={-CONFIRM_BUTTON_BORDER} dy={CONFIRM_BUTTON_BORDER}
                                blur={0}/>
                    </Circle>
                </Canvas>
            </View>
            <View style={styles.lightsAndScreen}>
                <View style={styles.lightsPanel}>
                    <Canvas style={{width: LIGHT_WIDTH + 4, height: LIGHT_HEIGHT + 4}}>
                        <RoundedRect width={LIGHT_WIDTH} height={LIGHT_HEIGHT} rect={undefined}
                                     x={2}
                                     y={2} r={10} color={'#ee1c25'}>
                            <Paint color={Colors.black} style="stroke" strokeWidth={2}/>
                        </RoundedRect>
                    </Canvas>
                    <Canvas style={{width: LIGHT_WIDTH + 4, height: LIGHT_HEIGHT + 4}}>
                        <RoundedRect width={LIGHT_WIDTH} height={LIGHT_HEIGHT} rect={undefined}
                                     x={2}
                                     y={2} r={10} color={'#33a79d'}>
                            <Paint color={Colors.black} style="stroke" strokeWidth={2}/>
                        </RoundedRect>
                    </Canvas>
                </View>
                <View style={styles.screen}>
                    <Text numberOfLines={2} style={{
                        flex: 1,
                        wordWrap: 'wrap',
                        fontFamily: 'VT323_400Regular',
                        fontSize: 28,
                        flexWrap: 'wrap'
                    }} allowFontScaling>{pokemon?.name ?? ''}</Text>
                </View>
            </View>

            <View style={{alignSelf: 'center'}}>
                <GestureDetector gesture={Gesture.Race(tapGesture, longPressGesture)}>
                    <Canvas style={{width: CONTROL_SIZE, height: CONTROL_SIZE}}>
                        <Group>
                            <Path path={getControlPath(-CONTROL_BORDER_WIDTH, CONTROL_BORDER_WIDTH)}
                                  paint={getPaint(Colors.black, false)}/>
                            <Path path={getControlPath(-CONTROL_BORDER_WIDTH, CONTROL_BORDER_WIDTH)}
                                  paint={getPaint(Colors.black, true)}/>
                            <Path path={getControlPath(0, 0)}
                                  paint={getPaint("#58595b")}/>
                            <Path path={getControlPath(0, 0)}
                                  paint={getPaint(Colors.black, true)}/>
                            <Circle r={CONTROL_WIDTH / 2 - CONTROL_BORDER_WIDTH}
                                    cx={CONTROL_LENGTH + CONTROL_WIDTH / 2 + CONTROL_BORDER_WIDTH}
                                    cy={CONTROL_LENGTH + CONTROL_WIDTH / 2 + CONTROL_BORDER_WIDTH} strokeWidth={3}
                                    color={Colors.black} style={'stroke'}/>

                        </Group>
                    </Canvas>
                </GestureDetector>
            </View>

        </View>

    );
};

export default PokedexControls

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: HEIGHT,
        padding: 16
    },
    lightsAndScreen: {
        flexDirection: 'column',
        justifyContent: "space-between",
        gap: 16
    },
    screen: {
        flex: 1,
        backgroundColor: '#3ab54c',
        borderRadius: 5,
        borderWidth: 3, flexDirection: 'row'
    },
    lightsPanel: {
        flexDirection: 'row',
        marginTop: CONFIRM_BUTTON_RADIUS / 2,
        gap: 10
    },
    confirmButton: {
        width: CONFIRM_BUTTON_RADIUS * 2,
        height: CONFIRM_BUTTON_RADIUS * 2,
        borderRadius: CONFIRM_BUTTON_RADIUS,
        borderWidth: 4,
        shadowColor: Colors.black,
        shadowOffset: {width: -3, height: 3},
        shadowOpacity: 4,
        backgroundColor: '#58595b',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
