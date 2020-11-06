import React, { Component } from 'react'
import { connect } from 'react-redux';
import {removeFromCart} from '../actions/cartActions';
import {addToCart} from '../actions/cartActions';
import ContactForm from './Contactform';
import {formBasket} from '../actions/cartActions';
import {ListGroup, Button} from 'react-bootstrap';

class Basket extends Component {
    render() {
        
        const {cartItems} = this.props;
        console.log('Basket render cartItems = this.props')
        console.log(cartItems)

    return (
        <div className ="alert alert-info" id= "stickyBasket">
             {cartItems.length===0? "Inga tillagda produkter": <div id ="productsQty">Antal artiklar: {cartItems.length} </div> } 
             {cartItems.length > 0 &&
                <div>
                    
                        <ListGroup as ="ul" > 
                            {cartItems.map(item =>
                                
                                <ListGroup.Item className="d-flex justify-content-between" id = "basketList">
                                   <img src={`/products/${item.sku}.png`} alt={item.title} width="40" height="40" />
                                    <b >{item.title} 
                                    <br/>
                                    {item.pris}kr</b> 
                                
                                    <Button variant="danger" id="btn-basket-pos"
                                    onClick={() =>this.props.removeFromCart(this.props.cartItems, item)}
                                    >Ta bort</Button>
                                    
                               </ListGroup.Item>  )}
                            
                        </ListGroup>            
                 
                        <b> Total Summa: {cartItems.reduce((a, c) => a + c.pris*c.count, 0)} kr </b>        
                    <br/>
                      Vänligen fyll i formuläret och skicka för önskat köp <br/>
                      <ContactForm/>
                 
                                
                                

                </div> 
             }        

                  
        </div>
        
            
            
    )



    }   
    
}


const mapStateToProps = state =>({
    cartItems: state.cart.items
    
})

export default connect (mapStateToProps, {addToCart, removeFromCart, formBasket})(Basket);
