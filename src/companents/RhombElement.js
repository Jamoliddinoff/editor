import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Rect, Text, Transformer} from "react-konva";
import {EVENT_TYPES} from "../constants";
import {Html} from "react-konva-utils";
import {handleShape, removeShape, setShape} from "../store/shapesSlice";
import {getStyle} from "./TextElement";
import styled from "styled-components";

const RhombElement = ({shape,handleDragStart,handleDragEnd,handleDragMove,onSelect,isSelected}) => {
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

    const hippotenuza = Math.sqrt(Math.pow(shape.width,2)+Math.pow(shape.width,2))
    const handleClick = () => {
        onSelect()
        EVENT_TYPES.CURSOR == type && dispatch(handleShape(shape));
        EVENT_TYPES.TRASH == type && dispatch(removeShape({id:shape.id}))
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
                rotation={45}
                shadowColor="black"
                shadowBlur={shape.isDragging ? 10 : 0}
                shadowOpacity={shape.isDragging ? 0.3:0}
                shadowOffsetX={shape.isDragging ? 10 : 5}
                shadowOffsetY={shape.isDragging ? -10 : 5}
                scaleX={shape.isDragging ? 1.2 : 1}
                scaleY={shape.isDragging ? 1.2 : 1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                onMouseMove={(e)=>setBorder(true)}
                onMouseLeave={()=>setBorder(false)}
                onClick={handleClick}
                onTap={handleClick}
                zIndex={999}
            />
            {isSelected && type===EVENT_TYPES.CURSOR && (
                <Transformer
                    ref={trRef}
                    rotateEnabled={false}
                    enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        console.log('oldBox-----',oldBox,'newBoxxxxx',newBox,shape)
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
            <Text
                x={shape?.x-50}
                y={shape?.y+shape.height/1.5-5-(shape.text.length/20)*5}
                width={shape.width-40}
                text={textArea?'':shape?.text}
                fontSize={shape.fontSize}
                fill={shape.text!='Text here...'?shape.textColor:'#7c7c7c'}
                onDblClick={()=>setTextarea(true)}
                onDblTap={()=>setTextarea(true)}

            />
            {textArea &&
                <Html
                    groupProps={{ x:shape?.x-50, y:shape?.y+shape.height/1.5-10-(shape.text.length/20)*5 }}
                    divProps={{ style: { opacity: 1 } }}>
                      <textarea
                          value={shape.text}
                          onChange={(ev)=>{
                              dispatch(setShape({
                                  id:shape.id,
                                  text:ev.target.value,
                                  // width:shape.width+ev.target.value.length
                              }))
                              console.log('pressss----',ev.target.value.length)
                              if (ev.target.value.length>=13&&ev.target.value.length<=15){
                                  dispatch(setShape({
                                      id:shape.id,
                                      // text:ev.target.value,
                                      width:150+ev.target.value.length*6-10*6,
                                      height:150+ev.target.value.length*6-10*6
                                  }))
                              }
                          }}
                          style={{...style,fontSize:14,width:shape.width-40}}
                          onKeyDown={(e)=>e.key==='Enter' && setTextarea(false)}
                      />
                </Html>
            }
            {border && type==EVENT_TYPES.ARROW ? <Html
                groupProps={{ x:shape?.x-2-hippotenuza/2, y:shape?.y-2 }}
                divProps={{ style: { opacity: 1,zIndex:-10 } }}
            >
                <div style={{
                    width:hippotenuza,
                    height:hippotenuza,
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
                            left:hippotenuza/2-5,
                        }}
                    ></ArrowElements>
                    <ArrowElements
                        id={shape.id}
                        style={{
                            top:hippotenuza/2-5,
                            left:-5,
                        }}
                    ></ArrowElements>
                    <ArrowElements
                        id={shape.id}
                        style={{
                            top:hippotenuza/2-5,
                            left:hippotenuza-5,
                        }}
                    ></ArrowElements>
                    <ArrowElements
                        id={shape.id}
                        style={{
                            top:hippotenuza-5,
                            left:hippotenuza/2-5,
                        }}
                    ></ArrowElements>

                </div>
            </Html> : null}
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
export default RhombElement;
