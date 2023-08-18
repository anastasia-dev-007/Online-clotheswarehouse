// Initial product data
const products = [
    {
        name: "dress",
        category: "Women Clothes",
        price: 300,
        originCountry: "Italy",
    },
    {
        name: "coat",
        category: "Women Clothes",
        price: 800,
        originCountry: "France",
    },
    {
        name: "jeans",
        category: "Men Clothes",
        price: 700,
        originCountry: "Italy",
    },
    {
        name: "jacket",
        category: "Men Clothes",
        price: 500,
        originCountry: "Italy",
    },
    {
        name: "romper",
        category: "Baby Clothes",
        price: 100,
        originCountry: "France",
    },
    // Additional products
    {
        name: "sweater",
        category: "Women Clothes",
        price: 400,
        originCountry: "USA",
    },
    {
        name: "shirt",
        category: "Men Clothes",
        price: 250,
        originCountry: "England",
    },
    {
        name: "onesie",
        category: "Baby Clothes",
        price: 80,
        originCountry: "Germany",
    },
    {
        name: "skirt",
        category: "Women Clothes",
        price: 220,
        originCountry: "France",
    },
    {
        name: "tie",
        category: "Men Clothes",
        price: 75,
        originCountry: "Italy",
    },
    {
        name: "bodysuit",
        category: "Baby Clothes",
        price: 120,
        originCountry: "Spain",
    },
    // Additional products
    {
        name: "blouse",
        category: "Women Clothes",
        price: 180,
        originCountry: "Spain",
    },
    {
        name: "suit",
        category: "Men Clothes",
        price: 900,
        originCountry: "Italy",
    },
    {
        name: "socks",
        category: "Baby Clothes",
        price: 15,
        originCountry: "USA",
    },
    {
        name: "jumpsuit",
        category: "Women Clothes",
        price: 350,
        originCountry: "France",
    },
    {
        name: "vest",
        category: "Men Clothes",
        price: 120,
        originCountry: "England",
    },
    {
        name: "hat",
        category: "Baby Clothes",
        price: 30,
        originCountry: "Germany",
    },
    // Add more clothes if necessary
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

//Functionality of ordering a product
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




//Filter options per each function

// Filter by NAME
const filterByName = () => {
    const filterFormData = {
        name: document.getElementById("byName").value,
    }

    const filteredByName = products.filter(product => {
        let isAvailable = true;

        if (filterFormData.name) {
            isAvailable = product.name.toLowerCase().startsWith(filterFormData.name.toLowerCase());
        }
        return isAvailable;
    });


    renderProducts(filteredByName);
}

//Filter by INTERVAL PRICE
const filterByInterval = () => {
    const filterFormData = {
        minPrice: document.getElementById("minPrice").value,
        maxPrice: document.getElementById("maxPrice").value,
    }

    const filteredByInterval = products.filter(product => {
        if (filterFormData.minPrice && filterFormData.maxPrice) {
            return product.price >= filterFormData.minPrice && product.price <= filterFormData.maxPrice;
        }
        return true;
    });
    renderProducts(filteredByInterval);
}


//Filter by CATEGORY
const filterByCategory = () => {
    const filterFormData = {
        category: document.getElementById("categoryFilter").value,
    }

    const filteredByCategory = products.filter(product => {
        if (filterFormData.category) {
            return product.category === filterFormData.category;
        }
        return true;
    });


    renderProducts(filteredByCategory);
}

document.getElementById("categoryFilter").addEventListener('change', filterByCategory);


//Create a dropdown list for countries
const uniqueCountryList = [...new Set(products.map(product => product.originCountry))];//get unique list. I use map because it gives me acces to property of object product

const originCountryList = document.getElementById("originCountry")
originCountryList.innerHTML = "";//reset list

//create option "All"
const allOption = document.createElement("option");
allOption.textContent = "All";
allOption.value = "";
originCountryList.appendChild(allOption);


//create rest options from the unique list
uniqueCountryList.forEach(country => {
    const option = document.createElement("option");
    option.textContent = country;
    option.value = country;
    originCountryList.appendChild(option);
}
);


//Filter by COUNTRY
const filterByCountry = () => {
    const filterFormData = {
        originCountry: document.getElementById("originCountry").value,
    }

    const filteredByCountry = products.filter(product => {
        if (filterFormData.originCountry) {
            return product.originCountry === filterFormData.originCountry;
        }
        return true;
    });

    renderProducts(filteredByCountry);
}

document.getElementById("originCountry").addEventListener('change', filterByCountry);


//FINAL FILTER which takes into consideration all criteria
const filterProducts = () => {
    //la inceput citim datele din formular
    const filterFormData = {
        name: document.getElementById("byName").value,
        category: document.getElementById("categoryFilter").value,
        originCountry: document.getElementById("originCountry").value,
        minPrice: document.getElementById("minPrice").value,
        maxPrice: document.getElementById("maxPrice").value,
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

        if (filterFormData.originCountry) {
            isAvailable = product.originCountry === filterFormData.originCountry;
        }

        if (filterFormData.minPrice && filterFormData.maxPrice) {
            return product.price >= filterFormData.minPrice && product.price <= filterFormData.maxPrice;
        }

        return isAvailable;

    });


    renderProducts(filteredProducts);
}


//Reset filters
const resetFilters = () => {
    // Reset the values of filter elements (if needed)
    document.getElementById("byName").value = "";
    document.getElementById("categoryFilter").value = "";
    document.getElementById("originCountry").value = "";
    document.getElementById("minPrice").value = "";
    document.getElementById("maxPrice").value = "";

    // Render the original list of products
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

//Function to render most expensive product
const showMostExpensiveProduct = () => {
    const mostExpensiveProduct = findMostExpensiveProduct(products);
    renderProducts([mostExpensiveProduct]);
}

// Function to find cheapest product
const findCheapestProduct = (products) => {
    let cheapestProduct = products[0];

    products.forEach(product => {
        if (product.price < cheapestProduct.price) {
            cheapestProduct = product;
        }
    })
    return cheapestProduct;
}

//Function to render cheapest product
const showCheapestProduct = () => {
    const cheapestProducts = findCheapestProduct(products);
    renderProducts([cheapestProducts]);
}





