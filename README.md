# Getting Started with TypeORM for NestJS
[![Presentation](http://img.youtube.com/vi/woMPn3Nm3aA/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_woMPn3Nm3aA "Getting Started with TypeORM for NestJS by Sean Ramocki")


## Description

NestJS Example repository for Postgres TypeORM integration with migrations

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Migrations

```bash
# Create a migration
$ npm run migration:create --name=foo

# Generate a migration from schema changes
$ npm run migration:generate --name=bar

# Run migrations and checks for schema changes
$ npm run migration:run

# Revert migrations
$ npm run migration:revert

