import { FETCH_PRODUCTS } from "./types";


export const fetchProducts = () => (dispatch) => {
    fetch('/.netlify/functions/server/api/products').then((response) => response.json())
    .then(data => {
        
        return dispatch ({ type:FETCH_PRODUCTS, payload: data });
    });
        
    
} 
