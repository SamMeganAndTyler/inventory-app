const { sequelize, testConnection } = require('./database');
const { Inventory } = require('./database.js');
const { updateInventoryList } = require('./inventory.js');






// Function to start the server or perform other operations after successful database connection
async function startServer() {
  // Perform any additional setup or operations here

  // Start your server or perform other tasks
  // ...
}

// Connect to the database and start the server
async function initializeApp() {
  try {
    await sequelize.sync(); // Sync the defined models with the database
    await testConnection(); // Test the database connection

    // Database is connected, start the server or perform other operations
    await startServer();
  } catch (error) {
    console.error('Error initializing the application:', error);
  }
}



// Other imports and code specific to your application

// Update the addButton event listener to store the form information into the model
addButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let newProduct = new Product(
    inputName.value,
    inputDescription.value,
    inputCategory.value,
    inputPrice.value
  );

  // Save the new product to the database using Sequelize
  try {
    await Inventory.create(newProduct);
    console.log('Product saved successfully.');
  } catch (error) {
    console.error('Error saving product:', error);
  }

  // Clear the form inputs
  inputName.value = "";
  inputDescription.value = "";
  inputCategory.value = "";
  inputPrice.value = "";

  // Fetch and update the inventory list to display the new product
  updateInventoryList();
});

// Modify other parts of your code accordingly

// Make sure to export any necessary functions or variables
export { updateInventoryList };
