## Attendancy book - GDA 
Attendy tracker app for a bootcamp.

### Working with the database migration
We are using Sequelize as it allows us to better track db migration thanks to `sequelize-cli` (to be installed as dev dep)

- `npm run migrate:status`: see the status of available migrations (up and/or down)
- `npm run migrate`: run the migration with the latest migration file
- `npm migrate:revert`: revert migration
- `npm seed`: seed db with dummy data (as for now, you'll have an admin user with admin123 as password)
- `npm seed:revert`: revert seeding

