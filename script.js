// ---------- Menú desplegable en móvil ----------
const toggleBtn = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

toggleBtn.addEventListener('click', function () {
  mobileMenu.classList.toggle('active');
  toggleBtn.innerHTML = mobileMenu.classList.contains('active') ? '✕' : '☰';
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    toggleBtn.innerHTML = '☰';
  });
});

// ---------- Carrito de pedido → WhatsApp ----------
// Número de WhatsApp del local. Cámbialo por el real (formato: código país + número, sin +, espacios ni guiones).
const WHATSAPP_NUMBER = '56912345678';

const cart = {};

function formatPrice(n) {
  return '$' + n.toLocaleString('es-CL');
}

function updateCartUI() {
  const items = Object.values(cart).filter(i => i.qty > 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = formatPrice(total);
  document.getElementById('cartBar').classList.toggle('visible', count > 0);
}

document.querySelectorAll('.menu-item[data-name]').forEach(item => {
  const name = item.dataset.name;
  const price = parseInt(item.dataset.price, 10);
  cart[name] = { name, price, qty: 0 };

  const qtyValue = item.querySelector('.qty-value');
  const plusBtn = item.querySelector('.plus');
  const minusBtn = item.querySelector('.minus');

  plusBtn.addEventListener('click', () => {
    cart[name].qty++;
    qtyValue.textContent = cart[name].qty;
    updateCartUI();
  });

  minusBtn.addEventListener('click', () => {
    if (cart[name].qty > 0) cart[name].qty--;
    qtyValue.textContent = cart[name].qty;
    updateCartUI();
  });
});

const cartSendBtn = document.getElementById('cartSend');
if (cartSendBtn) {
  cartSendBtn.addEventListener('click', () => {
    const items = Object.values(cart).filter(i => i.qty > 0);
    if (items.length === 0) return;

    const lines = items.map(i => `${i.qty}x ${i.name} (${formatPrice(i.price * i.qty)})`);
    const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    const message =
      `Hola! Quiero pedir:\n${lines.join('\n')}\n\nTotal: ${formatPrice(total)}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  });
}

// ---------- Estado abierto/cerrado en vivo ----------
// Horario del local: martes a domingo, 12:30 a 22:00. Cambia estos valores por los reales del negocio.
(function () {
  const statusText = document.getElementById('statusText');
  const statusDot = document.getElementById('statusDot');
  if (!statusText || !statusDot) return;

  const OPEN_HOUR = 12.5;
  const CLOSE_HOUR = 22;
  const CLOSED_DAY = 1; // 1 = lunes

  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const isOpen = day !== CLOSED_DAY && hour >= OPEN_HOUR && hour < CLOSE_HOUR;

  if (isOpen) {
    statusText.textContent = 'Abierto ahora · cierra 22:00';
    statusDot.classList.add('open');
  } else {
    statusText.textContent = 'Cerrado ahora · abre 12:30';
    statusDot.classList.add('closed');
  }
})();

// ---------- Animación de aparición al hacer scroll ----------
const revealTargets = document.querySelectorAll(
  '.section-head, .menu-item, .anatomy-row, .info-card, .stat-item, .faq-item'
);

if ('IntersectionObserver' in window && revealTargets.length) {
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));
}

// ---------- Compartir con un amigo ----------
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
  const originalText = shareBtn.textContent;

  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'Barrio Sánguche',
      text: 'Mira este sánguche que encontré, se ve increíble 🥪',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // el usuario canceló el share, no hacer nada
      }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareData.url).then(() => {
        shareBtn.textContent = '¡Link copiado!';
        setTimeout(() => { shareBtn.textContent = originalText; }, 2000);
      });
    }
  });
}