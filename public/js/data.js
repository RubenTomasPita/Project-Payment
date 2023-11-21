let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Abrir carrito
cartIcon.onclick = () => {
    cart.classList.add('cart-active');
}

// Cerrar carrito
closeCart.onclick = () => {
    cart.classList.add('cart-closing');
    setTimeout(() => {
        cart.classList.remove('cart-active', 'cart-closing');
    }, 300); 
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//Funcion para remover del carrito
function ready() {
    var removeCarButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCarButtons.length; i++) {
        var button = removeCarButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    updateCartTotal();

  
    var addToCartButtons = document.querySelectorAll('.add-cart');
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', addToCart);
    }


    function updateCartIconQuantity() {
        var cartItems = document.querySelectorAll('.cart-box');
        var cartQuantity = cartItems.length;
        var cartQuantitySpan = document.getElementById('cart-quantity');
        cartQuantitySpan.textContent = cartQuantity;
    }
    
   // Función para agregar un producto al carrito
function addToCart(event) {
    var button = event.target;
    var productBox = button.closest('.product-box');
  
    var productTitle = productBox.querySelector('.product-tittle').textContent;
    var productPrice = productBox.querySelector('.price').textContent;
    var productImage = productBox.querySelector('.product.img').src;
    var cartItems = document.querySelectorAll('.cart-box');
    for (var i = 0; i < cartItems.length; i++) {
        var titleElement = cartItems[i].querySelector('.cart-product-title');
        if (titleElement && titleElement.innerText === productTitle) {
            alert('Este producto ya está en el carrito.');
            return;
        }
    }
 addItemToCart(productTitle, productPrice, productImage);
    updateCartIconQuantity(); 
  cart.classList.remove('cart-active', 'cart-closing');
}



// Aquí hacemos el remove
function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartItem = buttonClicked.closest(".cart-box");
    cartItem.remove();
    updateCartTotal();
    updateCartIconQuantity();
    cart.classList.remove('cart-active', 'cart-closing');
}

    // Función para agregar un elemento al carrito
    function addItemToCart(title, price, imageSrc) {
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-box');
        var cartContent = document.querySelector('.cart-content');

        var cartItemContents = `
            <img src="${imageSrc}" alt="cart-img" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" name="" id="" value="1" class="cart-quantity">
            </div>
            <div class="cart-remove-container">
                <i class="bx bx-trash-alt cart-remove"></i>
            </div>
        `;

        cartItem.innerHTML = cartItemContents;
        cartContent.appendChild(cartItem);

        // Agregar manejadores de eventos a los nuevos elementos del carrito
        var quantityInput = cartItem.querySelector('.cart-quantity');
        var removeButton = cartItem.querySelector('.cart-remove');

        quantityInput.addEventListener('change', quantityChanged);
        removeButton.addEventListener('click', removeCartItem);

        updateCartTotal();
    }

    // Aquí hacemos el remove
    function removeCartItem(event) {
        var buttonClicked = event.target;
        var cartItem = buttonClicked.closest(".cart-box");
        cartItem.remove();
        updateCartTotal();
        updateCartIconQuantity(); 
    }

    function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCartTotal();
    }
 
    //Actualizar el precio
    function updateCartTotal() {
        var cartItems = document.getElementsByClassName("cart-box");
        var total = 0;

        for (var i = 0; i < cartItems.length; i++) {
            var cartItem = cartItems[i];
            var priceElement = cartItem.querySelector(".cart-price");
            var quantityElement = cartItem.querySelector(".cart-quantity");
            var price = parseFloat(priceElement.textContent.replace("$", "").replace(",", ""));
            var quantity = quantityElement.value;
            total += price * quantity;
        }

        var totalElement = document.querySelector(".total-price");
        totalElement.textContent = "$" + total.toFixed(2);
    }



//Funcion para cargar articulos
function loadCartItems() {
    var cartItems = JSON.parse(localStorage.getItem('CartItems'));
    if (cartItems) {
        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addItemToCart(item.title, item.price, item.imageSrc, item.quantity);
        }
        updateCartTotal();
    }
}

// Actualizar la cantidad en el ícono del carrito
updateCartIconQuantity();

//Funcion para actualizar el precio (Quantity)
function updateCartIconQuantity() {
    var cartItems = document.querySelectorAll('.cart-box');
    var cartQuantity = cartItems.length;
    var cartQuantitySpan = document.getElementById('cart-quantity');

   
    cartQuantitySpan.textContent = cartQuantity;
}}
