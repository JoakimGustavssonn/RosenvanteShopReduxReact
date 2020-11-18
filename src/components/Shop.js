import React, {Component} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './Products';
import Basket from './Basket';
import {Provider} from 'react-redux';
import store from '../store';


import {Container, Row, Col} from 'react-bootstrap';
import BasketSmall from './BasketSmall';



class Shop extends Component{


  render () {

    
    
    return (
      
      <Provider store={store}> 
      
      <Container>
        
          <div id ="stickyHeader" >
          <h1 > Rosenvante Butik</h1>
          <hr/>
          
          </div>

         
      

        <Row >
          <Col className="pb-4" md={8} sm={12} xs={12}>     
              <Products />

          </Col>
          
          

          <Col sm={4} md={4} xs={4}>
              <Basket />
          </Col> 

        </Row> 

                      
        </Container>
        

        </Provider>

    );
    
  }
}


export default Shop;
