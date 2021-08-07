import './Styles.css';
import React, { useState } from 'react';
import { initGraph } from './utils/createGraph';
import { Stage, Layer, Arrow, Circle, Text } from "react-konva";

function App() {
  const [graph_matrix, setGraph_matrix] = useState(null);
  const [vertex, setVertex] = useState(0);
  const [edges, setEdges] = useState(null);
  const [randomGraphStyle, setRandomStyle] = useState([]);
  const [vertex_U, setVertex_U] = useState(0);
  const [vertex_V, setVertex_V] = useState(0);


  function createGraph() {
    if (vertex <= 0 || vertex > 1000 || isNaN(vertex)) {
      alert("Número de vértices inválido!!!")
      return
    }
    if (graph_matrix != null) {
      // se o grafo ja existe ele apagar e cria um novo
      setGraph_matrix(null)
      return
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
  
  // função conecta nós do grafo
  function conectVertex(vertex_U, vertex_V) {
       let auxGraph = graph_matrix;
  
       if (vertex_U === vertex_V) {
         alert("Selecione Nós Diferentes para serem conectados!!!");
         return;
       }

       if (vertex_U < graph_matrix.length || vertex_V < graph_matrix.length) {
        auxGraph[vertex_U][vertex_V] = 1;
        auxGraph[vertex_V][vertex_U] = 1;
        setGraph_matrix(auxGraph);

        setVertex_V(0);
        setVertex_U(0);
       } else {
         alert("POSIÇÃO NÃO EXISTENTE");
       }
     }
  
  
  function findShortestPath() {
    // função para executar funcionalidade de achar o menor caminho
  }

  const graph = () => (

    <div className="inputForm">
      <div>
        <h3>Qual o tamanho do seu grafo?</h3>
        <input
          value={vertex}
          onChange={(e) => {
            setVertex(e.target.value);
          }}
        />
        <button onClick={createGraph}>criar</button>
      </div>
      <div>
        <h3>Adicione as arestas</h3>
        <input className="aresta" 
          value={vertex_U}
          onChange={(e) => {
            setVertex_U(e.target.value);
          }}/>
        <input className="aresta" 
          value={vertex_V}
          onChange={(e) => {
            setVertex_V(e.target.value);
          }}/>
        <button
          onClick={conectVertex}>adicionar</button>
      </div>
    </div>
  );

  const graphSearch = () => (
    <div className="inputSearch">
      <div>
        <h3>Ache o menor caminho!!!</h3>
        <input className="aresta" />
        <input className="aresta" />
        <button onClick={findShortestPath}>procurar</button>
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
      {graph()}
      {graphSearch()}
      {renderGraph()}
    </div>
  );
}

export default App;
