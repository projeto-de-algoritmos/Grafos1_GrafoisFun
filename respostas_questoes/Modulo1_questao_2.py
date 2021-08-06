#Resposta questão 2

class Grafo:
    # função que define estrutura do grafo
    def __init__(self, V, E):
        self.V = V
        self.E = set(frozenset((u,v)) for u,v in E)
        self._vizinhos = {}
        
        # adiciona vertice para cada V passado como argumento da classe
        for v in V:
            self.adiciona_vertice(v)

        # adiciona todas arestas em E passado como argumento da classe
        for u,v in self.E:
            self.adiciona_aresta(u,v)
    
    # adicona novo vertice
    def adiciona_vertice(self, v):
        # adiciona se ainda não existe vertive no Grafo
        if v not in self._vizinhos:
            self._vizinhos[v] = set()

    # adiciona nova aresta
    def adiciona_aresta(self, u, v):
        # adiciona vertices caso u ou v não exista
        self.adiciona_vertice(u)
        self.adiciona_vertice(v)

        # adiciona o conjunto de arestas em E
        self.E.add(frozenset([u,v]))
        self._vizinhos[u].add(v)
        self._vizinhos[v].add(u)

    # adiciona aresta direcionada
    def adiciona_aresta_direcionada(self, u, v):
        # adiciona vertices caso u ou v não exista
        self.adiciona_vertice(u)
        self.adiciona_vertice(v)

        # adiciona o conjunto de arestas em E
        self.E.add(frozenset([u,v]))
        self._vizinhos[u].add(v)
    
    # apaga aresta
    def apaga_aresta(self, u, v):
        e = frozenset([u,v]) 

        # verifica se existe conjunto de arestas em E
        if e in self.E:
            self.E.remove(e)
            self._vizinhos[u].remove(v)
            self._vizinhos[v].remove(u)
    
    # Apaga vertice e arestas que ele tinha com outros nós
    def apaga_vertice(self, u):
        para_apagar = list(self.vizinhos(u))
        # apaga todas arestas de u
        for v in para_apagar:
            self.apaga_aresta(u,v)
        del self._vizinhos[u]
    
    # verifica se aresta existe no Grafo
    def existe_aresta(self, u, v):
        e = frozenset([u,v])
        # verifica se conjunto existe em E, caso exista ele retorna True, caso contrario retorna falso
        if e in self.E:
            return True
        else:
            return False

    # retorna grau de um vertice
    def deg(self, v):
        return len(self._vizinhos[v])

    # retorna vizinhos de v
    def vizinhos(self, v):
        return iter(self._vizinhos[v])

    # quantidade de arestas no Grafo
    @property
    def m(self):
        return len(self.E)
    
    @property
    def n(self):
        return len(self._vizinhos)    

    # DFS que retorna o ciclo do grafo
    def DFS_retorna_ciclo(self):
        G_aux = Grafo(self.V,{}) # inicializa grafo auxiliar
        G_ciclo = Grafo(self.V,{}) # inicializa grafo que vai guardar ciclo

        nao_visitados = self.V # lista de vertices não visitados
        
        for v in self.V: # para cada vertice do grafo
            if v in nao_visitados: # se não foi visitado
                self.DFS_visit(G_ciclo, G_aux, v, nao_visitados) # chama funcao DFS_visit

        return G_ciclo

    def DFS_visit(self, G_ciclo, G_aux, v,nao_visitados):
        nao_visitados.remove(v) # como se torna vertice visitado retira da lista de não visitados
        
        # se ja foi encontrado algum ciclo no grafo
        if(G_ciclo.m > 0):
            return

        # para cada vizinho de v
        for w in list(self.vizinhos(v)):
            # se ainda nao foi visitado
            if w in nao_visitados:
                #adiciona aresta direcional de w para v em grafo auxiliar
                G_aux.adiciona_aresta_direcionada(w,v)
                # chama recursivamente a funcao DFS_visit
                self.DFS_visit(G_ciclo, G_aux, w,nao_visitados)
            # se w ja foi visitado e aresta nao esta no grafo auxiliar então foi detectado um ciclo
            if (w not in nao_visitados) and (not G_aux.existe_aresta(w,v)):
                # adiciona aresta 
                G_ciclo.adiciona_aresta(v,w)
                self.acha_ciclo(G_ciclo, G_aux, w, v)

    def acha_ciclo(self,G_ciclo, G_aux, w, v):
            # percorre grafo auxiliar ate encontrar vertice w e chama recursivamente a funcao
            if v != w:
                # adiciona aresta com v com vizinho anterior
                G_ciclo.adiciona_aresta(list(G_aux.vizinhos(v))[0],v)
                self.acha_ciclo(G_ciclo, G_aux, w, list(G_aux.vizinhos(v))[0])

if __name__ == '__main__':
    # inicializando grafo
    G = Grafo([1,2,3,4,5,6,7,8,9,10,11], {(1,2),(2,3),(3,4),(3,5),(4,8),(5,6),(6,7),(7,8),(7,9),(9,11),(11,10),(10,8)})
    # armazenando em G1 o ciclo do grafo G
    G1 = G.DFS_retorna_ciclo()

    # output das arestas que fazem parte do ciclo
    for i in range(G1.n):
        print(f'{i+1}: ', end=' ')
        print(list(G1.vizinhos(i+1)))