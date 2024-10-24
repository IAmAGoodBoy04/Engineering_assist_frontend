const URL = "https://engineering-assist-lh3f.onrender.com";

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
                    body: JSON.stringify(data)
                });


                if (response.ok) {
                    const responseData = await response.json();
                    setCookie('token', responseData.token, 2);
                    setCookie('userId', responseData.userId, 2);
                    setCookie('email', responseData.email, 2);
                    setCookie('username', responseData.username, 2);
                    await storetosession();
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

function setCookie(cname, cvalue, exhr) {
    const d = new Date();
    d.setTime(d.getTime() + (exhr*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }