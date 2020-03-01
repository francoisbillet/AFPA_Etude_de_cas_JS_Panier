// let cart = [{ code: 1, quantity: 1, priceU: 5, price: 5 }];
let cart = [];
const MAX_PRICE = 100;

const codeElt = document.getElementById("code");
const quantityElt = document.getElementById("quantity");
const priceElt = document.getElementById("price");
const cartButtonElt = document.getElementById("cartButton");
const cartElt = document.getElementById("cart");
const sumCartElt = document.getElementById("sum");

// ---------------------------------- RANDOM ----------------------------------

const setRandomPrice = () => {
  return Math.floor(Math.random() * MAX_PRICE);
};

const getRandomPrice = code => {
  const item = cart.find(element => element.code === code);
  if (!item) {
    // Si le code n'est pas dans le panier
    return setRandomPrice(code);
  }
  return item.price;
};

// ---------------------------------- VALIDITE DES CHAMPS ----------------------------------

const validFields = () => {
  return codeElt.value && quantityElt.value;
};

const validValues = () => {
  return (
    codeElt.value >= 1 &&
    codeElt.value <= 10000 &&
    quantityElt.value >= 1 &&
    quantityElt.value <= 100
  );
};

// ---------------------------------- AJOUT D'ELEMENTS AU PANIER ----------------------------------

const addToCart = () => {
  if (validFields()) {
    if (validValues()) {
      const item = cart.find(
        element => element.code === parseInt(codeElt.value)
      );
      const newPrice = quantityElt.value * priceElt.value;
      if (!item) {
        // Si le code n'est pas dans le panier, on le rajoute au panier
        cart.push({
          code: parseInt(codeElt.value),
          quantity: parseInt(quantityElt.value),
          priceU: parseInt(priceElt.value),
          price: newPrice
        });
        addToTableCart(
          parseInt(codeElt.value),
          parseInt(quantityElt.value),
          parseInt(priceElt.value),
          newPrice
        );
      } else {
        // Sinon on modifie la quantité et le prix total
        item.quantity += parseInt(quantityElt.value);
        item.price += newPrice;
        modifyTableCart(item.code, item.quantity, item.price);
      }
      displaySumCart();
      console.log(JSON.stringify(cart));
      console.log(`Nombre d'articles dans le panier : ${cart.length}`);
    } else {
      alert("Veuillez respecter les valeurs minimales et maximales des champs");
    }
  } else {
    alert("Veuillez renseigner tous les champs");
  }
};

// ---------------------------------- EVENT LISTENERS ----------------------------------

// Affiche le prix unitaire dès que l'utilisateur modifie le champ "code"
codeElt.addEventListener("input", function(e) {
  let price = null;
  if (e.target.value.length > 0) {
    price = getRandomPrice(parseInt(e.target.value));
  }
  priceElt.value = price;
});

cartButtonElt.addEventListener("click", addToCart);

// ---------------------------------- MODIFICATION DE L'AFFICHAGE ----------------------------------

// Affichage d'une nouvelle ligne dans le tableau représentant le panier
let count=0;
const addToTableCart = (code, quantity, priceU, price) => {
  const trElt = document.createElement("tr");
  trElt.setAttribute("id", code);
  trElt.setAttribute("class", "row pb-2 pt-2")
  if (count != 0) {
    trElt.setAttribute("style", "border-top: 1px solid lightgray")
  }
  count++;
  const tdCodeElt = document.createElement("td");
  tdCodeElt.innerHTML = code;
  tdCodeElt.setAttribute("class", "col-2");
  const tdQtyElt = document.createElement("td");
  tdQtyElt.innerHTML = quantity;
  tdQtyElt.setAttribute("class", "col-2");
  const tdPriceUElt = document.createElement("td");
  tdPriceUElt.innerHTML = priceU;
  tdPriceUElt.setAttribute("class", "col");
  const tdPriceElt = document.createElement("td");
  tdPriceElt.innerHTML = price;
  tdPriceElt.setAttribute("class", "col");
  const tdDeleteElt = document.createElement("td");
  tdDeleteElt.setAttribute("class", "col");
  const deleteBtnElt = document.createElement("button");
  deleteBtnElt.textContent = "✖️ Retirer";
  deleteBtnElt.addEventListener("click", function() {
    trElt.remove();
    cart = cart.filter(line => line.code !== code);
    displaySumCart();
  });
  deleteBtnElt.setAttribute("class", "btn btn-danger");
  tdDeleteElt.appendChild(deleteBtnElt);
  trElt.appendChild(tdCodeElt);
  trElt.appendChild(tdQtyElt);
  trElt.appendChild(tdPriceUElt);
  trElt.appendChild(tdPriceElt);
  trElt.appendChild(tdDeleteElt);
  cartElt.appendChild(trElt);
};

// Modification d'une ligne dans le tableau représentant le panier
const modifyTableCart = (code, quantity, price) => {
  const rowElt = document.getElementById(code);
  rowElt.childNodes[1].textContent = quantity;
  rowElt.childNodes[3].textContent = price;
};

// Affiche la somme des lignes du panier
const displaySumCart = () => {
  let sum = 0;
  cart.forEach(line => {
    sum += line.price;
  });
  sumCartElt.innerText = sum;
};
