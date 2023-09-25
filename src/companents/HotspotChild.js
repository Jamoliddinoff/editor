import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Rect, Text, Transformer} from "react-konva";
import {EVENT_TYPES} from "../constants";
import {Html} from "react-konva-utils";
import {handleShape, removeShape, setShape} from "../store/shapesSlice";
import {getStyle} from "./TextElement";
import styled from "styled-components";

const HotspotChild = ({child,shape,handleDragStart,handleDragEnd,handleDragMove,onSelect,isSelected,boardEnd}) => {
    const dispatch = useDispatch();
    const {eventsType:{type},shapes:{list}} = useSelector(store => store)
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    // const elemRef = React.useRef();
    const [textArea,setTextarea] = useState(false);
    const [border,setBorder] = useState(false);

    useEffect(()=>{
        shapeRef.current?.node?.zIndex(9999999)
    },[])
    useEffect(() => {
        if (isSelected) {
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer().batchDraw();
        }
    }, [isSelected]);

    const handleClick = () => {
        onSelect()
        EVENT_TYPES.CURSOR == type && dispatch(handleShape(child));

        EVENT_TYPES.TRASH == type && shape.id && dispatch(removeShape({id:child.id,parentId:shape.id,list}))
    }
    const mouseMove = (e) =>{
        const element = e.target.attrs;
        if(child.id==element.id){
            setBorder(true)
        }else{
            setBorder(false)
        }
    }
    return (
        <>
            <Rect
                ref={type===EVENT_TYPES.CURSOR?shapeRef:null}
                id={child?.id}
                x={shape?.x+child?.x1}
                y={shape?.y+child?.y1}
                width={child.width}
                height={child.height}
                fill={'#84c1e5'}
                opacity={0.6}
                strokeWidth={1.5}
                stroke={'#000000'}
                class={shape.id}
                // draggable={EVENT_TYPES.CURSOR === type}
                shadowColor="black"
                // onDragStart={handleDragStart}
                // onDragEnd={handleDragEnd}
                // onDragMove={handleDragMove}
                zIndex={999999999999999999}
                onClick={handleClick}
                onTap={handleClick}
                onMouseMove={mouseMove}

                // onMouseEnter={(e)=>setBorder(true)}
                // onMouseLeave={()=>setBorder(false)}
                onPointerMove={()=>setBorder(false)}
                // onMouseLeave={()=>setBorder(false)}
            />

            {isSelected && type===EVENT_TYPES.CURSOR && (
                <Transformer
                    ref={trRef}
                    rotateEnabled={false}
                    enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                    boundBoxFunc={(oldBox, newBox) => {
                        const id=child.id
                        if (newBox.width < 5 || newBox.height < 5) {
                            dispatch(setShape(
                                {
                                    width:oldBox.width,
                                    height:oldBox.height,
                                    parentId:shape.id,
                                    list,
                                    id
                                }))
                            return oldBox;
                        }
                        dispatch(setShape({
                            width:newBox.width,
                            height:newBox.height,
                            parentId:shape.id,
                            list,
                            id
                        }))
                        return newBox;
                    }}
                />
            )}
            {border && type==EVENT_TYPES.ARROW ? <Html
                groupProps={{ x:shape?.x+child?.x1-2, y:shape?.y+child?.y1-2 }}
                divProps={{ style: { opacity: 1,zIndex:-1 }}}
            >
                <div style={{
                    width:child.width,
                    height:child.height,
                    border:'2px solid red',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    position:'relative',
                }}
                >
                    <ArrowElements
                        id={child.id}
                        style={{
                            top:-5,
                            left:child.width/2-5,
                        }}
                    ></ArrowElements>
                    <ArrowElements
                        id={child.id}
                        style={{
                            top:child.height/2-5,
                            left:-5,
                        }}
                    ></ArrowElements>
                    <ArrowElements
                        id={child.id}
                        style={{
                            top:child.height/2-5,
                            left:child.width-5,
                        }}
                    ></ArrowElements>
                    <ArrowElements
                        id={child.id}
                        style={{
                            top:child.height-5,
                            left:child.width/2-5,
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
  background: #000000;
  position: fixed;
  cursor: pointer;
`;
export default HotspotChild;
