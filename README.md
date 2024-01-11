# FajrantInator.pl
<!-- TODO some initial description -->
## TODO
* dodawanie do koszyka nie powinno odświeżać strony

### Table of contents
<!-- TODO -->

### Installation and running
Use `npm install` to install all dependencies.  
Create `src/.env` file:   
* `PORT` - port on which server will be running  
* `DB_HOST` - database host   
* `DB_USER` [optional] - database user
* `DB_PASS` [optional] - database password  
* `DB_PORT` - database port

Download **MongoDB** database  
Use `npm run start` to run the server.  
Use `npm run start:dev` to run the server in development mode.

___

## Documentation
[**WHITEBOARD**](https://bitpaper.io/go/ProjektWEPPO/P8d3u2KTd)

### Database
Database is hosted on MongoDB and operated with Mongoose ORM.  
<details open=True>
    <summary><b>/</b> Following schemas are defined in [/src/database/schemas] </summary>

* `Users` - stores users data
  * `username` [string]
  * `password` [string]
  * `email` [string]
  * `type` [string] _('user'/'admin')_
  * `orders` [ArrayOf(number?)] - array of orders (ids)       <!-- TODO integrate it -->
  * `products` [ArrayOf(number?)] - array of owned products (ids)       <!-- TODO integrate it -->

* `Products` - stores products data
  * `name` [string]
  * `description` [string]
  * `price` [number]      
  * `courseName` [string]
  * `listNumber` [number]
  * `taskNumber` [number]
  * `solutionFileName` [string] - path?      <!-- TODO -->
  * `solutionCode` [string] - code? 
  * `ratings` [ArrayOf(Object?)] - path/code? 

* `Orders` - stores orders data
  * `cost` [number]
  * `username` [string]
  * `email` [string]
  * `accountType` [string]
  * `products` [array] - array of product ids
  * `date` [date]

</details>

___

<!--------------------------- INDEX ------------------------------>
<details open=True>         
    <summary><b>/</b> - index site</summary>

Homepage, passes account type to _index.ejs_  
allows to go to login website or to logout, if already logged in

</details>

<!--------------------------- LISTING ------------------------------>
<details open=True>
    <summary><b>/listing</b> - products site</summary>

Listing site returns all available products with applied search and order filters.  
* GET query parameters:  
  * `taskList` [number] - display only tasks from given list
  * `taskExercise` [number] - display only tasks from given exercise
  * `courseName` [string] - display only tasks from given course
  * `orderPrice` [string] _('asc'/'desc')_ - order tasks by price
  * `searchString` [string] - search thru tasks description

* GET route parameters:
  * `/product/id` [number] - redirect to product site with given id

</details>

<!--------------------------- PRODUCT ------------------------------>
<details open=True>
    <summary><b>/product</b> - product site</summary>

Product site shows one product with given id, allows to add product to cart, rate the product (if the user has already bought product with given id).
* GET route parameters:
  * `/id` [number] - display task with given id, display depends on
  whether the user has already bought product with given id 
* POST `/addToCart` body parameters:
  * `product.id` [string]
* POST `/rateProduct` body parameters:
  * `user.id` [string]
  * `rating` [Number]

</details>

<!--------------------------- CART ------------------------------>
<details open=True>
    <summary><b>/cart</b> - cart site</summary>

Cart site shows all products added to cart and allows to remove, buy them  
returns list of products in cart.
* GET route parameters:
  * `/` - display all products added to cart with total cost
* POST `/addToCart` - display products site
* POST `/removeProduct` body parameters:
  * `product.id` [string]

</details>

<!--------------------------- CHECKOUT ------------------------------>
<details open=True>
    <summary><b>/checkout</b> - checkout site</summary>

Checkout site allows to buy products in cart, redirects to order summary
* POST `/createOrder` body parameters:
  * `product.id` [string]
  * `cost` [Number]
  * `username` [string]
  * `email` [string]
  * `accountType` [string]
  * `date` [Date] 
  * `products` [ArrayOf(Number)]

</details>

<!--------------------------- LOGIN ------------------------------>
<details open=True>
    <summary><b>/login</b> - login site</summary>

Login site allows to login to account, redirects logged in users to homepage  
for now it only allows to login as admin (using admin admin) or username (using any credentials)  
* POST body parameters:
  * `username` [string]
  * `password` [string]

</details>

<!--------------------------- ADMIN ------------------------------>
<details open=True>
    <summary><b>/admin</b> - admin management panel</summary>

Allows to manage and display databases 
* GET `/` - display adding forms
* GET `/displayUsers` - display all users
* POST `/addProduct` body parameters:
  * `name` [string]
  * `description` [string]
  * `price` [number]
  * `image` [string]
  * `courseName` [string]
  * `listNumber` [number]
  * `taskNumber` [number]
  * `solution` [string]
* POST `/addUser` body parameters:
  * `username` [string]
  * `password` [string]
  * `email` [string]
  * `type` [string] _('user'/'admin')_

</details>