/* eslint-disable no-unused-expressions */

/* eslint-disable */
import server from "../index";
/* eslint-enable */

const rp = require("request-promise");
const chai = require("chai");
const expect = chai.expect;
require("dotenv").config();

const testURL = `http://${process.env.HOST}:${process.env.PORT}`;
//Function to generate an unique TestProduct- name.
const randomProductName = `TestProduct-${Date.now()}-${Math.floor(
  Math.random() * 10000
)}`;
console.log(randomProductName);

describe("TESTING MODULES", () => {
  describe("1. Base Route", () => {
    it("Expects a HTML page in return", (done) => {
      const options = {
        method: "GET",
        url: testURL + "/basePage",
        resolveWithFullResponse: true,
      };
      rp(options)
        .then((response) => {
          console.log("Base Page Response:", response.body); // Log the response body
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.a("string");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("Expects a product is added", (done) => {
      const productData = {
        name: randomProductName,
        category: "Books",
        brandname: "TestBrand",
        images:
          "https://yatra8exe7uvportalprd.blob.core.windows.net/images/products/HighStDonated/Zoom/HD_101504752_01.jpg?v=1",
      };
      const options = {
        method: "POST",
        url: testURL + "/",
        json: productData,
        resolveWithFullResponse: true,
      };
      let productId;
      rp(options)
        .then((response) => {
          console.log("Add Product Response:", response.body); // Log the response body
          expect(response.statusCode).to.equal(200);
          expect(response.body.result.name).to.be.equal(productData.name);
          expect(response.body.result.category).to.be.equal(
            productData.category
          );
          productId = response.body.result._id;
          return productId;
        })
        .then((id) => {
          const searchByIdOption = {
            method: "GET",
            url: testURL + "/search/id/" + id,
            resolveWithFullResponse: true,
            json: true,
          };
          rp(searchByIdOption)
            .then((response) => {
              console.log("Search by ID Response:", response.body); // Log the response body
              expect(response.statusCode).to.equal(200);
              expect(response.body.result[0].name).to.be.equal(
                productData.name
              );
              expect(response.body.result[0].category).to.be.equal(
                productData.category
              );
              done();
            })
            .catch((err) => {
              done(err);
            });
        })
        .catch((err) => {
          done(err);
        });
    }).timeout(10000); // Updated timeout value to see if 10s would work better.

    // OTHER SEARCHES
    describe("2. Search Operations", () => {
      let productId; //SEARCH
      before(async () => {
        const productData = {
          name: randomProductName + "ToSearch",
          category: "Books",
          brandname: "TestBrand",
          images:
            "https://yatra8exe7uvportalprd.blob.core.windows.net/images/products/HighStDonated/Zoom/HD_101504752_01.jpg?v=1",
        };
        const options = {
          method: "POST",
          url: testURL + "/",
          json: productData,
          resolveWithFullResponse: true,
        };
        const response = await rp(options);
        productId = response.body.result._id;
      });

      it("Expects a product is found by name", (done) => {
        //SEARCH BY NAME
        const options = {
          method: "GET",
          url: testURL + "/search/name/" + randomProductName + "ToSearch",
          resolveWithFullResponse: true,
          json: true,
        };
        rp(options)
          .then((response) => {
            console.log("Search by Name Response:", response.body); // Log the response body
            expect(response.statusCode).to.equal(200);
            expect(response.body.result[0].name).to.be.equal(
              randomProductName + "ToSearch"
            );
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
      //SEARCH BY ID
      it("Expects a product is found by id", (done) => {
        const options = {
          method: "GET",
          url: testURL + "/search/id/" + productId,
          resolveWithFullResponse: true,
          json: true,
        };
        rp(options)
          .then((response) => {
            console.log("Search by Id Response:", response.body); // Log the response body
            expect(response.statusCode).to.equal(200);
            expect(response.body.result[0]._id).to.be.equal(productId);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
      //SEARCH BY CATEGORY
      it("Expects a product is found by Category", (done) => {
        const options = {
          method: "GET",
          url: testURL + "/search/category/Books",
          resolveWithFullResponse: true,
          json: true,
        };
        rp(options)
          .then((response) => {
            console.log("Search by Category Response:", response.body); // Log the response body
            expect(response.statusCode).to.equal(200);
            expect(response.body.result[0].category).to.be.equal("Books");
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
      //SEARCH BY BRAND
      it("Expects a product is found by Brand", (done) => {
        const options = {
          method: "GET",
          url: testURL + "/search/brand/TestBrand",
          resolveWithFullResponse: true,
          json: true,
        };
        rp(options)
          .then((response) => {
            console.log("Search by Brand Response:", response.body); // Log the response body
            expect(response.statusCode).to.equal(200);
            expect(response.body.result[0].brandname).to.be.equal("TestBrand");
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
      //GETTING ALL PRODUCTS
      it("Expects all products", (done) => {
        const options = {
          method: "GET",
          url: testURL + "/products",
          resolveWithFullResponse: true,
          json: true,
        };
        rp(options)
          .then((response) => {
            console.log("Request for ALL products Response:", response.body); // Log the response body
            expect(response.statusCode).to.equal(200);
            // I think the db save the products as an array, no?
            expect(response.body.products).to.be.an("array");
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });

  describe("3. Update and Delete Operations", () => {
    let productIdToUpdate; //UPDATE
    before(async () => {
      const productData = {
        name: randomProductName + "ToUpdate",
        category: "Books",
        brandname: "TestBrand",
        images:
          "https://yatra8exe7uvportalprd.blob.core.windows.net/images/products/HighStDonated/Zoom/HD_101504752_01.jpg?v=1",
      };
      const options = {
        method: "POST",
        url: testURL + "/",
        json: productData,
        resolveWithFullResponse: true,
      };
      const response = await rp(options);
      productIdToUpdate = response.body.result._id;
    });

    it("Expects a product is updated", (done) => {
      const updatedProductData = {
        name: "Updated" + randomProductName,
        category: "UpdatedBooks",
        brandname: "UpdatedSchollastic",
        images: "https://updated-image-url.jpg",
      };
      const options = {
        method: "PUT",
        url: testURL + "/update/" + productIdToUpdate,
        json: updatedProductData,
        resolveWithFullResponse: true,
      };
      rp(options)
        .then((response) => {
          console.log("Update Product Response:", response.body); // Log the response body
          expect(response.statusCode).to.equal(200);
          // test message and API message need to match!!
          expect(response.body.message).to.be.equal(
            "Product updated successfully!"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("Expects a product is deleted", (done) => {
      //DELETE
      const options = {
        method: "DELETE",
        url: testURL + "/delete/" + productIdToUpdate,
        resolveWithFullResponse: true,
        json: true,
      };
      rp(options)
        .then((response) => {
          console.log("Delete Product Response:", response.body); // Log the response body
          expect(response.statusCode).to.equal(200);
          expect(response.body.message).to.be.equal(
            "Product deleted successfully!"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
