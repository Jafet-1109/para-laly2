const FOTOS_INICIO = [
    "imagenes/imagen principal laly.jpeg",
    "imagenes/laly2.jpeg",
    "imagenes/laly3.jpeg",
    "imagenes/laly4.jpeg"
];

const RESPALDOS_INTERNET = [
    "https://unsplash.com",
    "https://unsplash.com",
    "https://unsplash.com",
    "https://unsplash.com"
];

let indiceFotoActual = 0;

function cambiarFotoInicio() {
    const imgElemento = document.getElementById('foto-inicio-dinamica');
    if (!imgElemento) return;

    // Pasamos a la siguiente foto
    indiceFotoActual++;

    // Si llegamos al final del arreglo, regresamos a la primera foto (0)
    if (indiceFotoActual >= FOTOS_INICIO.length) {
        indiceFotoActual = 0;
    }

    // Pequeño efecto visual de desvanecimiento rápido al cambiar la foto
    imgElemento.style.opacity = '0.3';
    
    setTimeout(() => {
        // Cambiamos la ruta local de la foto
        imgElemento.src = FOTOS_INICIO[indiceFotoActual];
        
        // Actualizamos el respaldo por si esa foto específica no se encuentra
        imgElemento.setAttribute('onerror', `this.src='${RESPALDOS_INTERNET[indiceFotoActual]}'`);
        
        imgElemento.style.opacity = '1';
    }, 150);
}
const FECHA_INICIO = new Date(2026, 1, 14, 22, 18, 0);

// Cambia esto por el título de la canción real de ustedes
const NOMBRE_CANCION = "Adela - Nicole Kidman (Cover)";

function switchTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.add('hidden'));

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => button.classList.remove('active'));

    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) targetView.classList.remove('hidden');

    const targetButton = document.getElementById(`btn-${tabId}`);
    if (targetButton) targetButton.classList.add('active');

    if (tabId === 'thom') {
        lanzarLluviaDeCorazones();
    } else if (tabId === 'inicio') {
        lanzarLluviaDeNamjoon();
    }
}

// LÓGICA DEL RELOJ CONTADOR TIEMPO REAL
function actualizarContador() {
    const contadorElemento = document.getElementById('love-counter');
    if (!contadorElemento) return;

    const ahora = new Date();
    const diferenciaMs = ahora - FECHA_INICIO;

    if (diferenciaMs < 0) {
        contadorElemento.innerHTML = "¡El viaje está por comenzar! ✨";
        return;
    }

    let segundos = Math.floor(diferenciaMs / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let diasTotales = Math.floor(horas / 24);

    const segundosRestantes = segundos % 60;
    const minutosRestantes = minutos % 60;
    const horasRestantes = horas % 24;

    let anos = ahora.getFullYear() - FECHA_INICIO.getFullYear();
    let meses = ahora.getMonth() - FECHA_INICIO.getMonth();
    let dias = ahora.getDate() - FECHA_INICIO.getDate();

    if (dias < 0) {
        meses--;
        const ultimoDiaMesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
    }
    if (meses < 0) {
        anos--;
        meses += 12;
    }

    let lineaPrincipal = `${diasTotales} días mágicos`;
    if (anos > 0 || meses > 0) {
        lineaPrincipal = `${anos} año(s), ${meses} mes(es) y ${dias} día(s)`;
    }

    contadorElemento.innerHTML = `✨ ${lineaPrincipal} ✨\n❤️ ${horasRestantes}h : ${minutosRestantes}m : ${segundosRestantes}s ❤️`;
}

setInterval(actualizarContador, 1000);
actualizarContador();

// LÓGICA DEL REPRODUCTOR DE MÚSICA
const audio = document.getElementById('bg-audio');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const volumeSlider = document.getElementById('volume-slider');
const musicTitle = document.getElementById('music-title');

if (musicTitle) musicTitle.textContent = NOMBRE_CANCION;

function toggleMusic() {
    if (!audio) return;

    if (audio.paused) {
        audio.play().then(() => {
            playIcon.className = "fas fa-pause";
            playBtn.classList.replace('bg-rose-500', 'bg-slate-700');
        }).catch(err => console.log("Interacción requerida para reproducir audio."));
    } else {
        audio.pause();
        playIcon.className = "fas fa-play ml-1";
        playBtn.classList.replace('bg-slate-700', 'bg-rose-500');
    }
}

if (volumeSlider && audio) {
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });
}

// LLUVIA DE CORAZONES EN LA VENTANA THOM
function lanzarLluviaDeCorazones() {
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const corazon = document.createElement('div');
            corazon.classList.add('heart-drop');
            corazon.innerText = '❤️';
            corazon.style.left = Math.random() * 100 + 'vw';
            corazon.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(corazon);
            setTimeout(() => corazon.remove(), 5000);
        }, i * 150);
    }
}
// NUEVO: Función para la lluvia mágica de Namjoon
function lanzarLluviaDeNamjoon() {
    // Genera 30 cabecitas de Namjoon de forma fluida
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const njElemento = document.createElement('div');
            njElemento.classList.add('namjoon-drop');
            
            // OPCIÓN INTERACTIVA: Colocamos una carita chibi/cartoon transparente de Namjoon
            njElemento.innerHTML = `<img src="imagenes/caradenam.png" onerror="this.replaceWith('🐨')" style="width: 40px; height: 40px; object-fit: contain;">`;

            // Posición horizontal y velocidad aleatoria
            njElemento.style.left = Math.random() * 100 + 'vw';
            njElemento.style.animationDuration = (Math.random() * 3 + 2.5) + 's';
            
            document.body.appendChild(njElemento);
            
            // Se elimina automáticamente tras caer para no saturar el navegador
            setTimeout(() => {
                njElemento.remove();
            }, 5500);
        }, i * 180); // Separación milimétrica para un efecto de cortina suave
    }
}

// Activar la lluvia de Namjoon automáticamente la primera vez que se carga la página
document.addEventListener("DOMContentLoaded", () => {
    // Esperamos medio segundo tras cargar el inicio para sorprenderla
    setTimeout(lanzarLluviaDeNamjoon, 500);
});
// BASE DE DATOS DE CUPONES OCULTOS DE BTS
const CUPONES_SECRETOS = [
    {
        titulo: "🎫 Petición de Namjoon: ¡Tarde de Helado y BTS!",
        detalle: "Este cupón oculto te otorga un helado gigante y una tarde entera escuchando vuestras canciones favoritas de BTS junto a Thom. 🐨💜"
    },
    {
        titulo: "🎫 Pase Army Especial: ¡Salida Romántica al Cine!",
        detalle: "¡Encontraste el pase de oro! Válido por una salida especial donde Thom se encarga de pagar por completo las entradas y las palomitas. 🎬✨"
    },
    {
        titulo: "🎫 RM Premium Ticket: ¡Un Abrazo Infinito!",
        detalle: "El cupón más puro del líder de BTS. Válido para reclamar un abrazo súper fuerte y prolongado de Thom cuando te sientas cansada o triste. 🧑‍💻❤️👧"
    },
    {
        titulo: "🎫 Jin Special Offer: ¡Una Noche de Música y Risas!",
        detalle: "Este cupón te permite disfrutar de una noche completa de música, risas y juegos con Thom, donde él se encargará de todo para que solo tengas que relajarte y disfrutar."
    },
    {
        titulo: "🎫 Suga's Sweet Deal: ¡Día de Dulces y Películas!",
        detalle: "Este cupón te permite disfrutar de un día completo de dulces y películas con Thom, donde él se encargará de todo para que solo tengas que relajarte y disfrutar. 🍭🎬"
    }
];

function descubrirSorpresa(id) {
    const regalo = CUPONES_SECRETOS[id];

    Swal.fire({
        title: '¡SÚPER SORPRESA ENCONTRADA! 🎁💜',
        html: `
            <div class="text-center space-y-3">
                <p class="text-xs text-purple-500 font-bold uppercase tracking-widest animate-pulse">¡Pase Oficial de BTS Desbloqueado!</p>
                <div class="bg-purple-600 text-white p-4 rounded-xl shadow-md font-bold text-sm">
                    ${regalo.titulo}
                </div>
                <p class="text-xs text-slate-600 mt-2">${regalo.detalle}</p>
            </div>
        `,
        icon: 'success',
        iconColor: '#a855f7',
        showCancelButton: true,
        confirmButtonText: '¡Canjear Cupón Ahora! 🎉',
        cancelButtonText: 'Guardar para después',
        confirmButtonColor: '#a855f7',
        cancelButtonColor: '#6b7280',
        background: '#faf5ff',
        color: '#581c87',
        customClass: { popup: 'rounded-3xl border-2 border-purple-200' }
    }).then((result) => {
        if (result.isConfirmed) {
            // Confirmación final del cobro del regalo
            Swal.fire({
                title: '¡Canjeado con Éxito! 🐨',
                text: '¡Prepárate Laly! Ve y muéstrale esta pantalla a Thom para hacer válido tu regalo en la vida real.',
                icon: 'success',
                confirmButtonColor: '#a855f7'
            });
        }
    });
}
// IA Y CONTROL DE PERSPECTIVA DE KIM NAM-JOON
let posicionX = 50;
let destinoX = 50;
let caminandoInterval;
let bloqueadoPorClic = false;
let tiempoEsperaDialogo;

// Variable de control para asegurar tu frase de presentación la primera vez
let esPrimeraInteraccion = true;

function moverNamjoonAleatoriamente() {
    if (bloqueadoPorClic) return;

    const asistente = document.getElementById('namjoon-asistente');
    const cuerpo = document.getElementById('nj-cuerpo');
    const piernaIzq = document.getElementById('pierna-izq');
    const piernaDer = document.getElementById('pierna-der');
    if (!asistente || !cuerpo) return;

    destinoX = Math.random() * (85 - 5) + 5;

    // Resetear clases previas limpiamente para evitar deformación por acumulación
    cuerpo.className = "nj-chibi-container";

    // Aplicar dirección exacta basada en el destino
    if (destinoX > posicionX) {
        cuerpo.classList.add('caminando-anim', 'perfil-derecha');
    } else {
        cuerpo.classList.add('caminando-anim', 'perfil-izquierda');
    }

    let paso = 0;
    clearInterval(caminandoInterval);
    caminandoInterval = setInterval(() => {
        if (bloqueadoPorClic) {
            clearInterval(caminandoInterval);
            return;
        }

        if (Math.abs(posicionX - destinoX) > 1) {
            posicionX += (destinoX > posicionX) ? 0.35 : -0.35;
            asistente.style.transform = `translateX(${posicionX}vw)`;
            
            paso += 0.25;
            if (piernaIzq && piernaDer) {
                piernaIzq.style.transform = `translateY(${Math.sin(paso) * 2.5}px)`;
                piernaDer.style.transform = `translateY(${Math.cos(paso) * 2.5}px)`;
            }
        } else {
            // Llegó al destino de forma limpia
            clearInterval(caminandoInterval);
            cuerpo.className = "nj-chibi-container"; // Regresa al estado base sin animación
            if (piernaIzq && piernaDer) {
                piernaIzq.style.transform = "translateY(0)";
                piernaDer.style.transform = "translateY(0)";
            }
            
            setTimeout(moverNamjoonAleatoriamente, Math.random() * (5000 - 2500) + 2500);
        }
    }, 30);
}

function interactuarConNamjoon() {
    bloqueadoPorClic = true;
    clearInterval(caminandoInterval);

    const globo = document.getElementById('namjoon-globo');
    const texto = document.getElementById('namjoon-texto');
    const cuerpo = document.getElementById('nj-cuerpo');
    const brazoIzq = document.getElementById('nj-brazo-saludo');
    const brazoDer = document.getElementById('nj-brazo-der');

    if (!globo || !texto || !cuerpo || !brazoIzq) return;

    // ASIGNACIÓN DEL PRIMER MENSAJE OBLIGATORIO PETICIÓN DE THOM
    if (esPrimeraInteraccion) {
        texto.innerText = "Hola Laly, Soy Kim Nam-joon 🐨";
        esPrimeraInteraccion = false; // Desactivar para que los siguientes clics den frases aleatorias
    } else {
        texto.innerText = FRASES_NAMJOON[Math.floor(Math.random() * FRASES_NAMJOON.length)];
    }

    // VOLTEAR AL FRENTE: Cancela los perfiles de caminata y mira directo a Laly
    cuerpo.className = "nj-chibi-container mirando-al-frente";
    
    // Activa la agitación física del brazo izquierdo y acomoda el derecho de frente
    brazoIzq.classList.add('saludando-anim');
    brazoDer.style.transform = "rotate(-30deg)";

    // Desplegar el globo de diálogo de forma animada
    globo.classList.remove('hidden');
    setTimeout(() => { globo.classList.remove('scale-0'); globo.classList.add('scale-100'); }, 50);

    clearTimeout(tiempoEsperaDialogo);

    // Ocultar diálogo y reanudar caminata tras 4 segundos
    tiempoEsperaDialogo = setTimeout(() => {
        globo.classList.remove('scale-100');
        globo.classList.add('scale-0');
        brazoIzq.classList.remove('saludando-anim');
        brazoDer.style.transform = "rotate(0deg)";
        
        setTimeout(() => {
            globo.classList.add('hidden');
            bloqueadoPorClic = false;
            moverNamjoonAleatoriamente(); // Regresa a caminar de perfil de forma autónoma
        }, 300);
    }, 4000);
}

// Inicializar el movimiento al cargar la web
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(moverNamjoonAleatoriamente, 1200);
});

// INTERACCIÓN AL HACER CLIC (SALUDO Y FRASES)
const FRASES_NAMJOON = [
    "¡Hola Laly! Namjoon reportándose. ¡Qué hermoso rincón web te diseñó Thom! 🐨💜",
    "¡HOLA ARMY! ¿Ya descubriste todos los cupones de BTS ocultos en las fotos? 👀",
    "Thom me confesó que eres la Army más preciosa del mundo... ¡Y confirmo! 👑",
    "¡Focus on... ARMY! Disfruta de nuestra música de fondo en la pestaña de Thom. 🎵",
    "🐨 *Namjoon te lanza un corazón morado coreano* ¡I Purple You, Laly!",
    "Si te sientes cansada, recuerda que el líder de BTS y Thom están para cuidarte. 💪💜"
];

function interactuarConNamjoon() {
    bloqueadoPorClic = true; // Pausar su caminata
    clearInterval(caminandoInterval);

    const globo = document.getElementById('namjoon-globo');
    const texto = document.getElementById('namjoon-texto');
    const cuerpo = document.getElementById('nj-cuerpo');
    const brazo = document.getElementById('nj-brazo-saludo');

    if (!globo || !texto || !cuerpo || !brazo) return;

    // 1. Mostrar frase aleatoria de BTS
    texto.innerText = FRASES_NAMJOON[Math.floor(Math.random() * FRASES_NAMJOON.length)];

    // 2. Detener caminata y activar el saludo físico con el bracito
    cuerpo.classList.remove('caminando-anim');
    brazo.classList.add('saludando-anim');

    // 3. Desplegar el globo de diálogo
    globo.classList.remove('hidden');
    setTimeout(() => { globo.classList.remove('scale-0'); globo.classList.add('scale-100'); }, 50);

    clearTimeout(tiempoEsperaDialogo);

    // 4. Tras 4 segundos, baja el brazo, guarda el diálogo y vuelve a caminar de forma libre
    tiempoEsperaDialogo = setTimeout(() => {
        globo.classList.remove('scale-100');
        globo.classList.add('scale-0');
        brazo.classList.remove('saludando-anim');
        
        setTimeout(() => {
            globo.classList.add('hidden');
            bloqueadoPorClic = false;
            moverNamjoonAleatoriamente(); // Reanudar sus paseos autónomos
        }, 300);
    }, 4000);
}

// Arrancar los paseos de Namjoon de forma automática al cargar la web
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(moverNamjoonAleatoriamente, 1500);
});
function comenzarExperiencia() {
    const intro = document.getElementById('intro-screen');
    
    // Le da un efecto de desvanecimiento
    intro.style.opacity = '0';
    intro.style.visibility = 'hidden';
    
    // OPCIONAL: Si quieres que la música empiece a sonar justo cuando da click,
    // puedes activar la reproducción de tu reproductor aquí, por ejemplo:
    // tuElementoDeAudio.play();
}
// Función para activar el cupón escondido
function descubrirCupon(tipoCupon) {
    const modal = document.getElementById('coupon-modal');
    const textoCupon = document.getElementById('coupon-text');
    
    // Lista de cupones personalizados. ¡Puedes cambiar los premios aquí!
    let premio = "";
    
    if (tipoCupon === 'cupon1') {
        premio = "🎟️ VALE POR: ¡Una tarde entera de películas y tus snacks favoritos!";
    } else if (tipoCupon === 'cupon2') {
        premio = "🍦 VALE POR: ¡Un helado gigante y una caminata juntos!";
    } else if (tipoCupon === 'cupon3') {
        premio = "🍟 VALE POR: ¡Tu comida favorita ilimitada por hoy!";
    } else if (tipoCupon === 'cupon4') {
        premio = "✨ VALE POR: ¡Un abrazo infinito y un besote!";
    } else if (tipoCupon === 'cupon5') {
        premio = "🎶 VALE POR: ¡Una serenata privada con tu canción favorita!";
    } else if (tipoCupon === 'cupon6') {
        premio = "💜 VALE POR: ¡Un día completo de juegos y risas juntos!";
    }else {
        premio = "🎁 VALE POR: ¡Una sorpresa especial de Thom para ti!";
    }
    
    // Inyecta el texto y muestra el modal
    textoCupon.innerHTML = premio;
    modal.style.display = 'flex';
}

// Función para cerrar el cupón
function cerrarCupon() {
    document.getElementById('coupon-modal').style.display = 'none';
}
// Fuerza la reproducción del video al cargar la página en celulares
window.addEventListener('DOMContentLoaded', () => {
    const videoBg = document.querySelector('.video-background');
    if (videoBg) {
        videoBg.play().catch(error => {
            console.log("El navegador bloqueó el autoplay, esperando interacción:", error);
        });
    }
});