const timeElement = document.querySelector('[data-testid="test-user-time"]');
const avatarInput = document.getElementById('avatarUpload');
const avatarImage = document.querySelector('[data-testid="test-user-avatar"]');

// Update time
function updateTime() {
  timeElement.textContent = Date.now();
}
updateTime();
setInterval(updateTime, 1000);

// Avatar upload & preview
avatarInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarImage.src = e.target.result;
      avatarImage.alt = 'User uploaded profile picture';
    };
    reader.readAsDataURL(file);
  }
});
