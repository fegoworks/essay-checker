<!-- @format -->

# Essay Checker

A REST API based application to compare essay submissions for similarity.


# Table of Contents

- [Technology Stack](#tstack)
- [Features](#features)
- [Getting Started](#started)
- [Pre-requisites](#require)
- [Installation](#installation)
- [Running tests](#tests)
- [API Endpoints](#endpoints)

## Technology Stack<a name="tstack"></a>

- Nodejs
- PostgreSQL
- Sequelize

## Features<a name="features"></a>

- Users can
  - Sign in
  - Generate reports by comparing text files
  - View reports history
  - View specific reports
  - Delete reports


## Getting Started<a name="started"></a>

To run this API locally simply follow the instructions below:

#### Prerequisites<a name="require"></a>

You need to have or install the following:

1. Git bash
2. Npm
3. Postman

#### Installation<a name="installation"></a>

- clone repo
  ```
  git clone https://github.com/fegoworks/essay-checker.git
  ```
- navigate to api folder
- run installation
  ```
  npm install
  ```
- create a `.env` file with this template

  ```
  DATABASE_URL = 'Your postgres database url'
  DATABASE_URL_TEST = 'Your postgres test database url'
  DATABASE_URL_DEVELOPMENT = 'Your postgres database url'
  PORT = 'Your local port'
  SECRET = 'Your secret phrase'
  CLOUD_NAME = 'Your cloudinary cloud name'
  CLOUDINARY_API_KEY = 'cloudinary api key'
  CLOUDINARY_API_SECRET = 'cloudinary api secret'
  ```

- run migrations

  ```
  npm run migrate
  ```
- start app
  ```
  npm run start:dev
  ```
- you can now make requests using postman to `localhost:3000/api/v1/`

## Running Tests<a name="tests"></a>

To run tests simply run the following command in your git bash or command line

```
npm run test
```

### API endpoints

Heroku: [Essay-Checker-API](https://essay-checker.herokuapp.com/)
Documentation: [Essay-Checker-API-Docs]()

| Endpoints                         | Functionality               |
| --------------------------------- | --------------------------- |
| POST /auth/create-user            | Create new user account     |
| POST /auth/signin                 | Login a user                |
| POST /reports                     | Compare texts and generate a report  |
| GET /reports                      | View reports history    |
| GET /reports/:reportId        | View a specific report             |
| DELETE /reports/:reportId          | Remove a particular report|


### Sign up<a name="endpoints"></a>

Send a `POST` request to `/api/v1/auth/create-user` with the following JSON structure:

```json
{
  "firstName": "Sensei",
  "lastName": "Saitama",
  "email": "saitama@mail.com",
  "password": "password"
}
```

### Sign in with the user

Send a `POST` request to `/api/v1/auth/signin`, with the following:

```json
{
	"email": ,
	"password":
}
```

When you signin you'll receive a `Bearer token`. You'll need this token to send any request related to reports.

> Frow now on, every request described here will require you send
> the Bearer token

### Compare and generate a new report

Send a `POST` request to `/api/v1/reports`, with the following:

```json
{
  "studentOne": "fego",
  "studentTwo": "gbenga",
  "essay": article.txt,
  "essay": article2.txt
}
```

The above should be in a multipart form, with keywords `essay` being file fields.

### View reports history

Send a `GET` request to `/api/v1/reports/`

### View a specific report

Send a `GET` request to `/api/v1/reports/:reportId`, with the following:

### Delete a report

Delete a report by placing its id in the `DELETE` request URL
`/api/v1/reports/:reportId`.

## Author

Edafe Oghenefego
[@realFego](https://twitter.com/realFego)
