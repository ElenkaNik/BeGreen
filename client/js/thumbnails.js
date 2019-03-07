function createThumbnails(products) {
    const container = $('#products_container');
    for (product of products) {
        let thumbnail = createProductThumbnail(product);
        container.append(thumbnail);
    }

    $('.grid').isotope({
        itemSelector: '.product-item-wrap',
        layoutMode: 'masonry'
    });
}

function createProductThumbnail(product) {
    let productFlashWrap = $('<div></div>');
    productFlashWrap.addClass('product-flash-wrap');

    let img = createImage(product);
    let productThumbPrimary = $('<div></div>');
    productThumbPrimary.addClass('product-thumb-primary');
    productThumbPrimary.append(img);

    let productHoverSign = $('<div></div>');
    productHoverSign.addClass('product-hover-sign');
    productHoverSign.append($('<hr/>'));
    productHoverSign.append($('<hr/>'));

    let productLink = $('<a href="#"></a>');
    productLink.addClass('product-link');
    productLink.attr('productId', product.id);
    productLink.on('click', onProductClicked);
    productLink.append(productHoverSign);

    let starRating = createStarRating(product.rating);
    let h3 = $('<h3></h3>');
    h3.text(product.title);
    let a = $('<a href="#"></a>');
    a.append(h3);

    let price = createPrice(product.price);

    let productInfo = $('<div></div>');
    productInfo.addClass('product-info');
    productInfo.append(starRating);
    productInfo.append(a);
    productInfo.append(price);

    let faCartPlus = $('<i></i>');
    faCartPlus.addClass('fa fa-cart-plus');
    faCartPlus.attr('productId', product.id);

    let addToCartButton = $('<a href="#"></a>');
    addToCartButton.addClass('add_to_cart_button');
    addToCartButton.text('Add to cart');
    addToCartButton.append(faCartPlus);
    addToCartButton.attr('productId', product.id);
    addToCartButton.on('click', onAddToCartThumbnailClicked);

    let addToCartWrap = $('<div></div>');
    addToCartWrap.addClass('add-to-cart-wrap');
    addToCartWrap.append(addToCartButton);

    let productActions = $('<div></div>');
    productActions.addClass('product-actions');
    productActions.append(addToCartWrap);

    let productThumb = $('<div>');
    productThumb.addClass('product-thumb');
    productThumb.append(productFlashWrap);
    productThumb.append(productThumbPrimary);
    productThumb.append(productLink);
    productThumb.append(productInfo);
    productThumb.append(productActions);

    let productItemInner = $('<div></div>');
    productItemInner.addClass('product-item-inner');
    productItemInner.append(productThumb);

    let li = $('<li data-category="outdoor"></li>>');
    li.addClass('element-item product-item-wrap product-style_1 featured indoor new seeds');
    li.append(productItemInner);

    return li;
}

function createImage(product) {
    let img = $('<img/>');
    img.attr('src', product.img);
    img.attr('alt', product.title);
    img.width(375);
    img.height(450);
    img.addClass('attachment-shop_catalog size-shop_catalog wp-post-image');
    return img;
}

function createStarRating(rating) {
    let starRating = $('<div class="star-rating"></div>');
    for (let i = 0; i < 5; i++) {
        let star = $('<i></i>');
        if (i < rating) {
            star.addClass('fa fa-star');
        } else {
            star.addClass('fa fa-star-o');
        }
        starRating.append(star);
    }

    return starRating;
}

function createPrice(price) {
    let currencySymbol = $('<span></span>');
    currencySymbol.addClass('product-begreen-price-currencysymbol');
    currencySymbol.text('$');

    let amount = $('<span></span>');
    amount.addClass('product-begreen-price-amount amount');
    amount.append(currencySymbol);
    amount.append(document.createTextNode(price));

    let priceSpan = $('<span></span>');
    priceSpan.addClass('price');
    priceSpan.append(amount);

    return priceSpan;
}

function onAddToCartThumbnailClicked(e) {
    e.preventDefault();
    let id = $(e.target).attr('productId');
    increaseAmount(id);
}