(function () {
  'use strict';

  var modalPeca = document.getElementById('modalPeca');
  if (modalPeca) {
    modalPeca.addEventListener('show.bs.modal', function (evento) {
      var botao = evento.relatedTarget;
      if (!botao) return;
      document.getElementById('modalPecaTitulo').textContent = botao.dataset.peca || 'Jogo';
      document.getElementById('modalPecaOrigem').textContent = botao.dataset.origem || '—';
      document.getElementById('modalPecaImpacto').textContent = botao.dataset.impacto || '—';
    });
  }

  var form = document.getElementById('formCadastro');
  var aviso = document.getElementById('avisoSucesso');

  if (form) {
    form.addEventListener('submit', function (evento) {
      evento.preventDefault();
      evento.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        var primeiroInvalido = form.querySelector(':invalid');
        if (primeiroInvalido) primeiroInvalido.focus();
        return;
      }

      form.classList.remove('was-validated');
      form.reset();

      if (aviso) aviso.classList.remove('d-none');
    });
  }

})();
