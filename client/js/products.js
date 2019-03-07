const products = [
    {
        id: 1,
        title: "Succulent",
        price: 15.3,
        description: "A simple cactus",
        rating: 4,
        img: "https://images-na.ssl-images-amazon.com/images/I/51IwmuOPQyL._SL1052_.jpg"
    },
    {
        id: 2,
        title: "Palm",
        price: 24.99,
        description: "A simple palm",
        rating: 5,
        img: "https://images.homedepot-static.com/productImages/67107669-aedd-415d-9929-c6b08df42cc7/svn/costa-farms-house-plants-10maj-64_1000.jpg"
    }];

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