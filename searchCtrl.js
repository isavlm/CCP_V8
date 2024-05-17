import dbConnection from "../config/database";
const itemSchema = require("../schema/itemSchema");
const ItemModel = dbConnection.model("item", itemSchema);

export default {
  /**
   * Searches for data by item name.
   * @param  req
   * @param  res
   */
  searchByName: (req, res) => {
    ItemModel.find({ name: req.params.searchQuery })
      .then((result) => {
        if (!result.length) {
          res.status(200).json({ message: "No results found!" });
        } else {
          res.status(200).json({ result });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  // Following the same example from Santiago's searchCtrl.js file.
  searchById: (req, res) => {
    ItemModel.find({ _id: req.params.searchQuery })
      .then((result) => {
        if (!result.length) {
          res.status(200).json({ message: "No results found!" });
        } else {
          res.status(200).json({ result });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  getAllProducts: (req, res) => {
    ItemModel.find()
      .then((result) => {
        if (!result.length) {
          res.status(200).json({ message: "No products found!" });
        } else {
          res.status(200).json({ products: result });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  searchByCategory: (req, res) => {
    ItemModel.find({ category: req.params.searchQuery })
      .then((result) => {
        if (!result.length) {
          res.status(200).json({ message: "No results found!" });
        } else {
          res.status(200).json({ result });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  searchByBrand: (req, res) => {
    ItemModel.find({ brandname: req.params.searchQuery })
      .then((result) => {
        if (!result.length) {
          res.status(200).json({ message: "No results found!" });
        } else {
          res.status(200).json({ result });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
