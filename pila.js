class pila{
    constructor(){
        this.tope = null;
        this.plantilla = ``;
    }
    push(nodo){
        if(this.isEmpty()){
            this.tope = nodo;
        }else{
            nodo.setSiguiente(this.tope);
            this.tope = nodo;
        }
        $('.container').prepend(`<div class="nodo" id=${nodo.getPosicion()} style="background-color: ${this.colorRGB()}"><label>${nodo.getLetra()}</label></div><br><br>`);
    }
    pop(){
        if(!this.isEmpty()){
            this.temporal = this.tope;
            this.tope = this.tope.getSiguiente();
            this.temporal.setSiguiente(null);
            return this.temporal;
        }else{
            return null;
        }
    }
    
    isEmpty(){
        return (this.tope == null);
    }

    generarNumero(numero){
        return (Math.random()*numero).toFixed(0);
    }
    
    colorRGB(){
        var coolor = "("+this.generarNumero(255)+"," + this.generarNumero(255) + "," + this.generarNumero(255) +")";
        return "rgb" + coolor;
    }

}