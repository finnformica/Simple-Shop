let addToCartButtons = document.querySelectorAll(".add-cart");

let items = [
  {
    'name': 'Santa',
    'tag': 'santa',
    'price': 1,
    'qty': 0
  },
  {
    'name': 'Snowman',
    'tag': 'snowman',
    'price': 2,
    'qty': 0
  },
  {
    'name': 'Elf',
    'tag': 'elf',
    'price': 3,
    'qty': 0
  },
  {
    'name': 'Penguin',
    'tag': 'penguin',
    'price': 4,
    'qty': 0
  }
];

for (let i=0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener('click', () => {
    addItemToCart(items[i]);
  })
};

// load and display the quantity of the cart
function displayCartQuantity() {
  let cartQuantity = localStorage.getItem('cartQuantity');
  cartQuantity = parseInt(cartQuantity);

  if (cartQuantity) {
    document.querySelector(".cart span").textContent = cartQuantity;
  };
}

// add item to the cart (local storage)
function addItemToCart(item) {
  let cartItems = localStorage.getItem("cart");
  cartItems = JSON.parse(cartItems);

  if ( cartItems ) {

    if ( cartItems[item.tag] == undefined ) {
      cartItems = {
        ...cartItems,
        [item.tag]: item
      }
    }
    cartItems[item.tag].qty += 1;

  } else {
    item.qty = 1;
    cartItems = {
      [item.tag]: item
    }
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));

  calculateCartQuantity();
  calculateCost(item);
}

// calculate the quantity of the cart
function calculateCartQuantity() {
  let cartItems = localStorage.getItem("cart");
  cartItems = JSON.parse(cartItems);
  tags = Object.keys(cartItems)
  let qty = 0;

  for (let i = 0; i < tags.length; i++) {
    qty += cartItems[tags[i]].qty;
  }

  let cartQuantity = localStorage.getItem('cartQuantity');

  if (cartQuantity) {
    localStorage.setItem('cartQuantity', qty);
    document.querySelector(".cart span").textContent = qty;
  } else {
    localStorage.setItem('cartQuantity', 1);
    document.querySelector(".cart span").textContent = 1
  }
}

// calculate the cost of the cart
function calculateCost(item) {
  let cartItems = localStorage.getItem("cart");
  cartItems = JSON.parse(cartItems);
  tags = Object.keys(cartItems)
  let cost = 0;

  for (let i = 0; i < tags.length; i++) {
    cost += cartItems[tags[i]].qty * cartItems[tags[i]].price;
  }

  let cartCost = localStorage.getItem("cost");

  if (cartCost) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("cost", cost);
  } else {
    localStorage.setItem("cost", item.price);
  }
}


displayCartQuantity();
