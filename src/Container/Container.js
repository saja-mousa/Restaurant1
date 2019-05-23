import React, { Component } from 'react';
import '../App.css';
import Menu from '../components/Menu/Menu'
import Bill from '../components/Bill/Bill'
import AddItem from '../components/AddItem/AddItem'
import axios from 'axios';
import {Route,NavLink} from 'react-router-dom';
import Popup from "reactjs-popup";


class App extends Component {

    state = {
        menu: [],
        onBill: [],
        total: [],
        String: [],
        totalPrice: null,
        date:new Date(),
        postDataBtn:null,
        open: false
    }


    componentDidMount() {
        axios.get('http://94.127.209.194:3333/AudioGramServices/webapi/myresource/menu')
            .then(response => {
                const items = response.data
                const updateItem = items.map(item => {
                    return { ...item }
                });
                this.setState({ menu: updateItem })

            })

    }

    openModal() {
        this.setState({ open: true })
    }

    closeModal() {
        this.setState({ open: false })
    }


    handleCheck = (indexToDeleted) => {
        let totalPrice1 = 0;
        const currentData = [...this.state.menu];
        ////////// delet selected item////////
        const addedObject = currentData.splice(indexToDeleted, 1);
        //////////onBill array//////
        this.state.onBill.push(addedObject)
        ///////total price/////////
        this.state.total.push(addedObject[0].itemPrice)
        //console.log('[app.js] total:', this.state.total)

        this.setState({ menu: currentData })
       // console.log('[app.js] onbill:', this.state.onBill)

        ///////// added price and sumation the total price
        this.state.total.map(price => {

            totalPrice1 = totalPrice1 + price;
            this.setState({ totalPrice: totalPrice1 })
            //console.log('this.state.totalPrice', this.state.totalPrice)
        })
        return document.getElementById('price').innerHTML = totalPrice1 + '.00 JD';

    }


    removeItem = (indexToDeleted) => {
        let totalPrice1 = this.state.totalPrice
        const currentBill = [...this.state.onBill];
        ////////// add the removed item from bill to menu////////
        const addedObject = currentBill.splice(indexToDeleted, 1);
        this.state.menu.push(addedObject[0][0])

        totalPrice1 = totalPrice1 - addedObject[0][0].itemPrice;
        this.setState({ totalPrice: totalPrice1 })
        this.setState({ onBill: currentBill, total: [] })
        return document.getElementById('price').innerHTML = totalPrice1 + '.00 JD';

    }

  postData = () => {
      let data = null;
      let myJsonString = null

     // console.log('[app.js] onbill', this.state.onBill)
      this.state.onBill.map((item, index) => {
         // console.log('[app.js] item', item)

          data = {
              orderUserName: "saja",
              orderItemId: item[0].itemId,
              orderPrice: item[0].itemPrice
          }
          this.state.String.push(data)
          //console.log('String',String)
          myJsonString = JSON.stringify(data);
      })
      // console.log('data',data)
      console.log('myJsonString', myJsonString)


      axios.post('http://94.127.209.194:3333/AudioGramServices/webapi/myresource/post', myJsonString)
          .then(response => {
              console.log('response', response)
          })
          .catch(error => {
              console.log(error)

          });

      this.setState({ onBill: [], totalPrice: null })
      return document.getElementById('price').innerHTML = '00.00 JD';
  }



  render() {

     
      
  return (
    <div className="container">
         <div className='menu-container1'>

            <div className='header-container'>
                <div className='menu'>
                 <div  className="rest">Resturant</div>
                      
                </div>
                <div className='header'>
                  <p>  Order food online </p>
                </div>
            </div>
        </div>

         <div className='menu-container'>
          {/*--------- menu ---------*/}
             <div className='list-grid-item '>
                 <div className="menu-title">
                   <div className="title1"> Menu</div>
                      <div className="Add-Item1" >
                          <button className="post-button"  >
                              <NavLink onClick={this.openModal.bind(this)} to="/AddItem/" exact
                                  > Add Item </NavLink>
                          </button>
                          <Popup
                              open={this.state.open}
                              closeOnDocumentClick
                              onClose={this.closeModal.bind(this)}>
                              <div className="modal">
                                  <button className="close" onClick={this.closeModal.bind(this)}>&times;</button>

                                  You must login to add item.<br />
                                  hint:<br />
                                  User name: saja.banihani<br />
                                  Password : 12345
                               </div>
                          </Popup>
                      </div>

                </div>
                 <div>
                    <div className="menu-item">
                     <Route path="/AddItem" component={AddItem} />

                      <Menu
                        menu={this.state.menu}
                        handleCheck={this.handleCheck}
                        defaultChecked={this.state.checked} />
                    </div>
                </div>


            </div>
            {/*--------- bill ----------*/}
            <div className='list-grid-item'>
                  <div className="Bill-title">
                     <div className="title1"> Bill</div>
                      
                      <div className="price" >

                          <button className="post-button" onClick={this.postData}>post Data</button>
                      </div>

                </div>
                <div>
                      <div className="menu-item">
                          <Bill key={this.state.menu.itemId}
                              total={this.state.total}
                              onBill={this.state.onBill}
                              removeItem={this.removeItem} />
                      </div>
                  </div>

                  <div className="Bill-title">
                      <div className="total-price"> Total Price</div>
                      <div className="price" id="price"> 00.00 JD </div>

                  </div>

             </div>
       </div>

      
          <div className='footer'>
              <div className='footer-item footer-one'>
                  <div className="who-we-are">
                      <h3> Who We Are ?</h3>
                      <p> - We are an online food ordering service</p>
                  </div>
                  <div className="who-we-are">
                      <h3> Contact Us  </h3>
                      <p>- sajabanihani29@gmail.com </p>
                      <p> 0791583290</p>
                  </div>
              </div>
              <div>
              </div>

              
          </div>


      </div>
  );
}
}

export default App;


