import './Styles.css';
import React, { useState } from 'react';
import { initGraph } from './utils/createGraph';
import { BFS } from './utils/bfs';
import { Stage, Layer, Arrow, Circle, Text } from "react-konva";

function App() {
  const [graph_List, setGraph_List] = useState(null);
  const [graph_menor, setGraph_menor] = useState(null);
  const [vertex, setVertex] = useState(0);
  const [edges, setEdges] = useState(null);
  const [randomGraphStyle, setRandomStyle] = useState([]);
  const [vertex_U, setVertex_U] = useState(0);
  const [vertex_V, setVertex_V] = useState(0);
  const [vertexFind_U, setVertexFind_U] = useState(0);
  const [vertexFind_V, setVertexFind_V] = useState(0);


  function createGraph() {
    if (vertex <= 0 || vertex > 1000 || isNaN(vertex)) {
      alert("Número de vértices inválido!!!")
      return
    }
    if (graph_List != null) {
      // se o grafo ja existe ele apagar e cria um novo
      setGraph_List(null)
      return
    }
    
    //Funçao de inicializar grafo aqui!!!
    const graph = initGraph(vertex);
    console.log("criado")
    console.log(graph)
    setGraph_List(graph);
    setGraph_menor(null);
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
  function conectGraph() {
       let auxGraph = graph_List;
  
       if (vertex_U === vertex_V) {
         alert("Selecione Nós Diferentes para serem conectados!!!");
         return;
       }  
       if(graph_List[vertex_U].includes(vertex_V) || graph_List[vertex_V].includes(vertex_U)){
        alert("Aresta já existente!!!");
        return;
       }

       if (vertex_U < graph_List.length || vertex_V < graph_List.length) {
        auxGraph[vertex_U].push(vertex_V);
        auxGraph[vertex_V].push(vertex_U);

        setGraph_List(auxGraph);
        console.log(auxGraph);

        setVertex_V(0);
        setVertex_U(0);

       } else {
         alert("POSIÇÃO NÃO EXISTENTE");
       }
     }
  
  
  function findShortestPath() {
    // função para executar funcionalidade de achar o menor caminho
    if(vertexFind_U === vertexFind_V){
      alert("Selecione nós diferentes a serem para busca de menor caminho");
    }

    if (vertexFind_U < graph_List.length || vertexFind_V < graph_List.length){
      setGraph_menor(BFS(graph_List, vertexFind_U, vertexFind_V));
      console.log(BFS(graph_List, vertexFind_U, vertexFind_V))
    } else {
      alert("POSIÇÃO NÃO EXISTENTE");
    }


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
        <button onClick={conectGraph}>adicionar</button>
      </div>
    </div>
  );

  const graphSearch = () => (
    <div className="inputSearch">
      <div>
        <h3>Ache o menor caminho!!!</h3>
        <input className="aresta" 
        value={vertexFind_U}
        onChange={(e) => {
          setVertexFind_U(e.target.value);
        }}/>

        <input className="aresta" 
        value={vertexFind_V}
        onChange={(e) => {
          setVertexFind_V(e.target.value);
        }}/>
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
      <Stage className="graphView">
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
