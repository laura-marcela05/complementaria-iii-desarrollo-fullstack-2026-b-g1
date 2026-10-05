// Al hacer clic en el botón, se muestra u oculta el bloque de detalle.
const detailBtn = document.getElementById('detail-btn');
const detailBox = document.getElementById('detail-box');

detailBtn.addEventListener('click', () => {
  const isHidden = detailBox.hidden;

  detailBox.hidden = !isHidden;
  detailBtn.setAttribute('aria-expanded', String(isHidden));
  detailBtn.textContent = isHidden
    ? 'Ocultar detalle'
    : 'Ver por qué elegí este stack';
});
