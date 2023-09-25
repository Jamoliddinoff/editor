import React,{useEffect} from 'react';
import {Arrow} from "react-konva";
import {getShapeSidePosition} from "../utils";
import {EVENT_TYPES} from "../constants";
import {clearArrow, removeShape} from "../store/shapesSlice";
import {useDispatch, useSelector} from "react-redux";

const Connectors = ({connectors,list,boardEnd}) => {
    const dispatch = useDispatch();
    const {eventsType:{type},shapes:{arrows}} = useSelector(store => store)
    const shapeRef = React.useRef();
    useEffect(()=>{
        shapeRef.current?.node?.moveUp();
    },[])
    const handleClick = (id) => {
        EVENT_TYPES.TRASH == type && dispatch(clearArrow({id,arrowss:arrows}))
    }
    return (
        <>
            {connectors.map(con => {
                let fromItem = list.find(s => s.id === con.from);
                let toItem = list.find(s => s.id === con.to)
                if(con.fromParent||con.toParent){
                    if (con.fromParent){
                        let fromParent = list.find(x=>x.id===con?.fromParent);
                        if(fromParent?.children){
                            let child = fromParent?.children.find(y=>y.id===con.from)
                            fromItem = {
                                ...child,
                                x:fromParent.x+child?.x1,
                                y:fromParent.y+child?.y1,
                            }

                        }
                        console.log('fromParent----',fromParent,con)
                        console.log('fromItem----',fromItem)

                    } else {
                        let toParent = list.find(x=>x.id===con?.toParent);
                        if (toParent?.children){
                            let child = toParent?.children.find(y=>y.id===con.to)
                            toItem = {
                                ...child,
                                x:toParent.x+child?.x1,
                                y:toParent.y+child?.y1,
                            }

                        }
                        console.log('toItem----',toItem)

                    }
                }
                const from = getShapeSidePosition(fromItem, con.fromSide);
                const to = getShapeSidePosition(toItem, con.toSide);
                let fromX = from.x;
                let fromY = from.y;
                let toX = to.x;
                let toY = from.y;
                // let direction = [];
                let direction = [from?.x + 80, from?.y, to?.x - 80, to?.y];

                if (con.fromSide === 'right') {
                    if (con.toSide === 'left')
                        direction = [from?.x + 80, from?.y, to?.x - 80, to?.y]
                    if (con.toSide === 'right')
                        direction = [from?.x + 80, from?.y, to?.x + 80, to?.y]
                    if (con.toSide === 'top')
                        direction = [from?.x + 80, from?.y, to?.x, to?.y - 80]
                    if (con.toSide === 'bottom')
                        direction = [from?.x + 80, from?.y, to?.x, to?.y + 80]
                    }
                if (con.fromSide === 'left') {
                    if (con.toSide === 'left')
                        direction = [from?.x - 80, from?.y, to?.x - 80, to?.y]
                    if (con.toSide === 'right')
                        direction = [from?.x - 80, from?.y, to?.x + 80, to?.y]
                    if (con.toSide === 'top')
                        direction = [from?.x - 80, from?.y, to?.x, to?.y - 80]
                    if (con.toSide === 'bottom')
                        direction = [from?.x, from?.y, to?.x, to?.y + 80]
                }
                if (con.fromSide === 'top') {
                    if (con.toSide === 'left')
                        direction = [from?.x, from?.y - 80, to?.x - 80, to?.y]
                    if (con.toSide === 'right')
                        direction = [from?.x, from?.y - 80, to?.x + 80, to?.y]
                    if (con.toSide === 'top')
                        direction = [from?.x, from?.y - 80, to?.x, to?.y - 80]
                    if (con.toSide === 'bottom')
                        direction = [from?.x, from?.y - 80, to?.x, to?.y + 80]
                }
                if (con.fromSide === 'bottom') {
                    if (con.toSide === 'left')
                        direction = [from?.x, from?.y + 80, to?.x - 80, to?.y]
                    if (con.toSide === 'right')
                        direction = [from?.x, from?.y + 80, to?.x + 80, to?.y]
                    if (con.toSide === 'top')
                        direction = [from?.x, from?.y, to?.x, to?.y - 80]
                    if (con.toSide === 'bottom')
                        direction = [from?.x, from?.y, to?.x, to?.y + 80]
                }

                let points =[from?.x, from?.y,...direction, to?.x, to?.y]
                // if(con.fromParent||con.toParent){
                //     if (con.fromParent){
                //         const from1 = list.find(s => s.id === con.fromParent);
                //         const to1 = getShapeSidePosition(list.find(s => s.id === con.to),con.toSide);
                //         console.log('tempppppppppp1',from1,to1)
                //
                //         // points= [from?.x+con?.x1 + 80, from?.y+con?.y1, to?.x - 80, to?.y]
                //         points= [from1?.x+con?.x1, from1?.y+con?.y1, to1?.x, to1?.y]
                //
                //     }else {
                //
                //         const from2 = getShapeSidePosition(list.find(s => s.id === con.fromParent),con.fromSide);
                //         const to2 = list.find(s => s.id === con.toParent);
                //         console.log('tempppppppppp2222',from2,to2)
                //
                //         // points= [from?.x + 80, from?.y, to?.x+con?.x1 - 80, to?.y+con?.y1]
                //         points= [from2?.x, from2?.y, to2?.x+con?.x1, to2?.y+con?.y1]
                //     }
                // }
                // else direction = [from?.x, from?.y, to?.x, to?.y]
                return (
                    <Arrow
                        key={con.id}
                        points={points}
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
                        ref={shapeRef}
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
