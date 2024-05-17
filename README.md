
# Product Catalog API Documentation

## Introduction

This document outlines the API endpoints and functionality of a product catalog backend built with Node.js, Express, and MongoDB. The API provides CRUD (Create, Read, Update, Delete) operations for managing products. Currently, the API does not have an authorization protocol, but future versions may include one.

This project follows the S.O.L.I.D principles. Each file in the `controllers` folder represents a single responsibility, ensuring a clean and maintainable codebase.
Please note that the code used in this application was heavily based on (@Santiago220991) Santiago Cárdenas's code.

## Project Structure

CCP_V8/
│
├── config/
│   ├── app.js
│   └── database.js
├── data/
├── data_test/
├── controllers/
│   ├── baseCtrl.js
│   ├── deleteCtrl.js
│   ├── insertionCtrl.js
│   ├── searchCtrl.js
│   └── updateCtrl.js
├── routes/
│   └── routes.js
├── schema/
│   └── itemSchema.js
├── test/
│   └── test.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── index.js


### Explanation

- **config/**: Contains configuration files for the application.
  - `app.js`: Application configuration.
  - `database.js`: Database configuration.
- **controllers/**: Contains controllers for handling different API requests.
  - `baseCtrl.js`: Base controller.
  - `deleteCtrl.js`: Handles deletion of products.
  - `insertionCtrl.js`: Handles insertion of products.
  - `searchCtrl.js`: Handles search requests (by name, ID, category, brand).
  - `updateCtrl.js`: Handles updates to products.
- **routes/**: Contains routing information.
  - `routes.js`: Defines the routes for the API endpoints.
- **schema/**: Contains schema definitions.
  - `itemSchema.js`: Defines the schema for product items.
- **test/**: Contains tests for the application.
  - `test.js`: Test cases for all methods.

## Running Locally

### Create an `.env` File

The `.env` file holds important variables for the application, including the database URL, database port, application port, etc.


HOST='localhost'
PORT='3180'  # PORT 5000 was already in use on my machine.
MONGO_URL='localhost'
MONGO_PORT=27017
MONGO_DBNAME='product-catalog'


### Base URL

The base URL for all API endpoints is:


http://localhost:3110


## API Endpoints

- `GET /basePage`: Base page of the API.
- `GET /`: Root endpoint.
- `GET /search/name/:searchQuery`: Search by product name.
- `GET /search/id/:searchQuery`: Search by product ID.
- `GET /search/brand/:searchQuery`: Search by product brand.
- `GET /search/category/:searchQuery`: Search by product category.
- `PUT /update/:productId`: Update a product.
- `DELETE /delete/:productId`: Delete a product.
- `POST /products`: Add a new product.

**Note**: Use the unique ID created by MongoDB for updating and deleting a product. Include the appropriate parameter when searching, updating, or deleting a product.

Example:


http://localhost:3110/search/name/HP1


## Testing the Application

To test this application, run:

mongod --dbpath data_test   


npm test


control c 


To run the test you may need give mongod a path to the data_test folder in one terminal window and npm test in another. Close the db after tests if necessary.

The tests will cover all nine methods (base page, insert, search by name, ID, category, brand, update, and delete) and execute in about one second. The test product names are generated using a combination of date and random numbers to ensure uniqueness.




## References
See basePage for all references. 