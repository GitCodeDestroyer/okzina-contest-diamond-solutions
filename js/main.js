var cartsNum = 1,
carts = [],
cartsPrice = [],
cartsData = [],
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

function updateTable (num, data) {
    $('#cart-' + num)[0].innerHTML = "<h3>Корзина №" + num + "<span class='remove-cart btn' data-id='" + num + "'>Удалить корзину</span><span class='remove-select btn' data-id='" + num + "'>Удалить выбранное</span></h3><table></table><a class='btn add-item' data-id='" + num + "'>Новый предмет</a>";
    carts[parseInt(num - 1)] = $('#cart-' + num + ' table').DataTable({
        lengthMenu: [-1],
        sDom: "ftr",
        select: true,
        columns: [
            {title: "Название"},
            {title: "Кол-во"},
            {title: "Цена"},
            {title: "Общая Цена"},
        ],
        data: data
    });
    reInitBtns();
}

function reInitBtns () {
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
        cartsData.push([]);
        cartsNum++;
        for (var i = 0; i < (carts.length - 1); i++) {
            console.log(i);
            carts[i].rows('.selected').remove();
        }    
        reInitBtns();
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
            cartsData[newItemId].push(newRow);
            carts[newItemId].clear().destroy();
            carts[newItemId] = null;
            newItem = parseInt(newItemId + 1);
            updateTable(newItem, cartsData[newItemId]);
            $('.mask').css('display', 'none');
            $('.new-item').css('display', 'none');
        }
    });
});