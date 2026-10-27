/* =====================================================================
   Rebrote — JavaScript próprio
   O comportamento dos componentes (navbar, carousel, modal, accordion)
   vem do Bootstrap. Aqui ficam só as duas coisas que são NOSSAS:
     1) o modal reaproveitado pelos 3 cards;
     2) a validação do formulário de cadastro + salvar no navegador.
   ===================================================================== */
(function () {
  'use strict';

  const CHAVE = 'rebrote.cadastro';

  /* ------------------------------------------------------------------
     1) MODAL REAPROVEITADO
     Os três cards abrem o MESMO modal. O texto vem dos atributos
     data-peca, data-origem e data-impacto do botão que foi clicado.
     (evento.relatedTarget = o elemento que abriu o modal)
     ------------------------------------------------------------------ */
  const modalPeca = document.getElementById('modalPeca');
  if (modalPeca) {
    modalPeca.addEventListener('show.bs.modal', function (evento) {
      const botao = evento.relatedTarget;
      if (!botao) return;

      document.getElementById('modalPecaTitulo').textContent = botao.dataset.peca || 'Peça';
      document.getElementById('modalPecaOrigem').textContent = botao.dataset.origem || '—';
      document.getElementById('modalPecaImpacto').textContent = botao.dataset.impacto || '—';
    });
  }

  /* ------------------------------------------------------------------
     2) FORMULÁRIO DE CADASTRO
     Usa o padrão de validação do Bootstrap (classe .was-validated +
     :invalid do CSS) e guarda o resultado no localStorage.
     Não existe servidor: é um exercício, então nada é enviado.
     ------------------------------------------------------------------ */
  const form  = document.getElementById('formCadastro');
  const aviso = document.getElementById('avisoSucesso');
  const botaoLimpar = document.getElementById('limparForm');

  if (form) {
    form.addEventListener('submit', function (evento) {
      evento.preventDefault();   // sem servidor para receber os dados
      evento.stopPropagation();

      // Validação: se algum campo estiver inválido, mostra os erros e para.
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        const primeiroInvalido = form.querySelector(':invalid');
        if (primeiroInvalido) primeiroInvalido.focus();
        return;
      }

      // Deu tudo certo: monta o objeto e salva no navegador.
      const dados = {
        nome:      document.getElementById('nome').value.trim(),
        email:     document.getElementById('email').value.trim(),
        cidade:    document.getElementById('cidade').value.trim(),
        interesse: document.getElementById('interesse').value,
        quando:    new Date().toISOString()
      };

      try {
        localStorage.setItem(CHAVE, JSON.stringify(dados));
      } catch (erro) {
        // localStorage bloqueado (aba anônima, por exemplo): segue sem salvar.
      }

      // Limpa o formulário e mostra a mensagem de sucesso.
      form.classList.remove('was-validated');
      form.reset();

      if (aviso) {
        const primeiroNome = dados.nome.split(' ')[0];
        const titulo = aviso.querySelector('strong');
        if (titulo) titulo.textContent = 'Tudo certo, ' + primeiroNome + '!';
        aviso.classList.remove('d-none');
      }
    });
  }

  /* Botão que apaga o que foi salvo no navegador */
  if (botaoLimpar) {
    botaoLimpar.addEventListener('click', function () {
      try {
        localStorage.removeItem(CHAVE);
      } catch (erro) { /* ignora */ }

      if (form) {
        form.reset();
        form.classList.remove('was-validated');
      }
      if (aviso) aviso.classList.add('d-none');
    });
  }

  /* Ao carregar: se já havia um cadastro salvo, mostra a mensagem */
  (function lembrarCadastro() {
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE) || 'null');
      if (salvo && salvo.nome && aviso) {
        const primeiroNome = salvo.nome.split(' ')[0];
        const titulo = aviso.querySelector('strong');
        if (titulo) titulo.textContent = 'Bem-vindo de volta, ' + primeiroNome + '!';
        aviso.classList.remove('d-none');
      }
    } catch (erro) { /* localStorage indisponível: segue sem */ }
  })();
})();
