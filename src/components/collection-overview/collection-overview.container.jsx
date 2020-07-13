import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect"
import { selectIsCollectionFetching } from "../../redux/shop-data/shop-data.selectors"
import { compose } from "redux"

import WithSpinner from "../../components/with-spinner/with-spinner.component"
import CollectionsOverview from "./collection-overview.component"


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching,
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps), 
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;