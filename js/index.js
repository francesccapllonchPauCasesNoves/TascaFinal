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
                    ${tasca.completada ? 'Desmarcar' : 'Completar'}
                </button>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </div>
        `; 

        if(tasca.completada) {
            divCompletades.appendChild(tascaNova);
        } else {
            divPendents.appendChild(tascaNova);
        }
    });
}