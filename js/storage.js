//aqui carregarem les dades de les tasques i les categories, i les guardarem al localStorage
export function guardarTasca(tasca) {
    const tasques = obtenirTasques();
    tasques.push(tasca);
    localStorage.setItem('tasques', JSON.stringify(tasques));
}

export function obtenirTasques() {
    const tasques = localStorage.getItem('tasques');
    if(!tasques) return [];    
    return JSON.parse(tasques);
}

export function guardarCategoria(novaCategoria) {
    const llistaCategories = obtenirCategories();
    llistaCategories.push(novaCategoria);
    localStorage.setItem('categories', JSON.stringify(llistaCategories));
}

export function obtenirCategories() {
    const categories = localStorage.getItem('categories');
    if(!categories) return [];
    return JSON.parse(categories);
}

export function eliminarTasca(index) {
    const tasques = obtenirTasques();
    tasques.splice(index, 1);
    localStorage.setItem('tasques', JSON.stringify(tasques));
}

export function eliminarCategoria(index) {
    const categories = obtenirCategories();
    categories.splice(index, 1);
    localStorage.setItem('categories', JSON.stringify(categories));
}