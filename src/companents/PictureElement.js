import React,{useEffect,useState} from 'react';
import useImage from 'use-image';
import {Image, Transformer} from "react-konva";
import {EVENT_TYPES} from "../constants";
import {removeShape, setShape} from "../store/shapesSlice";
import {useDispatch, useSelector} from "react-redux";
import {getStyle} from "./TextElement";
import styled from "styled-components";
import {Html} from "react-konva-utils";

const PictureElement = ({
                            shape,
                            url,
                            isSelected,
                            onSelect,
                            handleDragStart,
                            handleDragEnd,
                            handleDragMove}) => {
    const [image] = useImage(url);
    const dispatch = useDispatch();
    const {eventsType:{type}} = useSelector(store => store)
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    const [border,setBorder] = useState(false);

    useEffect(() => {
        if (isSelected) {
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer().batchDraw();
        }
    }, [isSelected]);

    const handleClick = () => {
        onSelect()
        EVENT_TYPES.TRASH == type && dispatch(removeShape({id:shape.id}))
    }

    return (
        <>
            <Image
                key={shape?.id}
                ref={type===EVENT_TYPES.CURSOR?shapeRef:null}
                // image={shape?.image}
                id={shape?.id}
                x={shape?.x}
                y={shape?.y}
                width={shape.width}
                height={shape.height}
                fill={shape?.fill}
                opacity={0.9}
                draggable={EVENT_TYPES.CURSOR === type}
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
                onSelect={onSelect}
                zIndex={999}
                isSelected={isSelected}
                onClick={handleClick}
                onTap={handleClick}
                image={image}
                onMouseMove={(e)=>setBorder(true)}
                onMouseLeave={()=>setBorder(false)}
            />
            {isSelected && type===EVENT_TYPES.CURSOR && (
                <Transformer
                    ref={trRef}
                    rotateEnabled={false}
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

export default PictureElement;