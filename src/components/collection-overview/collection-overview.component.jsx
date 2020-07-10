import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectCollectionForPreview} from "../../redux/shop-data/shop-data.selectors"
import CollectionPreview from "../../components/collection-preview/collection-preview.component"
import "./collection-overview.styles.scss"

const CollectionsOverview = ({ collections }) =>{

    return(
        <div className="collection-overview">
            { collections.map(({id, ...otherCollectionsProps}) => <CollectionPreview key={id} {...otherCollectionsProps} />) }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})
export default connect(mapStateToProps)(CollectionsOverview);