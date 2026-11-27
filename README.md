# Museum Totem Art Zoom
**Exploração de pigmentos por meio de arte, química e interação por gestos**

O Museum Totem Art Zoom é uma aplicação interativa para instalações educativas e museológicas. O visitante explora regiões de uma pintura com gestos de mão, consulta informações sobre os materiais e visualiza estruturas moleculares e cristalinas em 3D.

O projeto conecta a apreciação artística ao estudo dos materiais que compõem uma pintura. A interface oferece conteúdo em português e inglês. A narração por voz (TTS) é opcional; um atendente também pode apresentar as informações verbalmente.

---

## Experiência

1. **Obra:** Explore a pintura em tela cheia. A pinça seleciona regiões interativas e destaca a área correspondente.
2. **Material e contexto:** Consulte informações artísticas, históricas e materiais relacionadas à região selecionada.
3. **Estrutura 3D:** Explore modelos moleculares e estruturas cristalinas. Faça uma pinça sobre o modelo e mova a mão para girá-lo.

A câmera é usada para rastrear gestos e o navegador solicitará permissão. Se o rastreamento não estiver disponível, a aplicação oferece controle por mouse.

---

## Tecnologias

O projeto usa tecnologias web e inclui as bibliotecas necessárias para executar localmente:

- **HTML, CSS e JavaScript:** Interface e lógica da aplicação.
- **MediaPipe Hands:** Rastreamento de mãos, com os arquivos de modelo incluídos em `assets/vendor/`.
- **WebGL, Three.js e 3Dmol.js:** Renderização das visualizações tridimensionais.
- **MOL e CIF:** Formatos usados para representar estruturas moleculares e cristalinas.
- **Canvas API:** Desenho da máscara de seleção e de elementos da interação.

### Visualização cristalina e arquivos CIF

No nível 3, o visualizador decide como apresentar a estrutura a partir do arquivo associado ao item:

- Arquivos `.MOL` e `.SDF` são carregados e renderizados pelo **3Dmol.js** como modelos moleculares.
- Arquivos `.CIF` são carregados com `fetch`, lidos para obter os parâmetros da célula (`a`, `b`, `c`, `alpha`, `beta` e `gamma`) e convertidos de coordenadas fracionárias para cartesianas.
- A partir dessas coordenadas, o código calcula ligações entre átomos de espécies diferentes e desenha a coordenação periódica.
- Para os materiais com arquivos CIF, o conversor usa os parâmetros e as posições da estrutura para construir a visualização cristalina.

Os arquivos de estrutura ficam em `assets/molecules/`. O mapeamento entre itens e estruturas está em `js/data/chemicalStructures.js`; dados cristalinos preparados para visualização ficam em `js/data/crystalStructures.js`.

---

## Mapeamento de Itens da Obra (Lógica de Máscaras Ocultas)

As regiões interativas da pintura são mapeadas por uma máscara de cores. Um item pode representar um pigmento ou uma região contextual, como a assinatura da artista.

Para isso, adotamos uma técnica de **Máscaras Ocultas Baseadas em RGB (Hidden Masks)**:

1. A aplicação exibe a pintura e mantém uma máscara de cores separada.
2. Cada região interativa recebe uma cor RGB única na máscara.
3. Ao apontar e confirmar uma seleção, a aplicação lê a cor correspondente e procura o item associado em `js/data/colorMap.js`.

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
│   │   └── maskReader.js      # Leitura da cor na máscara da pintura
│   ├── data/
│   │   ├── colorMap.js        # Mapeamento de cores para itens
│   │   ├── chemicalStructures.js # Registro dos arquivos .mol, .sdf e .cif
│   │   ├── crystalStructures.js  # Dados de supercélula e célula unitária para cristais
│   │   ├── items.js           # Banco de dados em inglês
│   │   └── itemsPT.js         # Banco de dados em português
│   ├── interaction/
│   │   └── gestures.js        # Interação por gestos
│   ├── rendering/
│   │   └── moleculeRenderer.js # Renderização molecular/cristalina 3D e manipulação orbital
│   ├── views/
│   │   └── materialView.js    # Controle da visão de detalhes do material (Nível 2)
│   └── state.js               # Gerenciador de estado global da aplicação
├── config.js                  # Configuração padrão de idioma e narração opcional
├── painting-pigment-explorer.html # Arquivo HTML principal (Entrypoint) do sistema
├── launcher.html              # Interface para configurar idioma e narração
├── launcher-script.js         # Lógica do launcher e geração da URL
├── run.sh                     # Inicializador para Linux
├── run.command                # Inicializador para macOS
├── run.bat                    # Inicializador para Windows
└── README.md                  # Documentação do projeto
```

---

## Requisitos e inicialização

- Um navegador moderno com suporte a câmera e WebGL.
- Uma câmera para interação por gestos. O navegador solicitará permissão; se a câmera não estiver disponível, use o mouse.
- Um servidor HTTP local. Não é necessário instalar Node.js nem executar uma etapa de compilação. Os scripts de inicialização procuram `python3`, `python` ou `php`.

Clone ou baixe o repositório e inicie o script correspondente ao seu sistema:

```bash
git clone https://github.com/EduardoSPorto/museum-totem-art-zoom.git
cd museum-totem-art-zoom
```

- **Linux:** `./run.sh`
- **macOS:** `./run.command`
- **Windows:** `run.bat`

O script inicia um servidor local e abre `launcher.html`. Escolha o idioma e se deseja usar a narração TTS, que é opcional, e selecione **Launch Application**. Um atendente também pode apresentar as informações verbalmente.

Se necessário, inicie manualmente um servidor, por exemplo com `python3 -m http.server 8000`, e abra `http://localhost:8000/launcher.html`. Os arquivos de visão computacional e os recursos da aplicação são distribuídos localmente.

## Como interagir

- **Apontar:** Mova a mão diante da câmera para posicionar o cursor.
- **Selecionar:** Mantenha indicador e polegar juntos por um instante sobre uma região interativa.
- **Navegar:** Use o mesmo gesto nos botões laterais para avançar ou voltar entre os níveis.
- **Explorar uma estrutura:** No nível 3, faça uma pinça sobre o modelo e mova a mão para girá-lo.
- **Atalhos:** `Shift + L` alterna o idioma; `Shift + M` ativa ou desativa a narração TTS opcional; `D` mostra ou oculta o painel de depuração. Um atendente também pode apresentar as informações verbalmente.

---
