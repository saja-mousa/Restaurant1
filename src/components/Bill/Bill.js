import React ,{Component}from 'react'
import BillItem from '../BillItem/BillItem'
class Bill extends Component{
 
  
    render(){

    return (
       
      this.props.onBill.map((x,index)=>{
       // console.log('item on map',x)

        // console.log('totalprice',totalprice)
          
             return( <BillItem
              key={x[0].itemId}
              index={index}
              kind={x[0].itemDesc} 
              price={x[0].itemPrice}
              image={x[0].itemImage}
              click={this.totalprice}
              removeItem={()=>this.props.removeItem(index)} />

        
            

             );
       })
    );

} }

export default Bill;