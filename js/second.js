const fs = require('fs');

var cartsNum = 1,
carts = [],
cartsPrice = [],
newItemId = 0,
totalOfCart,
item,
qty,
price,
itemError,
qtyError,
priceError;

function updatePrices () {

}

$(document).ready(function () {
    $('.new-cart').click(function () {
        $('.carts')[0].innerHTML += "<div id='cart-" + cartsNum + "'><h3>Корзина №" + cartsNum + "<span class='remove-cart btn' data-id='" + cartsNum + "'>Удалить корзину</span><span class='remove-select btn' data-id='" + cartsNum + "'>Удалить выбранное</span></h3><table></table><a class='btn add-item' data-id='" + cartsNum + "'>Новый предмет</a></div>";
        $('.carts-total')[0].innerHTML += '<p id="carts-total-' + cartsNum + '">Корзина №' + cartsNum + ' - <span>0</span></p>';
        carts.push($('#cart-' + cartsNum + ' table').DataTable({
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
        cartsPrice.push([0]);
        cartsNum++;

        $('.add-item').click(function () {
            $('.mask').css('display', 'block');
            $('.new-item').css('display', 'block');
            $('input#item').focus();
            newItemId = parseInt($(this).data('id') - 1);
        });
        $('.remove-cart').click(function () {

        });
        $('.remove-select').click(function () {

        });

        updatePrices();
    });

    $('.mask').click(function () {
        $('.mask').css('display', 'none');
        $('.new-item').css('display', 'none');
    });

    $('.new-item .btn').click(function () {
        item = $('#item')[0];
        qty = $('#qty')[0];
        price = $('#price')[0];
        itemError = true;
        qtyError = true;
        priceError = true;
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
            totalOfCart = parseInt(qty.value) * parseInt(price.value);
            newRow = [
                item.value,
                parseInt(qty.value),
                parseInt(price.value),
                parseInt(totalOfCart)
            ];
            carts[newItemId].row.add(newRow).draw();
            $('.mask').css('display', 'none');
            $('.new-item').css('display', 'none');
        }
    });
});