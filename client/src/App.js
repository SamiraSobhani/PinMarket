import React, { Component } from "react";
import MapContainer from "./components/Map/MapContainer";
import NavHeader from "./components/Navbar/NavHeader";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavHeader />

        <MapContainer />
      </div>
    );
  }
}

export default App;
