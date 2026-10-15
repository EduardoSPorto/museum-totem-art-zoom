# Museu Totem Art Zoom: Exploração de Pigmentos
**Desenvolvimento de totens interativos integrando Química, Artes Visuais e Visão Computacional**

## Estado atual

O projeto apresenta uma pintura em um totem interativo e permite selecionar regiões da obra com um gesto de pinça touchless por rastreamento biométrico das mãos. A experiência está organizada em três níveis:
1. **Nível 1 (Obra de Arte):** A pintura completa em tela cheia com visualização ampliada, onde o visitante seleciona regiões de interesse através de pinça confirmada sobre a máscara cromática. Regiões selecionadas contam com contorno e máscara de realce com filtro estético discreto.
2. **Nível 2 (Material & Contexto):** Informações históricas, artísticas e materiais do pigmento selecionado, com layout adaptado sem necessidade de rolagem de texto, suporte a áudio dinâmico (TTS) em Português ou Inglês e botões de navegação lateral com estado desabilitado (cinza) nos limites.
3. **Nível 3 (Molécula 3D & Cristalografia):** Visualização tridimensional interativa renderizada via WebGL com manipulação física direta através de pinça (rotação natural em órbita vinculada à superfície do modelo, com tolerância a perda momentânea de rastreamento). Além de modelos moleculares (`.MOL`/`.SDF`), suporta estruturas cristalinas periódicas via arquivos CIF (*Crystallographic Information File*), como a wurtzita de sulfeto de cádmio (CdS).

O sistema também inclui:
- **Modo Standby Museológico:** Retorno automático ao Nível 1 após período sem mãos detectadas diante da câmera (desde que não haja narração de áudio em andamento).
- **Launcher Multiplataforma (`run.sh`, `run.command`, `run.bat`):** Inicia automaticamente servidor HTTP local com busca dinâmica de portas e abre a interface de configuração (`launcher.html`), com idioma padrão em Português e opção de Text-to-Speech configurável.
- **Atalhos Rápidos de Acessibilidade:** `Shift + L` (alternar idioma), `Shift + M` (mutar/desmutar narração TTS), `D` (modo debug) e entrada em tela cheia na primeira interação.

## Visão Geral
O projeto **Museum Totem Art Zoom** é uma aplicação interativa *touchless* (sem toque) idealizada para totens em ambientes museológicos e educacionais. O seu principal objetivo é criar uma ponte imersiva entre a apreciação artística e a ciência molecular, revelando os segredos químicos por trás das cores que compõem uma obra de arte.

A experiência resolve o desafio da acessibilidade e engajamento em exposições, permitindo que os usuários explorem materiais e modelos atômicos de pigmentos de forma lúdica, intuitiva e sem contato físico, garantindo durabilidade do equipamento e higiene.

---

## Arquitetura e Funcionamento (Fluxo do Sistema)

A arquitetura do software é baseada na captura de vídeo em tempo real e na renderização assíncrona de modelos tridimensionais, dividida em camadas lógicas bem definidas.

### 1. Captura e Visão Computacional
- **Input:** O sistema inicia ativando a webcam do totem e capturando o fluxo de vídeo (Stream).
- **Processamento 2D (MediaPipe):** Cada frame de vídeo é enviado para a biblioteca **MediaPipe Hands** (executada offline), que realiza o rastreamento das mãos do usuário e retorna as coordenadas espaciais (X, Y, Z) de 21 pontos articulares (*landmarks*).
- **Interpolação de Quadros e Zona Segura:** O cursor interpola o movimento a 60fps para garantir suavidade, e a navegação é mapeada a partir de uma zona segura central para permitir alcançar todos os cantos da tela confortavelmente.

### 2. Reconhecimento de Gestos (O Gesto de "Pinça Confirmada")
A principal forma de interação do sistema não depende de cliques de mouse ou toques na tela, mas sim da biometria da mão.
- **Cálculo da Distância:** O software monitora constantemente a distância euclidiana entre a ponta do polegar (Landmark 4) e a ponta do indicador (Landmark 8).
- **Confirmação e Cooldown:** Para acionar seleções de cor e botões de nível, a pinça deve ser mantida brevemente sobre o alvo (com anel visual de progresso), prevenindo disparos acidentais durante a locomoção da mão. Há também tempo de espera controlado entre mudanças de nível consecutivas.
- **Tolerância a Perda Momentânea:** Durante o arrasto do modelo 3D, uma perda passageira de rastreamento pela câmera mantém o estado de agarrar ativo, evitando solturas bruscas.

### 3. Comunicação com a Interface e Ambiente 3D
Dependendo da camada (Level) em que o usuário se encontra, a pinça desencadeia diferentes eventos:
- **Nível 1 (Obra de Arte):** A pinça confirmada atua como um seletor apontador sobre a máscara cromática, capturando a cor do pigmento e ativando a máscara de realce estético.
- **Nível 2 (Contexto):** Navegação entre níveis através dos botões laterais "Zoom In" e "Zoom Out", que só mudam de nível se a pinça for deliberadamente confirmada sobre eles. Botões em limites de navegação ficam desabilitados e cinzas.
- **Nível 3 (Molécula 3D):** A pinça tocando a renderização 3D agarra o objeto e rotaciona o modelo orbitalmente de forma natural e suave, acompanhando a superfície tridimensional.

---

## ️Tecnologias Utilizadas

Este projeto foi construído exclusivamente com tecnologias web de alta performance e bibliotecas de código aberto:

- **HTML5, CSS3, JavaScript (Vanilla):** Estrutura e lógica do sistema. Sem dependências pesadas, garantindo execução leve no navegador do Totem.
- **MediaPipe Hands (Google):** Inteligência artificial para o mapeamento da mão (Machine Learning).
- **WebGL / Three.js:** Responsáveis por provisionar o contexto gráfico tridimensional pelo navegador, aproveitando a aceleração via GPU.
- **3Dmol.js:** Biblioteca científica de bioinformática utilizada para analisar, processar e renderizar dinamicamente os arquivos de estrutura atômica (`.MOL` e `.SDF`).
- **CIF:** Arquivos de cristalografia usados para descrever parâmetros da célula unitária, posições fracionárias e simetria de materiais cristalinos.
- **Canvas API:** Utilizada amplamente para desenho das sobreposições de interação (cursor, esqueleto da mão e *preview* da câmera) de forma performática.

### Visualização cristalina e arquivos CIF

No nível 3, o visualizador decide como apresentar a estrutura a partir do arquivo associado ao item:

- Arquivos `.MOL` e `.SDF` são carregados e renderizados pelo **3Dmol.js** como modelos moleculares.
- Arquivos `.CIF` são carregados com `fetch`, lidos para obter os parâmetros da célula (`a`, `b`, `c`, `alpha`, `beta` e `gamma`) e convertidos de coordenadas fracionárias para cartesianas.
- A partir dessas coordenadas, o código calcula ligações entre átomos de espécies diferentes e desenha a coordenação periódica.
- Para o sulfeto de cádmio (CdS), o conversor usa os parâmetros e as posições do CIF para criar uma representação periódica e desenhar a coordenação entre Cd e S. O repositório também mantém dados preparados para uma supercélula de wurtzita `2×2×2` em `crystalStructures.js`, além de uma demonstração de célula unitária em `extra/CdS_celula_unitaria_cristal.html`.

O arquivo atualmente associado ao amarelo de cádmio é `assets/molecules/cadmium_yellow.cif`. O registro do item está em `js/data/chemicalStructures.js`, enquanto os dados preparados para a visualização da supercélula ficam em `js/data/crystalStructures.js`. Há outros CIFs e materiais de referência em `extra/`, incluindo exemplos de wurtzita e scripts para expandir a simetria de um CIF.

---

## Mapeamento de Itens da Obra (Lógica de Máscaras Ocultas)

Um dos maiores desafios técnicos era como mapear regiões irregulares de uma pintura, de forma performática e pixel perfect, para associar um item da obra àquela área. Um item pode ser um material com estrutura química ou uma região contextual, como a assinatura da artista.

Para isso, adotamos uma técnica de **Máscaras Ocultas Baseadas em RGB (Hidden Masks)**:

1. O sistema carrega **duas imagens** sobrepostas: a pintura original visualizada pelo usuário e uma "máscara colorida" com as dimensões exatas da obra, que permanece invisível (no nível do código).
2. Na máscara, cada região interativa (ex: manto do anjo, céu, assinatura) é preenchida com uma **cor RGB sólida e única**.
3. Quando o usuário executa o gesto de pinça, as coordenadas (X, Y) mapeadas pela câmera são normalizadas e projetadas no plano do canvas da máscara.
4. O sistema, através do método `getImageData` da API de Canvas, extrai exatamente o valor RGB daquele pixel específico.
5. Esse valor Hexadecimal atua como uma chave de banco de dados, que consulta nosso repositório de itens (`colorMap.js` -> `items.js`) para resgatar os dados da região selecionada.

---

## Estrutura do Projeto

Abaixo apresentamos a organização dos arquivos e pastas para facilitar a navegação no repositório:

```text
museum-totem-art-zoom/
├── assets/                    # Mídias estáticas do sistema
│   ├── artwork/               # Pintura original (visível) e máscara colorida RGB (oculta)
│   ├── highlights/            # Camadas com filtro estético para realce da área selecionada
│   ├── interface/             # Mídias auxiliares da interface (ilustrações e vídeo do gesto)
│   ├── materials/             # Imagens históricas dos pigmentos usadas no Nível 2
│   ├── molecules/             # Arquivos .mol, .sdf e .cif usados nas estruturas 3D
│   └── vendor/                # Bibliotecas JavaScript e modelos locais para uso offline
├── css/
│   └── main.css               # Estilos globais da interface (Vanilla CSS)
├── js/
│   ├── core/
│   │   └── maskReader.js      # Motor que lê a cor do pixel clicado no canvas da máscara
│   ├── data/
│   │   ├── colorMap.js        # Dicionário mapeando Código Hexadecimal RGB -> ID do item
│   │   ├── chemicalStructures.js # Registro dos arquivos .mol, .sdf e .cif
│   │   ├── crystalStructures.js  # Dados de supercélula e célula unitária para cristais
│   │   ├── items.js           # Banco de dados em inglês
│   │   └── itemsPT.js         # Banco de dados em português
│   ├── interaction/
│   │   └── gestures.js        # Lógica de confirmação e métricas de gestos biométricos
│   ├── rendering/
│   │   └── moleculeRenderer.js # Renderização molecular/cristalina 3D e manipulação orbital
│   ├── views/
│   │   └── materialView.js    # Controle da visão de detalhes do material (Nível 2)
│   └── state.js               # Gerenciador de estado global da aplicação
├── config.js                  # Configurações globais padrão (idioma, TTS)
├── painting-pigment-explorer.html # Arquivo HTML principal (Entrypoint) do sistema
├── launcher.html              # Interface para configurar idioma e narração
├── launcher-script.js         # Lógica do launcher e geração da URL
├── run.sh                     # Inicializador para Linux
├── run.command                # Inicializador para macOS
├── run.bat                    # Inicializador para Windows
├── LAUNCHER_GUIDE.md          # Guia de execução para usuários
└── README.md                  # Documentação do projeto
```

---

## Pré-requisitos e Instalação

O projeto foi projetado para rodar nativamente em ambientes Web, portanto, não é necessária a instalação de Node.js, compilação ou pacotes `npm`. É necessário um servidor web local para que as requisições `fetch` dos arquivos de imagem, molécula e CIF funcionem corretamente e para que o navegador permita o uso da webcam.

As bibliotecas MediaPipe, Three.js e 3Dmol.js são distribuídas no diretório `assets/vendor/`. Depois de clonar ou baixar o repositório, a aplicação não precisa de acesso à internet para funcionar. O pacote local do MediaPipe inclui os arquivos de modelo, WASM e o grafo de mãos usados pelo rastreamento.

O aplicativo ainda deve ser aberto por um servidor HTTP local, usando um dos launchers fornecidos. Isso é necessário para que o navegador permita o acesso à webcam e para que os arquivos de imagens, moléculas e CIF possam ser carregados com `fetch`; não é necessário acesso à internet.

### Como baixar e preparar os requisitos

1. **Use um computador com câmera e suporte a WebGL.** A câmera pode ser integrada ou USB. Esses recursos dependem do equipamento; não são programas para baixar. Para o nível 3D, mantenha os drivers gráficos atualizados.
2. **Instale ou atualize um navegador.** O [Google Chrome](https://www.google.com/chrome/) é uma opção recomendada. Também é possível usar uma versão recente do [Firefox](https://www.mozilla.org/firefox/new/) ou outro navegador moderno com suporte a webcam e WebGL.
3. **Tenha um servidor HTTP local disponível.** O projeto não requer Node.js nem pacotes npm. Os launchers tentam localizar `python3`, `python` ou `php` automaticamente.
   - **Windows:** se o launcher não encontrar um servidor, baixe o [Python para Windows](https://www.python.org/downloads/windows/), execute o instalador e marque **Add Python to PATH** antes de instalar. Feche e abra novamente o terminal após a instalação.
   - **macOS:** baixe o [Python para macOS](https://www.python.org/downloads/macos/) se `python3` não estiver disponível.
   - **Linux:** muitas distribuições já incluem Python. Caso necessário, instale o pacote Python 3 pelo gerenciador de programas da sua distribuição ou baixe-o em [python.org](https://www.python.org/downloads/).
4. **Baixe o projeto.** Na página do repositório, selecione **Code → Download ZIP** e extraia o arquivo, ou clone-o com Git:
   ```bash
   git clone https://github.com/EduardoSPorto/museum-totem-art-zoom.git
   ```
5. **Conecte ou habilite a câmera** e permita o acesso quando o navegador solicitar. Ao iniciar pelo launcher em `http://localhost`, o navegador pode usar a webcam sem HTTPS.

Depois de preparado, abra a pasta do projeto e inicie `run.bat` no Windows, `run.command` no macOS ou `./run.sh` no Linux. O aplicativo e seus recursos locais não precisam de internet durante o uso.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/EduardoSPorto/museum-totem-art-zoom.git
   cd museum-totem-art-zoom
   ```

2. **Inicie um servidor Web Local:**
   Execute o script do launcher apropriado para sua plataforma:
   - **Linux:**
     ```bash
     ./run.sh
     ```
   - **macOS:**
     ```bash
     ./run.command
     ```
   - **Windows:**
     ```cmd
     run.bat
     ```
   O script procura uma porta livre (padrão 8000), detecta um interpretador HTTP disponível (`python3`, `python` ou `php`), inicia o servidor e abre `launcher.html` no navegador. Esse endereço local (`http://localhost`) é indispensável para que o navegador libere o acesso à webcam e permita requisições de arquivos locais.

   *Alternativas manuais sem script:*
   - **Python:** `python3 -m http.server 8000`
   - **Node.js:** `npx http-server -p 8000`
   - **VS Code:** Extensão *Live Server*.

3. **Configure e Acesse:**
   O `launcher.html` abre configurado por padrão em **Português** (com alternância para **Inglês**) e com narração por voz ativada. Clique em **Launch Application** para iniciar.

---

## Guia de Uso (Interação)

Ao se posicionar diante do totem e ter suas mãos reconhecidas pela câmera:

- **Navegação (Apontar):** Mova a mão aberta diante da câmera. O cursor na tela acompanhará seu movimento proporcionalmente em uma zona segura central, eliminando a necessidade de esticar os braços até as bordas do totem.
- **Explorar (Gesto de Pinça Confirmada):** Ao aproximar indicador e polegar sobre uma região da pintura por um breve instante, um anel visual confirma a seleção deliberada. A região selecionada ganha destaque visual através de uma camada de brilho estético com contorno discreto.
- **Aprofundar (Botões Zoom In / Zoom Out):** Mova o cursor até os botões laterais e mantenha a pinça sobre o botão para navegar de nível. Se o usuário estiver nos limites (Nível 1 sem poder diminuir zoom, ou Nível 3 sem poder avançar), o botão correspondente é exibido desabilitado e acinzentado.
- **Rotacionar Estrutura 3D (Pinça Direta no Modelo):** Na tela de visualização molecular/cristalina (Nível 3), faça a pinça diretamente sobre o modelo tridimensional e arraste a mão no ar. A rotação acompanha orbitalmente a superfície do modelo de forma fluida. Se a mão sair momentaneamente do campo de visão da câmera durante o gesto, a aplicação tolera a breve perda sem interromper bruscamente a orientação.
- **Modo Standby Museológico:** Em períodos de inatividade (15 segundos sem detecção de mãos após o término de qualquer explicação falada), o totem retorna automaticamente ao Nível 1.
- **Atalhos Rápidos de Teclado:**
  - `Shift + L`: Alterna dinamicamente entre Português e Inglês.
  - `Shift + M`: Ativa / desativa o áudio de narração (TTS).
  - `D`: Exibe / oculta o painel de depuração de câmera e taxas de quadros.

## Exemplo MOL

Alizarin (Representative Lake Pigment)                        <-- 1. HEADER: Nome da molécula
PubChem CID 6293 — explicit hydrogen atoms for 3D display     <-- 1. HEADER: Metadados / Fonte dos dados
                                                              <-- 1. HEADER: Linha de comentários (em branco)
 26 28  0  0  0  0  0  0  0 0999 V2000                       <-- 2. COUNTS LINE: 26 Átomos | 28 Ligações | Padrão V2000
    2.4966    2.1721    0.0012 O   0  0  0  0  0  0 ...       <-- 3. ATOM BLOCK: Átomo 1  [ X, Y, Z, Elemento 'O' ]
   -0.0578    2.4815   -0.0018 O   0  0  0  0  0  0 ...       <-- 3. ATOM BLOCK: Átomo 2  [ X, Y, Z, Elemento 'O' ]
   -0.8533   -2.8032    0.0002 O   0  0  0  0  0  0 ...       <-- 3. ATOM BLOCK: Átomo 3  [ X, Y, Z, Elemento 'O' ]
    ...
    4.5594    1.4015    0.0017 H   0  0  0  0  0  0 ...       <-- 3. ATOM BLOCK: Átomo 26 [ X, Y, Z, Elemento 'H' ]
  1 11  1  0  0  0  0                                         <-- 4. BOND BLOCK: Ligação entre Átomo 1 e Átomo 11 (Tipo 1 = Simples)
  2  9  2  0  0  0  0                                         <-- 4. BOND BLOCK: Ligação entre Átomo 2 e Átomo 9  (Tipo 2 = Dupla)
  3 10  2  0  0  0  0                                         <-- 4. BOND BLOCK: Ligação entre Átomo 3 e Átomo 10 (Tipo 2 = Dupla)
    ...
## Commit History
--

    Removed deprecated launchers

--

    Defaulted launcher to portuguse

--

    Improved visualization for pinching during level changes.

--

    Removed accidentaly send files

--

    Updated assets with the aesthetic filter

--

    Updated color mapping mask to be more precise

--

    Updated TTS to the current behaviour of the code

--

    Fixed a long-standing bug where the model did not follow the pinch movement

--

    Limited the pinching to touching the 3D render

--

    Reduced the chance of the text being to big to be visiible without scrolling it.

--

    Added pinch gesture requirement for level changes and general cleanup
    
    - Pinching is now required to change levels.
    - Removed unused assets and performed general code cleanup.

--

    Hovering while pinching are now nedded to change levels

--

    Inverted the selection to a more intuitive way.
    
    - Pinching something to the left mover as if you dragged it, holding on it's surface.

--

    Small adaptation on what is considered a pinch on the model rotation

--

    A brief loss of hand tracking now preserves the active drag

--

    Non-selectable indication for button and small fullscreen fix
    
    - They become grayed out
    - Exiting fullscreen on some levels could prevent the text scrollbar from appearing

--

    Force or request fullscreen

--

    Removed non-discrete colors in the selected visualization

--

    Fixed a bug when fullscrenning outside of the level 1
    
    - Before the paint would not be show again.

--

    Fixed selected color highlight resizing
    
    - The software did not change scale to represent the highlight visualization

--

    Model Manipulation is now Very Smooth
    
    - Removed allot of the previous smoothing, it added allot of delay
    - Rotation calculaded from hand position, removing allot of the sudden changues creating the lag

--
    Some 3D model manipulation verification

--

    Forced return to default mode after 1 minute standby

--

    Fixed small problem with Test-to-Speach interruption

--

    Initial implementatioin of museus standby mode

--

    Unstable optimization changues

--

    Fixed the failed loading of a previously loaded material on level 3

--

    Text does not need scrolling anymore

--

    Fixed the lag on the movement of the selector

--

    Smothed out the color selection

--

    White material resized for better visualization

--

    Red Lake resized for better visualization

--

    Fixed tube coloring in the model for the yellow material

--

    Fixed double connection

--

    Fixed connection on the black material

--

    Fixed black material model

--

    Implemented CIF suppport for a multitude of materials

--

    Removed  deprecated CIF files

--

    Launcher color fix and changues to images
    
    - Lancher color now folow the software pattern
    - The images now are based on the final materials

--

    Updated data and visualization
    
    - Level 2 and 3 now reorganized to show more relevant information
    - Updated CIFs
    - Updateded Portuguese version of text

--

    Interface Information Matching
    
    - Update base new information

--

    Small changues to the launcher

--

    Simplify launcher

--

    Adjusted interface in lower resolutions

--

    Fixing molecule color and translation
    
    - The color now is fixed in red and yellow
    - The translation now is uptaded the the current english version

--

    Added the hand tracking model

--

    Initial camera non-activationg fix

--

    Added all sources that required an internet connection
    
    - Downloaded all files necessary to make the software offline-capable

--

    Updated README
    
    - Updated details about the current state of the implementation
    - Added information about the CIFs
    - Added the new files in the project strucure
    -  Pre requisites and launcher use detailed

--

    New Cristal Like Visualization

--

    The yellow final CIF is now wired into the explorer

--

    New Cif archive

--

    Fixed image detection

--

    Updated information about color for the new and updated information

--

    More data for info reference

--

    Auxiliar files for testing the cif implementation

--

    Initial Crystal Visualization Modification

--

    Internal organization documentation

--

    Changues to material to color association

--

    Updated ID's in the code

--

    List of information nedded for the project.

--

    Some

--

    Updated 3D model visualization

--

    Smothed out the Google Version
    
    - It now interpolates at display frame rate between MediaPipe tracking updates, removing the visible stepping while preserving the existing stability filter.

--

    Upgraded the hand detection visualizar and webcam

--

    Added a 5-second cooldown between hand-controlled level changes

--

    More detail in the TTS for level 3

--

    And internal scroll was added
    
    - Make clear when the text overflow what is visible

--

    Language change and voice shortcut
    
    - Shift + M mutes and unmutes.
    - Shift + L cycles through languages.

--

    Text to speach now correctly deals with the lack of common name when talking about the artist

--

    Section of Artist name is equal to the artist

--

    Information and Default Revision

--

    Ilustrative image
    
    - For visualization of the project

--

    Updated README with commit history

--

    Small  performance tests
    
    - Small changes for better performance

--

    Fixed artist information
    
    - Removed unnecessary information
    - Translated the text to English

--

    Option to disable tts and uptaded translation
    
    - Added an option to disable text-to-speech
    - Fixed some text that was not translpated, it's generated in the javacript section

--

    Dynamic text to speech
    
    - It does not literally read what is on screen, but follows a canned structure to present it.
    - The default language is changed back to Portuguese.

--

    Merge pull request #5 from EduardoSPorto/Working-on-interface-small-problems
    
    Multi-language support

--

    Multi-language support
    
    - Added an alternative to change the language in the new settings file.

--

    Merge pull request #4 from EduardoSPorto/Working-on-interface-small-problems
    
    Working on interface small problems

--

    Limit the select effect to only when selecting

--

    Disable highliting when clicking outside the paint

--

    Disabled the ability to drag the color selection outside the selection zone

--

    Distance correction for drag-to-rotate
    
    - The user had difficulty rotating the 3D model. Now, a distance from the camera is used to adjust how m
uch movement is applied when dragging.

--

    Merge pull request #3 from EduardoSPorto/Refactoring-internal-naming-scheme
    
    Refactoring internal naming scheme

--

    Internal naming fixes

--

    Cleaning some naming inconsistencies created by the artist insertion

--

    Removed redundant component name listings on level 3

--

    Cleaning unused files
    
    - Fixed the visibility of the material color identification on level 3.
    - Began simplifying and removing redundant text.

--

    Fixing a problem when returning to the level 3 after checking different materials

--

    Simplified information displayed removing unused  content

--

    Small changes on the pigment data

--

    Updated artist information

--

    Interface and Interaction
    
    - The interface is now more responsive to the user’s hand movements.
    - The highlighting is now more stylish.
    - The information for red, yellow, and black is now accurate (or commented when potentially wrong).
    - A video for the preparation of some interface tutorial videos was prepared. This is a temporary versio
n.

--

    Merge pull request #2 from EduardoSPorto/Appearance-Features-and-Fixes
    
    Appearance features and fixes

--

    Added Data Structure to README
    
    - Makes things easier while browsing

--

    New README
    
    - Explains the current version
    - Guides the user on how to run the code
    - Pre-requisites
    - Guides how to use

--

    Sizing up the text and new accent colors

--

    Level 3 now follow the same syle as level 2
    
    - That sadly makes the 3D model small. This has to be fixed in the next round of changes.

--

    Changed to a more subtle selection indicator

--

    Changed the color of the 3D rendering

--

    Now the Zoom in-out buttons don't show on the extremity levels

--

    Intitial implementation of the Big zoom in and out bars on the side

--

    3D model hand manipulation fixed
    
    - A whole independent implementation of the model manipulation.
    - The hand-controlled version was maintained.

--

    Changed some deprecated text

--

    Initial UI changes
    
    - An initial look, with a lot of changes guiding the path the new appearance will have.

--

    Camera interface simplification
    
    - Reduced the amount of information the camera displays.

--

    Color selection highlight
    
    - When selecting a color, highlight the corresponding regions.

--

    Isolated the chemical information to Level 3
    
    - The information about the chemical component was failing to display correctly in Level 3.
    - Removed the chemical information from Level 2.

--

    Added color highlight images

--

    Merge pull request #1 from EduardoSPorto/Generalization-to-support-the-artist
    
    Project Restructuring and Miscellaneous Fixes

--

    Hand Tracking Improvements
    
    - 1. The user should be able to interact with the molecule in Level 3 using the same pinch gesture alrea
dy used throughout the application.
    - 1. Pinching should “grab” the molecule; while the pinch is maintained, moving the hand should rotate t
he molecule.
    - 2. Previously, the entire camera image was mapped directly to the application. This caused interaction
 problems because the application’s buttons are positioned at the edges of the screen, forcing the user to m
ove their hand to the extreme borders of the camera image.
    - 2. Now, if the camera resolution is 1024 × 1024, only a centered 512 × 512 region should be mapped to 
the application interface.

--

    Fixed interface bugs and behavior
    
    FIXED:
    - The paint is slightly flattened vertically.
    - Level 1 and 2: A line strobe appears at the bottom, almost like something is loading.
    - After going into Level 2, the “View molecule” keeps showing up if you immediately go back to Level 1.
    - The “View molecule” button shows up even when you’re already on Level 3.
    - There shouldn’t be a “Molecule” button at all. It should only have “Zoom in” and “Zoom out” buttons. “
Zoom out” should always be on the left, and “Zoom in” should always be on the right of the screen. On Level 
2, “Zoom in” should lead to Level 3; that shouldn’t be handled by a third button called “View molecule.”
    - The bar showing the “Debug mode” button and the “Hand tracking” button shouldn’t exist.
    - I don’t need the “Debug” button right now (make it a shortcut instead).
    - “Hand tracking” should be the standard, only falling back to the mouse version when you fail to connec
t a camera; it's not something you select.

--

    Real paint color selection
    
    - The real paint color is not being detected
    - MOL files not are represented
    -  Pictures are showed correclty

--

    Initial implementation of real data
    
    - Paint now use the real image
    - Real mask, but working proprelty
    Regression
    - 3D molecules
    - etc

--

    Added placeholder mol files
    
    - They don't represent real content

--

    Initial commit
    
    Added some files necessary for the progression of the code. They started from the need for generalizatio
n.

--

    Code Demonolithization
    
    - The massive HTML is gradually being decoupled.
    - HTML and state management have been streamlined.
    - Some tests have been implemented; however, the camera test is still pending.

--

    Initial Reafactoring
    
    Separated files from

--

    Images removed
    
    - They are not necessary at this stage.

--

    Cleaning some testing code and annotation

--

    Added a mouse focused version
    
    I choose to have the two files, allowing for testing.

--

    Added the paint and color mask
    
    - An initial cropped image of the paint, along with the corresponding color mask.

--

    Molecule added

--

    Initial zoom in to material system
    
    - Users can now zoom in on a point on the screen; the paint material information is then displayed.
    
    - Hand detection works well for an initial implementation; behavior changes are welcome in future update
s.

--

    Initial implementation
    
    - First public implementation focusing on making the hand tracking work with the previously implemented 
interface.

--

    Initial commit
