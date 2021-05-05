import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppHeader from "./components/Navbar/AppHeader";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./components/Auth/Profile";
import OAuth2RedirectHandler from "./components/Auth/OAuth2RedirectHandler";
import NotFound from "./components/common/NotFound";
import LoadingIndicator from "./components/common/LoadingIndicator";
import { getCurrentUser } from "./components/Auth/APIUtils";
import PrivateRoute from "./components/common/PrivateRoute";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./styles/pagesStyle/App/main.css";
import UserPage from "./UserPage";
import Search from "./Search";
import Home from "./Home";
import { ACCESS_TOKEN } from "./components/constants";
import Details from "./Details";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: {},
      loading: false,
      userName: "",
      userImage: "",
    };
  }

  loadCurrentlyLoggedInUser = () => {
    this.setState({
      loading: true,
    });

    getCurrentUser()
      .then((response) => {
        console.log(response);
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false,
          userName: response.name,
          userImage: response.imageUrl,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  };

  handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.replace("/login");
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    Alert.success("You're safely logged out!");
  };

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader
            authenticated={this.state.authenticated}
            onLogout={this.handleLogout}
            currentUserName={this.state.userName}
            currentUserImage={this.state.userImage}
          />
        </div>
        <div className="app-body">
          <Switch>
            <Route path="/posters" component={UserPage} exact />
            <Route path="/posters/search" component={Search} />
            <Route path="/posters/details/:id" component={Details} />
            <Route path="/posters/details" component={Details} />
            <Route path="/posters/userpage" component={Home} />
            <Route exact path="/" component={Signup}></Route>
            <PrivateRoute
              path="/profile"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Profile}
            ></PrivateRoute>
            <Route
              path="/login"
              render={(props) => (
                <Login authenticated={this.state.authenticated} {...props} />
              )}
            ></Route>
            <Route
              path="/signup"
              render={(props) => (
                <Signup authenticated={this.state.authenticated} {...props} />
              )}
            ></Route>
            <Route
              path="/oauth2/redirect"
              component={OAuth2RedirectHandler}
            ></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert
          stack={{ limit: 3 }}
          timeout={3000}
          position="top-right"
          effect="slide"
          offset={65}
        />
      </div>
    );
  }
}

export default App;
