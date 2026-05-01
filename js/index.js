import{ obtenirTasques, eliminarTasca, guardarTasca } from "./storage.js";

const divPendents = document.getElementById('pendents');
const divCompletades = document.getElementById('completades');

mostrarTasques();

function mostrarTasques() {
    const tasques = obtenirTasques();

    divPendents.innerHTML = '';
    divCompletades.innerHTML = '';

    tasques.forEach((tasca, index) => {
        const tascaNova = document.createElement('div');
        tascaNova.className = `tasca-card ${tasca.prioritat}`;

        tascaNova.innerHTML = `
            <h3>${tasca.titol}</h3>
            <p>${tasca.descripcio}</p>
            <p>Data: ${tasca.data} | Categoria: ${tasca.categoria}</p>
            <div class="accions">
                <button class="btn-completar" data-index="${index}">
                    ${tasca.realitzada ? 'Desmarcar' : 'Completar'}
                </button>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </div>
        `; 

        if(tasca.realitzada) {
            divCompletades.appendChild(tascaNova);
        } else {
            divPendents.appendChild(tascaNova);
        }
    });
}

document.querySelector('.tasques').addEventListener('click', (event) => {
    const index = event.target.getAttribute('data-index');
    if (index === null) return;

    if(event.target.classList.contains('btn-eliminar')) {
        eliminarTasca(index);
        mostrarTasques();
    }

    if(event.target.classList.contains('btn-completar')) {
        canviarEstatTasca(index);
    }
});

function canviarEstatTasca(index) {
    const tasques = obtenirTasques();

    tasques[index].realitzada = !tasques[index].realitzada;

    localStorage.setItem('tasques', JSON.stringify(tasques));
    mostrarTasques();
}