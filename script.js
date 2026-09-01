//Login Authenticator Page
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const confirmPasswordContainer = document.getElementById("confirm-password-container");
const authButton = document.getElementById("auth-button");
const toggleLink = document.getElementById("toggle-link");

//login
let registeredUsername = "admin";
let registeredPassword = "rando@123";
const authMessage = document.getElementById ("auth-message");

function handleAuth() {
    if(isSignupMode){
        signup();
    }else{
        login();
    }
}

function login() {
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value;

    if (enteredUsername === registeredUsername && enteredPassword === registeredPassword) {
        dashboard ();
    } else {
        authMessage.textContent = "Incorrect username or password."
    }
}

//handle toggle by changing the sign up and login 
let isSignupMode = false;
confirmPasswordContainer.style.display = "none";

function toggleAuth() {
    isSignupMode = !isSignupMode;

    authButton.textContent = isSignupMode ? "Sign up" : "Login";
    toggleLink.textContent = isSignupMode ? "Login" : "Sign up";

    confirmPasswordContainer.style.display = isSignupMode ? "block" : "none";
}


//sign up
function signup() {
    const newUsername = usernameInput.value.trim();
    const newPassword = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newUsername === "" || newPassword === "" || confirmPassword === "") {
        authMessage.textContent = "Please complete all fields.";
        return;
    }

    if (newPassword !== confirmPassword) {
        authMessage.textContent = "Password does not match.";
        return;
    }

    // save new account
    registeredUsername = newUsername;
    registeredPassword = newPassword;

    // clear fields
    passwordInput.value = "";
    confirmPasswordInput.value = "";

    // switch back to login
    isSignupMode = false;
    authButton.textContent = "Login";
    toggleLink.textContent = "Sign up";
    confirmPasswordContainer.style.display = "none";

    // show message
    authMessage.textContent = "Account created. Please log in.";
}

//show dashboard
const authCard = document.getElementById("auth-card");
const dashboardPage = document.getElementById("dashboard");

function dashboard() {
    authCard.style.display = "none";
    dashboardPage.style.display = "block";
}

//logout
function logout(){
    dashboardPage.style.display = 'none';
    authCard.style.display = 'block';
  
    usernameInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    authMessage.textContent = '';
}

// Authentication events
authButton.addEventListener('click', handleAuth);
toggleLink.addEventListener('click', toggleAuth);
document.getElementById('logout-button').addEventListener('click', logout);

//Activity Dashboard

