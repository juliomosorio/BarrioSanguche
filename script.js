// Menú desplegable en móvil
const toggleBtn = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

toggleBtn.addEventListener('click', function () {
  mobileMenu.classList.toggle('active');
  toggleBtn.innerHTML = mobileMenu.classList.contains('active') ? '✕' : '☰';
});

// Cierra el menú al hacer clic en un link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    toggleBtn.innerHTML = '☰';
  });
});