import ShopActionsTypes from "./shop-data.types"

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
};


const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionsTypes.FETCH_COLLECTION_START:
            return {
                ...state, 
                isFetching: true,
            }
        case ShopActionsTypes.FETCH_COLLECTION_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                collections: action.payload
            }
        case ShopActionsTypes.FETCH_COLLECTION_FAILURE:
            return {
                ...state, 
                isFetching: false,
                errorMessage: action.payload
            }
        default: 
            return state;
    }
}
export default shopReducer;