import React,{Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sing-up.component';
import CheckoutPage from "./pages/checkout/checkout.component"
import Header from './components/header/header.component';

import { auth, createUserProfileDocument, /*addCollectionAndDocuments*/} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";
// import { selectCollectionForPreview} from "./redux/shop-data/shop-data.selectors"

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser, /*collectionsArray*/} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot =>{
          // console.log(Object.keys(snapShot))
          setCurrentUser({
            id:snapShot.id,
            ...snapShot.data() 
          });
        });   
      }
      setCurrentUser(userAuth)
      // addCollectionAndDocuments(`collections`, collectionsArray.map(({title, items }) => ({title, items})));
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path = "/" component={HomePage}/>
          <Route path = "/shop" component={ShopPage}/>
          <Route exact path = "/checkout" component={CheckoutPage}/>
          <Route 
            exact path = "/signin" 
            render={()=> 
              this.props.currentUser ? (
              <Redirect to='/'/> 
            ) : (
              <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionForPreview
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
