import {ADD_TO_CART, REMOVE_FROM_CART} from "./types";


export const addToCart = (items, product) => (dispatch) => {
const cartItems = items.slice();
/*console.log('addToCart')
console.log(items);
console.log(product.id);
console.log(cartItems);*/
 
  
           let productiAlreadyInCart = false;
        cartItems.forEach (item => {


          if (item.id === product.id){
            productiAlreadyInCart = true;
            
          }

        
      });
     
      if (!productiAlreadyInCart){
        cartItems.push({...product, count:1});
        }
        /*
        localStorage.setItem('cartItem', JSON.stringify(cartItems));
        */
        return dispatch({type: ADD_TO_CART,
        
            payload: {
                    cartItems: cartItems
            }
            
        })
      
    
}

export const removeFromCart = (items, product) => (dispatch) => {
  const cartItems = items.slice();
  for (var i =0; i < items.length; i++)
  if (items[i].id === product.id) {
     cartItems.splice(i,1);
     break;
  }
    /* console.log('removeFromCart')
     console.log(item);
     console.log(product.id);
     console.log(cartItems);*/
     /*
        localStorage.setItem ('cartItem', JSON.stringify(cartItems));
       */
      
        return dispatch ({
            type:REMOVE_FROM_CART, payload:{

            cartItems
        }
      })
        
        
} 

