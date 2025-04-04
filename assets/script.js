// HAVOC'S INTERACTIVE SCRIPTS
document.addEventListener('DOMContentLoaded', () => {
    // Glow effect on buttons
    const buttons = document.querySelectorAll('.btn, .support-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.boxShadow = '0 0 15px var(--primary)';
        });
        button.addEventListener('mouseout', () => {
            button.style.boxShadow = 'none';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
// === LOGIN/REGISTER FUNCTIONALITY ===
document.addEventListener('DOMContentLoaded', () => {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Check if user exists in localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                alert('ACCESS GRANTED. REDIRECTING...');
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'bugbounty.html';
            } else {
                alert('INVALID CREDENTIALS. TRY AGAIN OR REGISTER.');
            }
        });
    }

    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('regUsername').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            
            // Save user to localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('ACCOUNT CREATED. LOGIN NOW.');
            window.location.href = 'login.html';
        });
    }
});
// Password matching validation
const passwordInput = document.getElementById('regPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordError = document.getElementById('passwordMatchError');

function validatePasswords() {
    if (passwordInput.value !== confirmPasswordInput.value) {
        passwordError.style.display = 'block';
        confirmPasswordInput.style.borderColor = '#ff0000';
        return false;
    } else {
        passwordError.style.display = 'none';
        confirmPasswordInput.style.borderColor = '#00ff9d';
        return true;
    }
}

// Real-time validation as user types
confirmPasswordInput.addEventListener('input', validatePasswords);
passwordInput.addEventListener('input', validatePasswords);

// Update form submission to check passwords
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
        alert("ACCESS DENIED: PASSWORD MISMATCH");
        return;
    }
    
    // Rest of your registration logic...
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = passwordInput.value;
    
    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('ACCOUNT CREATED. LOGIN NOW.');
    window.location.href = 'login.html';
});
// In your script.js
document.getElementById('profileUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        document.querySelector('.profile-pic img').src = event.target.result;
        // Optional: Save to localStorage
        localStorage.setItem('profilePic', event.target.result);
    }
    
    reader.readAsDataURL(file);
});

// On page load
window.addEventListener('DOMContentLoaded', () => {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
        document.querySelector('.profile-pic img').src = savedPic;
    }
});
