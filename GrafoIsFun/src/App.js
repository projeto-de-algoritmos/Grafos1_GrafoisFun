import './Styles.css';
import React from 'react';
import { Stage, Layer, Arrow, Circle, Text } from "react-konva";

function App() {
  // function createGraph() {
  //   if (vertex <= 0 || vertex > 1000 || isNaN(vertex)) {
  //     alert("Número de vértices inválido!!!")
  //     return
  //   }
  //   if (edges <= 0 || edges > 1000 || isNaN(edges)) {
  //     alert("Número de arestas inválido!!!")
  //     return
  //   }
  //   if (edges > vertex * (vertex - 1) && edges > 0) {
  //     alert("Número de arestas inválido!!!\n Lembrete: Número de arestas é menor ou igual ao número de Vértices*(Vértices-1)")
  //     return;
  //   }

  //   //Funçao de inicializar grafo aqui!!!
  // }

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
  )

  const graphSearch = () => (
    <div className="inputSearch">
      <div>
        <h3>Ache o menor caminho!!!</h3>
        <input className="aresta" />
        <input className="aresta" />
        <button>procurar</button>
      </div>
    </div>
  )

  const renderGraph = () => (
    <div className="graph-container">
      <Stage width={900} height={900} className="graphView">
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
    </div>
  );
}

export default App;
