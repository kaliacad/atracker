## Attendance Tracker  (AT)
AT is a web app that helps tracks attendance of students in a bootcamp or a coding school. It was initially developped for [Kinshasa Digital Academy](https://www.kinshasadigital.academy/), Goma campus (2022), but AT app can be used in any small or mid-sized school.

## Getting started
These instructions will get you a copy of the project up and running on your local machine for usage, development and testing purposes. You can also view the [demo app](https://app-attendance-gda.onrender.com) and test the app:

- usernam: `admin`
- pasword: `admin123`

### Prerequisites
- have Nodejs installed
- have a running instance of an SQL database (Postgres)
- create a database (you'll need to add information in `.env` file)

### Installation
- make a copy of this project
- `cp .env.example .env` and add all necessary database credentials
- run `npm install` to install all dependencies
- run `npm run db:setup` to create tables and populate them with dummy data

### Working with the database migration
This section is optional, you can skip it. To manipulate Postgres database, I use `Sequelize` ORM. Here you can find some automated script to work with migratrion and seeding.

- `npm run migrate:status`: see the status of available migrations (up and/or down)
- `npm run migrate`: run the migration with the latest migration file
- `npm run migrate:revert`: revert migration
- `npm run seed`: seed db with dummy data (as for now, you'll have an admin user with admin123 as password)
- `npm run seed:revert`: revert seeding

- `npx sequelize-cli db:seed(:undo) --seed filaName.js`: execute a specific seed file
- `npx sequelize-cli db:migrate:undo --name fileName.js`: revert (down) a specific migration file
- `npx sequelize-cli db:migrate --to fileName.js`: run a specific migration file

> Note: To work with the remote dabase, add `--env production` at the end of your CLI command.

## Usage
- start the server with `npm start`
- Go to [localhost:7000](http://localhost:7000)
- Username is: `admin` and password: `admin123`

## License
This is an open source app licensed under the MIT license.
