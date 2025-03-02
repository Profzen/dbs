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

// Fonction pour charger et afficher le contenu du panier dans le tableau
function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const tableBody = document.querySelector('#cart-table tbody');
  const totalPriceElement = document.getElementById('total-price');
  tableBody.innerHTML = ''; // Vider le tableau

  let total = 0;
  cartItems.forEach(item => {
    const row = document.createElement('tr');
    
    // Création des cellules pour le nom du produit et le prix
    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    const priceCell = document.createElement('td');
    priceCell.textContent = item.price + ' €';
    
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    tableBody.appendChild(row);
    
    total += item.price; // Si des quantités sont gérées, multiplier par la quantité
  });
  
  totalPriceElement.textContent = total.toFixed(2) + ' €';
}

// Gestion de la soumission du formulaire de checkout
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Récupérer les valeurs du formulaire
  const firstName = document.getElementById('firstName').value;
  const lastName  = document.getElementById('lastName').value;
  const email     = document.getElementById('email').value;
  const phone     = document.getElementById('phone').value;
  
  // Ici, vous pouvez ajouter la logique de validation et de paiement
  alert(`Merci ${firstName} ${lastName}, votre commande est en cours de traitement.`);

  updateCartCounter(); // Actualise le compteur
  this.reset();
  // Optionnel : Vider le panier après validation
  localStorage.removeItem('cart');
  loadCart();
});

// Charger le panier dès que le DOM est prêt
document.addEventListener('DOMContentLoaded', loadCart);

// Fonction pour charger les transactions dans le tableau
function loadTransactions() {
  const tableBody = document.querySelector("#transactions-table tbody");
  tableBody.innerHTML = ""; // Vider le contenu

  transactions.forEach(tx => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tx.id}</td>
      <td>${tx.date}</td>
      <td>${tx.total.toFixed(2)} €</td>
      <td>${tx.status}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Charger les transactions lorsque le DOM est prêt
document.addEventListener("DOMContentLoaded", loadTransactions);


/* Fonction pour inscrire un utilisateur
function registerUser(firstName, lastName, email, password) {
  fetch('http://127.0.0.1:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      console.log('Inscription réussie:', data);
    } else {
      console.error('Erreur:', data.error);
    }
  })
  .catch(error => console.error('Erreur de connexion:', error));
}

// Fonction pour connecter un utilisateur
function loginUser(email, password) {
  fetch('http://127.0.0.1:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token); // Sauvegarder le token JWT
      console.log('Connexion réussie:', data);
    } else {
      console.error('Erreur:', data.error);
    }
  })
  .catch(error => console.error('Erreur de connexion:', error));
}

// Fonction pour récupérer les produits
function getProducts() {
  const token = localStorage.getItem('token'); // Récupérer le token JWT
  
  fetch('http://127.0.0.1:5000/api/products', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token // Ajouter le token à l'en-tête
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Produits récupérés:', data);
  })
  .catch(error => console.error('Erreur lors de la récupération des produits:', error));
}

// Fonction pour ajouter un produit (admin)
function addProduct(name, description, price, image) {
  const token = localStorage.getItem('token'); // Récupérer le token JWT
  
  fetch('http://127.0.0.1:5000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token // Ajouter le token à l'en-tête
    },
    body: JSON.stringify({
      name: name,
      description: description,
      price: price,
      image: image
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Produit ajouté:', data);
  })
  .catch(error => console.error('Erreur lors de l\'ajout du produit:', error));
}




// Supposons que vous ayez déjà une fonction qui soumet le formulaire de checkout
document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Récupérer les données du formulaire et les préparer pour l'envoi
  const firstName = document.getElementById("firstName").value;
  const lastName  = document.getElementById("lastName").value;
  const email     = document.getElementById("email").value;
  const phone     = document.getElementById("phone").value;
  
  // Récupérer également les données du panier (ici, par exemple, en supposant qu'elles soient stockées dans localStorage)
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  cartItems.forEach(item => {
      total += item.price; // Vous pouvez ajuster pour gérer les quantités
  });
  
  // Créer le corps de la requête pour la commande
  const orderData = {
      // Ici, on utilise "products" pour respecter votre endpoint existant
      products: cartItems,
      total: total,
      // Vous pouvez ajouter d'autres informations si nécessaire
  };

  // Supposons que le token JWT est stocké dans localStorage lors de la connexion
  const token = localStorage.getItem("token");
  
  fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
      },
      body: JSON.stringify(orderData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Erreur lors de la création de la commande");
      }
      return response.json();
  })
  .then(data => {
      // Commande créée avec succès
      alert("Commande créée avec succès !");
      // Vous pouvez vider le panier si nécessaire :
      localStorage.removeItem("cart");
      // Rediriger l'utilisateur vers la page des transactions
      window.location.href = "transactions.html";
  })
  .catch(error => {
      console.error(error);
      alert("Erreur lors de la commande : " + error.message);
  });
});

//Dans transactions.html, juste avant la fermeture de la balise </body>

document.addEventListener("DOMContentLoaded", function() {
    // Récupérer le token depuis localStorage
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Vous devez être connecté pour voir vos transactions.");
        window.location.href = "login.html";
        return;
    }
    
    const uri = "http://localhost:5000/api/orders";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
    
    fetch(uri, {
        method: "GET",
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des transactions");
        }
        return response.json();
    })
    .then(data => {
        // Sélectionner le corps du tableau dans transactions.html
        const tableBody = document.querySelector("#transactions-table tbody");
        tableBody.innerHTML = "";
        
        data.forEach(order => {
            // Créer une ligne pour chaque commande
            let row = document.createElement("tr");
            
            let idCell = document.createElement("td");
            idCell.textContent = order._id;
            
            let dateCell = document.createElement("td");
            // Afficher la date sous un format lisible
            dateCell.textContent = order.created_at ? new Date(order.created_at).toLocaleString() : "";
            
            let totalCell = document.createElement("td");
            totalCell.textContent = order.total + " €";
            
            let statusCell = document.createElement("td");
            statusCell.textContent = order.status;
            
            row.appendChild(idCell);
            row.appendChild(dateCell);
            row.appendChild(totalCell);
            row.appendChild(statusCell);
            
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error(error);
        alert("Erreur lors du chargement des transactions : " + error.message);
    });
});
*/





