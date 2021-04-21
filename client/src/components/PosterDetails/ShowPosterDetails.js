import React, { Component } from "react";
import axios from "axios";
import profilePic from "../../assets/Icons/Mr.png";
import ModalApply from "../SearchPoster/ModalApply";
import { useContext } from "react";
import { appContext } from "../appContext";
import DateFnsUtils from "@date-io/date-fns";
const { format } = require("date-fns");
import moment from "moment";

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
  };

  getData() {
    const ACCESS_TOKEN = localStorage.accessToken;
    axios
      .get(`http://localhost:8080/posters?id=${this.props.id}`, {
        headers: {
          authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {

        // const mydate = this.state.response.singlePoster.end_date;
        // // console.log(parseISOString(mydate));
        // console.log(moment(mydate).format("YYYY-MM-DD"));

        this.setState({ ownerName: res.data.owner.name });
        this.setState({ categoryName: res.data.category.name });
        this.setState({ title: res.data.title });
        this.setState({ description: res.data.description });
        this.setState({ startDate: res.data.startDate });
        this.setState({ endDate: res.data.endDate });
        this.setState({ price: res.data.price });
        this.setState({ payType: res.data.payType });
      })
      .catch((error) => console.log(error));
  }
  componentDidMount() {
    this.getData();
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
            <img className="search__profilePic" src={profilePic}></img>
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
