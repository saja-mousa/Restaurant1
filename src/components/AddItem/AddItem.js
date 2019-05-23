import React ,{Component}from 'react'
import './AddItem.css'
import AddButton from './AddItemButton'
import axios from 'axios'



class AddItem extends Component{
    state = {
        userName:"saja.banihani",
        password:"12345",
        userNameISValid:false,
        passwordISValid:false,

     
        auth: false,
        valid: false,
        touched: false
    }
  
    login = () => {
       
        this.setState({ auth: true })

    }


    userNAmeChangedHandler = (event) => {
        event.preventDefault();
       let userName = event.target.value;
       if(userName===this.state.userName){
           this.setState({userNameISValid:true})
       }
    }

    passwordChangedHandler = (event) => {
        event.preventDefault();
        let password = event.target.value;
        if (password === this.state.password) {
            this.setState({ passwordISValid: true })
            
        }
    }


    addItem = (event) => {
        event.preventDefault();

        let data = null;
        let myJsonString = null;
        data = {
            
            "itemDesc": document.getElementById('ItemName').value,
            "itemPrice": parseInt(document.getElementById('ItemPrice').value),
            "itemImage" :'null'
            // "https://media-cdn.tripadvisor.com/media/photo-s/12/78/67/51/ensalada-de-frutas-frescas.jpg"
        }

        myJsonString = JSON.stringify(data);
        
        axios.post('http://94.127.209.194:3333/AudioGramServices/webapi/myresource/postmenu', data)
            .then(response => {
                console.log('response', response)
            })
            .catch(error => {
                console.log(error)

            });

        this.setState({ onBill: [], totalPrice: null })
        
        return document.getElementById('price').innerHTML = '00.00 JD';

        
        

    }




    render(){
        let div1=null;  
      
        if(this.state.auth){
            div1= <form onSubmit={this.addItem}>
               <div className="add-div" > 
            <div className="item-desc1">
            <p> Add Item : </p> <br></br>
             <input type="text" className="Input" id="ItemName" placeholder="Item Name .." required></input> <br/>
             <input type="text" className="Input" id="ItemPrice"  placeholder="Item price .." required></input>
             
         </div>
 
         <div className="button-add">
              
                 <button className="add-button"></button>
             </div> 
             </div>
             </form>

        } else{
            div1 = <div className="add-div" >
                <div className="item-desc1"> 
                    <p> you must login to add item </p> <br/>
                   <input type="text" className="Input" id="userName" placeholder="user name .." onChange={(event) => this.userNAmeChangedHandler(event)}></input> <br/>
                   <input type="text" className="Input" id="password" placeholder="password .." onChange={(event) => this.passwordChangedHandler(event)}></input>

                </div>
            
                <div className="button-add1">
                   
                    <AddButton 
                    Click={this.login} 
                    confirmMsg={this.confirmMsg}
                    userNameISValid={this.state.userNameISValid} 
                    passwordISValid={this.state.passwordISValid}/> 
                </div>
            </div>
        }

        
    return (
    
        <div className="menu-item">
            { div1}
       
{/*        
        <div className="item-desc">
           <input type="text" placeholder="Item Name .."></input> <br></br>
           <input type="text"  placeholder="Item price .."></input>
            
        </div>

        <div className="button-add">
                <button className="add-button"></button>
            </div> */}

    </div>

             );
     

} 
}
export default AddItem;