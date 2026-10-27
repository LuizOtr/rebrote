# Roteiro da apresentação — 5 minutos

O professor liberou o uso de IA, **mas exigiu que quem apresenta saiba explicar**.
Este arquivo é exatamente isso: o que dizer, em que ordem, e o que responder se ele perguntar.

São 5 minutos: fale com calma, ~700 palavras. **Não precisa ser todo mundo** — uma pessoa apresenta.

---

## 0. Antes de começar (30s de preparação)

- Abra a página **já publicada no GitHub Pages** (não no arquivo local — ele pediu deploy).
- Deixe uma segunda aba com o **repositório** aberto, para mostrar os arquivos se ele pedir.
- Se a internet da sala cair, o site ainda abre: o CSS e as fontes principais têm *fallback* para o sistema.

---

## 1. Abertura — o que é e por que esse tema (40s)

> "A gente fez a landing page de uma marca fictícia de roupas sustentáveis, a **Rebrote**.
> Escolhemos o tema **Consumo Responsável e Moda Sustentável**, que é o **ODS 12** da Agenda 2030.
> A moda é o segundo setor que mais consome água no mundo, então a marca fictícia assume
> três compromissos: fibra rastreada, costura local e logística reversa.
> **A marca é fictícia e isso está escrito na própria página** — os preços e as metas
> são conteúdo do exercício, não promessa de loja."

*(aponte para a frase no rodapé e no hero: "Projeto de estudo: não há loja real")*

---

## 2. A estrutura da página — uma ideia por seção (1min30)

Percorra de cima para baixo, apontando. **Diga o nome do componente do Bootstrap em cada um** —
é isso que ele quer ver: você sabe *qual componente* está usando.

1. **Navbar** — "O menu fica fixo no topo. No celular ele vira o botão hambúrguer, que é o
   componente `navbar` com `collapse`."
2. **Carousel** — "Logo abaixo, o `carousel` mostra os três compromissos. Ele passa sozinho a cada
   6 segundos, e tem as bolinhas e as setas para quem quiser clicar."
3. **Pilares em texto** — "Aqui a gente **não** repetiu caixas, só texto grande com número —
   a ideia é não parecer uma pilha de cards iguais."
4. **Cards** — "Os três produtos. Cada card é um `card` do Bootstrap. Repare que o preço está
   marcado como fictício."
5. **Modal** — "Cada card tem um botão 'De onde vem esta peça'. Os três abrem o **mesmo modal**:
   o JavaScript lê os dados do botão e escreve dentro dele. Um modal só, reaproveitado."
6. **Progress** — "As barras de meta. **São metas, não resultados** — e estão escritas assim,
   de propósito. O valor de cada barra vem do `aria-valuenow`, e a largura é CSS."
7. **Accordion** — "As perguntas frequentes. Abre uma por vez, porque todas estão no mesmo
   `data-bs-parent`."
8. **Formulário de cadastro** — "É o formulário de cadastro: nome, e-mail, cidade, interesse e aceite."

---

## 3. O formulário — a parte que mais rende pergunta (1min)

> "O formulário usa a validação do Bootstrap: quando você clica em 'Quero o cupom', o JavaScript
> chama `checkValidity()` e, se algum campo estiver errado, adiciona a classe `was-validated` e
> aparece a mensagem vermelha embaixo **do campo errado**, escrevendo exatamente o que falta.
> Se estiver tudo certo, ele salva os dados no `localStorage` do navegador e mostra a mensagem
> verde. **Não manda para servidor nenhum** — é um exercício, e isso está escrito embaixo:
> nenhum dado sai do seu computador. Tem até um botão 'Limpar dados salvos' para provar isso."

**Se ele pedir para ver:** preencha errado de propósito (e-mail sem @) → mostra o erro.
Depois preencha certo → mensagem verde. Recarregue a página → a mensagem continua (é o `localStorage`).

---

## 4. Responsividade (40s)

Antes de terminar, **redimensione a janela** (ou abra o modo celular do navegador — F12):

> "A página é responsiva pelo grid do Bootstrap. Os cards ficam **3 por linha** no notebook,
> **2** no tablet e **1** no celular, só mudando as classes: `col-12 col-md-6 col-lg-4`.
> O menu vira hambúrguer abaixo de 992px, e o painel decorativo da capa muda de proporção no celular."

---

## 5. Fechamento (30s)

> "Fechando: **7 componentes** do Bootstrap, sendo que ele pediu no mínimo 3.
> Está publicado no GitHub Pages e o README explica a estrutura e como publicar de novo.
> O que a gente faria melhor num projeto real: as metas de impacto seriam auditadas por alguém de fora,
> as imagens seriam fotos reais das peças, e o formulário teria backend com LGPD de verdade."

---

## Perguntas prováveis do professor — e as respostas

**"Por que Bootstrap e não CSS puro?"**
> "Porque o Bootstrap já traz componentes prontos, testados e responsivos — navbar, carousel, modal.
> Isso deixa a gente gastar tempo na identidade da marca, não em refazer botão e grid.
> E o CSS próprio que a gente escreveu entra só onde o Bootstrap não resolve: paleta, textura e ritmo."

**"O que o grid faz, na prática?"**
> "Divide a largura em 12 colunas. `col-lg-4` = 4 de 12 = um terço. Quando a tela é menor que o breakpoint,
> a classe nova assume — `col-md-6` = metade, `col-12` = largura total. Por isso ele reorganiza sozinho."

**"De onde veio a paleta?"**
> "A marca é de fibra natural, então a paleta é terrosa: verde-carvão, sálvia, areia e um único
> acento em terracota. A gente evitou o azul/roxo que todo site de tecnologia usa, e usou
> **um** acento só, em vez de várias cores competindo."

**"Por que as barras de progresso não estão em 100%?"**
> "Porque é desonesto uma marca fictícia dizer que já resolveu tudo. Elas mostram **metas**,
> estão legendadas como metas, e a seção se chama 'O que ainda falta'. Foi uma escolha de conteúdo."

**"O formulário funciona mesmo?"**
> "Ele valida e salva no navegador, sim. O que ele **não** faz é enviar para um servidor — e isso
> está escrito na tela, porque foi um exercício. Num site real ele faria `fetch()` para um backend."

**"Você usou IA?" (se perguntar direto)**
> Responda com a verdade e mostre que você **entende** o que está no arquivo:
> "Usei para escrever o código mais rápido, sim. Consegui explicar cada componente, e as duas partes
> de JavaScript que são nossas — o modal reaproveitado e a validação — eu sei apontar linha por linha."

**"Onde está o deploy?"**
> Mostre a URL `https://USUARIO.github.io/REPO/` e, se pedir, o repositório com o commit.
> Tenha na ponta da língua: *Settings → Pages → Deploy from a branch → main → / (root)*.

---

## Cola rápida (se der branco)

- Seções: **navbar → carousel → pilares → cards (+modal) → metas → FAQ → cadastro → rodapé**
- Mínimo exigido: 3 componentes · **entregues: 7**
- Grid: `col-12 col-md-6 col-lg-4` (1 → 2 → 3 por linha)
- Formulário: `checkValidity()` + `was-validated` + `localStorage`, **sem servidor**
- Deploy: `Settings → Pages → main → / (root)`
