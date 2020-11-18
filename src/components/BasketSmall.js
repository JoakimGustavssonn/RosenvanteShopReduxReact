import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ListGroup, Button } from 'react-bootstrap'





class BasketSmall extends Component {

     
    render() {
      const {cartItems} = this.props;
    
      return (
          
          <div >
          {cartItems.length===0? "Inga tillagda produkter": <div id ="productsQty"> Antal artiklar: {cartItems.length} </div> } 
          
          {cartItems.length > 1 &&
             <div>
                 
                     <ListGroup as ="ul" > 
                         {cartItems.map(item =>
                             
                             <ListGroup.Item className="d-flex justify-content-between" id = "basketList">
                                <img src={`/products/${item.sku}.png`} alt={item.title} width="40" height="40" />
                                 <b >{item.title} 
                                 <br/>
                                 {item.pris}kr</b> 
                             
                                 <Button variant="danger btn-sm" id="btn-basket-pos" onClick={() =>this.props.removeFromCart(this.props.cartItems, item)}
                                 >X</Button>
                                 
                            </ListGroup.Item>  )}
                         
                     </ListGroup>            
              
                     <b> Total Summa: {cartItems.reduce((a, c) => a + c.pris*c.count, 0)} kr </b>        
                 <br/>
                 <br/>
                              
                             
                             

             </div> 
          }        

               
     </div>
                     
               
        )
    }
}

const mapStateToProps = state =>({
    cartItems: state.cart.items,
    
    })

export default connect  (mapStateToProps)(BasketSmall);