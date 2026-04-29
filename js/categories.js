//aquest arxiu crea les categories i les guarda al local storage, també les mostra a la pàgina i permet eliminar-les.

import { guardarCategoria, obtenirCategories } from "./storage.js";

const formulari = document.querySelector('formCategoria');

formulari.addEventListener('submit', (event) => {
    event.preventDefault();

    const nom= document.getElementById('inputCategoria').value;
    const color = document.getElementById('colorPicker').value;

    const novaCategoria = {
        nom,
        color

    };

    guardarCategoria(novaCategoria);
const inputCategoria = document.getElementById('inputCategoria');
const colorPicker = document.getElementById('colorPicker');
