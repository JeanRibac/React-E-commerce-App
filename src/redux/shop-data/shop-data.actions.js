import ShopActionsTypes from "./shop-data.types"

export const updateCollections = collectionsMap => ({
    type: ShopActionsTypes.UPDATE_COLLECTION,
    payload: collectionsMap
})