import React from 'react';
import {Arrow} from "react-konva";
import {getShapeSidePosition} from "../utils";
import {EVENT_TYPES} from "../constants";
import {clearArrow, removeShape} from "../store/shapesSlice";
import {useDispatch, useSelector} from "react-redux";

const Connectors = ({connectors,list,boardEnd}) => {
    const dispatch = useDispatch();
    const {eventsType:{type},shapes:{arrows}} = useSelector(store => store)

    const handleClick = (id) => {
        console.log('clickeddddddd',arrows)
        EVENT_TYPES.TRASH == type && dispatch(clearArrow({id,arrowss:arrows}))
    }
    return (
        <>
            {connectors.map(con => {
                const from = getShapeSidePosition(list.find(s => s.id === con.from),con.fromSide);
                const to = getShapeSidePosition(list.find(s => s.id === con.to),con.toSide);
                let fromX = from.x;
                let fromY = from.y;
                let toX = to.x;
                let toY = from.y;
                // let direction = [];
                let direction = [from?.x + 80, from?.y, to?.x - 80, to?.y]  ;
                if(con.fromSide==='right'){
                    if(con.toSide==='left')
                         direction = [from?.x + 80, from?.y, to?.x-80, to?.y]
                    if(con.toSide==='right')
                         direction = [from?.x + 80, from?.y, to?.x + 80, to?.y]
                    if(con.toSide==='top')
                         direction = [from?.x + 80, from?.y, to?.x, to?.y-80]
                    if(con.toSide==='bottom')
                         direction = [from?.x + 80, from?.y, to?.x, to?.y+80]
                }
                if(con.fromSide==='left'){
                    if(con.toSide==='left')
                        direction = [from?.x - 80, from?.y, to?.x - 80, to?.y]
                    if(con.toSide==='right')
                        direction = [from?.x - 80, from?.y, to?.x + 80, to?.y]
                    if(con.toSide==='top')
                        direction = [from?.x-80, from?.y, to?.x, to?.y-80]
                    if(con.toSide==='bottom')
                        direction = [from?.x, from?.y, to?.x, to?.y+80]
                }
                if(con.fromSide==='top'){
                    if(con.toSide==='left')
                        direction = [from?.x, from?.y-80, to?.x-80, to?.y]
                    if(con.toSide==='right')
                        direction = [from?.x, from?.y-80, to?.x+80, to?.y]
                    if(con.toSide==='top')
                        direction = [from?.x, from?.y-80, to?.x, to?.y-80]
                    if(con.toSide==='bottom')
                        direction = [from?.x, from?.y-80, to?.x, to?.y+80]

                }
                if(con.fromSide==='bottom'){
                    if(con.toSide==='left')
                        direction = [from?.x, from?.y+80, to?.x-80, to?.y]
                    if(con.toSide==='right')
                        direction = [from?.x, from?.y+80, to?.x+80, to?.y]
                    if(con.toSide==='top')
                        direction = [from?.x, from?.y, to?.x, to?.y-80]
                    if(con.toSide==='bottom')
                        direction = [from?.x, from?.y, to?.x, to?.y+80]

                }

                // else direction = [from?.x, from?.y, to?.x, to?.y]
                return (
                    <Arrow
                        key={con.id}
                        points={[from?.x, from?.y,...direction, to?.x, to?.y]}
                        stroke={'#4f6949'}
                        fill={'#4f6949'}
                        hitStrokeWidth={5}
                        tension={0}
                        offsetX={8}
                        strokeWidth={2}
                        pointerAtBeginning={false}
                        x={0}
                        y={0}
                        bezier={true}
                        dash={[]}
                        zIndex={9999999999999999}
                        onClick={()=>handleClick(con.id)}
                        onTap={()=>handleClick(con.id)}
                        // pointerLength={20}
                        // pointerWidth= {20}
                    />
                );
            })}
        </>
    );
};

export default Connectors;
