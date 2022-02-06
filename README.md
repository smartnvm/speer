# Speer Technologies challenge

a back-end twitter clone api.

## Dependencies

- node >= 12.2
- mongo dB >= 4.2

For a complete list please refer to package.json

## Project Directory Strcture

**speer**
├── **db**
│   ├── seed
│   │   ├── tweets
│   │   │   └── tweets.js
│   │   └── users
│   │       └──  users.js
│   ├── dbConn.js
│   └── dbParams.js
├── **routes**
│   ├── __ tests __
│   │   ├── tweets.test.js
│   │   └── users.test.js
│   ├── debugRoutes.js
│   ├── tweetsRoutes.js
│   └── usersRoutes.js
├── **utils**
│   └── usersUtil.js
├── application.js
├── database.js
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── Requirements.md


## Setup

1. clone the repository

2. install app dependencies

```sh
npm install
```

3. copy `.env.example` to `.env` with your environment settings

```sh
DB_NAME=speer
DB_PORT=27027
#DB_USER=speer
#DB_PASS=password
PORT=8080
```

4. Load seed / test dummy data to initialize the database using

a. cURL command

```sh
curl -X GET http://localhost:8080/api/debug/db_reset
```

b. double click on the link below

http://localhost:8080/api/debug/db_reset

5. start the server

```sh
npm run local
```

## API Jest Testing

run the command below to test api routes

```sh
npm test
```

_NOTE: database will reset everytime you run test_

## API End-Points

### Debug

**1. GET /api/debug/db_reset**

database auto reset and seed

### User Authentication


**cod:** status code
200: success
400: error user already exists
401: user not logged in
403: incorrect password
404: user not found



**1. GET  /api/login**
**2. POST /api/login**
**3. POST /api/register**

### CRUD: Tweets

**1. POST /api/tweets/new**

- Create a new a tweet

```js
tweet = {
  author: string,
  body: string,
};
```

<br>

**2. GET /api/tweets/**

- Read tweets: returns an object data

**cod:** status code
200: success
400: tweet not found
403: forbidden - require user to be logged in

```js
data = {
  cod: integer,
  count: integer,
  tweets: [ {tweet_1}, {tweet_2}, ..., {tweet_N} ]
}

tweet = {
  _id: "61ffad95f2e60c473459ee83",
  id: 1,
  authorId: "61ff81d20f7133dc693200e4",
  author: "AJ",
  body: "hello world",
  timestamp: "2022-02-04T11:14:27.706Z",
  archive: false,
};
```

<br>

**3. PUT /api/tweets/:id**

- updates tweet with new content

```js
tweet = {
  author: string,
  body: string,
};
```

returns data of the structure below

```js
data = {
  cod: 200,
  tweet: {
    _id: "61ffad95f2e60c473459ee83",
    author: "AJ",
    body: "HELLO WORLD!",
    authorId: "61ff81d20f7133dc693200e4",
    archive: false,
    timestamp: "2022-02-06T15:17:55.854Z",
  },
};
```

<br>

**4. DELETE /api/tweets/:id**

- set archive flag to true
