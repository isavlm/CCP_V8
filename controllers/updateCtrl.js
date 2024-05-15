import dbConnection from "../config/database";
const itemSchema = require("../schema/itemSchema");
const ItemModel = dbConnection.model("item", itemSchema);

export default {
/**
   * Updating a product.
   * @param  req
   * @param  res
**/
    updateProduct: (req, res) => {
        const { name, category, brandname, images } = req.body;
        ItemModel.findByIdAndUpdate(
        req.params.productId,
        { name, category, brandname, images },
        { new: true }
        )
        .then((result) => {
            if (result) {
            res
                .status(200)
                .json({ message: "Product updated successfully!", result });
            } else {
            res.status(404).json({ message: "Product not found!" });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
    },
};
