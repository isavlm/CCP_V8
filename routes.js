import baseCtrl from "../controllers/baseCtrl";
import insertionCtrl from "../controllers/insertionCtrl";
import searchCtrl from "../controllers/searchCtrl";
import updateCtrl from "../controllers/updateCtrl";
import deleteCtrl from "../controllers/deleteCtrl";

const routes = (router) => {
  //All GET or request to READ
  router.route("/basePage").get(baseCtrl.basePage);
  router
    .route("/products") // goes to getAllProducts
    .get(searchCtrl.getAllProducts);
  //Search request (also a GET)
  router
    .route("/search/name/:searchQuery") // goes to search ByName
    .get(searchCtrl.searchByName);
  router
    .route("/search/id/:searchQuery") // goes to search ById
    .get(searchCtrl.searchById);
  router
    .route("/search/brand/:searchQuery") // goes to search ByBrand
    .get(searchCtrl.searchByBrand);
  router
    .route("/search/category/:searchQuery") // goes to search ByCategory
    .get(searchCtrl.searchByCategory);
  router
    .route("/products") // goes to getAllProducts
    .get(searchCtrl.getAllProducts);

  // ALL POST or request to Insert/Create
  router
    .route("/") // goes to the create page for product creation
    .post(insertionCtrl.insertValue);

  // ALL PUT or request to update a product
  router
    .route("/update/:productId") // goes to the create page for product creation
    .put(updateCtrl.updateProduct);

  //ALL DELETE or requeste to remove something from the DB

  router
    .route("/delete/:productId") // goes to the create page for product creation
    .delete(deleteCtrl.deleteProduct);
};

export default routes;
