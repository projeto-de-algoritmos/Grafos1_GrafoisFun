export function initGraph(vertex) {
    let initialList = []
    for (let i = 0; i < vertex; i++) {
        initialList.push([]);
    }
    return initialList;
}