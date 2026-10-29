# 🌹 Buquê Animado

Uma animação romântica feita com **HTML, CSS, JavaScript e GSAP**: um buquê de rosas vermelhas e lírios azuis que "nasce" na tela, com música de fundo, mensagem escrita letra por letra e pétalas caindo. Feito como presente, 100% responsivo para celular.

## ✨ O que tem no projeto

- Buquê desenhado em **SVG** gerado por JavaScript (rosas, lírios azuis, folhas, caules, embalagem e laço)
- Animação em sequência com **GSAP Timeline**: embalagem, caules crescendo, folhas, flores desabrochando, texto e subtítulo
- Título animado **letra por letra** (com quebra de linha só entre palavras)
- **Pétalas caindo** em loop e leve balanço do buquê
- **Música de fundo** com entrada suave (fade in) e botão de mute
- Tela inicial com botão "Toque para abrir", necessária porque os navegadores bloqueiam áudio automático
- **Responsivo**: funciona em celular em pé e deitado (`100dvh`, `clamp()`, safe-area para iPhone com notch)

## 🛠️ Tecnologias

- HTML5
- CSS3 (variáveis de viewport, media queries, `clamp()`)
- JavaScript (SVG dinâmico via DOM)
- [GSAP 3](https://gsap.com/) (via CDN)
- Fontes do Google Fonts: *Great Vibes* e *Quicksand*

## 📁 Estrutura

```
buque/
├── index.html    # estrutura da página
├── style.css     # visual e responsividade
├── script.js     # desenho do buquê, animações e música
└── musica.mp3    # sua música (você adiciona)
```

## 🚀 Como rodar

1. Baixe ou clone o projeto e abra a pasta no **VS Code**.
2. Coloque o arquivo de música na pasta com o nome **`musica.mp3`**.
3. Instale a extensão **Live Server** (Ritwick Dey).
4. Clique com o botão direito em `index.html` → **Open with Live Server**.
5. Clique em **"Toque para abrir"** para iniciar a animação e a música.

> Também dá para abrir o `index.html` direto no navegador, mas o Live Server recarrega a página sozinho a cada alteração.

### Testar no celular

Com o Live Server rodando e o celular na **mesma rede Wi-Fi**, acesse `http://IP-DO-SEU-PC:5500` no navegador do celular.

## 🎨 Personalização

| O que mudar | Onde |
|---|---|
| Título e mensagem | `index.html` (`#title` e `#subtitle`) |
| Cores do fundo | `style.css` (`background` do `body`) |
| Cores das rosas | `script.js` (`palette`) |
| Tons do azul dos lírios | `script.js` (função `createLily`, cores `#1e4fb8` e `#3b82f6`) |
| Quantidade e posição das flores | `script.js` (lista `flowers`: `[tipo, x, y, tamanho]`) |
| Volume da música | `script.js` (`gsap.to(music, { volume: 0.6 ... })`) |
| Quantidade de pétalas | `script.js` (função `startPetals`) |

Para trocar uma rosa por um lírio (ou o contrário), basta mudar `'rose'` por `'lily'` na lista `flowers`.

## 🌐 Publicar online

Para enviar o link por WhatsApp, por exemplo:

- **Netlify Drop**: acesse [app.netlify.com/drop](https://app.netlify.com/drop) e arraste a pasta inteira (incluindo o `musica.mp3`).
- **GitHub Pages**: suba o projeto para um repositório e ative o Pages em *Settings → Pages*.

## 📝 Observações

- A música só toca após o clique no botão inicial (regra dos navegadores).
- Mantenha o `musica.mp3` leve (até uns 3 a 5 MB) para carregar rápido no 4G.
- Use apenas músicas que você tenha direito de usar, principalmente se for publicar o projeto de forma pública.

## 💌 Sobre

Projeto feito com carinho como presente. Fique à vontade para adaptar, trocar as flores, a música e a mensagem para a sua pessoa especial.