// Filtros do catálogo fictício.
const filters = [...document.querySelectorAll('[data-filter]')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) visible++;
  });
  document.querySelector('#filter-status').textContent = visible + ' serviços de exemplo exibidos.';
}));
// Modal de detalhes com fechamento nativo por Escape.
const dialog = document.querySelector('dialog');
let service = '';
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  service = button.dataset.service;
  document.querySelector('#detail-title').textContent = service;
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
document.querySelector('#choose-service').addEventListener('click', () => {
  dialog.close();
  document.querySelector('#demo-interest').value = service;
  document.querySelector('#contato').scrollIntoView();
  document.querySelector('#demo-name').focus({preventScroll:true});
});
// Nenhuma chamada de rede ou armazenamento: apenas feedback local.
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  document.querySelector('#form-feedback').textContent = 'Funcionou! Em um site real, este formulário poderia iniciar seu atendimento. Nenhuma mensagem foi enviada nesta demonstração.';
});
