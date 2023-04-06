// STRETCH
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
    await knex('cars').truncate();
    await knex('cars').insert([
        {
            vin: 123456,
            make: 'Honda',
            model: 'Fit',
            mileage: 100000,
            title: 'Sawyer Welter'
        },
        {
            vin: 5752934923,
            make: 'Dodge',
            model: 'Ram',
            mileage: 34569,
        },
        {
            vin: 47758291,
            make: 'Tesla',
            model: 'Model X',
            mileage: 0,
            title: 'New Owner',
            transmission: '?'
        },
    ])
}


// table.increments('id');
// table.string('vin').unique();
// table.string('make').notNullable();
// table.string('model').notNullable();
// table.integer('mileage').notNullable();
// table.string('title');
// table.string('transmission');

  