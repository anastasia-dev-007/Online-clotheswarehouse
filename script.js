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


//declared constants for "Buy" btn to function
const productsListContainer = document.getElementById("productsList");
const tableElement = document.createElement("table");


// Function to render the list of products
const renderProducts = (products) => {
    const productsListContainer = document.getElementById("productsList");
    const tableElement = document.createElement("table");
    const tableBodyElement = document.createElement("tbody");
    const tableHeaderElement = document.createElement("tr");
    const columns = ["No", "Product Name", "Category", "Price", "Origin Country", "Actions", "Order"];


    // Add Bootstrap classes to the table
    tableElement.classList.add("table", "table-hover");


    // Create table header cells
    columns.forEach(column => {
        const thElement = document.createElement("th");
        const thText = document.createTextNode(column); //column va fi no, product name, Product Category....
        thElement.appendChild(thText);//le adaugam
        tableHeaderElement.appendChild(thElement);
    });//acum noi in tableHeaderCells vom avea o lista

    tableBodyElement.appendChild(tableHeaderElement);

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

        tableRow.appendChild(actionCell);
        tableRow.appendChild(orderCell);

        tableBodyElement.appendChild(tableRow);
    });

    // Update the product list container
    productsListContainer.innerHTML = "";
    tableElement.appendChild(tableBodyElement);
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
    renderProducts(products);
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
    renderProducts(products);

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
        renderProducts(products);
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

    renderProducts(products);
}



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

const renderOrderedProducts = () => {
    const orderedProductsContainer = document.getElementById("orderedProductsList");
    const orderedTable = document.createElement("table");
    const orderedTableBody = document.createElement("tbody");
    const orderedTableHeader = document.createElement("tr");
    const orderedColumns = ["Product Name", "Category", "Price", "Origin Country", "Remove Item"];
    const productFields = ["name", "category", "price", "originCountry"];

    orderedTable.setAttribute("class", "table table-hover")//Bootstrap5

    // Create ordered products table header cells
    orderedColumns.forEach(column => {
        const thElement = document.createElement("th");
        const thText = document.createTextNode(column);
        thElement.appendChild(thText);
        orderedTableHeader.appendChild(thElement);
    });

    orderedTableBody.appendChild(orderedTableHeader);

    // Create table rows for each ordered product
    orderedProducts.forEach(orderedProduct => {
        const orderedTableRow = document.createElement("tr");

        // Populate table cells with ordered product data
        productFields.forEach(column => {
            const tableData = document.createElement("td");
            const tableDataText = document.createTextNode(orderedProduct[column]);
            tableData.appendChild(tableDataText);
            orderedTableRow.appendChild(tableData);
        });

        //Create remove button
        const actionCell = document.createElement("td");
        const removeButton = document.createElement("button");
        const removeButtonText = document.createTextNode("Remove");
        removeButton.appendChild(removeButtonText);
        actionCell.appendChild(removeButton);

        // Add event listeners to buttons
        removeButton.addEventListener("click", () => {
            removeProduct(orderedProduct);
        });

        orderedTableRow.appendChild(actionCell);
        orderedTableBody.appendChild(orderedTableRow);
    });

    // Update the ordered products container
    orderedProductsContainer.innerHTML = "";
    orderedTable.appendChild(orderedTableBody);
    orderedProductsContainer.appendChild(orderedTable);
}


// Update the product list container
productsListContainer.innerHTML = "";
productsListContainer.appendChild(tableElement);

// Update the ordered products container
renderOrderedProducts();


//Function to remove item from orders
const removeProduct = (orderedProduct) => {
    const orderedProductIndex = orderedProducts.findIndex(product => product.name === orderedProduct.name);
    orderedProducts.splice(orderedProductIndex, 1);
    products.push(orderedProduct);

    renderOrderedProducts();
    renderProducts(products);
}


//Buy Button 
const buyOrderedProducts = () => {
    //clear content here, because else message is displayed multiple time per each click
    const orderedProductsAlert = document.getElementById("orderedProductsList");
    orderedProductsAlert.innerHTML = "";

    if (orderedProducts.length === 0) {
        const orderedProductsAlert = document.getElementById("orderedProductsList");
        const alert = document.createElement('p');
        const alertText = document.createTextNode("The selected products could not be found. Please make sure to choose products before proceeding.");
        alert.appendChild(alertText);
        orderedProductsAlert.appendChild(alert);
        alert.style.color = "red";//set color on element (!to remember to set styles on element not on "alertText")

    } else {
        orderedProducts.length === 0;//cleared the array

        const orderedProductsAlert = document.getElementById("orderedProductsList");
        orderedProductsAlert.innerHTML = "";
        const alert = document.createElement('p');
        const alertText = document.createTextNode("Your order has been successfully placed! You can expect to receive your items within 14 days. Payment will be processed upon delivery.");
        alert.appendChild(alertText);
        orderedProductsAlert.appendChild(alert);
        alert.style.color = "green";
    }
}


renderProducts(products);

//Final filter function
const filterProducts = () => {
    //la inceput citim datele din formular
    const filterFormData = {
        name: "j", //document.getElementById("byName").form.elements.name.value
        category: null, //document.getElementById("categoryFilter")form.elements.category.value
    }

    const filteredProducts = products.filter(product => {

        let isAvailable = true;

        //trebuie sa verificam daca valoarea noastra (product) corespunde cu ceea ce e selectat in filtru
        if (filterFormData.name) {//daca  numele produsului nostru incepe cu ceea ce avem aici e true, else e false 
            isAvailable = product.name.toLowerCase().startsWith(filterFormData.name.toLowerCase());
        }

        if (filterFormData.category) {
            isAvailable = product.category === filterFormData.category;

        }

        //continuam asa pentru fiecare
        return isAvailable;
    });

    console.log(filteredProducts); //doar ca acum trebuie sa afisam constanta filteredProducts in tabelul initial dupa ce dam click pe filter

    renderProducts(filteredProducts);
}


//const filterFormData = {
    // name: document.getElementById("byName").form.elements.name.value,
    // minPrice: document.getElementById("categoryFilter")form.elements.minPrice.value,

    //maxPrice : document.getElementById("categoryFilter")form.elements.minPrice.value,

    // if (filterFormData.minprice) {
    //     isAvailable = product.category === filterFormData.category;


    //item.price >=minprice && item.price <= maxPrice
    // }

