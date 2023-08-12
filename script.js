// Initial product data
const products = [
    {
        name: "dress",
        category: "womenClothes",
        price: 300,
        originCountry: "Italy",
        //add more properties if necessary
    },

    {
        name: "coat",
        category: "womenClothes",
        price: 800,
        originCountry: "France",
        //add more properties if necessary
    },

    {
        name: "jeans",
        category: "menClothes",
        price: 700,
        originCountry: "Italy",
        //add more properties if necessary
    },

    {
        name: "jacket",
        category: "menClothes",
        price: 500,
        originCountry: "Italy",
        //add more properties if necessary
    },

    {
        name: "romper",
        category: "babyClothes",
        price: 100,
        originCountry: "France",
        //add more properties if necessary
    },
    //add more clothes if necessary
];


// Function to render the list of products
const renderProducts = () => {
    const productsListContainer = document.getElementById("productsList");
    const tableElement = document.createElement("table");
    const tableHeaderElement = document.createElement("tr");
    const columns = ["No", "Product Name", "Category", "Price", "Origin Country", "Actions"];

    // Create table header cells
    columns.forEach(column => {
        const thElement = document.createElement("th");
        const thText = document.createTextNode(column); //column va fi no, product name, Product Category....
        thElement.appendChild(thText);//le adaugam
        tableHeaderElement.appendChild(thElement);
    });//acum noi in tableHeaderCells vom avea o lista

    tableElement.appendChild(tableHeaderElement);

    // Create table rows for each product
    let orderNumber = 1; // Initialize the order number counter

    products.forEach((product) => {
        const tableRow = document.createElement("tr");

        // Add order number cell
        const orderNumberCell = document.createElement("td");
        const orderNumberText = document.createTextNode(orderNumber);
        orderNumberCell.appendChild(orderNumberText);
        tableRow.appendChild(orderNumberCell);
        orderNumber++; // Increment the order number

        // Populate table cells with product data
        for (const column in product) {
            const tableData = document.createElement("td");
            const tabelDataText = document.createTextNode(product[column]);
            tableData.appendChild(tabelDataText);
            tableRow.appendChild(tableData);
        }
        // Create cell with edit and delete buttons
        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        const editButtonText = document.createTextNode("Modify");
        const deleteButton = document.createElement("button");
        const deleteButtonText = document.createTextNode("Delete");

        editButton.appendChild(editButtonText);
        deleteButton.appendChild(deleteButtonText);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        // Add event listeners to buttons
        editButton.addEventListener("click", () => {
            editProduct(product);
        });
        deleteButton.addEventListener("click", () => {
            deleteProduct(product);
        });
        tableRow.appendChild(actionCell);

        tableElement.appendChild(tableRow);
    });

    // Update the product list container
    productsListContainer.innerHTML = "";
    productsListContainer.appendChild(tableElement);
}

// Function to add a new product
const addNewProduct = () => {
    const name = prompt("Introduce new product name: ");
    const category = prompt("Introduce new product category: ");
    const price = prompt("Introduce new product price: ");
    const originCountry = prompt("Introduce new product origin country: ");

    // Add new product to the array
    products.push({
        name: name,
        category: category,
        price: price,
        originCountry: originCountry,
    });

    // Update and render the product list
    renderProducts();

    //RADU, DAR E OK ASA CA DUPA REFRESH SE STERGE NOUL PRODUS? NU AR TREBUI EL SA RAMANA?
}


// Function to edit a product's information
const editProduct = ({ name, category, price, originCountry }) => {
    // Prompt user for new information
    const newName = prompt("Introduce new product name: ");
    const newCategory = prompt("Introduce new product category: ");
    const newPrice = prompt("Introduce new product price: ");
    const newOriginCountry = prompt("Introduce new product origin country: ");
    const newProduct = {
        name: newName,
        category: newCategory,
        price: newPrice,
        originCountry: newOriginCountry,
    };

    // Find the product index and update the array
    const productIndex = products.findIndex(product => product.name === name);
    products.splice(productIndex, 1, newProduct);

    // Update and render the product list
    renderProducts();

    // Function to delete a product
}

const deleteProduct = ({ name }) => {
    // Confirm user's intention to delete
    const canDelete = confirm("Are you sure you want to delete this product?")
    if (canDelete) {
        // Find the product index and remove from the array
        const productIndex = products.findIndex(product => product.name === name);
        products.splice(productIndex, 1);

        // Update and render the user list
        renderProducts();
    }
}


renderProducts();




// Function to find the most expensive product
const findMostExpensiveProduct = (products) => {
    let mostExpensiveProduct = products[0];

    products.forEach(product => {
        if (product.price > mostExpensiveProduct.price) {
            mostExpensiveProduct = product;
        }
    });
    return mostExpensiveProduct;
}

// Function to render the most expensive product
const renderMostExpensiveProduct = () => {
    const resultContainer = document.getElementById("resultMostExpensiveProduct");
    const resultParagraph = document.createElement("p");

    // Get the most expensive product
    const mostExpensiveProduct = findMostExpensiveProduct(products);


    const resultText = document.createTextNode(`The most expensive product is: ${mostExpensiveProduct.name} with a price of $${mostExpensiveProduct.price}`);
    resultParagraph.appendChild(resultText);


    // Clear the container and add the result
    resultContainer.innerHTML = "";
    resultContainer.appendChild(resultParagraph);
}

// Add click event listener to the button
showMostExpensiveButton.addEventListener("click", renderMostExpensiveProduct);

