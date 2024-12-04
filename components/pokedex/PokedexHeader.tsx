import {LayoutChangeEvent, StyleSheet, View} from "react-native";
import {Canvas, Circle, Paint, PaintStyle, Path, Skia, StrokeJoin} from "@shopify/react-native-skia";
import {useMemo, useState} from "react";
import {Colors} from "@/constants/Colors";

const LINE_WIDTH = 14;
const PADDING = 8;
const SMALL_CIRCLE_RADIUS = 10;
const BLUE_CIRCLE_COLOR = '#3aaeef'
const RED_CIRCLE_COLOR = "#ed1c25"
const YELLOW_CIRCLE_COLOR = "#fcf206"
const GREEN_CIRCLE_COLOR = "#2fa750"
const PokedexHeader = () => {
    const [elementHeight, setElementHeight] = useState<number>(0)
    const [elementWidth, setElementWidth] = useState<number>(0)

    const dividerOuter = useMemo(() => {
        const path = Skia.Path.Make();
        path.moveTo(0, elementHeight - LINE_WIDTH / 2);
        path.lineTo(elementWidth * 0.4, elementHeight - LINE_WIDTH / 2);
        path.lineTo(elementWidth * .6, elementHeight * 0.45,);
        path.lineTo(elementWidth, elementHeight * 0.45);
        return path
    }, [elementHeight, elementWidth])

    const paintOuter = useMemo(() => {
        const p = Skia.Paint();
        p.setStyle(PaintStyle.Stroke);
        p.setStrokeWidth(LINE_WIDTH);
        p.setColor(Skia.Color(Colors.black));
        p.setStrokeJoin(StrokeJoin.Bevel)
        const cornerEffect = Skia.PathEffect.MakeCorner(15);
        p.setPathEffect(cornerEffect);
        return p;
    }, []);
    const paintInner = useMemo(() => {
        const p = Skia.Paint();
        p.setStyle(PaintStyle.Stroke);
        p.setStrokeWidth(LINE_WIDTH * .6);
        p.setColor(Skia.Color(Colors.darkRed));
        p.setStrokeJoin(StrokeJoin.Bevel)
        const cornerEffect = Skia.PathEffect.MakeCorner(15);
        p.setPathEffect(cornerEffect);
        return p;
    }, []);

    const onLayout = (event: LayoutChangeEvent) => {
        setElementHeight(event.nativeEvent.layout.height)
        setElementWidth(event.nativeEvent.layout.width)
    }
    return (
        <View style={styles.container} onLayout={onLayout}>
            <Canvas style={{width: '100%', height: '100%'}}>
                <Circle cx={elementHeight / 2 - LINE_WIDTH / 2} cy={elementHeight / 2 - LINE_WIDTH / 2}
                        r={elementHeight / 2 - LINE_WIDTH - PADDING} color={'white'}>
                    <Paint color={BLUE_CIRCLE_COLOR}/>
                    <Paint color={Colors.black} style="stroke" strokeWidth={12}/>
                    <Paint color={"#fff"} style="stroke" strokeWidth={12 / 2}/>
                </Circle>
                <Circle cx={elementWidth * .35} cy={PADDING * 3} r={SMALL_CIRCLE_RADIUS} color={'white'}>
                    <Paint color={RED_CIRCLE_COLOR}/>
                    <Paint color={Colors.black} style="stroke" strokeWidth={3}/>
                </Circle>
                <Circle cx={elementWidth * .44} cy={PADDING * 3} r={SMALL_CIRCLE_RADIUS} color={'white'}>
                    <Paint color={YELLOW_CIRCLE_COLOR}/>
                    <Paint color={Colors.black} style="stroke" strokeWidth={3}/>
                </Circle>
                <Circle cx={elementWidth * .53} cy={PADDING * 3} r={SMALL_CIRCLE_RADIUS} color={'white'}>
                    <Paint color={GREEN_CIRCLE_COLOR}/>
                    <Paint color={Colors.black} style="stroke" strokeWidth={3}/>
                </Circle>
                <Path
                    path={dividerOuter}
                    paint={paintOuter}
                />
                <Path
                    path={dividerOuter}
                    paint={paintInner}
                />
            </Canvas>
        </View>
    );
};

export default PokedexHeader


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '18%',
    },
})
