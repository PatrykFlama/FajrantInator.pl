# FajrantInator.pl
<!-- TODO some initial description -->

### Table of contents
<!-- TODO -->

### Installation and running
<!-- TODO -->
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

**Account data** is stored in _session_ and provides:  
* `type` [string] _(guest/user/admin)_ - type of account

___

<details open=True>
    <summary><b>/</b> - index site</summary>

Homepage, passes account type to _index.ejs_  
allows to go to login website or to logout, if already logged in

</details>


<details open=True>
    <summary><b>/listing</b> - products site</summary>

Listing site returns all available products with applied search and order filters.  
-> GET query parameters:  
* `taskList` [number] - display only tasks from given list
* `taskExercise` [number] - display only tasks from given exercise
* `courseName` [string] - display only tasks from given course
* `orderPrice` [string] _('asc'/'desc')_ - order tasks by price
* `searchString` [string] - search thru tasks description

-> GET route parameters:
* `/product/id` [number] - redirect to product site with given id

</details>


<details open=True>
    <summary><b>/product</b> - product site</summary>

Product site shows one product with given id  
-> GET route parameters:
* `/id` [number] - display task with given id

</details>


<details open=True>
    <summary><b>/cart</b> - cart site</summary>

Cart site shows all products added to cart and allows to remove, buy them  
returns list of products in cart

</details>


<details open=True>
    <summary><b>/login</b> - login site</summary>

Login site allows to login to account, redirects logged in users to homepage  
for now it only allows to login as admin (using admin admin) or username (using any credentials)  
-> POST body parameters:
* `username` [string] - username of account
* `password` [string] - password of account

</details>