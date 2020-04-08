import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sing-up.component';
import Header from './components/header/header.component'
import {auth} from './firebase/firebase.utils';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {curentUser: null}
  }
  
  UnsubscribeFromAuth = null;
  componentDidMount(){
    this.UnsubscribeFromAuth = auth.onAuthStateChanged(user=>{
      this.setState({curentUser: user});
      console.log(user);
    })
  }

  componentWillUnmount(){
    this.UnsubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <Header currentUser={this.state.curentUser}/>
        <Switch>
          <Route exact path = "/" component={HomePage}/>
          <Route path = "/shop" component={ShopPage}/>
          <Route path = "/signin" component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
