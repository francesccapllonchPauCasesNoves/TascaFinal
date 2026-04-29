//aquest arxiu crea les categories i les guarda al local storage, també les mostra a la pàgina i permet eliminar-les.

import { guardarCategoria, obtenirCategories, eliminarCategoria } from "./storage.js";

const formulari = document.getElementById('formCategoria');
const contenedorCategories = document.getElementById('categories');

mostrarCategories();

formulari.addEventListener('submit', (event) => {
    
    event.preventDefault();

    const nom= document.getElementById('inputCategoria').value;
    const color = document.getElementById('colorPicker').value;
    
    const novaCategoria = {nom,color};

    guardarCategoria(novaCategoria);
    mostrarCategories();
    formulari.reset();
});

contenedorCategories.addEventListener('click', (event) => {
    if(event.target.classList.contains('eliminar-btn')) {
        const index = event.target.getAttribute('data-index');
        eliminarCategoria(index);
        mostrarCategories();
    }
});

function mostrarCategories() {
    const categories = obtenirCategories();
    const contenedorCategories = document.getElementById('categories');
    contenedorCategories.innerHTML = '';
    categories.forEach((categoria, index) => {
        
        const categoriaNova = document.createElement('div');
        categoriaNova.className = 'categoria-item';

        categoriaNova.innerHTML = `
            <span style="color: ${categoria.color}">${categoria.nom}</span>
            <button class="eliminar-btn" data-index="${index}">Eliminar</button>
        `;
        contenedorCategories.appendChild(categoriaNova);
    });
}



