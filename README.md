# Rebrote — Moda que volta ao ciclo

Landing page de **página única** para uma **marca fictícia de roupas sustentáveis**, feita como
**Atividade 10 (Bootstrap)** — Professor Lucas José de Souza.

Tema escolhido: **Consumo Responsável e Moda Sustentável** (Agenda 2030 — ODS 12).

> A Rebrote não existe. Não há loja, venda, entrega, preço real nem coleta de dados.
> Preços, metas e números são **conteúdo do exercício**, e estão marcados como tal na própria página.

---

## Como cada requisito do trabalho é atendido

| Requisito | Onde está |
|---|---|
| HTML + CSS com **Bootstrap** | `index.html` + Bootstrap **5.3.8** pelo CDN + `assets/css/style.css` |
| **Ao menos 3 componentes** do Bootstrap | **7 componentes**: navbar, carousel, cards, modal, progress, accordion e formulário |
| Página **responsiva** | Grid do Bootstrap (`container`, `row`, `col-12 col-md-6 col-lg-4`) + navbar que vira *hambúrguer* abaixo de 992px |
| **Formulário de cadastro** | Seção `#cadastro` — nome, e-mail, cidade, interesse e aceite, com validação |
| Publicar no **GitHub Pages** | Instruções no fim deste README |
| **README.md** explicando o projeto | Este arquivo (+ `APRESENTACAO.md` com o roteiro dos 5 minutos) |

---

## Componentes do Bootstrap usados

1. **Navbar** (`navbar`, `navbar-expand-lg`, `collapse`) — menu fixo no topo que vira "hambúrguer" no celular.
2. **Carousel** (`carousel`, `carousel-item`, `carousel-indicators`) — três compromissos da marca, trocando a cada 6s e por clique.
3. **Cards** (`card`, `card-body`) — as três peças da coleção.
4. **Modal** (`modal`, `modal-dialog`) — um só modal, reaproveitado pelos três cards via `data-*` + JavaScript.
5. **Progress** (`progress`, `progress-bar`) — as metas de impacto da marca.
6. **Accordion** (`accordion`, `accordion-collapse`) — perguntas frequentes (abre uma por vez com `data-bs-parent`).
7. **Formulário** (`form-control`, `form-select`, `form-check`, `invalid-feedback`) — cadastro com validação.

Além deles: `grid`, `buttons`, `badges`, `alert`, `visually-hidden`, `sticky-top` e utilitários de espaçamento.

---

## Estrutura de arquivos

```
rebrote/
├── index.html              página única (todas as seções)
├── assets/
│   ├── css/style.css       nosso CSS (paleta, textura, ritmo das seções)
│   └── js/main.js          nosso JS (modal + validação do formulário)
├── README.md               este arquivo
└── APRESENTACAO.md         roteiro da apresentação de 5 minutos
```

---

## Como rodar na sua máquina

Não precisa instalar nada: o Bootstrap e as fontes vêm por CDN.

1. Baixe a pasta `rebrote/`.
2. Dê **duplo clique** em `index.html` — abre no navegador.

Se quiser servir como um site de verdade (recomendado antes de publicar):

```bash
cd rebrote
python3 -m http.server 8000
# depois abra http://localhost:8000
```

---

## Como publicar no GitHub Pages

> **Atenção:** o GitHub Pages em repositório **privado** exige plano pago.
> Para o trabalho, deixe o repositório **público**.

```bash
# 1. dentro da pasta rebrote/
git init
git add .
git commit -m "Atividade 10 - landing page Bootstrap"
git branch -M main

# 2. crie o repositório no GitHub e conecte (troque USUARIO e REPO)
git remote add origin https://github.com/USUARIO/REPO.git
git push -u origin main

# 3. ligue o Pages
#    GitHub -> repositório -> Settings -> Pages
#    Source: "Deploy from a branch"
#    Branch: main   |   Folder: / (root)   ->  Save
```

Depois de 1–2 minutos o site fica em:

```
https://USUARIO.github.io/REPO/
```

**Atenção nos nomes de arquivo:** o GitHub Pages diferencia maiúsculas e minúsculas.
Os caminhos usados são exatamente `assets/css/style.css` e `assets/js/main.js` — não mude as maiúsculas.

---

## Acessibilidade e responsividade (o que foi feito de propósito)

- HTML semântico: `header`, `main`, `section`, `article`, `footer`, `nav` com `aria-label`.
- Atributo `lang="pt-BR"` e link **"Pular para o conteúdo"** para quem navega por teclado.
- Foco visível em todos os elementos interativos (`:focus-visible`).
- `role="progressbar"` com `aria-valuenow` nas metas.
- Mensagem de sucesso com `aria-live="polite"` (lida por leitores de tela).
- Carousel com botões que têm `aria-label` em português.
- `prefers-reduced-motion` respeitado: quem pediu menos animação no sistema não vê transições.
- Breakpoints testados: 375px (celular), 768px (tablet), 1280px (notebook) e 1920px.

---

## O que seria diferente num projeto real

- O formulário enviaria para um backend (Node, PHP, Formspree...) com proteção contra spam.
- As metas de impacto seriam auditadas por terceiros, não declaradas pela própria marca.
- As imagens seriam fotos reais das peças (aqui usamos textura de tecido em CSS, sem foto de banco de imagens).
- Entraria LGPD de verdade: base legal, prazo de guarda e exclusão a pedido.

---

## Hospedagem (bônus) — também servido por Nomad

Além do GitHub Pages, o projeto está publicado num cluster Nomad (nginx servindo os arquivos
estáticos, em container). Os arquivos `Dockerfile` e `rebrote.nomad.hcl` documentam o deploy e
mostram o cuidado que o Nomad exige: **a porta estática publica o mesmo número dentro e fora do
container**, então o nginx foi configurado para escutar na mesma porta que o job publica.

Para subir em qualquer lugar com Docker:

```bash
docker build -t rebrote-site:1.0.0 .
docker run -p 8099:8099 rebrote-site:1.0.0
# abra http://localhost:8099
```

## Créditos e tecnologia

- **Bootstrap 5.3.8** — MIT (https://getbootstrap.com)
- Fontes **Fraunces** e **Source Sans 3** — Google Fonts (SIL Open Font License)
- Textura de tecido e elementos visuais: **CSS puro** (nenhuma imagem de terceiros)
- Trabalho acadêmico — Professor Lucas José de Souza
