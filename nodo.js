class nodo{
    constructor(letra, posicion){
        this.siguiente = null;
        this.letra = letra;
        this.posicion = posicion;
    }
    getSiguiente(){
        return this.siguiente;
    }
    setSiguiente(siguiente){
        this.siguiente = siguiente;
    }
    getLetra(){
        return this.letra;
    }
    getPosicion(){
        return this.posicion;
    }
}