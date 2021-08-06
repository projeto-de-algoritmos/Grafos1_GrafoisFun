export function initGraph(vertex) {
    let initialMatrix = []
    for (let i = 0; i < vertex; i++) {
        initialMatrix.push([]);
        for (let j = 0; j < vertex; j++) {
            initialMatrix[i].push(999)
        }
    }
    return initialMatrix;
}