# Plano de contexto do projeto

> Contexto levantado em 12/10/2026 por leitura do código e das configurações locais. Leia este documento antes de trabalhar no projeto; depois consulte apenas os arquivos relacionados à tarefa. Atualize-o quando arquitetura, comandos ou comportamentos mudarem. Este arquivo é um mapa do estado atual, não uma lista de alterações autorizadas.

## 1. Objetivo e escopo

Portfólio pessoal de **Diego Alves**, desenvolvedor web, com apresentação biográfica, redes sociais, projetos, tecnologias e contato. Interface predominantemente em português, com estética de terminal e cores escuras/ciano.

É uma aplicação frontend estática em React. Não há backend, PHP, API, banco de dados, autenticação, formulário de contato ou persistência implementados. Node.js, MySQL e MongoDB aparecem como habilidades exibidas, não como serviços utilizados pelo aplicativo. Estar dentro de `htdocs` do XAMPP não torna este projeto uma aplicação PHP.

## 2. Stack e execução

| Item | Configuração declarada |
| --- | --- |
| Pacote | `blog`, versão `0.1.0`, privado |
| Interface | React e React DOM `^18.2.0` |
| Ferramentas | Create React App, `react-scripts` `5.0.1` |
| Rotas | `react-router-dom` `^6.20.1` |
| Ícones | `react-icons` `^4.12.0` |
| Linguagem e estilos | JavaScript com JSX e CSS comum; sem TypeScript ou CSS Modules |
| Testes declarados | Testing Library e runner fornecido por `react-scripts` |
| Outras dependências | `web-vitals` e `@babel/plugin-transform-private-property-in-object`; sem importação direta no código da aplicação lido |
| Lockfile | `package-lock.json`, formato 3; usar npm e preservar o lockfile |
| Lint | Configuração `react-app` e `react-app/jest` em `package.json`; sem script próprio de lint |

Comandos na raiz:

```powershell
npm.cmd ci
npm.cmd start
npm.cmd run build
npm.cmd test -- --watchAll=false
```

- `npm ci`: instalação reproduzível quando necessária; `node_modules` já estava presente no levantamento.
- `npm start`: servidor de desenvolvimento em **http://localhost:5000**, pois `.env` contém `PORT=5000`. O README padrão menciona 3000, mas não considera essa configuração.
- `npm run build`: gera a pasta `build/`, ignorada pelo Git.
- `npm test`: runner disponível, mas não foram encontrados arquivos de teste ou configuração adicional de testes no projeto.
- Em shells sem a restrição de execução de scripts do PowerShell, pode-se usar `npm` no lugar de `npm.cmd`.
- `npm run eject` existe, mas não é necessário ao fluxo normal e altera estruturalmente o projeto.
- Não há versão de Node fixada por `engines` ou arquivo de versionamento. No ambiente examinado: Node `v26.5.1`, npm `11.17.0`; compatibilidade de execução não foi validada nesta tarefa.

## 3. Fluxo e arquitetura

```text
public/index.html (#root)
└── src/index.js (ReactDOM.createRoot + BrowserRouter)
    └── src/routes.js (MainRoutes: apenas /)
        └── src/App.js
            ├── SplashScreen (durante a abertura)
            └── Pages/Home
                ├── Header (logo GIF)
                └── BodyContainer
                    ├── Identidade + biografia em terminal
                    └── Navegação + conteúdo selecionado
                        ├── Home → Redes
                        ├── Projetos → Projetos
                        ├── Stacks → Stacks
                        └── Contato → Contato
```

- A aplicação tem **somente a rota `/`**, sem rota de erro ou fallback no React Router.
- As opções Home, Projetos, Stacks e Contato são abas controladas por estado em `BodyContainer`, não páginas do roteador. Elas não mudam a URL e não preservam a seleção após recarregar.
- Não há Context API, Redux, armazenamento local ou camada de serviços. Os textos e links ficam diretamente no JSX.
- `App` espera 3.000 ms para substituir a splash por `Home`; seu timer tem cleanup.
- `SplashScreen` possui um segundo timer de 2.000 ms que faz o componente renderizar `null`. Sua animação CSS dura 1,5 s. Esses tempos diferentes podem produzir uma abertura com período sem conteúdo visível antes de `Home`.

## 4. Mapa dos arquivos e pontos de edição

| Arquivo | Responsabilidade / quando editar |
| --- | --- |
| `package.json` e `package-lock.json` | Dependências, scripts e configurações do toolchain |
| `.env` | Porta do servidor de desenvolvimento |
| `src/index.js` | Inicialização React e BrowserRouter; não renderiza `App` diretamente |
| `src/routes.js` | Registro de rotas; importa `App` |
| `src/App.js` | Alternância inicial entre splash e página principal |
| `src/index.css` | Estilo global do body |
| `src/Pages/Home/index.js` e `styles.css` | Composição Header/BodyContainer e fade-in da página |
| `src/Components/Header/index.js` e `styles.css` | Cabeçalho preto, GIF da marca e animação de entrada |
| `src/Components/SplashScreen/index.js` e `styles.css` | Identidade na abertura, timer próprio e fade-in/out |
| `src/Components/BodyContainer/index.js` | Biografia, digitação, cursor, estado de navegação e seleção de conteúdo |
| `src/Components/BodyContainer/styles.css` | Layout principal, terminal, menu e responsividade |
| `src/Components/Redes/Redes.js` e `styles.css` | Ícones e links sociais; atenção: o arquivo JS se chama `Redes.js`, não `index.js` |
| `src/Components/Projetos/index.js` e `styles.css` | Lista de projetos, atualmente com um link |
| `src/Components/Stacks/index.js` e `styles.css` | Ícones e nomes das sete tecnologias |
| `src/Components/Contato/index.js` e `styles.css` | Endereço de e-mail exibido como texto |
| `src/assets/gif/animatedLogo.gif` | Imagem importada pelo Header |
| `public/index.html` | Template HTML, título, idioma, favicon e metadados |
| `public/manifest.json` | Metadados de instalação e ícones públicos |
| `public/_redirects` | Regra `/* /index.html 200`, compatível com fallback de SPA no Netlify |
| `public/robots.txt` | Permite rastreamento |
| `public/favicon.ico`, `logo192.png`, `logo512.png` | Assets públicos referenciados no HTML/manifest |
| `README.md` | Texto padrão do Create React App, sem contexto específico do portfólio |

Respeitar maiúsculas nos diretórios `Components` e `Pages`; imports tolerados no Windows podem falhar em sistemas com distinção entre maiúsculas e minúsculas.

## 5. Estado e comportamento de BodyContainer

- `typedText`: texto já exibido; começa vazio.
- `currentIndex`: índice do próximo caractere da biografia.
- `selectedNavItem`: começa em `"Home"`; valores usados: `"Home"`, `"Projetos"`, `"stacks"` e `"Contato"`. O valor interno de Stacks é minúsculo.
- `instantText`: começa em `false`; clicar no terminal muda para `true`.
- O efeito de digitação acrescenta um caractere a cada 50 ms. Ao clicar, o intervalo passa para 0 ms; o código continua acrescentando caracteres gradualmente, não atribui o texto completo de uma vez. O efeito é recriado conforme `currentIndex` muda e limpa o intervalo anterior.
- `cursorVisible`: começa em `true` e alterna a cada 500 ms; controla o `_` junto ao texto. O intervalo também tem cleanup.
- `renderSelectedComponent()` escolhe o componente da seção direita; o default renderiza `Redes`.
- A biografia fica na seção esquerda e permanece montada ao trocar abas. Não há mecanismo para reiniciar a digitação.

## 6. Conteúdo atual

- Identidade: `DIEGO_ALVES/` e `WEB_DEVELOPER`.
- Biografia: prefixo `C:/diego_alves/web_dev:` e apresentação de um desenvolvedor da Zona Sul de São Paulo, com visão sobre o uso da tecnologia para problemas técnicos e sociais.
- LinkedIn: `https://www.linkedin.com/in/diego-alves-vaz-dev/`.
- GitHub: `https://github.com/DiegoAVaz`.
- Projeto: **Your-Todo**, link `https://your-todo-2401.netlify.app/`.
- Contato: `diegoalves32@gmail.com`, texto em `h1`, sem link `mailto:` ou envio de mensagem.
- Tecnologias: React, Node.js, MySQL, MongoDB, JavaScript, HTML5 e CSS3.
- Título do documento: `Diego Alves | Web developer`.

Links registrados a partir do código; disponibilidade dos destinos não foi verificada.

## 7. Design e responsividade

- Fundo do body: `#1c737e`; painel principal: `#123b43`; ciano para bordas, textos e ícones: `#17c3eb`; cabeçalho e terminal pretos.
- Fontes Gugi e Source Code Pro carregadas por `@import` do Google Fonts em vários CSS; dependem de acesso externo. O body usa sans-serif e o terminal tem fallback monospace.
- Cabeçalho: altura de 90 px, GIF com largura de 200 px.
- Container principal: `height: calc(100vh - 90px)`, `min-height: 450px`, padding de 20 px; painel com rolagem vertical.
- Desktop: seções em linha; até **780 px**, painel passa para coluna, com ajustes nas seções e no menu. Existem várias regras separadas para esse mesmo breakpoint.
- Até **515 px**, ícones das stacks e seus rótulos diminuem.
- Terminal: largura de 20 em, limitada a 90%, texto em `pre` com `whiteSpace: pre-wrap` inline.
- Animações: entrada do logo, fade-in da Home, fadeInUp do painel, abertura da splash, digitação e cursor.
- CSS importado por componente é global. Seletores como `h1`, `.container` e `.link` podem afetar outras partes; não assumir isolamento.

## 8. Pontos de atenção já identificados

São observações do código, não correções realizadas ou prioridades aprovadas:

1. Splash com três durações diferentes: animação 1,5 s, ocultação interna 2 s e exibição da Home em 3 s.
2. `@keyframes blinkCursor` aparece duas vezes em `BodyContainer/styles.css`; a última definição substitui a anterior. A propriedade `animation` de `.command-line` também tem uma composição que merece revisão se a tarefa envolver animações.
3. `box-shadow: 15px black` em `.subContainer` não tem os offsets necessários para uma declaração válida.
4. CSS de Header contém seletores de navegação e busca sem elementos correspondentes no JSX atual. Home contém regras para `.splash-visible`, mas essa classe não é atribuída no código lido.
5. Navegação usa `li` com `onClick`, sem controles nativos de teclado ou indicação explícita de aba selecionada. Links sociais com apenas ícones não têm rótulos acessíveis explícitos.
6. O projeto Your-Todo usa `target="blank"`, nome de contexto de navegação diferente do valor especial `_blank`.
7. HTML declara `lang="en"`, apesar do conteúdo em português; não há meta description. Manifest mantém cores que diferem da interface. Não há service worker registrado; manifest sozinho não comprova suporte offline.
8. Larguras mínimas, alturas baseadas em viewport e ícones sociais em `vw`/`vh` exigem verificação visual em telas pequenas ao modificar layout.
9. Não foram encontrados testes, CI ou configuração de deploy adicional. `_redirects` sugere preparação para Netlify, mas não comprova onde o portfólio está hospedado.
10. Ler e salvar código em UTF-8: a biografia possui acentos corretos. Uma leitura com encoding inadequado no PowerShell pode mostrar caracteres corrompidos sem que o arquivo esteja errado.

## 9. Plano de trabalho para próximas tarefas

1. Ler este contexto e verificar `git status --short` para identificar alterações existentes.
2. Localizar a tarefa pelo mapa de arquivos; reler apenas os arquivos afetados e suas dependências imediatas. O código prevalece se este documento estiver desatualizado.
3. Manter componentes funcionais, hooks, CSS adjacente e conteúdo em português conforme o padrão atual, salvo pedido de mudança.
4. Para editar uma seção, mudar seu componente e CSS; para alterar o menu ou adicionar uma aba, ajustar também os itens e o switch de `BodyContainer`. Uma nova aba não exige uma rota por padrão.
5. Para criar páginas com URL própria, editar `routes.js` e verificar o fallback no ambiente de hospedagem. O fallback do Netlify não configura automaticamente o Apache/XAMPP; hospedagem em subdiretório pode exigir ajustes de base e caminhos.
6. Para mudanças de código, executar `npm.cmd run build` e validar no navegador o fluxo afetado. Se houver testes relevantes, executá-los sem watch. Não confundir ausência de testes com validação de comportamento.
7. Ao alterar layout, conferir desktop, até 780 px e até 515 px. Ao alterar abertura ou terminal, conferir timers, clique para acelerar, cursor e troca de abas.
8. Atualizar este documento se forem alterados comandos, rotas, dependências, componentes, conteúdo relevante ou arquitetura.

## 10. Limites desta leitura

Foram lidos todos os JS/CSS da aplicação, configurações de pacote, arquivos públicos de texto, README e configuração de porta; assets foram inventariados e o início do lockfile foi conferido. Não foi necessário ler dependências de `node_modules` nem todo o lockfile. Não foram executados servidor, build ou testes, nem feita inspeção visual no navegador, pois esta tarefa produz documentação. Não houve mudança no código da aplicação.
