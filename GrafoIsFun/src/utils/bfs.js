import { initGraph } from './createGraph';

export function BFS(graph_List, u, v) {
    const graphAux = initGraph(graph_List.length);

    const queue = [];
    queue.push(u);

    const visitado = [];
    visitado[u] = true;

    while(queue.length){
        let vertice = queue.shift();

        if(vertice === v){
            return menor_caminho(graphAux, graph_List, u, v);
        }

        for(let i=0; i < graph_List[vertice].length; i++) {
            if(!visitado[graph_List[vertice][i]]){
                visitado[graph_List[vertice][i]] = true;
                queue.push(graph_List[vertice][i]);
                graphAux[vertice].push(graph_List[vertice][i]);
            }
        }
    }

    return menor_caminho(graphAux, graph_List, u, v);
}

function menor_caminho(graphAux, graph_List, u, v){
    const graph = initGraph(graph_List.length);
    while(u != v){
        graph[u] = graphAux[u];
        u = graphAux[u];
    }
    return graph;
}
/*function shortestPath(graph, source, target) {
    if (source == target) {   // Delete these four lines if
        print(source);          // you want to look for a cycle
        return;                 // when the source is equal to
    }                         // the target.
    var queue = [source],
        visited = { source: true },
        predecessor = {},
        tail = 0;
    while (tail < queue.length) {
        var u = queue[tail++],  // Pop a vertex off the queue.
            neighbors = graph.neighbors[u];
        for (var i = 0; i < neighbors.length; ++i) {
            var v = neighbors[i];
            if (visited[v]) {
                continue;
            }
            visited[v] = true;
            if (v === target) {   // Check if the path is complete.
                var path = [v];   // If so, backtrack through the path.
                while (u !== source) {
                    path.push(u);
                    u = predecessor[u];
                }
                path.push(u);
                path.reverse();
                print(path.join(' &rarr; '));
                return;
            }
            predecessor[v] = u;
            queue.push(v);
        }
    }
    print('there is no path from ' + source + ' to ' + target);
}*/