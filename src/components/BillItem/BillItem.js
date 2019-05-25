import React from 'react'
import '../MenuItem/MenuItem.css'


const Bill=(props)=>{
  console.log('props',props)
   let img=null
    if (props.image === 'null') {
        img = <img src={require('../../img/item1.png')} width="80px" height="50px" alt="boohoo" className="img-responsive" />
    } else {
        img = <img src={props.image} width="80px" height="50px" alt={props.kind} className="img-responsive" />
    }

    return (
        <div className="menu-item">
            <div className="item-img">
                {img}
                
            </div>

            <div className="item-desc">
                <p> {props.kind}</p>
                <p> {props.price}.00 JD</p>
            </div>

            <div className="button-add">
                <button onClick={props.removeItem} className="sub-button"></button>
            </div>

        </div>

        );
} 

export default Bill; 