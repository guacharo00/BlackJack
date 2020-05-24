/**
 * 2C Two of clubs (Trebores)
 * 2D Two of Diamonds (Diamantes)
 * 2H Two of Hearts (Corazones)
 * 2S Two of swords (Espadas)
 */

const miModulo = (() => {

    'use strict'

    /**
     * Crear Deck de cartas
     */
    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];
    
    // Referencias al html
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntero  = document.querySelectorAll('small');

    const inicializarJuego = ( numJugadores = 2 ) => {
        
        deck = crearDeck();
        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0)
        }

        puntero.forEach( elem => elem.innerText = 0 );
        // puntero[0].innerText = 0;
        // puntero[1].innerText = 0;

        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled   =false;
        btnDetener.disabled =false;

    }
    
    const crearDeck  = () => {
        
        deck = [];
        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push( i + tipo );
            }
        }
    
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push( esp + tipo );
            }
        }
        return _.shuffle(deck);
    
    };

    inicializarJuego();
    
    // Funcion para pedir carta
    const pedirCarta = ( ) => {
    
        if (deck.length === 0) {
            throw 'No hay cartas en la baraja';
        }
        
        return deck.pop();

    }
    
    // Valor de la carta
    
    const valorCarta = ( carta ) => {
    
        // substring corta un string desde una posicion de inicio hasta un final que escojamos;
    
        let valor  = carta.substring( 0, carta.length -1 );
        let puntos = 0;
    
        // isNaN se utilisa para identificar si un valor es un numero o no;
        return  ( isNaN(valor) ) ? 
                 ( valor==='A' ) ? 11: 10
                 : parseInt(valor);
     
    }
    
    const valor = valorCarta( pedirCarta() );
    
    // Turno: 0 primer jugador y el ultimo sera la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntero[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];

    }

    const crearCarta = ( carta, turno ) => {

        const cartaImg = document.createElement('img');
        cartaImg.src = `assets/cartas/${carta}.png`;
        cartaImg.classList.add('carta');
    
        divCartasJugadores[ turno ].append( cartaImg );

    }
    
    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        
        let puntosComputadora = 0;
        do {
    
            const carta = pedirCarta();

            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
            
            crearCarta( carta, puntosJugadores.length - 1 );

            if (puntosMinimos > 21) {
                break;
            }
    
    
        } while ( (puntosComputadora < puntosMinimos && (puntosMinimos <= 21)) );
    
        setTimeout(()=>{
    
            if ( puntosComputadora === puntosMinimos ) {
                alert('Es un empate :|');
            } else if ( puntosComputadora > 21 ) {
                alert('Jugador Gana :)');
            } else if ( puntosJugadores[0] > 21 ) {
                alert('Computadora gana :(');
            } else if (puntosComputadora > puntosMinimos) {
                alert('Computadora gana :(');
            } else {
                alert('Jugador Gana :)');
            }
    
        },600);
    
    
    }
    
    
    // Eventos y DOM
    
    btnPedir.addEventListener('click', () => {
    
        const carta = pedirCarta();

        const puntosJugador = acumularPuntos( carta, 0 );
        
        crearCarta( carta, 0 );

        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho as perdido');
            btnPedir.disabled = true;
            btnDetener.disabled =true;
            turnoComputadora( puntosJugador );
        } else if ( puntosJugador === 21 ){
            console.warn('21, Genial');
            btnPedir.disabled = true;
            btnDetener.disabled =true;
            turnoComputadora( puntosJugador );
        }
    
    });
    
    btnDetener.addEventListener('click', ()=> {
        btnPedir.disabled   =true;
        btnDetener.disabled =true;
    
        turnoComputadora( puntosJugadores[0] );
    });
    
    // btnNuevo.addEventListener('click', ()=> {

    //     inicializarJuego();

    // });

    return {
        nuevoJuego: inicializarJuego
    }

})();
