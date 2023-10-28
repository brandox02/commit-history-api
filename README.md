## Meeting History API

This is meeting-history-api, is build under the top-line web frameworks of nodejs, nestjs, that is accompanied of typeorm as ORM to manage the relation with the database, posgresql as database engine and swagger ui to documentate the api.

It has authentication flow integrated, token session via cookies, login and sign up flow. Moreover sending email service integration.

## Installation

First, you need to set up the .env file, in order to make it, you just have to put the `.env` file i have sent you via email at the project's root.

Once it is done, install the dependencies: 

```bash
npm install
```

After execute the following to run the development server:

```bash
npm run start:dev
```

By default it takes the port `3250` although you can change this in the `.env` file, now you can fetch to your api in [http://localhost:3250](http://localhost:3250) and access to de documentation in [http://localhost:3250/api/documentation](http://localhost:3250/api/documentation)

