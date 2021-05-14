import Geocode from "react-geocode";
import React, { Component } from "react";

export default class MyAddress extends Component {
  state = {
    address: "",
  };
  MyGeocode = () => {
    Geocode.setApiKey("AIzaSyBRUYC8MMdlwDjIzBVvo7U5oHa3h2tQ09k");
    Geocode.enableDebug();

    Geocode.fromLatLng(this.props.lat, this.props.lng).then(
      (response) => {
        console.log(response);
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        console.log(city, state, country);
        console.log(address);
        return this.setState({ address: address });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  render() {
      this.MyGeocode();
    return (
      <div className="search__div">
        <h3 className="search__lable">Address: </h3>
        <span>{this.state.address}</span>
      </div>
    );
  }
}
