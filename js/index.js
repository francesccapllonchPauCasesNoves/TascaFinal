import{ obtenirTasques, eliminarTasca, guardarTasca, obtenirCategories, guardarCategoria } from "./storage.js";
import { pintarGrafic } from './grafics.js';


const divPendents = document.getElementById('pendents');
const divCompletades = document.getElementById('completades');
const btnArxiu = document.getElementById('btnArxiu');
const inputArxiu = document.getElementById('inputTasca');
const btnCrearTasca = document.getElementById('btnCrearTasca');

if(btnCrearTasca) {
    btnCrearTasca.addEventListener('click', () => {
        window.location.href = 'crear-tasca.html';
    });
}

mostrarTasques();

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

btnArxiu.addEventListener('click', async () => {
    const nomArxiu = inputArxiu.value;

    if(!nomArxiu)return alert('Escriu el nom del arxiu');
    
    const extensio = nomArxiu.split('.').pop().toLowerCase();

    try {
        const resposta = await fetch(`./dades/${nomArxiu}`);
        if(!resposta.ok) throw new Error('No s\'ha pogut carregar el arxiu');

        const categoriesActuals = obtenirCategories();

        if(extensio === 'json') {
            const dades = await resposta.json();
            processarJSON(dades, categoriesActuals);
            alert('Dades carregades correctament');
        } else if(extensio === 'xml') {
            const textXML = await resposta.text();
            processarXML(textXML, categoriesActuals);
            alert('Dades carregades correctament');
        } else {
            alert('Format de arxiu no suportat. Utilitza .json o .xml');
            return;
        }

        mostrarTasques();
        inputArxiu.value = '';

    } catch (error) {
        console.error(error);
        alert('Error al carregar l\'arxiu. Revisa que el nom i la carpeta /dades/ siguin correctes.');
    }
});

function processarJSON(dades, categoriesActuals) {
    dadesImportades.forEach(tasca => {
            if(tasca.categoria && typeof tasca.categoria === 'object'){
                const existeix = categoriesActuals.some(cat => cat.nom === tasca.categoria.nom);

                if(!existeix) {
                    const novaCategoria = {
                        nom: tasca.categoria.nom,
                        color: tasca.categoria.color || '#fff'
                    };
                    guardarCategoria(novaCategoria);
                    categoriesActuals.push(novaCategoria);
                }

                tasca.categoria = tasca.categoria.nom;
            }

            guardarTasca(tasca);

        });
    }


function processarXML(textXML, categoriesActuals) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(textXML, 'application/xml');
    const activitatsXML =  xmlDoc.getElementsByTagName('activitat');

    Array.from(activitatsXML).forEach(item => {
        const nomCat = item.getElementsByTagName('nomCat')[0]?.textContent || 'Sense Categoria';
    
    if(nomCat === 'Sense Categoria') {
        const existeix = categoriesActuals.some(cat => cat.nom === nomCat);
        if(!existeix) {
            const novaCat = {
                nom: nomCat,
                color: item.getElementsByTagName('colorCat')[0]?.textContent || '#fff'
            };
            guardarCategoria(novaCat);
            categoriesActuals.push(novaCat);
        }
    }

    const novaTasca = {
        id: item.getElementsByTagName('id')[0]?.textContent || '',
        titol: item.getElementsByTagName('titol')[0]?.textContent || '',
        descripcio: item.getElementsByTagName('descripcio')[0]?.textContent || '',
        data: item.getElementsByTagName('data')[0]?.textContent || '',
        realitzada: item.getElementsByTagName('realitzada')[0]?.textContent === 'true',
        prioritat: item.getElementsByTagName('prioritat')[0]?.textContent || 'Baixa',
        catergoria: nomCat
    };

    guardarTasca(novaTasca);
    });


}



function obtenirDadesPerMes() {
    const tasques = obtenirTasques();
    const mesos = Array(12).fill(0);

    tasques.forEach(tasca => {
        if (!tasca.realitzada || !tasca.data) return;

        const data = new Date(tasca.data);
        const mes = data.getMonth();

        if (!Number.isNaN(mes) && mes >= 0 && mes < 12) {
            mesos[mes] += 1;
        }
    });

    return mesos;
}

function actualitzarGrafica() {
    const canvas = document.getElementById('grafics');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    pintarGrafic(ctx, obtenirDadesPerMes());
}

function mostrarTasques() {
    const tasques = obtenirTasques();
    const categories = obtenirCategories();

    divPendents.innerHTML = '';
    divCompletades.innerHTML = '';

    tasques.forEach((tasca, index) => {

        const categoriaTasca = categories.find(cat => cat.nom === tasca.categoria);
        const fonsCategoria = categoriaTasca ? categoriaTasca.color : '#fff';

        const tascaNova = document.createElement('div');
        tascaNova.className = `tasca-card ${tasca.prioritat}`;

        const catTrobada = categories.find(cat => cat.nom === tasca.categoria);
        const colorFons = catTrobada ? catTrobada.color : '#fff';

        tascaNova.style.backgroundColor = fonsCategoria;
        tascaNova.style.padding = '15px';
        tascaNova.style.marginBottom = '10px';
        tascaNova.style.borderRadius = '8px';
        tascaNova.style.border = '1px solid #ccc';

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

    actualitzarGrafica();
}

actualitzarGrafica();

