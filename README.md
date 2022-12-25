## Attendancy book - GDA 

### Working with the database
We are using Sequelize as it allows us to better track db migration thanks to `sequelize-cli` (to be installed as dev dep)

- `npx db:migrate:status`: see the status of available migrations (up and/or down)
- `npx db:migrate`: run the migration with the latest migration file
- `npx db:migrate:undo`: revert migration
- `npx db:seed:all`: seed db with dummy data (as for now, you'll have an admin user with admin123 as password)
- `npx db:seed:undo`: revert seeding

