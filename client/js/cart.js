const cartTotal = $('.total');
const cart = loadCart();

function isCartEmpty() {
    let size = cart.length;
    return size === 0;
}

function addToCart(id, amount) {
    let item = findItem(id);
    if (item === undefined) {
        cart.push([id, amount]);
    } else {
        const currentAmount = item[1];
        item[1] = currentAmount + amount;
    }
    saveCart();
}

function increaseAmount(id) {
    addToCart(id, 1);
}

function decreaseAmount(id) {
    const item = findItem(id);
    const currentAmount = item[1];
    if (currentAmount > 1) {
        item[1] = currentAmount - 1;
    } else {
        removeItem(id);
    }
    saveCart();
}

function removeItem(id) {
    let item = findItem(id);
    let index = cart.indexOf(item);
    cart.splice(index, 1);
    saveCart();
}

function findItem(id) {
    for (item of cart) {
        if (item[0] === id) {
            return item;
        }
    }
}

function saveCart() {
    const json = JSON.stringify(cart);
    localStorage.setItem("cart", json);
    prepareCart();
}

function loadCart() {
//    localStorage.removeItem("cart");
    const json = localStorage.getItem("cart");
    if (json === null) {
        return [];
    } else {
        let array = JSON.parse(json);
        return array;
    }
}

function updateTotal() {
    let total = 0;
    for (item of cart) {
        total += item[1];
    }
    cartTotal.text(total);
}