import React, {useEffect, useRef, useState} from 'react';
import {Stage, Layer, Star, Text, Rect, Arrow, Circle, Group} from 'react-konva';
import {useDispatch, useSelector} from "react-redux";
import shapes, {clearArrow, createArrow, createShape, setAllShapes, setArrow, setShape} from "../store/shapesSlice";
import Shapes from "./Shapes";
import Connectors from "./Connectors";
import eventsType, {setEvent} from "../store/eventsSlice";
import {EVENT_TYPES} from "../constants";
import {getShapeSide, getShapeSidePosition} from "../utils";
import broomIcon from '../accetss/icons/broom.png';
import clicksIcon from '../accetss/icons/clicks.png';

const AppLayout = () => {
    const {
        shapes:{list,arrows,tempImage},
        eventsType:{type},
    } = useSelector(store => store)
    const dispatch = useDispatch();
    let stageRef = useRef(null);
    const [boardEnd,setBoardEnd] = useState({x:0,y:0});
    const [arrowPosition,setArrowPosition] = useState(null)
    const [formShape,setFromShape] = useState(null)
    const [childDrag,setChildDrag] = useState(false)
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(()=>{
        if(
            EVENT_TYPES.RECTANGLE===type||
            EVENT_TYPES.ROUNDED_RECTANGLE===type||
            EVENT_TYPES.SHAPES===type||
            EVENT_TYPES.CIRCLE===type||
            EVENT_TYPES.RHOMB===type)
        {
            document.body.style.cursor='crosshair'
        }
        else if(EVENT_TYPES.TRASH===type){
            document.body.style.cursor='pointer'
        }
        else if(EVENT_TYPES.TEXT===type){
            document.body.style.cursor='text'
        }
        else if(EVENT_TYPES.IMAGES===type){
            document.body.style.cursor='copy'
        }
        else {
            document.body.style.cursor=null;

        }
        if(EVENT_TYPES.CURSOR!==type){
            setScale(1);
            setPosition({x:0,y:0});
            stageRef=null
        }
    },[type])

    const handleWheel = (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.05;
        const stage = stageRef.current.getStage();
        const oldScale = stageRef.current.scaleX();

        const pointer = stageRef.current.getPointerPosition();
        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };
        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        if(EVENT_TYPES.CURSOR===type){
            setPosition(
                {x: -(mousePointTo.x - pointer.x / newScale) * newScale,
                y: -(mousePointTo.y - pointer.y / newScale) * newScale,
                })
            setScale(newScale)
        }
    }

    const handleMouseDown = e => {
        const { x, y } = e.target.getStage().getPointerPosition();
        // const {x,y} = getDragPosition(e.target.getStage().getPointerPosition().x,e.target.getStage().getPointerPosition().y)
        const element = e.target?.attrs
        let x1 = x-element.x-boardEnd.x;
        let y1 = y-element.y-boardEnd.y;
        const getSide = element?.id && getShapeSide(x1,y1,element)
        const getPosition = getShapeSidePosition(element,getSide)
        if(type===EVENT_TYPES.RECTANGLE ||type===EVENT_TYPES.ROUNDED_RECTANGLE){
            const data = {
                type,
                width:150,
                height:150,
                fill:"#84c1e5",
                text:"Text here...",
                textColor:"#202021",
                fontSize:14,
                x: x-boardEnd.x,
                y: y-boardEnd.y,
                isDragging: false,
            }
            dispatch(createShape(data))
            dispatch(setEvent(EVENT_TYPES.CURSOR))

        }
        if(type===EVENT_TYPES.RHOMB){
            const data = {
                type,
                width:150,
                height:150,
                fill:"#84c1e5",
                text:"Text here...",
                textColor:"#202021",
                fontSize:14,
                rotation:45,
                x: x-boardEnd.x,
                y: y-boardEnd.y,
                isDragging: false,
            }
            dispatch(createShape(data))
            dispatch(setEvent(EVENT_TYPES.CURSOR))

        }
        else if(type===EVENT_TYPES.CIRCLE){
            const data = {
                type,
                width:150,
                height:150,
                fill:"#84c1e5",
                text:"Text here...",
                textColor:"#202021",
                fontSize:14,
                radius:75,
                x: x-boardEnd.x,
                y: y-boardEnd.y,
                isDragging: false,
            }
            dispatch(createShape(data))
            dispatch(setEvent(EVENT_TYPES.CURSOR))

        }
        else if(type===EVENT_TYPES.TEXT){
            const data = {
                type,
                width:150,
                fill:"#202021",
                text:"Add text here..",
                fontSize:20,
                x: x-boardEnd.x,
                y: y-boardEnd.y,
                isDragging: false,
            }
            dispatch(createShape(data))
            dispatch(setEvent(EVENT_TYPES.CURSOR))
        }
        else if(type===EVENT_TYPES.IMAGES){
                    const data = {
                        ...tempImage,
                        x: x-boardEnd.x,
                        y: y-boardEnd.y,
                    }
                    dispatch(createShape(data))
                    dispatch(setEvent(EVENT_TYPES.CURSOR))
                }

        if(EVENT_TYPES.ARROW===type){
            if(element?.id){
                setArrowPosition({...arrowPosition,fromX:getPosition?.x,fromY:getPosition?.y,from:element?.id})
                const shape=e.target.attrs;
                const id = Math.round(Math.random()*10000)
                const newConnector = {
                    from: element.id,
                    fromSide:getShapeSide(x1,y1,shape),
                    id: id
                };
                dispatch(createArrow(newConnector));
                setFromShape({...element,arrowId:id})

            }

        }
    };

    const handleMouseUp = e => {
        const { x, y } = e.target.getStage().getPointerPosition();
        // const {x,y} = getDragPosition(e.target.getStage().getPointerPosition().x,e.target.getStage().getPointerPosition().y)
        const element = e.target?.attrs
        let x1 = x-element.x-boardEnd.x;
        let y1 = y-element.y-boardEnd.y;

        const getSide = element?.id && getShapeSide(x1,y1,element)
        const getPosition = getShapeSidePosition(element,getSide)

        if(EVENT_TYPES.ARROW===type) {
            if(formShape?.id&&formShape?.id!==element.id){
                const setConnector = {
                    id:formShape.arrowId,
                    to: element?.id,
                    toSide:getShapeSide(x1,y1,element),
                };
                setArrowPosition({...arrowPosition,toX:getPosition?.x,toY:getPosition?.y,to:element?.id})
                if(element?.id){
                    dispatch(setArrow(setConnector));
                    setArrowPosition(null)
                    setFromShape(null)
                } else {
                    dispatch(clearArrow({id:formShape.arrowId,arrowss:arrows}));
                    setArrowPosition(null)
                    setFromShape(null)
                }
            }
        }

    };

    const handleMouseMove = e => {
        // const {x,y} = getDragPosition(e.target.getStage().getPointerPosition().x,e.target.getStage().getPointerPosition().y)
        const {x,y} = e.target.getStage().getPointerPosition()
        const element = e.target?.attrs
        let x1 = x-element.x-boardEnd.x;
        let y1 = y-element.y-boardEnd.y;

        if(EVENT_TYPES.ARROW===type){
            if (element?.id){
                const getSide = getShapeSide(x1,y1,element)
                const getPosition = getShapeSidePosition(element,getSide)
                getShapeSide(x1,y1,element)

                arrowPosition && setArrowPosition(
                    {...arrowPosition,toX:getPosition.x,toY:getPosition.y}
                )


            }
            else arrowPosition && setArrowPosition({...arrowPosition,toX:x-boardEnd.x,toY:y-boardEnd.y})
        }
        // console.log('x1: ',x1,' y1: ',y1);
        // console.log('shape: ',e.target.attrs)
        // getShapeSide(x,y)
    };

    const DrawArrow = () => {
        // const {fromX, fromY, toX, toY,fromId,toId} = arrowPosition;
        const direction = [arrowPosition?.fromX, arrowPosition?.fromY, arrowPosition?.toX, arrowPosition?.toY]
        return EVENT_TYPES.ARROW===type && <Arrow
            points={[arrowPosition?.fromX, arrowPosition?.fromY,...direction, arrowPosition?.toX, arrowPosition?.toY]}
            stroke={"#020202"}
            fill={'#020202'}
            hitStrokeWidth={5}
            tension={0}
            offsetX={8}
            strokeWidth={2}
            pointerAtBeginning={false}
            x={0}
            y={0}
            bezier={true}
            zIndex={999999999}

        />
    }
    const handleDragEnds = (e) => {
        const {x,y} = e.target.position()
        !childDrag  && setBoardEnd({x,y})
        setArrowPosition(null);
        setFromShape(null)

    };



    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            ref={stageRef}
            draggable
            scaleX={scale}
            scaleY={scale}
            x={position.x}
            y={position.y}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onDragEnd={(e)=>!childDrag && handleDragEnds(e)}
            draggable={EVENT_TYPES.CURSOR === type && !childDrag? true : false}
            onTouchMove={handleMouseMove}
        >
            <Layer>
                <Group >
                    {DrawArrow()}

                    <Connectors  connectors={arrows} list={list} boardEnd={boardEnd}/>
                    <Shapes list={list} setChildDrag={(bool)=>setChildDrag(bool)} boardEnd={boardEnd}/>
                </Group>
            </Layer>
        </Stage>
    );
};

export default AppLayout;
