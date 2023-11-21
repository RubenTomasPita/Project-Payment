//Funcion para guardar los items
function saveCartItems() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = document.getElementsByClassName('cart-box');
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            imageSrc: productImg
        };
        cartItems.push(item);
    }

    localStorage.setItem('CartItems', JSON.stringify(cartItems));
}

//Configuracion del boton
const paybtn = document.querySelector(".btn-buy");
paybtn.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    console.log("Botón de pago clickeado");
    await saveCartItems();

    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        items: JSON.parse(localStorage.getItem("CartItems")),
      }),
    });

    const data = await response.json();

    window.location.href = data.url;
  } catch (err) {
    console.error(err);
  }
});



// Función para guardar los productos correctamente
async function saveCartItems() {
  return new Promise((resolve) => {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = document.getElementsByClassName('cart-box');
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
      var priceElement = cartBox.getElementsByClassName('cart-price')[0];
      var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
      var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

      var item = {
        title: titleElement.innerText,
        price: priceElement.innerText,
        quantity: quantityElement.value,
        imageSrc: productImg
      };
      cartItems.push(item);
    }

    //Por ultimo aqui se resolvera la promesa
    localStorage.setItem('CartItems', JSON.stringify(cartItems));
    resolve(); 
  });
}
