import React,{useState} from 'react';
import {Arrow, Circle, Image, Rect} from "react-konva";
import {createArrow, setShape} from "../store/shapesSlice";
import {useDispatch, useSelector} from "react-redux";
import {EVENT_TYPES} from "../constants";
import trash from '../accetss/icons/trash.png'
import PictureElement from "../companents/PictureElement";
import * as PropTypes from "prop-types";
import KonvaShape from "../companents/KonvaShape";

const Shapes = ({list,setChildDrag,boardEnd}) => {
    const [selectedId, selectShape] = useState(null);

    return (
        <>
            {list.map((shape) => (
                <KonvaShape
                    key={shape.id}
                    shape={shape}
                    isSelected={shape.id === selectedId}
                    onSelect={() => {
                        selectShape(shape.id);
                    }}
                    setChildDrag={setChildDrag}
                    boardEnd={boardEnd}
                    // onChange={(newAttrs) => {
                    //     const rects = rectangles.slice();
                    //     rects[i] = newAttrs;
                    //     setRectangles(rects);
                    // }}
                />))}
        </>
    );
};

export default Shapes;
