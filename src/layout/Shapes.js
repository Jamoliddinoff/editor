import React,{useState} from 'react';
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
