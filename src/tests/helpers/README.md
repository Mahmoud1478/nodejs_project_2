# Image Processing API

----------------------------------------------------
## Features
* you can use app's endpoint as images placeholder
* you can choose your thumb width and height
* simple images caching 

-------------------------------------------------------
## Endpoints
* {app_url}/ => home page with welcome message
* {app_url}/images?name={image-name}&width={image-width}&height={image-height} => to create thumbs from images 
    by providing name , width and height of the image.
---

## Error Handling
* images endpoint
  * when one of prams is missing server will redirect to error page with status code 422
  with custom messages
    ![422](./docs/img/422.png)
  * if all prams provided and image doesn't exist  server will redirect to error page with status code 404
  with custom message
    ![404](./docs/img/404.png)
---
## Usage
by
* installing app's dependency and start dev server by using
  ```shell
    npm install && npm run start
  ```
* visiting images endpoint and providing valid prams you should get your image
  # Example
  ``
  http://localhost:3000/images?name=image&width=100&height=100
  ``
 
  ![example](./docs/img/usage.png)
  ---

## Available Scripts
1- to install app's dependency

```shell
    npm install
```
2- to build the app
```shell
    npm run build
```
3- to start development server

```shell
    npm run start
```

4- to test the app
```shell
    npm run test
```
5- to format code (typescript)
```shell
    npm run format
```
6- to check code (typescript) errors
```shell
    npm run lint
```
---