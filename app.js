$(document).ready(function(){
    
    $('#modalPalabra').modal('show');

    var tipo = '';
    var palabra;
    var palabraAlReves = "";
    var divs;
    var posiciones;
    var posicionTope;

    const PILA = new pila();

    function test_Full_Numbers(word){
        var exp_reg = new RegExp("^\\d+$");
        return exp_reg.test(word);
    }
    function test_Full_Letters(word){
        var exp_reg = new RegExp("^\\S[a-zA-z]*$");
        return exp_reg.test(word);
    }

    function splitWord(word){
        for (let i = 0; i < word.length; i++) {
            PILA.push(new nodo(word[i],i));
        }

        divs = [...document.querySelectorAll('.nodo')];
        console.log(divs);
        posiciones = new Array(divs.length);
        posicionTope = posiciones.length-1;
        for (let i = 0; i < divs.length; i++) {
            posiciones[i] = divs[i].offsetTop;
        }
        console.log(posiciones);

    }

    $(document).on('keyup', '#word', function(){
        $('#modalPalabra .modal-dialog .modal-content .modal-body .form-group label').removeClass('alert-secondary');
        palabra = $('#word').val();
        var test_numbers = test_Full_Numbers(palabra);
        var test_letters = test_Full_Letters(palabra);
        if(test_numbers){
            tipo = 'Capicua';
            $('#modalPalabra .modal-dialog .modal-content .modal-footer .btn-primary').prop("disabled", false);
            $('#modalPalabra .modal-dialog .modal-content .modal-body .form-group label').removeClass('alert-danger');
            $('#modalPalabra .modal-dialog .modal-content .modal-body .form-group label').addClass('alert-primary');
            $('#modalPalabra .modal-dialog .modal-content .modal-body .form-group label').text('Son números');
        }else if(test_letters){
            tipo = 'Palindromo';
            $('#modalPalabra .modal-dialog .modal-content .modal-footer .btn-primary').prop("disabled", false);
            $('#modalPalabra .modal-dialog .modal-content .modal-body .form-group label').removeClass('alert-danger');
            $('#modalPalabra .modal-dialog .modal-content .modal-body .form-group label').addClass('alert-primary');
            $('#modalPalabra .modal-dialog .modal-content .modal-body .form-group label').text('Son letras');
        }else{
            $('#modalPalabra .modal-dialog .modal-content .modal-footer .btn-primary').prop("disabled", true);
            $('#modalPalabra .modal-dialog .modal-content .modal-body .form-group label').removeClass('alert-primary');
            $('#modalPalabra .modal-dialog .modal-content .modal-body .form-group label').addClass('alert-danger');
            $('#modalPalabra .modal-dialog .modal-content .modal-body .form-group label').text('Cadena Inválida');
        }
    });
    $(document).on('click','#modalPalabra .modal-dialog .modal-content .modal-footer .btn-primary', function(){
        palabra = $('#word').val();
        palabra = palabra.toUpperCase();
        splitWord(palabra);
        var result = window.confirm("¿Desea evaluar la cadena?");
        if(result){
            var intervalo = setInterval(function(){
                if(!PILA.isEmpty()){
                    const nodo = PILA.pop();
                    mover(nodo.getPosicion());
                    palabraAlReves += nodo.getLetra();
                }else{
                    compararCadenas();
                    clearInterval(intervalo);
                }
            },1000);
        }      
    });

    function mover(id){
        $(`#${id}`).animate({left: '85%'});
        $(`#${id}`).animate({top: `${posiciones[posicionTope--]}px`});
    }
    function compararCadenas(){
        if(palabra === palabraAlReves){
            switch(tipo){
                case 'Capicua':
                    $('.alert-dialog .modal-dialog .modal-content .modal-body').html(`<div class="alert alert-primary" role="alert">
                        Es una capicua
                    </div>`);
                    break;
                case 'Palindromo':
                    $('.alert-dialog .modal-dialog .modal-content .modal-body').html(`<div class="alert alert-primary" role="alert">
                        Es un palíndromo
                    </div>`);
                    break;
            }
        }else{
            switch(tipo){
                case 'Capicua':
                    $('.alert-dialog .modal-dialog .modal-content .modal-body').html(`<div class="alert alert-primary" role="alert">
                        No es una capicua
                    </div>`);
                    break;
                case 'Palindromo':
                    $('.alert-dialog .modal-dialog .modal-content .modal-body').html(`<div class="alert alert-primary" role="alert">
                        No es un palíndromo
                    </div>`);
                    break;
            }
        }
        $('.alert-dialog').modal('show');
    }

});