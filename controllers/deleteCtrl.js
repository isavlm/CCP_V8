import dbConnection from '../config/database'
const itemSchema = require('../schema/itemSchema')
const ItemModel = dbConnection.model('item', itemSchema)

export default {
/**
   * Deleting a product.
   * @param  req
   * @param  res
**/

    deleteProduct: (req, res) => {
        ItemModel.findOneAndDelete({ _id: req.params.productId})
        .then(result => {
            if (result) {
                res.status(200).json({ message: 'Product deleted successfully!', result});
            } else {
                res.status(404).json({ message: 'Product not found!'});
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    }

};