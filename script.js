// script.js

// Function to add an item to the cart
function addToCart(productId, productName, productPrice) {
    // Get cart from local storage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in the cart
    let itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        // Update quantity if item already exists
        cart[itemIndex].quantity += 1;
    } else {
        // Add new item to cart
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display (optional)
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filter out the item to be removed
    cart = cart.filter(item => item.id !== productId);
    
    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display (optional)
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartList = document.getElementById('cart-list');
    let cartTotal = document.getElementById('cart-total');
    
    // Clear existing cart items
    cartList.innerHTML = '';
    
    // Add each item to the cart display
    let total = 0;
    cart.forEach(item => {
        let listItem = document.createElement('div');
        listItem.className = 'cart-item';
        listItem.innerHTML = `
            <img src="images/${item.id}.jpg" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>$${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        `;
        cartList.appendChild(listItem);
        
        total += item.price * item.quantity;
    });
    
    // Update total price
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}
// Assume this function is called when a user adds a product to the cart
function addProductToCart(productName, price, imageUrl) {
    const cart = document.querySelector('.cart-items');
    
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = productName;
    img.width = 100; // Width as per your CSS
    img.height = 'auto'; // Height will adjust proportionally
    
    const productNameElement = document.createElement('p');
    productNameElement.textContent = productName;
    
    const priceElement = document.createElement('p');
    priceElement.textContent = '$' + price;
    
    cartItem.appendChild(img);
    cartItem.appendChild(productNameElement);
    cartItem.appendChild(priceElement);
    
    cart.appendChild(cartItem);
}


// Initial cart display update
document.addEventListener('DOMContentLoaded', updateCartDisplay);
