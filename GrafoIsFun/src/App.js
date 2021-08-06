import './Styles.css';
import React, { useState } from 'react';
import { initGraph } from './utils/createGraph';
import { Stage, Layer, Arrow, Circle, Text } from "react-konva";

function App() {
  const [graph_matrix, setGraph_matrix] = useState(null);
  const [vertex, setVertex] = useState(0);
  const [edges, setEdges] = useState(null);
  const [randomGraphStyle, setRandomStyle] = useState([]);


  function createGraph() {
    if (vertex <= 0 || vertex > 1000 || isNaN(vertex)) {
      alert("Número de vértices inválido!!!")
      return
    }
    if (edges <= 0 || edges > 1000 || isNaN(edges)) {
      alert("Número de arestas inválido!!!")
      return
    }
    if (edges > vertex * (vertex - 1) && edges > 0) {
      alert("Número de arestas inválido!!!\n Lembrete: Número de arestas é menor ou igual ao número de Vértices*(Vértices-1)")
      return;
    }

    //Funçao de inicializar grafo aqui!!!
    const graph = initGraph(vertex);
    setGraph_matrix(graph);
    generateGraphStyle();
  }

  const generateGraphStyle = (vertex) => {
    const array = [];
    for (let i = 0; i < vertex; i++) {
      array.push({
        top: Math.floor(Math.random() * 800),
        left: Math.floor(Math.random() * 800),
        position: "absolute",
      })
    }
    setRandomStyle(array);
  }

  //   // function connectVertex(origin, destination) {
  //   //   const isAlreadyConnected = verifyConnectivity(origin, destination)
  //   //   if (isAlreadyConnected) {
  //   //     alert("Vértices já conectados!")
  //   //     return;
  //   //   }

  //   if (origin === destination) {
  //     alert("Um vértice não pode se ligar a ele mesmo!")
  //     return;
  //   }

  //   let newGraph = graph_matrix;
  //   if (destination < graph_matrix.length) {
  //     newGraph[origin][destination] = 1
  //     setGraph_matrix(newGraph);
  //     setEdgesCount(edgesCount - 1)
  //     setDestinyVertex(0)
  //     setOriginVertex(0)
  //   } else {
  //     alert("Essa posição não existe!")
  //   }
  // }

  // function connectVertexBothDirection(origin, destination) {
  //   let newGraph = graph_matrix;

  //   if (origin === destination) {
  //     alert("Não pode ligar nele mesmo");
  //     return;
  //   }
  //   if (destination < graph_matrix.length) {
  //     let isOriginNotConnected = !verifyConnectivity(origin, destination);
  //     let isDestinationNotConnected = !verifyConnectivity(destination, origin);

  //     if (isOriginNotConnected && isDestinationNotConnected) {
  //       newGraph[origin][destination] = 1;
  //       newGraph[destination][origin] = 1;
  //       setGraph_matrix(newGraph);
  //       setEdgesCount(edgesCount - 2);
  //     } else if (isOriginNotConnected) {
  //       newGraph[origin][destination] = 1;
  //       setGraph_matrix(newGraph);
  //       setEdgesCount(edgesCount - 1);
  //     } else if (isDestinationNotConnected) {
  //       newGraph[destination][origin] = 1;
  //       setGraph_matrix(newGraph);
  //       setEdgesCount(edgesCount - 1);
  //     }
  //     setDestinyVertex(0);
  //     setOriginVertex(0);
  //   } else {
  //     alert("POSIÇÃO NÃO EXISTENTE");
  //   }
  // }

  function finishGraph() {
    // função para executar funcionalidade de achar o menor caminho
  }

  const graphInfoForm = () => (
    <div className="inputForm">
      <div>
        <h3>Qual o tamanho do seu grafo?</h3>
        <input
          type="text"
          placeholder="Número de Vértices"
        />
        <button>novo</button>
      </div>
      <div>
        <h3>Adicione as arestas</h3>
        <input className="aresta" />
        <input className="aresta" />
        <button>adicionar</button>
      </div>
    </div>
  );

  const graphSearch = () => (
    <div className="inputSearch">
      <div>
        <h3>Ache o menor caminho!!!</h3>
        <input className="aresta" />
        <input className="aresta" />
        <button>procurar</button>
      </div>
    </div>
  );

  // const renderEdges = (graph) => {
  //   const connectedEdges = [];

  //   for (let i = 0; i < vertex; i++) {
  //     for (let j = 0; j < vertex; j++) {
  //       if (graph[i][j] === 1) {
  //         connectedEdges.push(
  //           <Arrow
  //             points={[
  //               randomGraphStyle[i].left,
  //               randomGraphStyle[i].top,
  //               randomGraphStyle[j].left,
  //               randomGraphStyle[j].top,
  //             ]}
  //             fill="black"
  //             stroke="black"
  //           />
  //         );
  //       }
  //     }
  //   }
  //   return connectedEdges;
  // };

  // const renderVertex = (graph) => {
  //   const vertexes = graph.map((vertex, i) => (
  //     <>
  //       <Circle
  //         radius={5}
  //         x={randomGraphStyle[i].left}
  //         y={randomGraphStyle[i].top}
  //         stroke="black"
  //         fill="black"
  //       />
  //       <Text
  //         x={randomGraphStyle[i].left - 3}
  //         y={randomGraphStyle[i].top + 10}
  //         text={i}
  //         fontSize={20}
  //         fontStyle="bold"
  //       />
  //     </>
  //   ));

  //   return vertexes;
  // };

  const renderGraph = () => (
    <div className="graph-container">
      <Stage width={918} height={670} className="graphView">
        {/* <Layer>
          {renderEdges(graph_matrix)}
          {renderVertex(graph_matrix)}
        </Layer> */}
      </Stage>
    </div>
  );

  return (
    <div>
      <div className="header">
        <h1>Graphs is fun!</h1>
      </div>
      {graphInfoForm()}
      {graphSearch()}
      {renderGraph()}
    </div>
  );
}

export default App;
