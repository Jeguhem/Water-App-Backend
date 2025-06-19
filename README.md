<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Water App Backend

A NestJS-based backend application for a water delivery service. This application provides APIs for user authentication, product management, cart functionality, order processing, and more.

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

The Water App Backend is a comprehensive API service built with [Nest](https://github.com/nestjs/nest) framework that powers a water delivery application. It provides endpoints for user management, authentication, product catalog, shopping cart, order processing, and payment transactions.

## Features

- **User Authentication**: Secure login and registration with JWT
- **Product Management**: Water product catalog with details and pricing
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Processing**: Create and manage delivery orders
- **Admin Dashboard**: Administrative controls for product and user management
- **Transaction Handling**: Process and track payment transactions
- **API Documentation**: Swagger UI for API exploration and testing

## Project Structure

The project follows a modular architecture with the following key components:

- **Auth Module**: Handles user authentication and authorization
- **User Module**: Manages user profiles and account information
- **Products Module**: Manages the water product catalog
- **Cart Module**: Handles shopping cart functionality
- **Orders Module**: Processes and tracks customer orders
- **Transactions Module**: Manages payment transactions
- **Admin Module**: Provides administrative capabilities

## Project Setup

```bash
$ npm install
```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=water_app_db
JWT_SECRET=your_jwt_secret
```

## Compile and Run the Project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

The API documentation is available through Swagger UI. After starting the application, you can access it at:

```
http://localhost:3000/docs
```

This provides an interactive interface to explore and test all available endpoints.

## Database

This project uses MySQL with Sequelize ORM. The database configuration can be found in:

```
src/config/database/
```

### Migrations

To run database migrations:

```bash
$ npx sequelize-cli db:migrate
```

### Seeders

To seed the database with initial data:

```bash
$ npx sequelize-cli db:seed:all
```

## Run Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your Water App Backend to production, there are some key steps you can take to ensure it runs as efficiently as possible:

1. Set up proper environment variables for production
2. Configure a production-ready database
3. Set up proper logging and monitoring
4. Configure CORS settings for your frontend application
5. Use a process manager like PM2 to keep the application running

Check out the [NestJS deployment documentation](https://docs.nestjs.com/deployment) for more information.

For cloud deployment options, consider:
- AWS Elastic Beanstalk
- Google Cloud Run
- Heroku
- Digital Ocean App Platform

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - omotowa oluwafemi
- Website - [My portfolio](https://femiomotowa.vercel.app/)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
