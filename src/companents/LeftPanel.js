import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import mouseIcon from '../accetss/icons/mouse.png'
import triangleIcon from '../accetss/icons/shapes.png'
import textIcon from '../accetss/icons/text.png'
import imageIcon from '../accetss/icons/image.png'
import arrowIcon from '../accetss/icons/right.png'
import trashIcon from '../accetss/icons/trash.png'
import rectangleIcon from '../accetss/icons/rectangle.png'
import roundedRectangle from '../accetss/icons/rounded-rectangle.png'
import circleIcon from '../accetss/icons/circle.png'
import rhombIcon from '../accetss/icons/rhomb.png'
import tooltipicon from '../accetss/icons/connection-points.png'
import {useDispatch, useSelector} from "react-redux";
import eventsType, {setEvent} from "../store/eventsSlice";
import {EVENT_TYPES} from "../constants";
import {createShape, getTempImage, setShape} from "../store/shapesSlice";
import Tooltip from "./Tooltip";

const LeftPanel = () => {
    const {type} = useSelector(store=>store.eventsType);
    const dispatch = useDispatch();
    const [openShapes, setOpenShapes] =useState(false);


    const handleEvents = (type) => {
        dispatch(setEvent(type));
        setOpenShapes(false)
    }

    const handleImageInput = (e) => {
        if(e.target.files[0]){
            const img = URL.createObjectURL(e.target.files[0])
            const imag = new Image();
            imag.src = img;
            imag.onload = () => {
                if(e.target.files[0]){
                    dispatch(getTempImage({
                        type,
                        width:350,
                        height:(350*imag.height)/imag.width,
                        x: 100,
                        y: 100,
                        image:img,
                        isDragging: false,
                    }))
                    // handleEvents(EVENT_TYPES.CURSOR);
                }
            };
        }
        else {
            handleEvents(EVENT_TYPES.CURSOR);
        }



    }

    return (
        <Container>
            <Tooltip title={'Cursor'}>
                <Item
                    onClick={()=>handleEvents(EVENT_TYPES.CURSOR)}
                    style={{background:type === EVENT_TYPES.CURSOR ? "#4a515d" : null}}
                >
                        <img src={mouseIcon}/>
                </Item>
            </Tooltip>

            <hr/>
            <Tooltip title={'Draw arrow'}>
                <Item
                    onClick={()=>handleEvents(EVENT_TYPES.ARROW)}
                    style={{background:type === EVENT_TYPES.ARROW ? "#4a515d" : null}}
                >
                    <img src={arrowIcon}/>
                </Item>
            </Tooltip>
            <Item
                onClick={()=>setOpenShapes(!openShapes)}
                style={{background:type === EVENT_TYPES.RECTANGLE
                    ||type === EVENT_TYPES.CIRCLE
                    ||type === EVENT_TYPES.ROUNDED_RECTANGLE
                    ||type === EVENT_TYPES.RHOMB ? "#4a515d" : null,position:'relative'}}
            >
                <img src={triangleIcon}/>
                {openShapes
                    ? <SubItems>
                        <Tooltip title={'Rectangle'}>
                            <Item
                                onClick={()=>handleEvents(EVENT_TYPES.RECTANGLE)}
                                style={{background:type === EVENT_TYPES.RECTANGLE ? "#4a515d" : null}}>
                                <img src={rectangleIcon}/>
                            </Item>
                        </Tooltip>
                        <Tooltip title={'Circle'}>
                            <Item
                                onClick={()=>handleEvents(EVENT_TYPES.CIRCLE)}
                                style={{background:type === EVENT_TYPES.CIRCLE ? "#4a515d" : null}}>
                                <img src={circleIcon}/>
                            </Item>
                        </Tooltip>
                        <Tooltip title={'Rounded rectangle'}>
                            <Item
                                onClick={()=>handleEvents(EVENT_TYPES.ROUNDED_RECTANGLE)}
                                style={{background:type === EVENT_TYPES.ROUNDED_RECTANGLE ? "#4a515d" : null}}>
                                <img src={roundedRectangle}/>
                            </Item>
                        </Tooltip>
                        <Tooltip title={'Rhomb'}>
                            <Item
                                onClick={()=>handleEvents(EVENT_TYPES.RHOMB)}
                                style={{background:type === EVENT_TYPES.RHOMB ? "#4a515d" : null}}>
                                <img src={rhombIcon}/>
                            </Item>
                        </Tooltip>
                    </SubItems>
                    : null }
            </Item>
            <Tooltip title={'Text'}>
                <Item
                    onClick={()=>handleEvents(EVENT_TYPES.TEXT)}
                    style={{background:type === EVENT_TYPES.TEXT ? "#4a515d" : null}}>
                    <img src={textIcon}/>
                </Item>
            </Tooltip>
            <Tooltip title={'Image picker'}>
                <Item
                    // htmlFor={'input_file'}
                    onClick={()=>{
                        handleEvents(EVENT_TYPES.IMAGES);
                    }}
                    style={{
                        background:type === EVENT_TYPES.IMAGES ? "#4a515d" : null,
                        overflow:'hidden'
                    }}>
                    <img src={imageIcon}/>
                    <ImagePicker
                        type={'file'}
                        onChange={handleImageInput}
                        id='input_file'
                        accept={'image/png, image/jpeg, image/jpg'}
                    />
                </Item>
            </Tooltip>
            <Tooltip title={'Hotspot'}>
                <Item
                    onClick={()=>handleEvents(EVENT_TYPES.HOTSPOT)}
                    style={{background:type === EVENT_TYPES.HOTSPOT ? "#4a515d" : null}}>
                    <img src={tooltipicon}/>
                </Item>
            </Tooltip>
            <Tooltip title={'Clear item'}>
                <Item
                    onClick={()=>handleEvents(EVENT_TYPES.TRASH)}
                    style={{background:type === EVENT_TYPES.TRASH ? "#4a515d" : null}}>
                    <img src={trashIcon}/>
                </Item>
            </Tooltip>
        </Container>
    );
};

export default LeftPanel;


const Container = styled.div`
  position: fixed;
  //overflow: hidden;
  //height: 250px;
  //width: 50px;
  background: #282c34;
  border-radius: 10px;
  top: 25%;
  left: 15px;
  padding: 6px;
  
`;
const Item = styled.div`
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  //background: #373d46;
  &:hover {
    background: #4a515d;
  }

  img {
    width: 24px;

  }
`;
const SubItems = styled.span`
  display: flex;
  flex-direction: column;
  background: #282c34;
  border-radius: 10px;
  padding: 6px;
  position: absolute;
  right: -70px;
  top: -40px;
  &:after{
    content: '';
    width: 10px;
    height: 10px;
    background: #282c34;
    transform: rotate(-45deg);
    position: absolute;
    top: 50px;
    right: 47px;
  }

  div {
    
  }
`;
const ChildItem = styled.div`
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  //background: #373d46;
  &:hover {
    background: #4a515d;
  }

  img {
    width: 24px;

  }
`;

const ImagePicker = styled.input`
    width: 35px;
  height: 35px;
  border: 1px solid red;
  position: absolute;
  left: 8px;
  //top:0px;
  opacity: 0;
  //z-index: 10000;
`;
