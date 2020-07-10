import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";

import {updateCollections} from "../../redux/shop-data/shop-data.actions"; 
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import WithSpinner from "../../components/with-spinner/with-spinner.component"

import CollectionsOverview from "../../components/collection-overview/collection-overview.component"
import CollectionPage from "../collection/collection.component"


const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends Component{
    state ={
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            console.log(collectionsMap);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        })
    }

    render(){   
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route exact path ={`${match.path}`} render={props => <CollectionOverviewWithSpinner isLoading={loading} {...props}/> }/>
                <Route path ={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={loading} {...props}/> }/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    updateCollections: collection => dispatch(updateCollections(collection))
})

export default connect(null, mapDispatchToProps)(ShopPage);