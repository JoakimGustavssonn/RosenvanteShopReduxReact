import React, { Component } from 'react'
import util from '../util';
import { connect } from 'react-redux';
import {fetchProducts} from '../actions/productActions';
import {addToCart} from '../actions/cartActions';
import {Container, Row, Col, Button, Card} from 'react-bootstrap'

 class Products extends Component {
    componentDidMount(){
        this.props.fetchProducts()
        
    }

    componentdidReceiveProps(nextState){
        console.log(nextState);

    }

    
    render() {
       
        
        const productItems = this.props.products.map( product => (
            
                <Col className="pb-4 " md={4} sm={4} xs={6} key={product.id} >
                
                <Card  id="screentest" className="text-center h-100 d-inline-block border border-info" class="card">
                <Card.Img variant="top" href={`#${product.id}`} src={`/products/${product.sku}.png`} alt={product.title} />
                <Card.Body className="p-0"  > 
                    <Card.Title>{product.title} <br/></Card.Title>
                    <Card.Text>
                    {product.beskrivning}
                    <Card.Text >{util.formatCurrency (product.pris)}</Card.Text>
                    </Card.Text>
                    
                    <Button variant="primary btn-sm mb-2" onClick={() =>this.props.addToCart(this.props.cartItems, product)}> Köp </Button>
                    
                </Card.Body>

                </Card>        
                
                </Col>
                     
        )
            
        )
        

        return (
            <Row >
                {productItems}
                
            </Row>
            
        )
        
        
    }
}
const mapStateToProps = state => ({
    products: state.products.items,
    cartItems: state.cart.items
    


});


export default connect (mapStateToProps, {fetchProducts, addToCart})(Products);

