const URL = "http://localhost:8080";
document.addEventListener('DOMContentLoaded',async ()=>{
    const token = getCookie('token');
    const userId = getCookie('userId');
    if (token && userId) {
        await storetosession();
        window.location.href = './homepage.html';
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
function setCookie(cname, cvalue, exhr) {
    const d = new Date();
    d.setTime(d.getTime() + (exhr*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
function storetosession(){
    sessionStorage.setItem('token', getCookie('token'));
    sessionStorage.setItem('userId', getCookie('userId'));
    sessionStorage.setItem('email', getCookie('email'));
    sessionStorage.setItem('username', getCookie('username'));
    return;
}