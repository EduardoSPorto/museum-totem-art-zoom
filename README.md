# Museu Totem Art Zoom: Exploração de Pigmentos
**Desenvolvimento de totens interativos integrando Química, Artes Visuais e Visão Computacional**

## Visão Geral
O projeto **Museum Totem Art Zoom** é uma aplicação interativa *touchless* (sem toque) idealizada para totens em ambientes museológicos e educacionais. O seu principal objetivo é criar uma ponte imersiva entre a apreciação artística e a ciência molecular, revelando os segredos químicos por trás das cores que compõem uma obra de arte.

A experiência resolve o desafio da acessibilidade e engajamento em exposições, permitindo que os usuários explorem materiais e modelos atômicos de pigmentos de forma lúdica, intuitiva e sem contato físico, garantindo durabilidade do equipamento e higiene.

---

## Arquitetura e Funcionamento (Fluxo do Sistema)

A arquitetura do software é baseada na captura de vídeo em tempo real e na renderização assíncrona de modelos tridimensionais, dividida em camadas lógicas bem definidas.

### 1. Captura e Visão Computacional
- **Input:** O sistema inicia ativando a webcam do totem e capturando o fluxo de vídeo (Stream).
- **Processamento 2D (MediaPipe):** Cada frame de vídeo é enviado para a biblioteca **MediaPipe Hands**, que realiza o rastreamento das mãos do usuário e retorna as coordenadas espaciais (X, Y, Z) de 21 pontos articulares (*landmarks*).

### 2. Reconhecimento de Gestos (O Gesto de "Pinça")
A principal forma de interação do sistema não depende de cliques de mouse ou toques na tela, mas sim da biometria da mão.
- **Cálculo da Distância:** O software monitora constantemente a distância euclidiana entre a ponta do dedo polegar (Landmark 4) e a ponta do dedo indicador (Landmark 8).
- **Gatilho (Trigger):** Quando a distância entre esses dois pontos cai abaixo de um limiar predefinido (Threshold), o sistema interpreta o movimento como um clique (o gesto de "pinça").

### 3. Comunicação com a Interface e Ambiente 3D
Dependendo da camada (Level) em que o usuário se encontra, a "pinça" desencadeia diferentes eventos:
- **Nível 1 (Obra de Arte):** A pinça atua como um seletor apontador, capturando a cor da região de interesse.
- **Nível 2 (Contexto):** Navegação e acionamento de botões (Zoom In, Zoom Out).
- **Nível 3 (Molécula 3D):** A pinça atua como um gatilho de *grab* (agarrar). O delta de movimento (deslocamento) da mão durante a pinça contínua é traduzido em cálculos de rotação (ângulos *yaw* e *pitch*) enviados à API do WebGL, permitindo a rotação do modelo atômico no espaço tridimensional em tempo real.

---

## ️Tecnologias Utilizadas

Este projeto foi construído exclusivamente com tecnologias web de alta performance e bibliotecas de código aberto:

- **HTML5, CSS3, JavaScript (Vanilla):** Estrutura e lógica do sistema. Sem dependências pesadas, garantindo execução leve no navegador do Totem.
- **MediaPipe Hands (Google):** Inteligência artificial para o mapeamento da mão (Machine Learning).
- **WebGL / Three.js:** Responsáveis por provisionar o contexto gráfico tridimensional pelo navegador, aproveitando a aceleração via GPU.
- **3Dmol.js:** Biblioteca científica de bioinformática utilizada para analisar, processar e renderizar dinamicamente os arquivos de estrutura atômica (`.MOL` e `.SDF`).
- **Canvas API:** Utilizada amplamente para desenho das sobreposições de interação (cursor, esqueleto da mão e *preview* da câmera) de forma performática.

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

## 📂 Estrutura do Projeto

Abaixo apresentamos a organização dos arquivos e pastas para facilitar a navegação no repositório:

```text
museum-totem-art-zoom/
├── assets/                    # Mídias estáticas do sistema
│   ├── artwork/               # Pintura original (visível) e máscara colorida RGB (oculta)
│   ├── highlights/            # Camadas de brilho para destacar áreas selecionadas
│   ├── materials/             # Imagens históricas dos pigmentos usadas no Nível 2
│   └── molecules/             # Arquivos atômicos tridimensionais (.mol) carregados pelo 3Dmol.js
├── css/
│   └── main.css               # Estilos globais da interface (Vanilla CSS)
├── js/
│   ├── core/
│   │   └── maskReader.js      # Motor que lê a cor do pixel clicado no canvas da máscara
│   ├── data/
│   │   ├── colorMap.js        # Dicionário mapeando Código Hexadecimal RGB -> ID do item
│   │   ├── chemicalStructures.js # Registro de arquivos .mol dos itens materiais
│   │   └── items.js           # Banco de dados de informações de cada item da obra
│   └── state.js               # Gerenciador de estado global da aplicação
├── painting-pigment-explorer.html # Arquivo HTML principal (Entrypoint) do sistema
└── README.md                  # Documentação do projeto
```

---

## ⚙️ Pré-requisitos e Instalação

O projeto foi projetado para rodar nativamente em ambientes Web, portanto, não é necessária a instalação de Node.js, compilações pesadas ou pacotes `npm`. O único requisito é um servidor web simples para que as requisições `fetch` dos arquivos locais (como os arquivos `.MOL`) contornem as regras de segurança CORS do navegador.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/EduardoSPorto/museum-totem-art-zoom.git
   cd museum-totem-art-zoom
   ```

2. **Inicie um servidor Web Local:**
   Você pode usar qualquer solução de sua preferência. Algumas sugestões comuns:
   - **Python (Recomendado):**
     ```bash
     python3 -m http.server 8080
     ```
   - **Node.js (http-server):**
     ```bash
     npx http-server -p 8080
     ```
   - **Extensão VS Code:** Utilize a extensão *Live Server*.

3. **Acesse no Navegador:**
   Abra o seu navegador de preferência e navegue até `chrome`.
   *(Nota: O navegador solicitará permissão para uso da webcam. Conceda o acesso).*

---

## Guia de Uso (Interação)

Ao se posicionar diante do totem e ter suas mãos reconhecidas, um cursor indicativo acompanhará o movimento das suas mãos na tela.

- **Navegação (Apontar):** Mova a mão aberta diante da câmera. O cursor na tela acompanhará seu movimento proporcionalmente em uma "zona segura" estabelecida no centro da tela.
- **Explorar (Gesto de Pinça Intencional):** Ao manter os dedos polegar e indicador próximos por alguns instantes e de forma deliberada sobre uma área da pintura, um pigmento será selecionado. O sistema agora evita detecções acidentais causadas por pequenas variações de posição.
- **Aprofundar (Botões):** Movimente o cursor até o botão "Zoom In" e realize a pinça de forma intencional, ou simplesmente mantenha a mão parada sobre ele por 1 segundo (*Hover/Dwell Time*) para entrar na visualização da molécula química.
- **Rotacionar (Gesto de Pinça Longa):** Na tela de estrutura molecular 3D, faça a pinça de forma intencional, mantenha os dedos juntos e arraste a mão no ar. A molécula rotacionará nos eixos X e Y correspondentes ao movimento do seu braço. Solte a pinça para fixar o objeto no lugar.
- **Voltar:** Use o botão "Zoom Out" para retornar ao nível anterior de forma fluida. As mudanças de nível exigem uma nova interação deliberada, evitando transições acidentais.

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
 18 24  1  0  0  0  0                                         <-- 4. BOND BLOCK: Ligação entre Átomo 18 e Átomo 24 (Tipo 1 = Simples)
M  END                                                        <-- 5. END BLOCK: Fim da especificação do arquivo

## Commit History
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