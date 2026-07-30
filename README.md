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

## Mapeamento de Pigmentos (Lógica de Máscaras Ocultas)

Um dos maiores desafios técnicos era como mapear regiões irregulares de uma pintura, de forma performática e pixel perfect, para associar um elemento químico àquela área.

Para isso, adotamos uma técnica de **Máscaras Ocultas Baseadas em RGB (Hidden Masks)**:

1. O sistema carrega **duas imagens** sobrepostas: a pintura original visualizada pelo usuário e uma "máscara colorida" com as dimensões exatas da obra, que permanece invisível (no nível do código).
2. Na máscara, cada região interativa (ex: manto do anjo, céu, assinatura) é preenchida com uma **cor RGB sólida e única**.
3. Quando o usuário executa o gesto de pinça, as coordenadas (X, Y) mapeadas pela câmera são normalizadas e projetadas no plano do canvas da máscara.
4. O sistema, através do método `getImageData` da API de Canvas, extrai exatamente o valor RGB daquele pixel específico.
5. Esse valor Hexadecimal atua como uma chave de banco de dados, que consulta nosso repositório de moléculas (`colorMap.js` -> `pigments.js`) para resgatar os dados do pigmento (como o Cinábrio / Sulfeto de Mercúrio).

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
│   │   ├── colorMap.js        # Dicionário mapeando Código Hexadecimal RGB -> ID do Pigmento
│   │   ├── molecules.js       # Registro de arquivos .mol
│   │   └── pigments.js        # Banco de dados de informações textuais de cada material
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
   Abra o seu navegador de preferência e navegue até `http://localhost:8080/painting-pigment-explorer.html`.
   *(Nota: O navegador solicitará permissão para uso da webcam. Conceda o acesso).*

---

## Guia de Uso (Interação)

Ao se posicionar diante do totem e ter suas mãos reconhecidas, um cursor indicativo acompanhará o movimento das suas mãos na tela.

- **Navegação (Apontar):** Mova a mão aberta diante da câmera. O cursor na tela acompanhará seu movimento proporcionalmente em uma "zona segura" estabelecida no centro da tela.
- **Explorar (Gesto de Pinça Curta):** Ao juntar as pontas dos dedos polegar e indicador brevemente (Pinch) sobre uma área da pintura, um pigmento será selecionado.
- **Aprofundar (Botões):** Movimente o cursor até o botão "Zoom In" e realize a pinça, ou simplesmente mantenha a mão parada sobre ele por 1 segundo (*Hover/Dwell Time*) para entrar na visualização da molécula química.
- **Rotacionar (Gesto de Pinça Longa):** Na tela de estrutura molecular 3D, faça a pinça, mantenha os dedos juntos e arraste a mão no ar. A molécula rotacionará nos eixos X e Y correspondentes ao movimento do seu braço. Solte a pinça para fixar o objeto no lugar.
- **Voltar:** Use o botão "Zoom Out" para retornar ao nível anterior de forma fluida.
