import React from 'react'
import MenuItem from '../MenuItem/MenuItem'


const Menu= props=>{
// console.log('menu',props.menu)
return (
props.menu.map((x,index)=>{

    return( <MenuItem 
        key={x.itemId}
         kind={x.itemDesc} 
        price={x.itemPrice} 
        image={x.itemImage}
        handleCheck={()=>props.handleCheck(index)}
        defaultChecked={props.defaultChecked} />

    );
}) 

);


}
export default Menu;