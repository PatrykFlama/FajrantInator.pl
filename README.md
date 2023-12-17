# FajrantInator.pl
<!-- TODO some initial description -->

## Table of contents
<!-- TODO -->

## Installation and running
<!-- TODO -->
Use `npm install` to install all dependencies.  
Use `npm run start` to run the server.  
Use `npm run start:dev` to run the server in development mode.

______
## Documentation

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

