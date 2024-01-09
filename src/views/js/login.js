document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', JSON.stringify(data));
        localStorage.setItem('token', data.token); 
        localStorage.setItem('user_id', data.user.user_id);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('role_name', data.user.role_name);
        
        if (data.user.role_name === 'siteAdmin') {
            // Redirect to the admin home page
            window.location.href = '/admin/home';
        } else {
            console.error('Unknown user role:', data.user.role_name);
        }
        
        
    })
    .catch((error) => {
        console.error('Error:', error);
        // Display an error message to the user
    });
});
