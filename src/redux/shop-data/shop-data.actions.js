import ShopActionsTypes from "./shop-data.types"
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type: ShopActionsTypes.FETCH_COLLECTION_START
})

export const fetchCollectionsSuccess = collectiosnMap => ({
    type: ShopActionsTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectiosnMap
})

export const fetchCollectionsFailure = errorMessage =>({
    type: ShopActionsTypes.FETCH_COLLECTION_FAILURE,
    payload : errorMessage
})

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart())
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(err => dispatch(fetchCollectionsFailure(err.message)) )
    }
}
