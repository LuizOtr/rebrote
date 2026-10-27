
(function () {
  'use strict';

  const CHAVE = 'rebrote.cadastro';

  
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

  
  const form  = document.getElementById('formCadastro');
  const aviso = document.getElementById('avisoSucesso');
  const botaoLimpar = document.getElementById('limparForm');

  if (form) {
    form.addEventListener('submit', function (evento) {
      evento.preventDefault();   
      evento.stopPropagation();

      
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        const primeiroInvalido = form.querySelector(':invalid');
        if (primeiroInvalido) primeiroInvalido.focus();
        return;
      }

      
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
        
      }

      
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

  
  if (botaoLimpar) {
    botaoLimpar.addEventListener('click', function () {
      try {
        localStorage.removeItem(CHAVE);
      } catch (erro) {  }

      if (form) {
        form.reset();
        form.classList.remove('was-validated');
      }
      if (aviso) aviso.classList.add('d-none');
    });
  }

  
  (function lembrarCadastro() {
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE) || 'null');
      if (salvo && salvo.nome && aviso) {
        const primeiroNome = salvo.nome.split(' ')[0];
        const titulo = aviso.querySelector('strong');
        if (titulo) titulo.textContent = 'Bem-vindo de volta, ' + primeiroNome + '!';
        aviso.classList.remove('d-none');
      }
    } catch (erro) {  }
  })();
})();
