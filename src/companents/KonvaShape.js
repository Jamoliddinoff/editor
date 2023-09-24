import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {EVENT_TYPES} from "../constants";
import {Circle, Rect, Text, Transformer} from "react-konva";
import {setShape} from "../store/shapesSlice";
import PictureElement from "./PictureElement";
import TextElement, {getStyle} from "./TextElement";
import {Html} from "react-konva-utils";
import Rectangle from "./Rectangle";
import RhombElement from "./RhombElement";
import CircleElement from "./CircleElement";

const KonvaShape = ({shape,isSelected,onSelect,setChildDrag,boardEnd}) => {
    const dispatch = useDispatch();
    const {eventsType:{type}} = useSelector(store => store);

    const shapeRef = React.useRef();
    const trRef = React.useRef();

    useEffect(() => {
        if (isSelected) {
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer().batchDraw();
        }
    }, [isSelected]);

    const handleDragStart = (e) => {
        const {x,y} = e.target.position();
        // const {x,y} = e.target.getStage().getPointerPosition()

        setChildDrag(true)
        dispatch(setShape({
            isDragging: true,
            x:x,
            y:y,
            id:shape.id,
        }))
    };
    const handleDragEnd = (e) => {
        const {x,y} = e.target.position()
        // const {x,y} = e.target.getStage().getPointerPosition()
        console.log('insideDragEnd-----',x,y)
        setTimeout(()=>{
            setChildDrag(false)
        },3000)

        dispatch(setShape({
            id:shape.id,
            x:x,
            y:y,
            // dragX:x,
            // dragY:y,
            isDragging: false,
        }))
    };

    const handleDragMove = (e) => {
        const {x,y} = e.target.position();
        // const {x,y} = e.target.getStage().getPointerPosition()

        dispatch(setShape({
            id:shape.id,
            x:x,
            y:y,
            isDragging: true,
        }))
    }

    if(shape.type===EVENT_TYPES.RECTANGLE||shape.type===EVENT_TYPES.ROUNDED_RECTANGLE) {
        return (
            <>
                <Rectangle
                    shape={shape}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                    handleDragMove={handleDragMove}
                    onSelect={onSelect}
                    isSelected={isSelected}
                    boardEnd={boardEnd}
                />
            </>
        )
    }
    if(shape.type===EVENT_TYPES.RHOMB){
        return (
            <>
                <RhombElement
                    shape={shape}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                    handleDragMove={handleDragMove}
                    onSelect={onSelect}
                    isSelected={isSelected}
                />
            </>
        )
    }
    if(shape.type===EVENT_TYPES.TEXT){
        return (
            <>
                <TextElement
                    shape={shape}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                    handleDragMove={handleDragMove}
                    onSelect={onSelect}
                    isSelected={isSelected}
                />
            </>
        )
    }
    if(shape.type===EVENT_TYPES.IMAGES){
        return (
            <>
                <PictureElement
                    shape={shape}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                    handleDragMove={handleDragMove}
                    onSelect={onSelect}
                    isSelected={isSelected}
                    url={shape?.image}
                />
            </>
        )
    }
    if(shape.type===EVENT_TYPES.CIRCLE){
        return (
            <>
                <CircleElement
                    shape={shape}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                    handleDragMove={handleDragMove}
                    onSelect={onSelect}
                    isSelected={isSelected}
                />
            </>
        )
    }

    return <Rect.Fragment></Rect.Fragment>
};

export default KonvaShape;
