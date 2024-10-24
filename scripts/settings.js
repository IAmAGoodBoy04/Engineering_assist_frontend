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