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
    {
        name: "dress",
        category: "Baby Clothes",
        price: 350,
        originCountry: "Germany",
    },
    {
        name: "leggins",
        category: "Woman Clothes",
        price: 380,
        originCountry: "Moldova",
    },
    {
        name: "pants",
        category: "Men Clothes",
        price: 260,
        originCountry: "Germany",
    },
];

// Function to render the list of products
const renderProducts = (products) => {
    const productsListContainer = document.getElementById("productsList");
    const tableElement = document.createElement("table");
    const tableBodyElement = document.createElement("tbody");
    const tableHeaderElement = document.createElement("tr");
    const columns = ["No", "Product Name", "Category", "Price", "Origin Country", "Actions"];

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
    products.forEach((product, index) => {
        const tableRow = document.createElement("tr");
        // Add order number cell
        const orderNumberCell = document.createElement("td");
        const orderNumberText = document.createTextNode(index + 1);
        orderNumberCell.appendChild(orderNumberText);
        tableRow.appendChild(orderNumberCell);

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

        const orderButton = document.createElement("button");
        const orderButtonText = document.createTextNode("Order");

        editButton.appendChild(editButtonText);
        deleteButton.appendChild(deleteButtonText);
        orderButton.appendChild(orderButtonText);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        actionCell.appendChild(orderButton);

        // Add event listeners to buttons
        editButton.addEventListener("click", () => {
            editProduct(product);
        });
        deleteButton.addEventListener("click", () => {
            deleteProduct(index);
        });

        orderButton.addEventListener("click", () => {
            orderProduct(product);
        });

        tableRow.appendChild(actionCell);
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
    const newName = prompt("Introduce new product name: ", name);//adaugam al doilea parametru care apare ca un placeHolder
    const newCategory = prompt("Introduce new product category: ", category);//adaugam al doilea parametru care apare ca un placeHolder
    const newPrice = prompt("Introduce new product price: ", price);//adaugam al doilea parametru care apare ca un placeHolder
    const newOriginCountry = prompt("Introduce new product origin country: ", originCountry);//adaugam al doilea parametru care apare ca un placeHolder
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
}

// Function to delete a product
const deleteProduct = (index) => {
    // Confirm user's intention to delete
    const canDelete = confirm("Are you sure you want to delete this product?")
    if (canDelete) {
        // Find the product index and remove from the array
        products.splice(index, 1);

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
    //clear content here, because else message is displayed multiple times per each click
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
        orderedProducts.splice(0, orderedProducts.length);//cleared the array

        const orderedProductsAlert = document.getElementById("orderedProductsList");
        orderedProductsAlert.innerHTML = "";
        const alert = document.createElement('p');
        const alertText = document.createTextNode("Your order has been successfully placed! You can expect to receive your items within 14 days. Payment will be processed upon delivery.");
        alert.appendChild(alertText);
        orderedProductsAlert.appendChild(alert);
        alert.style.color = "green";
    }
}

//Create a dropdown list for countries (developed this to avoid manual creation of options in index.html)
const addOriginCountryOption = () => {
    const uniqueCountryList = [...new Set(products.map(product => product.originCountry))];//get unique list. I use map because it gives me acces to property of object product

    const originCountryList = document.getElementById("originCountry")
    originCountryList.innerHTML = "";//reset list

    //Create option "All"
    const allOption = document.createElement("option");
    allOption.textContent = "All";
    allOption.value = "";
    originCountryList.appendChild(allOption);

    //Create rest options from the unique list
    uniqueCountryList.forEach(country => {
        const option = document.createElement("option");
        option.textContent = country;
        option.value = country;
        originCountryList.appendChild(option);
    });
}

//Create a dropdown list for categories (developed this to avoid manual creation of options in index.html)
const addCategoryOptions = () => {
    const uniqueCategoryList = [...new Set(products.map(product => product.category))];//get unique list. I use map because it gives me acces to property of object product

    const categoryList = document.getElementById("categoryFilter")
    categoryList.innerHTML = "";//reset list

    //Create option "All"
    const allOption = document.createElement("option");
    allOption.textContent = "All";
    allOption.value = "";
    categoryList.appendChild(allOption);

    //Create rest options from the unique list
    uniqueCategoryList.forEach(category => {
        const option = document.createElement("option");
        option.textContent = category;
        option.value = category;
        categoryList.appendChild(option);
    });
}

//Filter section which contains interconnected filters that update each other as the user interacts with them
const currentFilters = {
    name: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    originCountry: "",
};



const applyFilters = () => {
    const filteredProducts = products.filter(product => {
        let isAvailable = true;

        if (currentFilters.name) {
            isAvailable = product.name.toLowerCase().includes(currentFilters.name.toLowerCase());
        }//am schimbat startsWith cu includes pentru ca la cautarea"sui..." dadea doar "suit", dar nu si "bodysuit"

        if (currentFilters.minPrice && currentFilters.maxPrice) {
            isAvailable = isAvailable && (product.price >= currentFilters.minPrice && product.price <= currentFilters.maxPrice)
        }

        if (currentFilters.category) {
            isAvailable = isAvailable && product.category === currentFilters.category;
        }

        if (currentFilters.originCountry) {
            isAvailable = isAvailable && product.originCountry === currentFilters.originCountry;
        }

        return isAvailable;
    });
    renderProducts(filteredProducts);
};

//Adding event listeners (Radu, I know you recommended to avoid this method, but in this example I don't know how to apply first method)
document.getElementById("byName").addEventListener("input", () => {
    currentFilters.name = document.getElementById("byName").value;
    applyFilters();
});//explanation "currentFilters.name = document.getElementById("byName").value;" updates the name property of the currentFilters object by assigning the current value of the input field (i.e., what the user has typed) to the name property.
//Then, after update, is called applyFilters();

document.getElementById("minPrice").addEventListener("input", () => {
    currentFilters.minPrice = document.getElementById("minPrice").value;
    applyFilters();
});

document.getElementById("maxPrice").addEventListener("input", () => {
    currentFilters.maxPrice = document.getElementById("maxPrice").value;
    applyFilters();
});

document.getElementById("categoryFilter").addEventListener("change", () => {
    currentFilters.category = document.getElementById("categoryFilter").value;
    applyFilters();
});

document.getElementById("originCountry").addEventListener("change", () => {
    currentFilters.originCountry = document.getElementById("originCountry").value;
    applyFilters();
});

applyFilters();

//Functionality: Reset filters
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

//Functia care va apela functiile create mai sus, fara acestea nu se vor randa elementele create, dar le-am cumulat aici pentru ca sa fie mai curat
const init = () => {
    renderProducts(products);
    renderOrderedProducts();
    addOriginCountryOption();
    addCategoryOptions();
}

init();