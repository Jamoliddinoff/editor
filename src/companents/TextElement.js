import React, {useEffect, useState} from "react";
import {Text, Transformer} from "react-konva";
import {EVENT_TYPES} from "../constants";
import {handleShape, removeShape, setShape} from "../store/shapesSlice";
import {useDispatch, useSelector} from "react-redux";
import { Html } from "react-konva-utils";
import {setEvent} from "../store/eventsSlice";


export function getStyle(width, height) {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    const baseStyle = {
        width: `${width}px`,
        height: `${height}px`,
        minHeight:30,
        border: "none",
        padding: "0px",
        margin: "0px",
        background: "none",
        outline: "none",
        resize: "none",
        colour: "black",
        fontSize: "20px",
        fontFamily: "sans-serif",
    };
    if (isFirefox) {
        return baseStyle;
    }
    return {
        ...baseStyle,
        marginTop: "-4px"
    };
}

const TextElement = ({
                         shape,
                         handleDragStart,
                         handleDragEnd,
                         handleDragMove,
                         onSelect,
                         isSelected}
) => {
    const dispatch = useDispatch();
    const {eventsType:{type}} = useSelector(store => store)
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    const [textArea,setTextarea] = useState(false);
    const [select,setSelect] = useState(false)
    useEffect(() => {
        if (isSelected) {
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer().batchDraw();
        }
    }, [isSelected]);

    const handleDblClick = (e) =>{
        setTextarea(true)
    }
    const style = getStyle(shape.width, shape.height);

    const handleClick = () => {
        onSelect()
        EVENT_TYPES.CURSOR == type && dispatch(handleShape(shape));
        EVENT_TYPES.TRASH == type && dispatch(removeShape({id:shape.id}))
    }
    return (
        <>
            <Text
                key={shape?.id}
                ref={type===EVENT_TYPES.CURSOR?shapeRef:null}
                id={shape?.id}
                x={shape?.x}
                y={shape?.y}
                width={shape.width}
                text={textArea?'':shape?.text}
                fontSize={shape.fontSize}
                fill={shape?.fill}
                opacity={0.9}
                draggable={EVENT_TYPES.CURSOR === type}
                // rotation={45}
                shadowColor="black"
                shadowBlur={shape.isDragging ? 10 : 0}
                shadowOpacity={shape.isDragging ? 0.3:0}
                shadowOffsetX={shape.isDragging ? 10 : 5}
                shadowOffsetY={shape.isDragging ? 10 : 5}
                scaleX={shape.isDragging ? 1.2 : 1}
                scaleY={shape.isDragging ? 1.2 : 1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                onMouseEnter={()=>setSelect(true)}
                onMouseMove={()=>setSelect(true)}
                onMouseLeave={()=>setSelect(false)}
                onClick={handleClick}
                onTap={handleClick}
                onDblClick={handleDblClick}
                onDblTap={handleDblClick}
                zIndex={1}
            />
            {  isSelected && type==EVENT_TYPES.CURSOR ?
                <Transformer
                    ref={trRef}
                    rotateEnabled={false}
                    boundBoxFunc={(oldBox, newBox) => {
                        const id=shape.id
                        if (newBox.width < 5 || newBox.height < 5) {
                            dispatch(setShape(
                                {
                                    width:oldBox.width,
                                    height:oldBox.height,
                                    id
                                }))
                            return oldBox;
                        }
                        dispatch(setShape({
                            width:newBox.width,
                            height:newBox.height,
                            id
                        }))
                        return newBox;
                    }}
                    enabledAnchors={['middle-left', 'middle-right']}
                /> : null
            }
            {textArea &&
                <Html groupProps={{ x:shape.x, y:shape.y }} divProps={{ style: { opacity: 1 } }}>
                      <textarea
                          value={shape.text}
                          onChange={(ev)=>{
                              dispatch(setShape({id:shape.id,text:ev.target.value}))
                              if (ev.target.value.length>=15 && ev.target.value.length<=30){
                                  dispatch(setShape({id:shape.id,width:shape.width+(ev.target.value.length-15)*2}))
                              }
                              if (ev.target.value.length>40){
                                  dispatch(setShape({
                                      id:shape.id,
                                      height:Math.round(ev.target.value.length/40)*20
                                  }))
                              }
                          }}
                          // onKeyDown={onKeyDown}
                          style={{...style,height:100}}
                          onKeyDown={(e)=>e.key==='Enter' && setTextarea(false)}
                      />
                </Html>
            }

        </>
    );
};

export default TextElement;
