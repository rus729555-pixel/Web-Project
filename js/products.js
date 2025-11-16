document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll(".product-item");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const filter = btn.getAttribute("data-filter");
      buttons.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      items.forEach(function (item) {
        if (filter === "*" || item.matches(filter)) {
          item.classList.remove("d-none");
          item.classList.add("pop");
          setTimeout(function () {
            item.classList.remove("pop");
          }, 300);
        } else {
          item.classList.add("d-none");
        }
      });
    });
  });

  const modal = document.getElementById("exampleModal");
  const bsModal = new bootstrap.Modal(modal);
  const modalTitleEl = document.getElementById("modalProductTitle");
  const modalImgEl = document.getElementById("modalProductImg");
  const modalNameEl = document.getElementById("modalProductName");
  const modalDescEl = document.getElementById("modalProductDesc");
  const modalPriceEl = document.getElementById("modalProductPrice");
  const modalAddBtn = document.getElementById("modalAddToCart");
  const cartFeedback = document.getElementById("cartFeedback");

  let currentProduct = null;

  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const img = card.querySelector(".product-trigger");
      if (!img) {
        return;
      }

      const name = img.dataset.name || "";
      const price = img.dataset.price || "";
      const description = img.dataset.description || "";
      const src = img.dataset.img || img.src;

      currentProduct = {
        name: name,
        price: price,
        description: description,
        img: src
      };

      modalTitleEl.textContent = name || "Product Details";
      modalNameEl.textContent = name;
      modalDescEl.textContent = description;
      modalPriceEl.textContent = price ? price + " BD" : "";

      modalImgEl.src = src;
      modalImgEl.alt = name;

      cartFeedback.classList.add("d-none");
      bsModal.show();
    });
  });

  const cartSection = document.getElementById("cart-section");
  const cartItemsWrap = document.getElementById("cart-items");
  const buyBtn = document.getElementById("buyBtn");
  const buyMessage = document.getElementById("buyMessage");

  cartSection.classList.remove("d-none");

  const CART_KEY = "alphaCart";
  let cartItemsData = [];

  function normalizeCart(arr) {
    const map = {};
    arr.forEach(function (item) {
      if (!item || !item.name) return;
      const key = item.name;
      if (!map[key]) {
        map[key] = {
          name: item.name,
          price: item.price,
          description: item.description,
          img: item.img,
          qty: 0
        };
      }
      const addQty =
        typeof item.qty === "number" && item.qty > 0 ? item.qty : 1;
      map[key].qty += addQty;
    });
    return Object.values(map);
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItemsData));
  }

function renderCart() {
  cartItemsWrap.innerHTML = "";

  if (cartItemsData.length === 0) {
    buyMessage.innerHTML =
      '<div class="alert alert-info mb-0 text-center">Your cart is empty.</div>';
    return;
  }

  buyMessage.innerHTML = "";

  cartItemsData.forEach(function (item, index) {
    const col = document.createElement("div");
    col.className = "col-9 col-md-6 col-lg-4 cart-item-col mb-3";
    col.dataset.index = index;

    col.innerHTML =
      '<div class="card cart-item-card h-100 mb-3">' +
        '<img src="' + item.img + '" alt="' + item.name + '" class="card-img-top cart-item-img mt-3">' +
        '<div class="card-body py-3">' +
          '<h5 class="card-title mb-1">' + item.name + "</h5>" +
          '<p class="card-text mb-2 small">' + item.description + "</p>" +
          '<p class="card-text fw-bold mb-1">' + item.price + " BD</p>" +
          '<p class="card-text mb-2">Qty: ' + item.qty + "</p>" +
          '<button type="button" class="btn btn-sm btn-outline-danger remove-cart-item d-block my-0 mx-auto">Remove</button>' +
        "</div>" +
      "</div>";

    cartItemsWrap.appendChild(col);
  });
}


function loadCart() {
const saved = localStorage.getItem(CART_KEY);
if (saved) {
    try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
        cartItemsData = normalizeCart(parsed);
    } else {
          cartItemsData = [];
        }
      } catch (e) {
        cartItemsData = [];
      }
    } else {
      cartItemsData = [];
    }
    renderCart();
}

  loadCart();

modalAddBtn.addEventListener("click", function () {
  if (!currentProduct) return;

  const existingIndex = cartItemsData.findIndex(p => p.name === currentProduct.name);
  let thisQty = 1;

  if (existingIndex !== -1) {
      if (cartItemsData[existingIndex].qty >= 10) {
        cartFeedback.textContent = "Maximum (10) reached for " + currentProduct.name;
        cartFeedback.classList.remove("d-none");
        return;
      }

      cartItemsData[existingIndex].qty += 1;
      thisQty = cartItemsData[existingIndex].qty;

  } else {
      cartItemsData.push({
        name: currentProduct.name,
        price: currentProduct.price,
        description: currentProduct.description,
        img: currentProduct.img,
        qty: 1
      });
      thisQty = 1;
  }
  saveCart();
  renderCart();

  cartFeedback.textContent =
    thisQty === 10
      ? "Reached max (10)"
      : thisQty + " " + currentProduct.name + " in cart";

  cartFeedback.classList.remove("d-none");
});



cartItemsWrap.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-cart-item")) {
    const col = e.target.closest(".cart-item-col");
    if (!col) return;

    const index = Number(col.dataset.index);
    if (isNaN(index)) return;

    cartItemsData[index].qty -= 1;

    if (cartItemsData[index].qty <= 0) {
      cartItemsData.splice(index, 1);
    }
    saveCart();
    renderCart();
  }
});


  buyBtn.addEventListener("click", function () {
    const itemsCount = cartItemsData.length;

    if (itemsCount === 0) {
      buyMessage.innerHTML =
        '<div class="alert alert-danger text-center mb-0">Your cart is empty.</div>';
      return;
    }

    const savedUser = localStorage.getItem("alphaUser");
    if (!savedUser) {
      buyMessage.innerHTML =
        '<div class="alert mb-0">Please register or login first so we can send your payment details.</div>';
      return;
    }

    const user = JSON.parse(savedUser);
    const phone = user.phone || "";
    const email = user.email || "";

    buyMessage.innerHTML =
      '<div class="alert alert-success mb-0">Payment message was sent to your number ' +
      phone +
      ' and email ' +
      email +
      '.</div>';
  });
});
