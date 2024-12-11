import {LayoutChangeEvent, StyleSheet, View} from "react-native";
import {useCallback, useState} from "react";
import {Canvas, PaintStyle, Path, Skia, StrokeJoin} from "@shopify/react-native-skia";
import {Colors} from "@/constants/Colors";
import {Image} from "expo-image";
interface PokedexScreenProps {
    image: string|null
}

const PADDING = 16
const BACKGROUND_SHIFT = 5
const CUT_SIZE = 50
const PokedexScreen = ({image}: PokedexScreenProps) => {
    const [backgroundHeight, setBackgroundHeight] = useState(0)
    const [backgroundWidth, setBackgroundWidth] = useState(0)

    const getShadowPath = useCallback((strokeSize: number) => {
        const path = Skia.Path.Make();
        path.moveTo(strokeSize, strokeSize);
        path.lineTo(backgroundWidth - strokeSize, strokeSize);
        path.lineTo(backgroundWidth - strokeSize, backgroundHeight - strokeSize);
        path.lineTo(CUT_SIZE, backgroundHeight - strokeSize);
        path.lineTo(strokeSize, backgroundHeight - CUT_SIZE - strokeSize);
        path.close();
        return path;
    }, [backgroundHeight, backgroundWidth]);

    const getPaint = useCallback((color: string, stroke?: number) => {
        const p = Skia.Paint();
        p.setStrokeJoin(StrokeJoin.Bevel)
        p.setStyle(PaintStyle.Fill)
        if (stroke) {
            p.setStyle(PaintStyle.Stroke)
            p.setStrokeWidth(stroke)
        }
        p.setColor(Skia.Color(color))
        const cornerEffect = Skia.PathEffect.MakeCorner(8);
        p.setPathEffect(cornerEffect);
        return p;
    }, [])

    const onLayout = (event: LayoutChangeEvent) => {
        setBackgroundWidth(event.nativeEvent.layout.width - PADDING * 2)
        setBackgroundHeight(event.nativeEvent.layout.width - PADDING*2 + CUT_SIZE)
    }
    const screenSize = backgroundWidth - BACKGROUND_SHIFT - PADDING * 2
    return (
        <View style={styles.container} onLayout={onLayout}>
            <View style={{
                width: backgroundWidth,
                height: backgroundHeight,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{
                    position: 'absolute',
                    width: backgroundWidth + BACKGROUND_SHIFT / 2,
                    height: backgroundHeight + BACKGROUND_SHIFT / 2,
                }}>
                    <Canvas style={{
                        width: backgroundWidth,
                        height: backgroundHeight,
                        marginTop: BACKGROUND_SHIFT / 2,
                        marginLeft: -BACKGROUND_SHIFT / 2
                    }}>
                        <Path path={getShadowPath(3)} paint={getPaint('#a0a1a3',)}/>
                        <Path path={getShadowPath(3)} paint={getPaint(Colors.black, 3)}/>
                    </Canvas>
                </View>
                <View style={{
                    position: 'absolute',
                    width: backgroundWidth + BACKGROUND_SHIFT / 2,
                    height: backgroundHeight + BACKGROUND_SHIFT / 2
                }}>
                    <Canvas style={{
                        width: backgroundWidth,
                        height: backgroundHeight,
                        marginTop: -BACKGROUND_SHIFT / 2,
                        marginLeft: BACKGROUND_SHIFT / 2
                    }}>
                        <Path path={getShadowPath(3)} paint={getPaint('#f1f3f2',)}/>
                        <Path path={getShadowPath(3)} paint={getPaint(Colors.black, 3)}/>
                    </Canvas>
                </View>
                <View style={{
                    position: 'absolute',
                    width: backgroundWidth,
                    height: backgroundHeight,
                    alignItems: 'center',
                    paddingTop: PADDING,
                }}>
                    <View style={{
                        width: screenSize,
                        aspectRatio: 1,
                        backgroundColor: Colors.black,
                        borderWidth: 4, borderColor: "#bcbdbd",
                    }}>
                        <Image style={{flex:1}} source={image}/>
                    </View>
                    <View style={{
                        width: '100%',
                        height: backgroundHeight - screenSize - PADDING - BACKGROUND_SHIFT,
                        paddingVertical: PADDING, paddingRight: PADDING + 4,
                        paddingLeft: CUT_SIZE
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection:'row',
                            justifyContent:'space-between'
                        }}>
                                <View style={{
                                    height: '100%',
                                    aspectRatio:1,
                                    backgroundColor: '#ee1c25',
                                    borderRadius:50,
                                    borderWidth:2,
                                    borderColor:Colors.black
                                }}/>
                                <View style={{height:'100%',width:'25%',justifyContent:'space-around'}}>
                                    {new Array(4).fill(0).map((_) => (
                                        <View style={{height:3,width:'100%',borderRadius:3,backgroundColor:Colors.black}}/>
                                    ))}
                                </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PokedexScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: PADDING
    },
    background: {}
});
