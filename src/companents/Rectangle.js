import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Rect, Text, Transformer} from "react-konva";
import {EVENT_TYPES} from "../constants";
import {Html} from "react-konva-utils";
import {handleShape, removeShape, setShape} from "../store/shapesSlice";
import {getStyle} from "./TextElement";
import styled from "styled-components";

const Rectangle = ({shape,handleDragStart,handleDragEnd,handleDragMove,onSelect,isSelected,boardEnd}) => {
    const dispatch = useDispatch();
    const {eventsType:{type}} = useSelector(store => store)
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    const [textArea,setTextarea] = useState(false);
    const [border,setBorder] = useState(false);

    useEffect(() => {
        if (isSelected) {
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer().batchDraw();
        }
    }, [isSelected]);
    const style = getStyle(shape.width, shape.height);

    const handleClick = () => {
        onSelect()
        EVENT_TYPES.CURSOR == type && dispatch(handleShape(shape));
        EVENT_TYPES.TRASH == type && shape.id && dispatch(removeShape({id:shape.id}))
    }
    return (
        <>
            <Rect
                key={shape?.id}
                ref={type===EVENT_TYPES.CURSOR?shapeRef:null}
                id={shape?.id}
                x={shape?.x}
                y={shape?.y}
                width={shape.width}
                height={shape.height}
                fill={shape?.fill}
                opacity={0.9}
                draggable={EVENT_TYPES.CURSOR === type}
                // rotation={star.rotation}
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
                zIndex={1}
                onClick={handleClick}
                onTap={handleClick}
                onMouseMove={(e)=>setBorder(true)}
                onMouseLeave={()=>setBorder(false)}
                cornerRadius={shape.type == EVENT_TYPES.ROUNDED_RECTANGLE ? 20 : null}
            />
            <Text
                x={shape?.x+20}
                y={shape?.y+shape.height/2-10-(shape.text.length/20)*5}
                width={shape.width-40}
                text={textArea?'':shape?.text}
                fontFamily={'sans-serif'}
                fontSize={shape.fontSize}
                fill={shape.text!='Text here...'?shape.textColor:'#7c7c7c'}
                onDblClick={()=>setTextarea(true)}
                onDblTap={()=>setTextarea(true)}

            />
            {textArea &&
                <Html
                    groupProps={{ x:shape?.x+20, y:shape?.y+shape.height/2-10-(shape.text.length/20)*5 }}
                    divProps={{ style: { opacity: 1 } }}
                >
                      <textarea
                          value={shape.text}
                          onChange={(ev)=>{
                              dispatch(setShape({
                                  id:shape.id,
                                  text:ev.target.value,
                                  // width:shape.width+ev.target.value.length
                              }))
                              if (ev.target.value.length>=10&&ev.target.value.length<=15){
                                  dispatch(setShape({
                                      id:shape.id,
                                      // text:ev.target.value,
                                      width:150+ev.target.value.length*20-10*20
                                  }))
                              }
                          }}
                          style={{
                              ...style,
                              fontSize:shape.fontSize||14,
                              color:shape.textColor,
                              width:shape.width-40}}
                          onKeyDown={(e)=>e.key==='Enter' && setTextarea(false)}
                      />
                </Html>
            }
            {isSelected && type===EVENT_TYPES.CURSOR && (
                <Transformer
                    ref={trRef}
                    rotateEnabled={false}
                    enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
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
                />
            )}
            {border && type==EVENT_TYPES.ARROW ? <Html
                groupProps={{ x:shape?.x-2, y:shape?.y-2 }}
                divProps={{ style: { opacity: 1,zIndex:-10 }}}
            >
                <div style={{
                    width:shape.width,
                    height:shape.height,
                    border:'2px solid red',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    position:'relative',
                }}
                >
                    <ArrowElements
                        id={shape.id}
                        style={{
                        top:-5,
                        left:shape.width/2-5,
                    }}
                    ></ArrowElements>
                    <ArrowElements
                        id={shape.id}
                        style={{
                        top:shape.height/2-5,
                        left:-5,
                    }}
                    ></ArrowElements>
                    <ArrowElements
                        id={shape.id}
                        style={{
                        top:shape.height/2-5,
                        left:shape.width-5,
                    }}
                    ></ArrowElements>
                    <ArrowElements
                        id={shape.id}
                        style={{
                        top:shape.height-5,
                        left:shape.width/2-5,
                    }}
                    ></ArrowElements>

                </div>

            </Html> : null
            }
        </>
    );
};

const ArrowElements = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: red;
  position: fixed;
  cursor: pointer;
`;
export default Rectangle;
