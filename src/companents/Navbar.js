import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setBackground} from "../store/editorSlice";
import shapes, {clearBoard, setShape, uploadJson} from "../store/shapesSlice";
import trash from '../accetss/icons/trash.png'
import jsonIcon from '../accetss/icons/json-icon.png'
import closeIcon from '../accetss/icons/close.png'
import copyIcon from '../accetss/icons/copy-iocon.png'
import downloadIcon from '../accetss/icons/download.svg'

const Navbar = () => {
    const dispatch = useDispatch();
    const {editor:{background},shapes:{shape,list,arrows}} = useSelector(store => store);
    const [openJson,setOpenJson] = useState(false);
    const [colors,setColors] = useState(shape?.fill);

    useEffect(()=>{
        setColors(shape?.fill||shape?.textColor)
    },[shape?.fill||shape?.textColor])

    const handleChangeJson = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            dispatch(uploadJson(JSON.parse(e.target.result)))
        };
    };
    return (
        <>
            <Wrapper>
                <p style={{fontSize:25}}><span style={{color:'#ffae0c'}}>Roadmap</span>_editor</p>
                <ItemCenter style={{gap:25}}>
                    <ItemCenter onClick={()=>setOpenJson(!openJson)}>
                        <p>JSON:</p>
                        <img style={{width:28,height:28}} src={jsonIcon}/>
                    </ItemCenter>
                    <ItemCenter>
                        <p>Background:</p>
                        <Colors
                            onClick={()=>dispatch(setBackground('#ffffff'))}
                            style={{
                                border:background=='#ffffff' ? '3px solid #3e70ee':null,
                                background:'#ffffff'
                            }}/>
                        <Colors
                            onClick={()=>dispatch(setBackground('#f1dede'))}
                            style={{
                                border:background=='#f1dede' ? '3px solid #3e70ee' :null,
                                background:'#f1dede'}}/>
                        <Colors
                            onClick={()=>dispatch(setBackground('#dff8da'))}
                            style={{border:background=='#dff8da' ?'3px solid #3e70ee':null,
                                background:'#dff8da'}}/>
                        <Colors
                            onClick={()=>dispatch(setBackground('#b6d2fa'))}
                            style={{border:background=='#b6d2fa' ? '3px solid #3e70ee':null,background:'#b6d2fa'}}/>
                        <Colors
                            onClick={()=>dispatch(setBackground('#d8bcfa'))}
                            style={{border: background=='#d8bcfa' ? '3px solid #3e70ee':null,background:'#d8bcfa'}}/>
                    </ItemCenter>
                    <ItemCenter onClick={()=>dispatch(clearBoard())} style={{cursor:'pointer'}}>
                        <p>Clear board:</p>
                        <img src={trash}/>
                    </ItemCenter>
                </ItemCenter>
            </Wrapper>
            <Wrapper style={{display:shape?.id?'flex':'none',   top:55.5}}>
                <ItemCenter>
                    {shape?.fill &&
                    <ItemCenter>
                        <p>Shape color:</p>
                        <ColorPicker
                            type="color"
                            id="head"
                            name="head"
                            onChange={e=>dispatch(setShape({
                                id:shape?.id,
                                fill:e.target.value,
                            }))}
                            value={shape?.fill} />
                    </ItemCenter>}
                    {shape?.textColor &&
                    <ItemCenter>
                        <p>Text color:</p>
                        <ColorPicker
                            type="color"
                            id="head"
                            name="head"
                            onChange={e=>dispatch(setShape({
                                id:shape?.id,
                                textColor:e.target.value,
                            }))}
                            value={shape?.textColor} />
                    </ItemCenter>}
                </ItemCenter>


            </Wrapper>
            {openJson &&
                <Modal>
                    <ModalContainer>
                        <span onClick={()=>setOpenJson(false)}>
                            <img src={closeIcon}/>
                        </span>
                        <div style={{position:'relative'}}>
                            <pre>{JSON.stringify({shapes:list,arrows}, null, 2)}</pre>
                        </div>
                        <JsonBtn>
                            <p>Upload JSON file</p> <img src={downloadIcon}/>
                            <input type="file" onChange={handleChangeJson} accept={'application/json'}/>
                        </JsonBtn>
                        <CopyIcon
                            onClick={()=>navigator.clipboard.writeText(JSON.stringify({shapes:list,arrows}))}>
                            <img src={copyIcon} alt={'Copy to clipboard'} title={'Copy to clipboard'}/>
                        </CopyIcon>
                    </ModalContainer>
                </Modal>
            }
        </>

    );
};

const Wrapper = styled.div`
  background: #282c34;
  width: calc(100% - 40px);
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  p {
    margin: 0px;
    font-size: 16px;
    color: #d0d0d0;
    font-weight: 600;
  }

`;

const ItemCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

`;
const Colors = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 4px;
  cursor: pointer;
  border-width: 1px;
`;

const ColorPicker = styled.input`
  width: 150px;
  border: none;
  background: #282c34;
`
const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0px;
  top:0px;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContainer = styled.div`
  width: 40%;
  padding: 20px 24px;
  background: aliceblue;
  border-radius: 10px;
  position: relative;
  div{
    margin: 25px 0px;
    max-height: 500px;
    overflow-y: auto;
    border: 1px solid black;
  }
  span{
    position: absolute;
    right: 10px;
    top:10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
      background: rgba(0,0,0,0.4);
    }
    img{
      width: 15px;
      height: 15px;
    }
  }

`
const JsonBtn = styled.section`
  border: none;
  width: 170px;
  overflow: hidden;
  padding: 0px 8px;
  background: #59a9cb;
  color: black;
  position: relative;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: black;
    font-weight: bold;
    font-size: 14px;
    //border: 1px solid;
  }

  input {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 40px;
    opacity: 0;
  }
`;

const CopyIcon = styled.div`
  position: absolute;
  right: 35px;
  bottom: 75px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none !important;

  &:hover {
    background: #d3d3d3;
  }

  img {
    width: 20px;
    height: 20px;
  }


`;





export default Navbar;

