function displayCart() {
  let cartItems = localStorage.getItem("cart");
  cartItems = JSON.parse(cartItems);

  let totalCost = localStorage.getItem("cost");
  totalCost = JSON.parse(totalCost);

  let tableBody = document.querySelector(".table-body")
  if (cartItems && tableBody) {
    tableBody.innerHTML = "";
    Object.values(cartItems).map(item => {
      tableBody.innerHTML += `
      <tr>
        <td style="vertical-align: middle;"><img class="thumbnail rounded-circle mr-2 " src="static/images/${item.tag}.jpeg"> ${item.name}</td>
        <td class="text-center" style="vertical-align: middle;">£${item.price}</td>
        <td class="text-center" style="vertical-align: middle;">
        <a class="minus mr-2" href="#" onclick="subtractFromCart('${item.tag}', 1)"><i class="fas fa-minus"></i></a>
        <span>${item.qty}</span>
        <a class="plus ml-2" href="#" onclick="addToCart('${item.tag}')"><i class="fas fa-plus"></i></a>
        </td>
        <td class="text-center" style="vertical-align: middle;">£${item.qty * item.price}</td>
        <td class="text-center" style="vertical-align: middle;"><a href="#" onclick="subtractFromCart('${item.tag}')"><i class="fas fa-trash delete"></i></a></td>
      </tr>
      `
    });
    tableFoot = document.querySelector(".table-foot");
    tableFoot.innerHTML = "";
    tableFoot.innerHTML += `
    <tr class="foot">
      <td></td>
      <td></td>
      <td class="text-center"></td>
      <td class="text-center" style="vertical-align: middle;"><h5>£${totalCost}</h4></td>
      <td class="text-center" style="vertical-align: middle;"><h4>Total Cost</h4></td>
    </tr>
    `
  }
}

function addToCart(tag) {
  let items = localStorage.getItem("cart");
  items = JSON.parse(items);

  items[tag].qty += 1;
  localStorage.setItem("cart", JSON.stringify(items))
  calculateCartQuantity();
  calculateCost()
  displayCart();
}

function subtractFromCart(tag, qty=0) {
  let items = localStorage.getItem("cart");
  items = JSON.parse(items);

  items[tag].qty -= 1;
  if (items[tag].qty < 1 || qty === 0) {
    delete items[tag];
  }
  localStorage.setItem("cart", JSON.stringify(items))
  calculateCartQuantity();
  calculateCost()
  displayCart();
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
function calculateCost() {
  let cartItems = localStorage.getItem("cart");
  cartItems = JSON.parse(cartItems);
  tags = Object.keys(cartItems)
  let cost = 0;

  for (let i = 0; i < tags.length; i++) {
    cost += cartItems[tags[i]].qty * cartItems[tags[i]].price;
  }

  localStorage.setItem("cost", cost);
}
//
// let tbody = document.querySelectorAll(".products-container table tbody");
// tr = tbody.getElementsByTagName("tr");
// console.log(tr);
// let subtractions = document.querySelectorAll(".minus")
//
// for (let i=0; i < additions.length; i++) {
//   additions[i].addEventListener("click", () => {
//     console.log(additions[i]);
//   });
// };
//
// for (let i=0; i < subtractions.length; i++) {
//   subtractions[i].addEventListener("click", () => {
//     console.log(subtractions[i]);
//   });
// };

// subtractFromCart('snowman');
displayCart();
