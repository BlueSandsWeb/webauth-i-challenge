
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').insert([
    {username: 'admin', password: 'password'},
    {username: 'user', password: 'pass'},
    {username: 'user1', password: 'pass'},
    {username: 'user2', password: 'pass'},
    {username: 'user3', password: 'pass'},
    {username: 'user4', password: 'pass'},
    {username: 'user5', password: 'pass'}
  ]);
};
