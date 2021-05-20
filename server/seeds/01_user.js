exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('user')
    .del()
    .then(function () {
        // Inserts seed entries
        return knex('user').insert([
            {
                user_id: 1,
                firstname: 'Hadriel',
                lastname: 'Benjo',
                email: 'hadriel@gmail.com',
                password: '123456',
                address: 'Somewhere',
            }
        ]);
    });
};
