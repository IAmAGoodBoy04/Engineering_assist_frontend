const URL = "http://localhost:8080";

document.addEventListener('DOMContentLoaded', () => {
    const token = getCookie('token');
    const userId = getCookie('userId');
    console.log(token, userId);
    if (token && userId) {
        window.location.href = './homepage.html';
        return;
    }

    const form = document.getElementById('auth-form');
    if (form) {
        form.action = `${URL}/auth/login`;
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    credentials: 'include' // to include cookies in the request
                });

                if (response.ok) {
                    window.location.href = './homepage.html';
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Login failed. Please try again.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    }
});
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}