const { DataTypes } = require('sequelize');
const sequelize = require('./item.js');
const Item = require('./item');

describe('Item Model', () => {
  beforeAll(async () => {
    //  db connection
    await sequelize.authenticate();
    console.log('Database connection established.');

    // sync model and db
    await Item.sync({ force: true });
    console.log('Item table created.');
  });

  afterAll(async () => {
    // item table
    await Item.drop();
    console.log('Item table dropped.');

    // closes connection
    await sequelize.close();
    console.log('Database connection closed.');
  });

  beforeEach(async () => {
    // clear item table
    await Item.destroy({ truncate: true });
  });

  test('Create a new item', async () => {
    const newItem = await Item.create({
      name: 'Sample Item',
      description: 'This is a sample item',
      category: 'Sample Category',
      price: 9.99
    });

    expect(newItem.name).toBe('Sample Item');
    expect(newItem.description).toBe('This is a sample item');
    expect(newItem.category).toBe('Sample Category');
    expect(newItem.price).toBe(9.99);
  });

  test('Retrieve an item', async () => {
    // creates sample
    await Item.create({
      name: 'Sample Item',
      description: 'This is a sample item',
      category: 'Sample Category',
      price: 9.99
    });

    // pulls from db
    const retrievedItem = await Item.findOne({ where: { name: 'Sample Item' } });

    expect(retrievedItem).not.toBeNull();
    expect(retrievedItem.name).toBe('Sample Item');
    expect(retrievedItem.description).toBe('This is a sample item');
    expect(retrievedItem.category).toBe('Sample Category');
    expect(retrievedItem.price).toBe(9.99);
  });

  test('Update an item', async () => {
    // creates an example item
    const newItem = await Item.create({
      name: 'Sample Item',
      description: 'This is a sample item',
      category: 'Sample Category',
      price: 9.99
    });

    // update item price
    newItem.price = 14.99;
    await newItem.save();

    // get updated item
    const updatedItem = await Item.findByPk(newItem.id);

    expect(updatedItem.price).toBe(14.99);
  });

  test('Delete an item', async () => {
 // making an example item
    const newItem = await Item.create({
      name: 'Sample Item',
      description: 'This is a sample item',
      category: 'Sample Category',
      price: 9.99
    });

    // Delete the item
    await newItem.destroy();

    // get a deleted item back
    const deletedItem = await Item.findByPk(newItem.id);

    expect(deletedItem).toBeNull();
  });
});
