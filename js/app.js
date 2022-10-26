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
    spinner.classList.add("d-none");
    // console.log(inputValue);
    requestApi(inputValue);
});

{
    apiKey = 'b01b0a3ad496924a55a7d78d29abf0fb';
    APIKey = 'DA7B36833C5E44BABB56679B85CE6EE1'; // cuenta de Mattyu Dev 1318
    api_3 = 'EEE853BDB03E48438A68EF149C575922'; //cuenta de mcarmelomMIUMG
}

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
            load.classList.add("d-none");
            spinner.classList.remove("d-none");
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
            spinner.classList.remove("d-none");
            return;
        }
        load.classList.add("d-none");
        spinner.classList.remove("d-none");

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
        clone.querySelector('.totals').textContent = isNaN(contres) ? " 00.00" : contres;
        clone.querySelector('.btn-info').setAttribute('href', item.detailPageURL);
        // clone.querySelector('.btn-info').addEventListener('click', () => {
        //     console.log("ejecutando");
        // });
        fragment.appendChild(clone);
    });
    listas.appendChild(fragment);
}



/*------------------------------------WITH LOAD AUTOMATIC OF ALL THE PRODUCTS---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    spinner.classList.remove("d-none");
    cargarData();
});

async function cargarData() {

    {
        //--------------------- Amazon Products -----------------------
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
    }

    try {
        const response = await fetch(`https://api.rainforestapi.com/request?api_key=${api_3}&type=search&amazon_domain=amazon.com&search_term=*`);
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
        spinner.classList.add("d-none");

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

const insertarHTML = (apis) => {
    listas.textContent = "";
    const fragment = document.createDocumentFragment();
    apis.search_results.forEach(item => {
        // console.log(item);
        // if (!item.price.value) {
        //     console.log("Esta vacio");
        //     return;
        // }else{
        //     console.log("NO esta vacio");
        // }

        tipoDeCambioQuetzalGT = (parseFloat(item.price) * 7.80);
        contres = tipoDeCambioQuetzalGT.toFixed(3);

        const clone = templates.cloneNode(true);
        clone.querySelector('.card-img-top').setAttribute('src', item.image);
        clone.querySelector('.card-title').textContent = item.title;
        // clone.querySelector('.badge-pill').textContent = item.availability ? item.availability : "Agotado";
        clone.querySelector('.lista').textContent = " 00.00";
     clone.querySelector('.precioOrig').textContent = " 00.00";
        // // clone.querySelector('.totals').textContent = item.totalReviews;
        clone.querySelector('.totals').textContent = isNaN(contres) ? " 00.00" : contres;
        clone.querySelector('.btn-info').setAttribute('href', item.link);
        fragment.appendChild(clone);
    });
    listas.appendChild(fragment);
}



// <-------------------PRACT WITH JSON ----------------------->
/*
const practica = async () => {
    try {
        const response = await fetch("json/practica.json");
        const data = await response.json();
        // console.log(data);
        log(data)
    } catch (error) {
        console.log(error);
    }
}

function log(apis) {
    apis.search_results.forEach(item => {
        // console.log(item);
        // console.log(item.title);
        // console.log(item.availability.raw);
        // console.log(item.price.value);
        // console.log(item.prices[0].value);
    });
}
document.addEventListener("DOMContentLoaded", practica)*/



botonWithAsin = document.querySelector('.vieww')

/*------------------------------------POR ASIN----------------------------*/
const formAsin = document.querySelector('.formAsin'),
    templateAsin = document.querySelector('#templateAsin').content,
    listadbody = document.querySelector('.listadbody'),
    letrasValid = document.querySelector('.letrasValid'),
    inputAsin = document.querySelector('.inputAsin');

formAsin.addEventListener('submit', e => {
    e.preventDefault();
    getByValue = inputAsin.value
    if (getByValue === "") {
        inputAsin.classList.add("is-invalid");
        letrasValid.classList.add('active')
        letrasValid.classList.remove('verde')
        toastr.error('Por favor, Ingresa el ASIN del producto', 'Error', {
            "positionClass": "toast-top-right"
        });
        return;
    }
    inputAsin.classList.remove("is-invalid");
    letrasValid.classList.remove('active')
    letrasValid.classList.add('verde')

    load.classList.remove("d-none");
    spinner.classList.add("d-none");

    // console.log(getByValue);
    getByAsin(getByValue);
});

const getByAsin = async (getByValue) => {
    try {
        const response = await fetch(`https://api.rainforestapi.com/request?api_key=${api_3}&type=product&amazon_domain=amazon.com&asin=${getByValue}`);
        // const response = await fetch("json/conasin.json");
        // const response = await fetch("json/obj.json");
        const data = await response.json();
        // console.log(data);

        if (response.status === 401) {
            toastr.error(`Error al cargar, el servidor respondió con un estado de ${response.status}`, `Error: ${response.status}`, {
                "positionClass": "toast-bottom-full-width"
            });
            load.classList.add("d-none");
            spinner.classList.remove("d-none");
            return;
            //  throw new Error(`Error! status: ${response.status}`);
        }

        load.classList.add("d-none");
        spinner.classList.remove("d-none");
        lanzarHMTL(data);
    } catch (error) {
        console.log(error);
    }
}
// document.addEventListener("DOMContentLoaded", getByAsin)


function lanzarHMTL(json) {
    /*----------------------------with object of json----------------------------*/

    // // console.log(json.product.title);
    // Object.values(json).forEach(item => {
    //     console.log(item.title);
    //     console.log(item.buybox_winner.availability.raw);
    //     console.log(item.buybox_winner.price.value);
    // })

    const {
        title,
        images_flat,
        link,
        description,
        feature_bullets_flat,
        brand,
        sub_title: {
            text,
            link: a
        },
        buybox_winner: {
            availability: {
                raw
            }
        },
        buybox_winner: {
            price: {
                value
            }
        },
    } = json.product;
    // console.log(raw, value);

    console.log(text, a);


    USDTOGQT = value * 7.80;
    QT = USDTOGQT.toFixed(3);
    listas.textContent = "";
    const fragment = document.createDocumentFragment();
    const clone = templateAsin.cloneNode(true);
    json.product.attributes.forEach(item => {
        nombre = item.name;
        valor = item.value;
        // console.log(nombre, "----------------", valor);
        clone.querySelector('.attributesname').textContent = nombre;
        clone.querySelector('.attributesvalue').textContent = valor;
    })

    clone.querySelector('.img-fluid').setAttribute('src', images_flat);
    clone.querySelector('.title').textContent = title;
    clone.querySelector('.text').textContent = text;
    clone.querySelector('.brand').textContent = brand;
    clone.querySelector('.badge-pill').textContent = raw ? raw : clone.querySelector('.badge-pill').classList.replace('badge-success', 'badge-danger').textContent = "Agotado";
    clone.querySelector('.GT').textContent = isNaN(QT) ? " 00.00" : QT;
    clone.querySelector('.price').textContent = value ? value : "N/D";
    clone.querySelector('.btn-outline-info').setAttribute('href', link);
    clone.querySelector('.text').setAttribute('href', a);
    clone.querySelector('.description').textContent = description;
    clone.querySelector('.feature_bullets_flat').textContent = feature_bullets_flat;
    fragment.appendChild(clone);
    listas.appendChild(fragment);
}



/*------------------------------------POR URL----------------------------*/
const formURL = document.querySelector('.formURL'),
    letraURL = document.querySelector('.letraURL'),
    inputURL = document.querySelector('.inputURL');

formURL.addEventListener('submit', e => {
    e.preventDefault();
    getByValue = inputURL.value
    if (getByValue === "") {
        inputURL.classList.add("is-invalid");
        letraURL.classList.add('active')
        letraURL.classList.remove('verde')
        toastr.error('Por favor, Ingresa el URL del producto', 'Error', {
            "positionClass": "toast-top-right"
        });
        return;
    }
    inputAsin.classList.remove("is-invalid");
    letraURL.classList.remove('active')
    letraURL.classList.add('verde')

    // load.classList.remove("d-none");
    // spinner.classList.add("d-none");

    getByURL(getByValue);
});

const getByURL = async (getByValue) => {
    try {
        const response = await fetch(`https://api.rainforestapi.com/request?api_key=EEE853BDB03E48438A68EF149C575922&type=category&url=${getByValue}`);
        const data = await response.json();
        // console.log(data);

        if (response.status === 401) {
            toastr.error(`Error al cargar, el servidor respondió con un estado de ${response.status}`, `Error: ${response.status}`, {
                "positionClass": "toast-bottom-full-width"
            });
            // load.classList.add("d-none");
            // spinner.classList.remove("d-none");

            return;
            //  throw new Error(`Error! status: ${response.status}`);
        }
        lanzarHMTL(data);
    } catch (error) {
        console.log(error);
    }
}