import { FETCH_PRODUCTS, FETCH_ONE, NEW_PRODUCT, UPDATE_PRODUCT, FETCH_CATEGORY } from '../actions/types'

const initialState = {
  products: [],
  product: {}
};

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    case FETCH_CATEGORY:
      return {
        ...state,
        products: action.payload
      };
    case FETCH_ONE:
      return {
        state,
        product: action.payload
      };
    case NEW_PRODUCT:
      return {
        state,
        product: action.payload
      };
    case UPDATE_PRODUCT:
      return {
        state,
        product: action.payload
      }
    default:
      return state;
  }
}
