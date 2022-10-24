// https://codingnepalweb.com/demos/weather-app-in-javascript/

const input = document.querySelector('.ipt'),
    listas = document.querySelector('.matt'),
    load = document.querySelector('.spinner-border'),
     spinner = document.querySelector('.spinner'),
    templates = document.querySelector('#template').content,
    formulario = document.querySelector('.form');

let resultadosEcontrados, apiKey, APIKey;

formulario.addEventListener('submit', e => {
    e.preventDefault();
    inputValue = input.value
    if (inputValue === "") {
        input.classList.add("is-invalid");
        toastr.error('Por favor, Ingresa un nombre de producto', 'Error', {
            "positionClass": "toast-top-right"
        });
        return;
    }
    input.classList.remove("is-invalid");
    load.classList.remove("d-none");

    // console.log(inputValue);
    requestApi(inputValue);
});

{
    apiKey = 'b01b0a3ad496924a55a7d78d29abf0fb';
    APIKey = 'DA7B36833C5E44BABB56679B85CE6EE1';
    api_3 = 'EEE853BDB03E48438A68EF149C575922'
}

document.addEventListener('DOMContentLoaded', () => {
    spinner.classList.remove("d-none");
    cargarData();
});

async function cargarData() {
    
    // Amazon Products -----------------------
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '80cc815760msh72c5604b3a444dcp1f9b8fjsn701f8105497e',
    //         'X-RapidAPI-Host': 'amazon-products1.p.rapidapi.com'
    //     }
    // };

    // const response = await fetch('https://amazon-products1.p.rapidapi.com/summaries?country=US&asins=B095NWYQBC%2CB081RJ8DW1%2CB081CHLF46%2CB01N1081RO', options);
    // // B095NWYQBC%2CB081RJ8DW1%2CB081CHLF46%2CB01N1081RO----asincs

    // // const URL = `https://api.openweathermap.org/data/2.5/weather?q=${products}&appid=${apiKey}`;
    // //const response = await fetch(URL);
    // const data = await response.json();
    // // console.log(data);

    try {
        const response = await fetch(`https://api.rainforestapi.com/request?api_key=${api_3}&type=search&amazon_domain=amazon.com&search_term=canon+camera`);
        const data = await response.json();
        // console.log(data);

        if (response.status === 401) {
            toastr.error(`Error al cargar, el servidor respondió con un estado de ${response.status}`, `Error: ${response.status}`, {
                "positionClass": "toast-bottom-full-width"
            });
            spinner.classList.add("d-none");
            return;
            //  throw new Error(`Error! status: ${response.status}`);
        }
        insertarHTML(data);
    } catch (error) {
        console.log(error);
    }
}


/*
const requestApi1 = (apis) => {
 
        /*Paso 1 
         data.results.forEach(item => {
            console.log(item);
         })
        *

        /* Paso 2
         Object.entries(apis.valor2).forEach(item => {
             console.log(item);
         })
        *

        // for (const key in apis) {
        //     console.log(key, apis[key]);
        // }


        //     Object.entries(apis).map(item => {
        //         [key, value] = item;
        //         // console.log(key, '-', value);
        //     })

        //     const {product:{images_flat},} = apis;
        //     console.log(images_flat);


    // ver = apis.search_results.forEach(item => {
    //     console.log(item.title);
    // })
}
*/

const requestApi = async (products) => {
    try {
        /*--------------------Amazon Price--------------------- */
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '80cc815760msh72c5604b3a444dcp1f9b8fjsn701f8105497e',
                'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'
            }
        };

        const response = await fetch(`https://amazon-price1.p.rapidapi.com/search?marketplace=ES&keywords=${products}`, options);
        /*amd%20ryzen%209 */

        if (response.status === 401) {
            toastr.error(`Error al cargar, el servidor respondió con un estado de ${response.status}`, `Error: ${response.status}`, {
                "positionClass": "toast-bottom-full-width"
            });
            return;
            //  throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);

        // jsonVacio = Object.entries(data).length === 0;
        // isEmpty = JSON.stringify(data) === '{}';
        if (JSON.stringify(data) === '{}') {
            // console.log("Json Vacio");
            toastr.warning(`Producto no encontrado de  "${products.bold()}"`, 'Alerta', {
                "positionClass": "toast-top-right"
            });
            load.classList.add("d-none");
            return;
        }

        // resultadosEcontrados = data.length
        resultadosEcontrados = Object.values(data).length;
        toastr.info("", `${resultadosEcontrados} resultados para  "${products.toUpperCase()}"`, {
            "positionClass": "toast-bottom-right",
        });
        mostrarHTML(data);

    } catch (error) {
        console.log(error);
    }
}

const mostrarHTML = (data) => {
    listas.textContent = "";
    const fragment = document.createDocumentFragment();
    data.forEach(item => {

        // console.log(item);
        tipoDeCambioQuetzalGT = (parseFloat(item.price) * 7.64);
        contres = tipoDeCambioQuetzalGT.toFixed(3);

        const clone = templates.cloneNode(true);
        clone.querySelector('.card-img-top').setAttribute('src', item.imageUrl);
        clone.querySelector('.card-title').textContent = item.title;
        clone.querySelector('.lista').textContent = item.listPrice;
        clone.querySelector('.precioOrig').textContent = item.price;
        // clone.querySelector('.totals').textContent = item.totalReviews;
        clone.querySelector('.totals').textContent = isNaN(contres) ? " 00.00" : contres;
        clone.querySelector('.btn-info').setAttribute('href', item.detailPageURL);
        fragment.appendChild(clone);
    });
    listas.appendChild(fragment);
}


const insertarHTML = (apis) => {
    listas.textContent = "";
    const fragment = document.createDocumentFragment();
    apis.search_results.forEach(item => {

        console.log(item);
        tipoDeCambioQuetzalGT = (parseFloat(item.price) * 7.64);
        contres = tipoDeCambioQuetzalGT.toFixed(3);

        const clone = templates.cloneNode(true);
        clone.querySelector('.card-img-top').setAttribute('src', item.image);
        clone.querySelector('.card-title').textContent = item.title;
        // clone.querySelector('.lista').textContent = item.listPrice;
        // clone.querySelector('.precioOrig').textContent = item.price;
        // // clone.querySelector('.totals').textContent = item.totalReviews;
        // clone.querySelector('.totals').textContent = isNaN(contres) ? " 00.00" : contres;
        // clone.querySelector('.btn-info').setAttribute('href', item.detailPageURL);
        fragment.appendChild(clone);
    });
    listas.appendChild(fragment);
}