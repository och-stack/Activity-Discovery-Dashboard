// Login Authenticator Page
const usernameInput = document.getElementById("username"); // Get the username box from the page
const passwordInput = document.getElementById("password"); // Get the password box from the page
const confirmPasswordInput = document.getElementById("confirm-password"); // Get the confirm password box
const confirmPasswordContainer = document.getElementById("confirm-password-container"); // Get the confirm password section
const authButton = document.getElementById("auth-button"); // Get the button used for login or signup
const toggleLink = document.getElementById("toggle-link"); // Get the link used to switch between login and signup

// default account
let registeredUsername = "admin"; // Start with a default username
let registeredPassword = "rando@123"; // Start with a default password
const authMessage = document.getElementById ("auth-message"); // Get the area where login messages appear

let isSignupMode = false;

function handleAuth() {
    if(isSignupMode){
        signup();
    }else{
        login(); 
    }
}

function login() { // Check whether the user's login details are correct
    const enteredUsername = usernameInput.value.trim(); // Get the username the user typed
    const enteredPassword = passwordInput.value; // Get the password the user typed

    if (enteredUsername === registeredUsername && enteredPassword === registeredPassword) { // Check if both details match
        dashboard (); // If they match, show the dashboard
    } else { // If they don't match
        authMessage.textContent = "Incorrect username or password.";
    }
}

// handle toggle by changing the sign up and login 
 // Start the page in login mode
confirmPasswordContainer.style.display = "none"; // Hide confirm password because we're logging in

function toggleAuth() { // Switch between login and signup mode
    isSignupMode = !isSignupMode; // Flip the current mode

    authButton.textContent = isSignupMode ? "Sign up" : "Login"; // Change the button depending on the mode
    toggleLink.textContent = isSignupMode ? "Login" : "Sign up"; // Change the link depending on the mode

    confirmPasswordContainer.style.display = isSignupMode ? "block" : "none"; // Show confirm password only during signup
}


// sign up
function signup() { // Create a new account
    const newUsername = usernameInput.value.trim(); // Get the username the user wants
    const newPassword = passwordInput.value; // Get the new password
    const confirmPassword = confirmPasswordInput.value; // Get the repeated password

    if (newUsername === "" || newPassword === "" || confirmPassword === "") { // Check if any box was left empty
        authMessage.textContent = "Please complete all fields."; // Ask the user to fill everything in
        return; // Stop here until the fields are completed
    }

    if (newPassword !== confirmPassword) { // Check if both passwords are the same
        authMessage.textContent = "Password does not match."; // Tell the user the passwords are different
        return; // Stop the signup process
    }

    // save new account
    registeredUsername = newUsername; // Replace the old username with the new one
    registeredPassword = newPassword; // Replace the old password with the new one

    // clear fields
    passwordInput.value = ""; // Clear the password box
    confirmPasswordInput.value = ""; // Clear the confirm password box

    // switch back to login
    isSignupMode = false; // Go back to login mode
    authButton.textContent = "Login"; // Change the button back to Login
    toggleLink.textContent = "Sign up"; // Change the link back to Sign up
    confirmPasswordContainer.style.display = "none"; // Hide the confirm password box

    // show message
    authMessage.textContent = "Account created. Please log in."; // Let the user know signup is complete
}

// show dashboard
const authCard = document.getElementById("auth-card"); // Get the login card
const dashboardPage = document.getElementById("dashboard"); // Get the dashboard section
const welcomeUser = document.getElementById("welcome-user"); // Get the place where the welcome message appears

function dashboard() { // Move the user from login to the dashboard
    authCard.style.display = "none"; // Hide the login card
    dashboardPage.style.display = "block"; // Show the dashboard
    welcomeUser.textContent = "Hey you, " + registeredUsername + "!" + "👋"; // Say hello using the username
}

// Authentication events
authButton.addEventListener('click', handleAuth); // Run login or signup when the button is clicked
toggleLink.addEventListener('click', toggleAuth); // Switch login or signup when the link is clicked

// logout
const logoutButton = document.getElementById("logout-button"); // Get the logout button

function logout(){ // Take the user back to the login page
dashboardPage.style.display = 'none'; // Hide the dashboard
authCard.style.display = 'block'; // Show the login card again

usernameInput.value = ''; // Clear the username box
passwordInput.value = ''; // Clear the password box
confirmPasswordInput.value = ''; // Clear the confirm password box
authMessage.textContent = ''; // Clear the previous login message
}

logoutButton.addEventListener("click", logout); // Log out when the button is clicked

// Activity Dashboard
const activityButton = document.getElementById("get-activity-button"); // Get the button that rolls for an activity
const activityCard = document.getElementById("activity-container"); // Get the activity card
const activityName = document.getElementById("activity-name"); // Get the place where the activity name appears
const activityDetails = document.getElementById("activity-details"); // Get the place where activity details appear
const saveButton = document.getElementById("save-button"); // Get the Love it button

let currentActivity = null; // Keep track of the activity currently shown
let savedActivities = []; // Start with an empty list of saved activities

// Generate random activity
async function getActivity() { // Ask the API for a random activity
  const response = await fetch('https://random-activity-sigmo.vercel.app/api/random'); // Send a request to the API
  const activity = await response.json(); // Turn the API response into usable data
  currentActivity = activity; // Remember the activity we just received
  activityName.textContent = activity.activity; // Show the activity name
  // Show the activity information
  activityDetails.innerHTML = ` 
    <p>Type: ${activity.type}</p> 
    <p>Participants: ${activity.participants}</p>
    <p>Price: ${activity.price}</p>
    <p>Accessibility: ${activity.accessibility}</p>
  `;
  activityCard.style.display = 'block'; // Show the activity card
}

// Save activity

function saveActivity() { // Save the activity the user currently likes
    if (!currentActivity) return; // Do nothing if there is no activity yet
    for (let activity of savedActivities) { // Go through the activities already saved
      if (activity.activity === currentActivity.activity) { // Check if this activity is already there
        return; // Stop if the activity has already been saved
      }
    }
    savedActivities.push(currentActivity); // Add the new activity to the saved list
    showSavedActivities(); // Refresh the saved activities on the page
  }

// Show saved activities
function showSavedActivities() { // Display all activities the user has saved
    const list = document.getElementById("savedActivites"); // Get the saved activities list
    list.innerHTML = ""; // Clear the list before showing it again

    if (savedActivities.length === 0) { // Check if there are no saved activities
        list.innerHTML = "<li>Still bored? 🤔 Pick me, pick me up!</li>"; // Show the fun empty message
        return; // Stop here because there is nothing else to display
    }

    savedActivities.forEach(function(activity, index) { // Go through each saved activity
        // Add the activity to the list
        list.innerHTML += `
        <li>
          <div class="saved-content">
            <div>
              <strong>${activity.activity}</strong>
              <small>${activity.type || 'Activity'}</small>
            </div>
            <button onclick="removeSavedActivity(${index})">×</button>
          </div>
        </li>
      `;
    });
}

// Remove activity
function removeSavedActivity(index) { // Remove the activity the user clicked
  savedActivities.splice(index, 1); // Take that activity out of the saved list
  showSavedActivities(); // Refresh the list after removing it
}

// Buttons
activityButton.addEventListener("click", getActivity); // Get a random activity when Roll is clicked
saveButton.addEventListener("click", saveActivity); // Save the activity when Love it is clicked