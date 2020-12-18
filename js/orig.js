const fs = require('fs')

var cartNum = 1;
var carts = [];
var cartsPrice = [];
var newItemPart1 = '<a class="btn new-item" data-id="';
var newItemPart2 = '">Новый предмет</a>';
var newItemId;
var totalPrice;

function updatePrice (check) {
    totalPrice = 0;
    for (var i = 0; i < carts.length; i++) {
        newPricesFromTable = carts[i].rows().data().toArray();
        totalTablePrice = 0;
        for (var j = 0; j < newPricesFromTable.length; j++) {
            newPrice = carts[i].rows().data().toArray()[j][3];
            totalTablePrice += newPrice;
        }
        $('#carts-total-' + (i + 1) + ' span')[0].innerHTML = parseInt(totalTablePrice);
        totalPrice += totalTablePrice;
    }
    $('.total-price p')[0].innerHTML = parseInt(totalPrice);
}

$('.new-cart').click(function () {
    $('.carts')[0].innerHTML += "<div id='cart-" + cartNum + "'><h3>Корзина №" + cartNum + "<span class='remove-cart btn' data-id='" + cartNum + "'>Удалить корзину</span><span class='remove-select btn' data-id='" + cartNum + "'>Удалить выбранное</span></h3><table></table>" + newItemPart1 + cartNum + newItemPart2 + "</div>";
    cartsPrice.push([0]);
    $('.carts-total')[0].innerHTML += '<p id="carts-total-' + cartNum + '">Корзина №' + cartNum + ' - <span>0</span></p>';
    carts.push($('#cart-' + cartNum + ' table').DataTable({
        lengthMenu: [-1],
        sDom: "ftr",
        select: true,
        columns: [
            {title: "Название"},
            {title: "Кол-во"},
            {title: "Цена"},
            {title: "Общая Цена"},
        ],
    }));
    cartNum++;
    $('.new-item').click(function () {
        $('.mask').css('display', 'block');
        $('.newItems').css('display', 'block');
        $('input#item').focus();
        newItemId = parseInt($(this).data('id') - 1);
        updatePrice();
    });
    $('.remove-cart').click(function () {
        cartId = parseInt($(this).data('id'));
        updatePrice();
        carts.splice(cartId, 1);
        carts[cartId - 1].destroy();
        $('#cart-' + cartId).remove();
        $('#carts-total-' + cartId).remove();
    });
    $('.remove-select').click(function () {
        cartId = $(this).data('id');
        carts[cartId - 1].rows('.selected').remove().draw(false);
        updatePrice();
    });
    updatePrice();
});


$('.mask').click(function () {
    $('.mask').css('display', 'none');
    $('.newItems').css('display', 'none');
});

$('.newItems .btn').click(function () {
    var item = $('#item')[0];
    var qty = $('#qty')[0];
    var price = $('#price')[0];
    var itemError;
    var qtyError;
    var priceError;
    if (item.value == "") {
        $('#item-line .error')[0].innerHTML = 'заполните поле';
        itemError = true;
    }else {
        $('#item-line .error')[0].innerHTML = '';
        itemError = false;
    }
    if (qty.value == "") {
        $('#qty-line .error')[0].innerHTML = 'заполните поле';
        qtyError = true;
    }else {
        $('#qty-line .error')[0].innerHTML = '';
        qtyError = false
    }
    if (price.value == "") {
        $('#price-line .error')[0].innerHTML = 'заполните поле';
        priceError = true;
    }else {
        $('#price-line .error')[0].innerHTML = '';
        priceError = false
    }
    if (!itemError && !qtyError && !priceError) {
        total = parseInt(qty.value) * parseInt(price.value);
        carts[newItemId].row.add([
            item.value,
            qty.value,
            price.value,
            total
        ]).invalidate().draw(true);
        cartsPrice[newItemId] = total;
        item.value = "";
        qty.value = "";
        price.value = "";
        $('.mask').css('display', 'none');
        $('.newItems').css('display', 'none');
        updatePrice();
    }
});
