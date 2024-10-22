const URL = "http://localhost:8080";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    if (form) {
        form.action = `${URL}/auth/signup`;
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const password = form.querySelector('input[name="password"]').value;
            const confirmPassword = form.querySelector('input[name="confirmPassword"]').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log(data);
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
                    alert(errorData.message || 'Sign up failed. Please try again.');
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    }
});