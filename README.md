# Product Catalog

### Getting Started
In order to run this project locally you need to install the next dependencies.

- Mongodb
- Node

Install all the dependencies (including the dev dependencies) using the `npm install` or `npm i` command. Once the dependencies are installed, use `npm start` to start the server.

Use an API testing tool like [Postman](https://www.getpostman.com/downloads/) or [Insomnia](https://insomnia.rest/download/) to send/receive HTTP requests.


### Running locally
#### Create an `.env` file
The `.env` file holds the important variables for the whole application which include the database URL, database port, application port, etc.
Include the next variables in your .env file.
```
HOST='localhost'
PORT='5000'

MONGO_URL='localhost'
MONGO_PORT=27017
MONGO_DBNAME='product-catalog'
```

#### npm scripts
The `package.json` file contains five scripts for running locally: `linter`, `test`, `coverage`, `build` & `start`.

- `"linter": "standard --fix"`

Runs the StandardJS linter along with the `--fix` flag, which lints code to a great extent. The traceback (if one shows up) is the list of errors that need to be fixed manually.

- `"test": "mocha --require @babel/register --timeout 5000 --exit"`

Runs **only** the tests.

- `"coverage": "nyc --reporter=text mocha --require @babel/register --timeout 5000 --exit"`

Runs the test coverage & shows up detailed report.

- `"build": "rimraf dist/ && babel ./ --out-dir dist/ --copy-files"`

Builds the project.

- `"start": "npm run build && node dist/index.js --no-deprecation"`

First builds and then starts the server.

### API endpoints
#### 1. `/insert`
```
Request type: POST
Data parameters: name, category, brandName, images
```

#### 2. `/search`
##### 2.1. By name (/search/name/:searchQuery)
```
Request type: GET
Data parameters: name
```

## Challenge Tasks

### 1 Create an endpoint to delete a product

#### Description

It is necessary to implement an entry point to delete the information of a previously existing product.

For this implementation, a route must be created.

#### Acceptance criteria

A product that previously exists should be removed from the database.

### 2 Create an endpoint to edit a product

#### Description

It is necessary to implement an entry point to change the information of a previously existing product.

For this implementation, a route must be created.

#### Acceptance criteria

A product should be saved in the database and the following attributes can be changed:

- Category
- Brandname
- Images


### 3 Create an endpoint to get all the products 

#### Description

It is necessary to implement an entry point to get all the products:

For this implementation, a route must be created.

#### Acceptance criteria

The endpoint retrieves all the products that match a specific status.


### 4 Create an endpoint to filter products by category

#### Description

It is necessary to implement an entry point to filter products by category:

For this implementation, a route must be created.

#### Acceptance criteria

The endpoint retrieves all the products that match a specific category.


### 5 Create an endpoint to filter products by brandname

#### Description

It is necessary to implement an entry point to filter products by brandname:

For this implementation, a route must be created.

#### Acceptance criteria

The endpoint retrieves all the products that match a specific brandname.


### 6 Add tests for the product routes

#### Description

Add test for the enpoints created in the routes.js file.
# CCP_V8
