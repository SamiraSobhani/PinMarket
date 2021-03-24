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
const users = JSON.parse(loadUserData());
const categories = JSON.parse(loadCategoryData());

// **********************get all posters
router.get("/", (req, res) => {
  res.json({ posters, categories, users });
});

//*******************/ get poster by id and all details
router.get("/:id", (req, res) => {
  const singlePoster = posters.filter((poster) => poster.id === req.params.id);

  const categoryId = singlePoster[0].category_id;
  const filteredCategory = categories.find(
    (category) => category.id === categoryId
  );
  const categoryName = filteredCategory.name;

  const clientId = singlePoster[0].client_id;
  const filteredClient = users.find((user) => user.id === clientId);
  const clientName = filteredClient.name;

  const helperId = singlePoster[0].helper_id;
  const filteredHelper = users.find((user) => user.id === helperId);
  const helperName = filteredHelper.name;

  singlePoster.length !== 0
    ? res.json({ singlePoster, categoryName, clientName, helperName })
    : res.status(404).json(singlePoster);
});

// ********************delete poster
router.delete("/:id", (req, res) => {
  const newList = posters.filter((poster) => poster.id != req.params.id);
  fs.writeFileSync("./data/posters.json", JSON.stringify(newList));
  res.json(newList);
});

// ***********************create new poster
router.post("/", (req, res) => {
  if (req.body.title === "") {
    res.status(422).send("please enter a title.");
  } else {
    const posters = JSON.parse(loadPostersData());

    const newPoster = {
      id: posters.length + 1,
      title: req.body.newPoster.title,
      description: req.body.newPoster.description,
      price: req.body.newPoster.price,
      pay_type: req.body.newPoster.pay_type,
      start_date: req.body.newPoster.start_date,
      end_date: req.body.newPoster.end_date,
      latitude: req.body.newPoster.lat,
      longitude: req.body.newPoster.lng,
      category_id: req.body.newPoster.category_id,
      client_id: req.body.newPoster.client_id,
      helper_id: req.body.newPoster.helper_id,
    };
    console.log(req);
    posters.push(newPoster);
    fs.writeFileSync("./data/posters.json", JSON.stringify(posters));

    res.json({
      message: "posted to posters endpoint",
    });
  }
});

module.exports = router;
