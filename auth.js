// User Authentication System
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Load users from localStorage
function loadUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Load bookings from localStorage
function loadBookings() {
    return JSON.parse(localStorage.getItem('bookings')) || [];
}

// Save bookings to localStorage
function saveBookings(bookings) {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Open Login Modal
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('signupModal').style.display = 'none';
}

// Open Signup Modal
function openSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
    document.getElementById('loginModal').style.display = 'none';
}

// Close Modals
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Switch from Login to Signup
function switchToSignup() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signupModal').style.display = 'block';
}

// Switch from Signup to Login
function switchToLogin() {
    document.getElementById('signupModal').style.display = 'none';
    document.getElementById('loginModal').style.display = 'block';
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        updateNavBar();
        showNotification('Logged in successfully!');
    } else {
        alert('Invalid email or password');
    }
}

// Handle Signup
function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const users = loadUsers();
    if (users.find(u => u.email === email)) {
        alert('Email already exists');
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        isAdmin: false,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    document.getElementById('signupModal').style.display = 'none';
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupConfirmPassword').value = '';
    updateNavBar();
    showNotification('Account created successfully!');
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateNavBar();
    showNotification('Logged out successfully');
}

// Update navbar based on login state
function updateNavBar() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenu = document.getElementById('userMenu');

    if (currentUser) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (userMenuBtn) {
            userMenuBtn.style.display = 'inline-block';
            userMenuBtn.textContent = `${currentUser.name} ▼`;
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (signupBtn) signupBtn.style.display = 'inline-block';
        if (userMenuBtn) userMenuBtn.style.display = 'none';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// Toggle user menu
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
}

// View past purchases
function viewPastPurchases() {
    if (!currentUser) return;
    const bookings = loadBookings().filter(b => b.userId === currentUser.id);
    
    let html = '<h2>Your Past Bookings</h2>';
    if (bookings.length === 0) {
        html += '<p>No bookings yet.</p>';
    } else {
        html += '<div class="past-bookings">';
        bookings.forEach(b => {
            html += `<div class="booking-item">
                <strong>${b.type === 'accommodation' ? 'Accommodation' : 'Trip'}: ${b.name}</strong>
                <p>Date: ${b.date}</p>
                <p>Guests: ${b.guests || 'N/A'}</p>
                <p>Price: $${b.price || 'N/A'}</p>
            </div>`;
        });
        html += '</div>';
    }

    const modal = document.getElementById('pastPurchasesModal');
    modal.innerHTML = html + '<button onclick="closePastPurchases()" class="close-btn">Close</button>';
    modal.style.display = 'block';
}

// Close past purchases modal
function closePastPurchases() {
    document.getElementById('pastPurchasesModal').style.display = 'none';
}

// Admin access check
function goToAdmin() {
    if (currentUser && currentUser.isAdmin) {
        window.location.href = 'admin.html';
    } else {
        alert('Only admins can access this page');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavBar();

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        const loginModal = document.getElementById('loginModal');
        const signupModal = document.getElementById('signupModal');
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === signupModal) signupModal.style.display = 'none';
    });
});
