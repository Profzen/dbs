console.log("Script chargé");
/******************************************
 *         Gestion du Panier              *
 ******************************************/

// Récupère le panier depuis le localStorage ou initialise un tableau vide
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/**
 * Ajoute un abonnement au panier et enregistre dans localStorage
 * @param {string} name - Nom de l'abonnement
 * @param {number} price - Prix de l'abonnement
 */


/**
 * Affiche le contenu du panier sur la page (pour cart.html)
 */
function displayCart() {
  // Récupère le panier actuel depuis le localStorage
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Sélectionne l'élément HTML qui affichera le panier
  const cartItemsContainer = document.getElementById('cart-items'); // Par exemple, utilisez un conteneur avec cet ID
  cartItemsContainer.innerHTML = '';

  // Si le panier est vide, affiche un message
  if (currentCart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }
  
  let total = 0;
  currentCart.forEach((item, index) => {
    total += item.price; // Vous pouvez également gérer les quantités ici si besoin

    // Crée une div pour chaque article
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    // Remplit la div avec l'image, le nom, la description et le bouton de suppression
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Prix: ${item.price}€</p>
        <button onclick="removeFromCart(${index})">Supprimer</button>
      </div>
    `;
    
    cartItemsContainer.appendChild(itemDiv);
  });
  
  // Affiche le total
  const totalElement = document.createElement('div');
  totalElement.classList.add('cart-total');
  totalElement.innerHTML = `<strong>Total : ${total}€</strong>`;
  cartItemsContainer.appendChild(totalElement);
}



/**
 * Supprime un article du panier en fonction de son index
 * @param {number} index - Index de l'article à supprimer
 */
function removeFromCart(index) {
  let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  currentCart.splice(index, 1); // Retire l'article à l'index spécifié
  localStorage.setItem('cart', JSON.stringify(currentCart));
  displayCart(); // Actualise l'affichage du panier
}

/**
 * Redirige l'utilisateur vers la page de paiement si le panier n'est pas vide
 */
function goToCheckout() {
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  if (currentCart.length === 0) {
    alert("Votre panier est vide. Ajoutez des articles avant de passer à la commande.");
    return;
  }
  window.location.href = 'checkout.html';
}

/**
 * Affiche le contenu du panier dans une alerte (optionnel)
 */
function viewCart() {
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  if (currentCart.length === 0) {
    alert("Votre panier est vide.");
    return;
  }
  let cartDetails = "Contenu du panier :\n";
  currentCart.forEach(item => {
    cartDetails += `${item.name} - ${item.price}€\n`;
  });
  alert(cartDetails);
}

/******************************************
 *       Gestion des Modales              *
 ******************************************/


function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

function openRegisterModal() {
  document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
  document.getElementById('registerModal').style.display = 'none';
}

// Ferme les modales si l'utilisateur clique en dehors du contenu de la modale
window.onclick = function(event) {
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
};


// Gestion des actions sur les boutons
document.getElementById("addToCart").addEventListener("click", function(){
  alert("Produit ajouté au panier !");
  // Ici, vous pouvez ajouter la logique pour stocker le produit dans le panier (ex: via localStorage)
});

document.getElementById("orderNow").addEventListener("click", function(){
  alert("Redirection vers la page de commande !");
  // Par exemple, rediriger vers une page de checkout
  // window.location.href = "checkout.html";
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Connexion réussie !");
  closeLoginModal();
});

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Inscription réussie !");
  closeRegisterModal();
});


//payWithMobileMoney()
//payWithVisa()

function updateCartCounter() {
  // Récupère le panier depuis localStorage ou initialise un tableau vide
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  const counterElement = document.getElementById('cart-counter');
  if (counterElement) {
    counterElement.textContent = currentCart.length;
    // Ajoute cette ligne pour vérifier dans la console
    console.log("updateCartCounter() appelé - Compteur mis à jour :", currentCart.length);
  }
}


// Appelle updateCartCounter quand le DOM est entièrement chargé
window.onload = updateCartCounter;

/**
 * Ajoute un abonnement au panier et enregistre dans le localStorage.
 * @param {string} name - Nom de l'abonnement.
 * @param {number} price - Prix de l'abonnement.
 * @param {string} image - Chemin ou URL de l'image représentative.
 * @param {string} description - Description optionnelle de l'abonnement.
 */
function addToCart(name, price, image, description) {
  // Crée un objet représentant l'article à ajouter
  const item = {
    name: name,
    price: price,
    image: image || "default-image.jpg", // valeur par défaut si aucune image n'est fournie
    description: description || ""
  };
  
  // Récupère le panier actuel depuis le localStorage (ou initialise un tableau vide)
  let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  // Ajoute l'article au panier
  currentCart.push(item);
  // Sauvegarde le panier mis à jour dans le localStorage
  localStorage.setItem('cart', JSON.stringify(currentCart));
  updateCartCounter(); // Actualise le compteur
  alert(`${name} a été ajouté à votre panier`);
}


/* ========= Gestion du Menu Burger ========= */
document.getElementById('hamburger-menu')?.addEventListener('click', function() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('mobile-active');
});


document.addEventListener('DOMContentLoaded', updateCartCounter);








    











