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
    const columns = ["No", "Product Name", "Category", "Price", "Origin Country", "Actions", "Order"];

    //Added style to the table by Radu's feedback
    //     tableElement.setAttribute('class', 'class1');
    //     const styleElement = document.createElement('style');
    //     styleElement.innerHTML = `
    // .class1 {
    //     border-collapse: collapse;
    //   border-spacing: 0;
    //   border: 1px solid #ddd;
    //   background-color: #dddddd;
    // }`;
    //     document.head.appendChild(styleElement);


    // Add Bootstrap classes to the table
    tableElement.classList.add("table", "table-hover");//Radu, nu mi-a reusit sa aplic bootstrap ca in exemplu din w3school: https://www.w3schools.com/bootstrap5/tryit.asp?filename=trybs_table_hover&stacked=h
    //OR  tableElement.className = "table table-hover";



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
        // Create cell with edit and delete buttons + added order btn
        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        const editButtonText = document.createTextNode("Modify");
        const deleteButton = document.createElement("button");
        const deleteButtonText = document.createTextNode("Delete");

        const orderCell = document.createElement("td");
        const orderButton = document.createElement("button");
        const orderButtonText = document.createTextNode("Order");

        editButton.appendChild(editButtonText);
        deleteButton.appendChild(deleteButtonText);
        orderButton.appendChild(orderButtonText);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        orderCell.appendChild(orderButton);


        // Add event listeners to buttons
        editButton.addEventListener("click", () => {
            editProduct(product);
        });
        deleteButton.addEventListener("click", () => {
            deleteProduct(product);
        });

        orderButton.addEventListener("click", () => {
            orderProduct(product);
        });

        orderButton.addEventListener('click', (event) => {
            const clickedButton = event.target;
            const tableRow = clickedButton.parentElement.parentElement;
            const productName = tableRow.querySelector('td:nth-child(2)').textContent;
            const product = products.find(p => p.name === productName);

            orderProduct(product);
        });

        tableRow.appendChild(actionCell);
        tableRow.appendChild(orderCell);

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

// Function to delete a product
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

// RADU HELP ME PLEASE HERE!
//Working on functionality of ordering a product
const orderedProducts = [];//here will be stored ordered products from the main table


//Function to order products and insert them in separate table
const orderProduct = (product) => {
    const productIndex = products.findIndex(p => p.name === product.name);    // Find the index of the selected product in the 'products' array

    const orderedProduct = products.splice(productIndex, 1)[0]; // Remove the ordered product from the 'products' array 
    orderedProducts.push(orderedProduct);    // Add the ordered product to the 'orderedProducts' array


    // Move the table row from the main table to the ordered products table
    

    renderOrderedProducts();

    renderProducts();
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
    // Get the most expensive product
    const mostExpensiveProduct = findMostExpensiveProduct(products);

    const resultContainer = document.getElementById("resultMostExpensiveProduct");
    const resultParagraph = document.createElement("p");
    const resultText = document.createTextNode(`The most expensive product is: ${mostExpensiveProduct.name} with a price of $${mostExpensiveProduct.price}`);
    resultParagraph.appendChild(resultText);


    // Clear the container and add the result
    resultContainer.innerHTML = "";
    resultContainer.appendChild(resultParagraph);
}

// Add click event listener to the button
// showMostExpensiveButton.addEventListener("click", renderMostExpensiveProduct);


// Function to find cheapest product
const findCheapestProduct = (products) => {
    let cheapestProduct = products[0];

    products.forEach(product => {
        if (product.price < cheapestProduct.price) {
            cheapestProduct = product;
        }
    });
    return cheapestProduct;
}


// Function to render the cheapest product
const renderCheapestProduct = () => {
    // Get the cheapest product
    const cheapestProduct = findCheapestProduct(products);

    const resultContainer = document.getElementById("resultCheapestProduct");
    const resultParagraph = document.createElement("p");
    const resultText = document.createTextNode(`Cheapest product is: ${cheapestProduct.name} with a price of $${cheapestProduct.price}`);
    resultParagraph.appendChild(resultText);

    // Clear the container and add the result
    resultContainer.innerHTML = "";
    resultContainer.appendChild(resultParagraph);
}

// Add click event listener to the button
// showCheapestButton.addEventListener("click", renderCheapestProduct);


// Function to find interval price product
const identifyIntervalProducts = (products, minPrice, maxPrice) => {
    return products.filter((item) => item.price >= minPrice && item.price <= maxPrice);
};

// Function to render the interval price product
const renderIntervalPriceProduct = () => {
    // Prompt the user for the minimum and maximum prices
    const minPrice = parseFloat(prompt("Enter the minimum price:"));
    const maxPrice = parseFloat(prompt("Enter the maximum price:"));

    // Get the interval price products
    const intervalPriceProducts = identifyIntervalProducts(products, minPrice, maxPrice);

    const resultContainer = document.getElementById("resultIntervalPriceProduct");
    resultContainer.innerHTML = ""; // Clear the container

    // Create and append a paragraph for each product in the interval
    intervalPriceProducts.forEach(product => {
        const resultParagraph = document.createElement("li");
        const resultText = document.createTextNode(`${product.name} with a price of $${product.price}`);
        resultParagraph.appendChild(resultText);
        resultContainer.appendChild(resultParagraph);
    });
}


// Add click event listener to the button
showIntervalPriceButton.addEventListener("click", renderIntervalPriceProduct);


const getProductByName = (productName) => {
    let productByName;
    const productIndex = products.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        productByName = products.splice(productIndex, 1)[0];
    }

    return productByName;
}

//OLD VERSION OF ORDERS
// const renderOrderedProduct = () => {

//     const orderProduct = prompt("Introduce name of product: ");
//     const orderedProduct = getProductByName(orderProduct);
//     const resultContainer = document.getElementById("orderedProductsList");
//     const resultParagraph = document.createElement('p');
//     const resultText = document.createTextNode(`Selected product: ${orderedProduct.category} ${orderedProduct.name} with a price of $${orderedProduct.price} from ${orderedProduct.originCountry}. Delivery to the store will be made within 14 days.`);

//     resultParagraph.appendChild(resultText);
//     resultContainer.innerHTML = "";
//     resultContainer.appendChild(resultParagraph);
// }



//RADU HELP PLEASE!
const renderOrderedProducts = () => {
    const orderedProductsContainer = document.getElementById("orderedProductsList");
    const orderedTable = document.createElement("table");
    const orderedTableHeader = document.createElement("tr");
    const orderedColumns = ["Product Name", "Category", "Price", "Origin Country"];

    // Create ordered products table header cells
    orderedColumns.forEach(column => {
        const thElement = document.createElement("th");
        const thText = document.createTextNode(column);
        thElement.appendChild(thText);
        orderedTableHeader.appendChild(thElement);
    });

    orderedTable.appendChild(orderedTableHeader);

    // Create table rows for each ordered product
    orderedProducts.forEach(orderedProduct => {
        const orderedTableRow = document.createElement("tr");

        // Populate table cells with ordered product data
        orderedColumns.forEach(column => {
            const tableData = document.createElement("td");
            const tableDataText = document.createTextNode(orderedProduct[column.toLowerCase()]);//Radu, de ce aici daca scot toLowerCase atunci nici price nici category?)
            tableData.appendChild(tableDataText);
            orderedTableRow.appendChild(tableData);
        });

        orderedTable.appendChild(orderedTableRow);
    });

    // Update the ordered products container
    orderedProductsContainer.innerHTML = "";
    orderedProductsContainer.appendChild(orderedTable);
}


// Update the product list container
productsListContainer.innerHTML = "";
productsListContainer.appendChild(tableElement);

// Update the ordered products container
renderOrderedProducts();


//Buy and Cancel 

const buyOrderedProducts = () => {
if(orderedProducts.length === 0) {
    const orderedProductsAlert = document.getElementById("orderedProductsList");
    const alert = document.createElement('p');
    const alertText = document.createTextNode("No products selected!");
    alert.appendChild(alertText);
    orderedProductsAlert.appendChild(alert);
}
}

buyOrderedProducts();