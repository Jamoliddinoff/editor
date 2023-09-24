export const getShapeSide = (x1,y1,elem) => {
    let x=x1+elem.x;
    let y=y1+elem.y;

    if(elem?.radius){
        const radius = elem.radius;
        if(y>elem.y-radius && y<elem.y-radius/3 ){
            console.log('top',x,y,elem)
            return 'top'
        }
        if(y<elem.y+radius && y>elem.y+radius*2/3){
            console.log('bottom',x,y,elem)
            return 'bottom'
        }
        if(x>elem.x-radius && x<elem.x-radius/3){
            console.log('top',x,y,elem)
            return 'left'
        }
        if(x<elem.x+radius && x>elem.x+radius*2/3){
            console.log('right',x,y,elem)
            return 'right'
        }
        else{
            console.log('center',x,y,elem)

            return 'center'
        }
    }
    else if(elem?.rotation){
        const c = Math.sqrt(Math.pow(elem.width,2)+Math.pow(elem.width,2))

        if(y<elem.y+c/3 ){
            console.log('top',x,y,elem)
            return 'top'
        }
        if(y<elem.y+c && y>elem.y+c*2/3 ){
            console.log('bottom',x,y,elem)
            return 'bottom'
        }
        if(x>elem.x-c/2 && x<elem.x-c/3){
            console.log('left',x,y,elem)
            return 'left'
        }
        if(x<elem.x+c/2 && x>elem.x+c/3 ){
            console.log('right',x,y,elem)
            return 'right'
        }
        else{
            console.log('center',x,y,elem)
            return 'center'
        }
    }
    else {
        if(x<elem.x+elem.width && y<elem.y+elem.height/3){
            console.log('top',x,y,elem)
            return 'top'
        }
        else if(x<elem.x+elem.width && (y>elem.y+elem.height/3+elem.height/3&&y<elem.y+elem.height)){
            console.log('bottom',x,y,elem)
            return 'bottom'
        }
        else  if(y<elem.y+elem.height && x<elem.x+elem.width/3){
            console.log('left',x,y,elem)
            return 'left'
        }
        else if(y<elem.y+elem.height && (x>elem.x+elem.width/3+elem.width/3&&x<elem.x+elem.width)){
            console.log('right',x,y,elem)
            return 'right'
        }
        else {
            console.log('center',x,y,elem)
            return 'center'
        }
    }

}

export const getShapeSidePosition = (elem,side) =>{
    if (elem?.radius){
        const radius = elem?.radius;
        if (side==='top'){
            return {...elem,x:elem?.x,y:elem?.y-radius}
        }
        if (side==='bottom'){
            return {...elem,x:elem?.x,y:elem?.y+radius}
        }
        if (side==='left'){
            return {...elem,x:elem?.x-radius,y:elem?.y}
        }
        if (side==='right'){
            return {...elem,x:elem?.x+radius,y:elem?.y}
        }
        if(side==='center'){
            return {...elem,x:elem?.x,y:elem?.y}
        }
    }
    else if(elem?.rotation) {
        const c = Math.sqrt(Math.pow(elem?.width,2)+Math.pow(elem?.width,2))

        if(side==='top'){
            return {...elem,x:elem?.x,y:elem?.y}
        }
        if(side==='bottom'){
            return {...elem,x:elem?.x,y:elem?.y+c}
        }
        if(side==='left'){
            return {...elem,x:elem?.x-c/2,y:elem?.y+c/2}
        }
        if(side==='right'){
            return {...elem,x:elem?.x+c/2,y:elem?.y+c/2}
        }
        if(side==='center'){
            return {...elem,x:elem?.x,y:elem?.y+c/2}
        }
        else{
            return {...elem}
        }
    }
    else {
        if(side==='top'){
            return {...elem,x:elem?.x+elem?.width/2,y:elem?.y}
        }
        if(side==='bottom'){
            return {...elem,x:elem?.x+elem?.width/2,y:elem?.y+elem?.height}
        }
        if(side==='left'){
            return {...elem,x:elem?.x,y:elem?.y+elem?.height/2}
        }
        if(side==='right'){
            return {...elem,x:elem?.x+elem?.width,y:elem?.y+elem?.height/2}
        }
        if(side==='center'){
            return {...elem,x:elem?.x+elem?.width/2,y:elem?.y+elem?.height/2}
        }
        else{
            return {...elem}
        }
    }


}
