## STEPS: 
npx knex
npx knex init
make changes to knexfile.js
npx knex migrate:make roles_table
make changes to migration file
npx knex migrate:latest

## Seeding steps:
npx knex seed:make 001-roles
go into seeds/001-roles.js
  change .del() to .truncate() (makes sure first id is always id 1 for seeded data // ie. it resets the primary key in addition to cleaning the table)
  change table_name to the table name;
  change the seed data to match the table you wish to make
npx knex seed:run

npx knex migrate:make users_table