import {LayoutChangeEvent, StyleSheet, View} from "react-native";
import {useCallback, useMemo, useState} from "react";
import {Canvas, PaintStyle, Path, Skia, StrokeJoin} from "@shopify/react-native-skia";
import {Colors} from "@/constants/Colors";

interface PokedexScreenProps {
}

const PADDING = 16
const PokedexScreen = ({}: PokedexScreenProps) => {
    const [elementSize, setElementSize] = useState<number>(0)
    const onLayout = (event: LayoutChangeEvent) => {
        setElementSize(event.nativeEvent.layout.width)
    }
    const sectionSize = useMemo(() => {
        return elementSize - PADDING * 2 - 6
    }, [elementSize])

    const getShadowPath = useCallback((originX:number,originY:number,shift:number)=>{
        const path = Skia.Path.Make();
        const cutSize =50
        const positionXWithShift= originX+shift
        const positionYWithShift= originY-shift
        path.moveTo(positionXWithShift, positionYWithShift);
        path.lineTo(positionXWithShift+sectionSize, positionYWithShift);
        path.lineTo(positionXWithShift+sectionSize, sectionSize);
        path.lineTo(sectionSize+positionXWithShift, sectionSize+positionYWithShift);
        path.lineTo(positionXWithShift+cutSize-shift/2, sectionSize+positionYWithShift);
        path.lineTo(positionXWithShift, sectionSize-cutSize);
        path.close();
        return path
    },[sectionSize])
    const getPaint = useCallback((color:string,stroke?:number)=>{
        const p = Skia.Paint();
        p.setStrokeJoin(StrokeJoin.Bevel)
        p.setStyle(PaintStyle.Fill)
        if(stroke){
            p.setStyle(PaintStyle.Stroke)
            p.setStrokeWidth(stroke)
        }
        p.setColor(Skia.Color(color))
        const cornerEffect = Skia.PathEffect.MakeCorner(8);
        p.setPathEffect(cornerEffect);
        return p;
    },[])

    return (
        <View style={styles.container} onLayout={onLayout}>
            <Canvas style={{width: elementSize, height: elementSize}}>
                <Path path={getShadowPath(PADDING,PADDING+6,0)}  paint={getPaint('#a0a1a3',)}/>
                <Path path={getShadowPath(PADDING,PADDING+6,0)}  paint={getPaint(Colors.black,3)}/>
                <Path path={getShadowPath(PADDING,PADDING+6,6)}  paint={getPaint('#f1f3f2')}/>
                <Path path={getShadowPath(PADDING,PADDING+6,6)}  paint={getPaint(Colors.black,3)}/>
            </Canvas>
        </View>
    );
};

export default PokedexScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
