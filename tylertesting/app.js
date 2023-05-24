// Import the Sequelize model
const Inventory = require('tylertesting/inventory.js');

// Get a reference to the HTML form
const addForm = document.getElementById('addForm');

// Listen for the form submission event
addForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Extract form input values
  const productName = addForm.elements.productName.value;
  const description = addForm.elements.description.value;
  const category = addForm.elements.category.value;
  const price = parseFloat(addForm.elements.price.value);

  try {
    // Create a new record in the Inventory table
    const newProduct = await Inventory.create({
      productName,
      description,
      category,
      price,
    });

    console.log('New product added:', newProduct.toJSON());

    // Clear the form inputs
    addForm.reset();
  } catch (error) {
    console.error('Error adding product:', error);
  }
});
