import { obtenirTasques, guardarTasca, obtenirCategories } from './storage.js';

const formulari = document.getElementById('tasca-form');
const selectCategoria = document.getElementById('categories');
const selectPrioritat = document.getElementById('prioritat');



function carregarCategories() {
    const categories = obtenirCategories();
    selectCategoria.innerHTML = '<option value="">Selecciona una categoria</option>';
    categories.forEach((categoria) => {
        
        const opcio = document.createElement('option');
        opcio.value = categoria.nom;
        opcio.textContent = categoria.nom;
        selectCategoria.appendChild(opcio);
    });
}

carregarCategories();

function generarIdUnic() {
    const tasques= obtenirTasques();
    const idSeguent = tasques.length + 1;

    return "task-" + String(idSeguent).padStart(3, '0');
}
if (formulari) {
    formulari.addEventListener('submit', (event) => {
        event.preventDefault();

        const titol = document.getElementById('titol').value;
        const descripcio = document.getElementById('descripcio').value;
        const data = document.getElementById('data').value;
        const categoria = selectCategoria.value;
        const prioritat = selectPrioritat.value;
        
        
        if(titol.trim() === '' || descripcio.trim() === '' || data.trim() === '' || categoria.trim() === '') {
            alert('Tots els camps són obligatoris');
            return;
        }

        const novaTasca = {
            id: generarIdUnic(),
            titol: titol,
            descripcio: descripcio,
            data: data,
            categoria: categoria,
            prioritat: prioritat,
            realitzada: false
        };

        guardarTasca(novaTasca);
        alert('Tasca creada amb èxit!');
        formulari.reset();
    });
}