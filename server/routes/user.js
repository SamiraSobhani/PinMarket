const express = require("express");
const router = express.Router();
const fs = require("fs");

function loadPostersData() {
    return fs.readFileSync("./data/posters.json", "utf8");
  }
  
  function loadCategoryData() {
    return fs.readFileSync("./data/category.json", "utf8");
  }
  
  function loadUserData() {
    return fs.readFileSync("./data/user.json", "utf8");
  }
  
  const posters = JSON.parse(loadPostersData());
  const user = JSON.parse(loadUserData());
  const category = JSON.parse(loadCategoryData());

  