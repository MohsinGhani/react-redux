import axios from 'axios';

import { GET_ITEM, ITEM_LOADING, GET_ERRORS } from './types';
// /api/category/categoryname/Email/item/Tutanota
// Get item by name
export const getItemByName = (categoryname, items_itemname) => dispatch => {
  dispatch(setItemLoading());
  axios
    .get(`/api/category/categoryname/${categoryname}/items_itemname/${items_itemname}`)
    .then(res =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ITEM,
        payload: null
      })
    );
};

// Item Loading
export const setItemLoading = () => {
  return {
    type: ITEM_LOADING
  };
};
