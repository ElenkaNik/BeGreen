let products;
sendRequest();

function getProducts() {
    return products;
}

function getProduct(id) {
    for (product of getProducts()) {
        if (product.id == id) {
            return product;
        }
    }
}
