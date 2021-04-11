import React, { Component } from "react";
import axios from "axios";
import profilePic from "../../assets/Icons/Mr.png";
import ModalApply from "./ModalApply";
import { useContext } from "react";
import { appContext } from "./../appContext";
import DateFnsUtils from "@date-io/date-fns";
const { format } = require("date-fns");
import moment from "moment";
export default class ShowPosterDetails extends Component {
  state = {
    response: {
      singlePoster: [],
      categoryName: "",
      clientName: "",
    },
  };

  getData() {
    axios
      .get(`http://localhost:8080/posters/${this.props.id}`)
      .then((res) => {
        this.setState({ response: res.data });
        const mydate = this.state.response.singlePoster[0].end_date;
        // console.log(parseISOString(mydate));
        console.log(moment(mydate).format("YYYY-MM-DD"));
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
    const posterobj = this.state.response.singlePoster[0];
    return (
      <div className="search">
        <section className="search__result">
          <div className="search__boxheader">
            <h2 className="search__name">
              Name: {this.state.response.clientName}
            </h2>
            <img className="search__profilePic" src={profilePic}></img>
          </div>
          <div className="search__div">
            <h3 className="search__lable">Category: </h3>
            <span>{this.state.response.categoryName}</span>
          </div>
          <div className="search__div">
            <h3 className="search__lable">Title: </h3>
            <span>{posterobj && posterobj.title}</span>
          </div>
          <div className="search__div">
            <h3 className="search__lable">Description: </h3>
            <span> {posterobj && posterobj.description}</span>
          </div>
          <div className="search__div">
            <h3 className="search__lable">Start Date: </h3>
            <span>
              {" "}
              {posterobj && moment(posterobj.start_date).format("YYYY-MM-DD")}
            </span>
          </div>
          <div className="search__div">
            <h3 className="search__lable">End Date: </h3>
            <span>
              {" "}
              {posterobj && moment (posterobj.end_date).format("YYYY-MM-DD")}
            </span>
          </div>
          <div className="search__div">
            <h3 className="search__lable">Price: $ </h3>
            <span className="search__priceTag">
              {posterobj && posterobj.price} {posterobj && posterobj.pay_type}
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
