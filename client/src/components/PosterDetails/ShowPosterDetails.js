import React, { Component } from "react";
import axios from "axios";
import profilePic from "../../assets/Icons/profile6.png";
import ModalApply from "./ModalApply";

const { format } = require("date-fns");

export default class ShowPosterDetails extends Component {
  state = {
    categoryName: "",
    ownerName: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    price: "",
    payType: "",
    ownerImgUrl: profilePic,
    lat: null,
    lng: null,
  };

  getData() {
    const ACCESS_TOKEN = sessionStorage.accessToken;
    axios
      .get(`http://localhost:8080/poster?id=${this.props.id}`, {
        headers: {
          authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ ownerName: res.data.owner.name });
        this.setState({ categoryName: res.data.category.name });
        this.setState({ title: res.data.title });
        this.setState({ description: res.data.description });
        this.setState({ startDate: res.data.startDate });
        this.setState({ endDate: res.data.endDate });
        this.setState({ price: res.data.price });
        this.setState({ payType: res.data.payType });
        this.setState({ lat: res.data.lat });
        this.setState({ lng: res.data.lng });
        console.log(this.state.lat);
        if (res.data.owner.imageUrl !== null) {
          this.setState({ ownerImgUrl: res.data.owner.imageUrl });
        }
      })
      .catch((error) => console.log(error));
  }
  convertLatLng = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      )
      .then((res) => {
        console.log(this.state.lat);
        console.log(res);
      })
      .catch((error) => console.log(error));
  };
  componentDidMount() {
    this.getData();
    this.convertLatLng();
  }
  applyButton() {
    window.alert("sometext");
  }
  render() {
    return (
      <div className="search">
        <section className="search__result">
          <div className="search__boxheader">
            <h2 className="search__name">Name: {this.state.ownerName}</h2>
            <img
              className="search__profilePic"
              src={this.state.ownerImgUrl}
            ></img>
          </div>
          <div className="search__div">
            <h3 className="search__lable">Category: </h3>
            <span>{this.state.categoryName}</span>
          </div>
          <div className="search__div">
            <h3 className="search__lable">Title: </h3>
            <span>{this.state.title}</span>
          </div>
          <div className="search__div">
            <h3 className="search__lable">Description: </h3>
            <span> {this.state.description}</span>
          </div>
          <div className="search__div">
            <h3 className="search__lable">Start Date: </h3>
            <span> {this.state.startDate}</span>
          </div>
          <div className="search__div">
            <h3 className="search__lable">End Date: </h3>
            <span> {this.state.endDate}</span>
          </div>
          <div className="search__div">
            <h3 className="search__lable">Price: $ </h3>
            <span className="search__priceTag">
              {this.state.price} {this.state.payType}
            </span>
          </div>
        </section>
        <section className="search__button">
          <ModalApply />
        </section>
      </div>
    );
  }
}
