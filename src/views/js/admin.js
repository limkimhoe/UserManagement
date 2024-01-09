const token = localStorage.getItem('token');
let username, userRole, user_id;

function checkAuthentication() {
    // If role-based access is required
    userRole = localStorage.getItem('role_name'); // If role-based access is required
    username = localStorage.getItem('username');
    user_id = localStorage.getItem('user_id');
    if (!token || !username || (userRole !== 'siteAdmin')) {
        window.location.href = '/login.html'; // Redirect to login
        return false;
    }

    // Optional: You can make a fetch request to your server to validate the token

    return true;
}

document.getElementById('logout').addEventListener("click", function(e) {
    e.preventDefault();
    
    fetch('/api/auth/signout', {
        method: 'POST',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        if(data.message == "Logout Succesfully"){
            // console.log('Success:', JSON.stringify(data));
            localStorage.removeItem('token'); 
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            localStorage.removeItem('role_name');
            window.location.href = '/login';
        }
        
    })
    .catch((error) => {
        console.error('Error:', error);
        // Display an error message to the user
    });
});

window.onload = function() {
    if (!checkAuthentication()) {
        // Handle unauthorized access
        alert('You are not authorized to access this page.');
    } else {
        const adminBody = document.getElementById("body");
        const adminBodyHeader = adminBody.querySelector('.hd-welcome');
        const adminBodyBtnLogout = adminBody.querySelector('.btn-logout');
        const adminBodyText = adminBody.querySelector(".body-text");
        
        adminBodyText.innerText = "Successful login"
        adminBodyHeader.innerText = "Welcome " + username;
        // Load or display the content of the protected page
    }
}