/* Fides Sapientiae — navegação entre seções, busca, formulários e voltar ao topo */
(function () {
  'use strict';

  var API = 'php/backend.php';
  var paginas = document.querySelectorAll('.pagina');
  var links = document.querySelectorAll('.menu a[data-pagina]');
  var menu = document.querySelector('.menu');
  var toggle = document.querySelector('.menu__toggle');

  /* ---------- Navegação por hash (#inicio, #servicos...) ---------- */
  function mostrar(id) {
    var alvo = document.getElementById(id);
    if (!alvo || !alvo.classList.contains('pagina')) { id = 'inicio'; alvo = document.getElementById(id); }
    paginas.forEach(function (p) { p.classList.toggle('ativa', p === alvo); });
    links.forEach(function (a) {
      var ativo = a.dataset.pagina === id;
      a.classList.toggle('ativo', ativo);
      if (ativo) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.title = 'Fides Sapientiae — ' + alvo.dataset.titulo;
    menu.classList.remove('aberto');
    toggle.setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
  }
  function rotear() { mostrar(location.hash.replace(/^#\/?/, '') || 'inicio'); }
  window.addEventListener('hashchange', rotear);
  rotear();

  toggle.addEventListener('click', function () {
    var aberto = menu.classList.toggle('aberto');
    toggle.setAttribute('aria-expanded', String(aberto));
  });

  /* ---------- Voltar ao topo ---------- */
  var btnTopo = document.getElementById('voltar-topo');
  window.addEventListener('scroll', function () {
    btnTopo.classList.toggle('show', window.scrollY > 300);
  }, { passive: true });
  btnTopo.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- Busca nas dúvidas (filtra a lista local) ---------- */
  var formBusca = document.getElementById('form-busca');
  var campoBusca = document.getElementById('busca');
  var statusBusca = document.getElementById('busca-status');
  var itens = document.querySelectorAll('#duvidas-lista details');
  var vazio = document.getElementById('duvidas-vazio');

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  function filtrar() {
    var termo = norm(campoBusca.value.trim());
    var visiveis = 0;
    itens.forEach(function (d) {
      var ok = !termo || norm(d.textContent).indexOf(termo) !== -1;
      d.hidden = !ok;
      if (ok) visiveis++;
      if (termo && ok) d.open = true;
    });
    vazio.hidden = visiveis !== 0;
    statusBusca.textContent = termo ? visiveis + ' resultado(s) para “' + campoBusca.value.trim() + '”.' : '';
  }
  campoBusca.addEventListener('input', filtrar);
  formBusca.addEventListener('submit', function (e) { e.preventDefault(); filtrar(); });

  /* ---------- Formulários → php/backend.php ---------- */
  document.querySelectorAll('form[data-api="login"], form[data-api="cadastro"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var botao = form.querySelector('button[type="submit"]');
      var dados = new FormData(form);
      dados.append('acao', form.dataset.api);

      botao.disabled = true;
      status.className = 'form-status';
      status.textContent = 'Enviando…';

      fetch(API, { method: 'POST', body: dados, headers: { 'Accept': 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          status.textContent = res.mensagem || (res.ok ? 'Concluído.' : 'Não foi possível concluir.');
          status.classList.add(res.ok ? 'ok' : 'erro');
          if (res.ok && form.dataset.api === 'cadastro') form.reset();
        })
        .catch(function () {
          status.textContent = 'Servidor PHP indisponível. Abra o site por um servidor com PHP (ex.: php -S localhost:8000).';
          status.classList.add('erro');
        })
        .finally(function () { botao.disabled = false; });
    });
  });
})();
