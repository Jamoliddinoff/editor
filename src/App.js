import React, {useEffect, useState} from 'react';
import AppLayout from "./layout";
import LeftPannel from "./companents/LeftPanel";
import Navbar from "./companents/Navbar";
import {useSelector} from "react-redux";

const App = () => {
    const {editor:{background}} = useSelector(store => store);
    useEffect(()=>{
        document.body.style.background=background
    },[background])
    return (
     <div  style={{display:'flex',alignItems:'center'}}>
         <AppLayout/>
         <LeftPannel/>
         <Navbar/>
     </div>
    );
};

export default App;
