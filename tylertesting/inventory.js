
const Inventory = from('./database.js');

// Define your functions and variables
// ...

// Update the function to add a product to the inventory
function addProduct(name, description, category, price) {
  // Create a new product in the inventory
  Inventory.create({
    name: name,
    description: description,
    category: category,
    price: price
  })
    .then(() => {
      console.log('Product added to inventory.');
      updateInventoryList(); // Update the inventory list
    })
    .catch((error) => {
      console.error('Error adding product to inventory:', error);
    });
}

// Export the addProduct function
module.exports = { addProduct };
module.exports = { updateInventoryList };
