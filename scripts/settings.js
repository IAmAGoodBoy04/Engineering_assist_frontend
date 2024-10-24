const URL = "https://engineering-assist.onrender.com";

const userId=sessionStorage.getItem('userId');
const token=sessionStorage.getItem('token');
const email=decodeURIComponent(sessionStorage.getItem('email'));
const username = decodeURIComponent(sessionStorage.getItem('username'));
const flask_url = sessionStorage.getItem('fetchedUrl');
const textbook=sessionStorage.getItem('topic');


document.getElementById('temperature').oninput = function() {
    document.getElementById('temperatureValue').innerHTML = parseFloat(this.value).toFixed(2);
}
document.getElementById('tokenSize').oninput = function() {
    document.getElementById('tokenSizeValue').innerHTML = this.value;
}
const backButton = document.getElementById('back-button');
if (backButton) {
    backButton.addEventListener('click', () => {
        window.location.href = './homepage.html';
    });
}

const adminButton = document.getElementById('admin_button');
if (adminButton) {
    adminButton.addEventListener('click', async () => {
        try {
            const response = await fetch(`${URL}/auth/isadmin?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                window.location.href = './admin.html';
            } else {
                alert('You are not an admin.');
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
            alert('An error occurred. Please try again.');
        }
    });
}