# Appiness Products Categories API

## By Srinivas Kanuparthi

## Description
This Appiness Products Categories API is a node rest api that allows users to insert products and categories and to get all products and categories.if user deletes a category the the products related to the category also will be deleted.

* Get list of products.
* Get Product by ProductId 
* Get list of categories.
* Get category by CategoryId 

### Steps to run application in your local

1. clone repo
2. npm install
3. export the node env variables or use the launch.json file and debug the application in visual studio code
4. Note: the mongodb i have launched in aws and using it. for now anyone can use it.


### Request JSON Samples

1.http://localhost:3005/api/categories (POST)

##  req.body {
	"name": "Category Name",
	"description": "Category Description"
}

## Response : {

{
  "name": "name",
  "description": "description",
  "_id": "ObjectId()",
  "categoryId": "_id"
}

2.http://localhost:3005/api/products (POST)

##  req.body {
	"name": "Product Name",
	"description": "Product Description",
        "categoryId": "categoryId"
     }

## Response :

{
  "name": "name",
  "description": "description",
  "_id": "ObjectId()",
  "productId": "_id",
  "categoryId": "categoryId"
}


2.http://localhost:3005/api/categories/:categoryId (DELETE)


##  Response :
[
 {
  "name": "name",
  "description": "description",
  "_id": "ObjectId()",
  "productId": "_id",
  "categoryId": "categoryId"
 }
 ]




## About me

## Portfolio :  http://portfolio-sk.s3-website.us-east-2.amazonaws.com/about-me/index.html


