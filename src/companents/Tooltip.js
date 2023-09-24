import React, {useState} from 'react';
import styled from "styled-components";

const Tooltip = ({title,children}) => {
    const [isView,setIsView] = useState(false)
    return (
        <Wrapper
            onMouseEnter={()=>setIsView(true)}
            onMouseLeave={()=>setIsView(false)}
        >
            {isView && <Span style={{width:title.length*9.6}}>{title}</Span>}
            {children}
        </Wrapper>
    );
};

const Wrapper = styled.div`
  position: relative;
  
`;
const Span = styled.span`
  position: absolute;
  width: auto;
  top: 10px;
  left: 50px;
  background: #444a56;
  border-radius: 4px;
  padding: 4px;
  color: #f5f5f5;
  text-align: center;

  &:before {
    content: '';
    width: 10px;
    height: 10px;
    background: #282c34;
    transform: rotate(-45deg);
    position: absolute;
    left: -10px;
    top: 8px;
    //right: 7px;
  }
`;
export default Tooltip;
