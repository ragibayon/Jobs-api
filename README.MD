# Jobs API

Jobs API is a simple set of APIs developed using the nodejs. In this project we used JWT for user authentication and authorization. As well as developed a swagger UI for accessing the APIs easily.

> [Visit the Live demo on render](https://job-api-jk9q.onrender.com)
> _please note that this project is deployed with Render’s free instance types which spin-down with inactivity._

## Installation

1. Download and Install Dependencies

```sh
npm install
```

2. Navigate to the `dist` folder and run

```sh
node ./dist/app.js
```

3. If you're working on development, write your code in the `src` folder and run the following command in the root folder to enable `TypeScript` auto-compilation:

```sh
tsc --watch
```

TypeScript will automatically compile your code to JavaScript and output it to the dist folder upon file changes.

## Technology Stack

- Nodejs
- Express
- Mongodb
- Mongoose
- Swagger
- Helmet
- Cors
- XSS-clean
- express-rate-limit
- TypeScript

## Features Added

- **Custom Error Handling**
  Developed comprehensive error handling for the TypeScript backend, ensuring better user feedback and system stability. Meaningful error messages are now returned for various scenarios, enhancing the user experience.

- **Backend Enhancement**
  Expanded the backend functionality to include mongoose validation. These additions provide users with more powerful tools to manage their tasks effectively.

## Known Issues

- **Not proper input validation**
  This project is a very simple application as used as a practice for swagger and jwt, that is why it does not have proper input validation. In future developments I have plan to add them.

- **Longer time to load**
  This project is deployed using Render's free instance types, which have a feature of spinning down due to inactivity. When the app is accessed after a period of inactivity, there might be a slight delay as the instance spins up. However, once it's up, the app functions smoothly. The deployment is located on a server in Singapore, while the MongoDB database is deployed in Mumbai. This geographic distribution facilitates easier development.

## Credits

This project was inspired by and developed as part of John Smilga's John Smilga's [NodeJS Tutorial and Projects Course](https://www.udemy.com/course/nodejs-tutorial-and-projects-course/)
