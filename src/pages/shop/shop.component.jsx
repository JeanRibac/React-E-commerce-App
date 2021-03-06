import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";

import { fetchCollectionStartAsync } from "../../redux/shop-data/shop-data.actions"; 

import CollectionsOverviewContainer from "../../components/collection-overview/collection-overview.container"
import CollectionsPageContainer from "../collection/collection.container"

class ShopPage extends Component{
    componentDidMount(){
        const { fetchCollectionStartAsync } = this.props;
        fetchCollectionStartAsync();
    }

    render(){   
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route 
                    exact path ={`${match.path}`} 
                    component={CollectionsOverviewContainer}
                />
                <Route 
                    path ={`${match.path}/:collectionId`} 
                    component={CollectionsPageContainer}
                />
            </div>
        )
    }
}
const mapDispatchToProps = dispatch =>({
    fetchCollectionStartAsync : () => dispatch(fetchCollectionStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);