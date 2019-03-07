const productDescriptionModal = $('#productDescriptionModal');

const cartModal = $('.cart-form');
const cartTable = $('.cart-form table');
const cartButton = $('.shopping-cart-wrapper');
cartButton.on('click', (e) => {
    cartModal.modal('show');
});

$('.process').on('click', () => {
    sendOrder(cart);
});

// При загрузке невидимое модальное окно почему-то перекрывает страницу
// Если его показать и опять скрыть - то нормально работает
productDescriptionModal.modal('show');
productDescriptionModal.modal('hide');
cartModal.modal('show');
cartModal.modal('hide');

function onProductClicked(e) {
    e.preventDefault();

    let id = $(e.target).attr('productId');
    let product = getProduct(id);
    prepareProductDescriptionModal(product);

    productDescriptionModal.modal('show');
}

function prepareProductDescriptionModal(product) {
    $('#productDescriptionImage').attr('src', product.img);
    $('#productDescriptionHeader').text(product.header);
    $('#productDescriptionPrice').text(product.price);
    $('#productDescriptionText').text(product.description);

    let addToCartButton = $('.single_add_to_cart_button');
    addToCartButton.attr('productId', product.id);
    addToCartButton.on('click', onAddToCartClicked);
}

function onAddToCartClicked(e) {
    e.preventDefault();
    let id = $(e.target).attr('productId');
    let textField = $('.quantity-inner .qty');
    let amount = +textField.val();

    addToCart(id, amount);
    productDescriptionModal.modal('hide');
}

function onDecreaseClicked(e) {
    let id = $(e.target).attr('productId');
    decreaseAmount(id);
    prepareCart();
}

function onIncreaseClicked(e) {
    let id = $(e.target).attr('productId');
    increaseAmount(id);
    prepareCart();
}

function onRemoveClicked(e) {
    let id = $(e.target).attr('productId');
    removeItem(id);
    prepareCart();
}

function prepareCart() {
    updateTotal();
    cartTable.empty();

    let header = $("<tr></tr>");
    header.append('<th>Product</th>');
    header.append('<th> </th>');
    header.append('<th>Price</th>');
    header.append('<th>Quantity</th>');
    header.append('<th>Total</th>');
    header.append('<th> </th>');
    cartTable.append(header);

    for (item of cart) {
        let product = getProduct(item[0]);
        let row = createCartRow(product, item[1]);
        cartTable.append(row);
    }
}

function createCartRow(product, productQuantity) {
    let productImage = $('<td></td>');
    let img = $('<img></img>');
    img.attr('src', product.img);
    img.width(180);
    img.height(220);
    productImage.append(img);

    let name = $('<td></td>');
    let nameSpan = $('<span class="name-product"></span>');
    nameSpan.text(product.title);
    name.append(nameSpan);

    let price = $('<td></td>');
    let priceSpan = $('<span class="price"></span>');
    priceSpan.text('$' + product.price);
    price.append(priceSpan);

    let decrease = $('<i>-</i>');
    decrease.attr('productId', product.id);
    decrease.on('click', onDecreaseClicked);
    let amount = $('<span class="quantity"></span>');
    amount.text(productQuantity);
    let increase = $('<i>+</i>');
    increase.attr('productId', product.id);
    increase.on('click', onIncreaseClicked);

    let quantity = $('<td></td>');
    quantity.append(decrease);
    quantity.append(amount);
    quantity.append(increase);

    let total = $('<td></td>');
    let totalSpan = $('<span class="total"></span>');
    totalSpan.text('$' + (product.price * productQuantity));
    total.append(totalSpan);

    let remove = $('<td><i class="fa fa-times"></i></td>');
    remove.attr('productId', product.id);
    remove.on('click', onRemoveClicked);

    let row = $('<tr></tr>');
    row.append(productImage);
    row.append(name);
    row.append(price);
    row.append(quantity);
    row.append(total);
    row.append(remove);

    return row;
}
