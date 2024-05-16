/* eslint-disable no-unused-expressions */

/* eslint-disable */
import server from '../index'
/* eslint-enable */

const rp = require('request-promise')
const chai = require('chai')
const expect = chai.expect
require('dotenv').config()

const testURL = `http://${process.env.HOST}:${process.env.PORT}`

describe('TESTING MODULES', () => {
  describe("1. Base Route", () => {
    it("Expects a HTML page in return", (done) => {
      const options = {
        method: "GET",
        url: testURL + "/basePage",
        resolveWithFullResponse: true,
      };
      rp(options)
        .then((response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.a("string");
          done();
        })
        .catch((err) => {
          done(err);
        });
    }),
      it("Expects a HTML page in return2", (done) => {
        const options = {
          method: "GET",
          url: testURL + "/search/name/HP1",
          resolveWithFullResponse: true,
        };
        rp(options)
          .then((response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.a("string");
            done();
          })
          .catch((err) => {
            done(err);
          });
      }),
      it("Expects a product is added", (done) => {
        const options = {
          method: "POST",
          url: testURL + "/",
          json: {
              "name": "TestProduct",
              "category": "Books",
              "brandname": "Schollastic",
              "images": "https://yatra8exe7uvportalprd.blob.core.windows.net/images/products/HighStDonated/Zoom/HD_101504752_01.jpg?v=1"
            },
          resolveWithFullResponse: true,
        };
        rp(options)
          .then((response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.result.name).to.be.equal("TestProduct");
            expect(response.body.result.category).to.be.equal("Books");
            return response.body.result._id;
          })
          .catch((err) => {
            done(err);
          })
          .then((id) => {
            console.log("ID", id);
            const searchByIdOption = {
              method: "GET",
              url: testURL + "/search/id/" + id,
              resolveWithFullResponse: true,
            };
            rp(searchByIdOption)
              .then((response) => {
                console.log(response);
                expect(response.statusCode).to.equal(200);
                expect(response.toJSON().result[0].name).to.be.equal("TestProduct");
                expect(response.toJSON().result[0].category).to.be.equal("Books");
                done();
              })
              .catch((err) => {
                done(err);
              });
            
          });
      });
  }),
    describe("2. Base Route", () => {
      it("Expects a HTML page in return", (done) => {
        const options = {
          method: "GET",
          url: testURL + "/basePage",
          resolveWithFullResponse: true,
        };
        rp(options)
          .then((response) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.a("string");
            done();
          })
          .catch((err) => {
            done(err);
          });
      }),
        it("Expects a HTML page in return2", (done) => {
          const options = {
            method: "GET",
            url: testURL + "/basePage",
            resolveWithFullResponse: true,
          };
          rp(options)
            .then((response) => {
              expect(response.statusCode).to.equal(200);
              expect(response.body).to.be.a("string");
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
    });
})
