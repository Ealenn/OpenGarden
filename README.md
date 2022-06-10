# Open Garden 

[![Codecov](https://img.shields.io/codecov/c/github/ealenn/OpenGarden?style=for-the-badge&logo=codecov)](https://codecov.io/gh/Ealenn/OpenGarden)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/ealenn/OpenGarden?style=for-the-badge)](https://www.codefactor.io/repository/github/ealenn/OpenGarden)
[![GitHub stars](https://img.shields.io/github/stars/Ealenn/OpenGarden?style=for-the-badge&logo=github)](https://github.com/Ealenn/OpenGarden/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Ealenn/OpenGarden?style=for-the-badge&logo=github)](https://github.com/Ealenn/OpenGarden/issues)

## Description

This API provides lots of information about plantations, their needs, and sowing advice.

[![Roadmap](https://img.shields.io/badge/view-roadmap-blue?logo=trello&style=for-the-badge)](https://github.com/users/Ealenn/projects/3)
[![Swagger](https://img.shields.io/badge/view-swagger_ui-green?logo=swagger&style=for-the-badge)](https://opengarden.herokuapp.com/)

- [Open Garden](#open-garden)
  - [Description](#description)
  - [Integration](#integration)
    - [Rate Limiting](#rate-limiting)
    - [JWT Ticket](#jwt-ticket)
    - [Bad Request Handling](#bad-request-handling)
  - [Development](#development)
    - [Installation](#installation)
    - [Running the app](#running-the-app)
    - [Test](#test)
  - [Roadmap](#roadmap)
    - [Release notes](#release-notes)
  - [Versioning](#versioning)
  - [Contributing](#contributing)

## Integration

### Rate Limiting

This API is protected by throttling.

You can compute your remaining requests via the responses headers.

| Header                   | Description                              | Example            |
|--------------------------|------------------------------------------|--------------------|
|`x-ratelimit-limit`       | the maximum number of requests           |`20`|
|`x-ratelimit-remaining`   | remaining requests                       |`18`|
|`x-ratelimit-reset`       | time to reset the counter                |`30`|

### JWT Ticket

The HTTP `Authorization` request header is required to authenticate a user on many endpoints.

This header must be provided like : 

```sh
curl -X 'GET' ...
  -H 'Authorization: Bearer {TOKEN}'
```

To obtain this `{TOKEN}` you must call the endpoint `/account/login` (cf [SwaggerUI](https://opengarden.herokuapp.com)).

### Bad Request Handling

```json
{
  "statusCode": 400,
  "message": [
    {
      "value": "0",
      "property": "example",
      "constraints": {
        "matches": "example must match ^/[a-z0-9_-]/$ regular expression",
        "isLength": "example must be longer than or equal to 3 characters",
        "isString": "example must be a string"
      }
    }
  ],
  "error": "Bad Request"
}
```

## Development
### Installation

```bash
$ npm ci
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Roadmap

View the [OpenGarden Public Roadmap](https://github.com/users/Ealenn/projects/3)

### Release notes

For the versions available, see the [tags on this repository](https://github.com/Ealenn/OpenGarden/releases).

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.
