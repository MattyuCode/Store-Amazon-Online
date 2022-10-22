// https://codingnepalweb.com/demos/weather-app-in-javascript/

const input = document.querySelector('.ipt'),
    listas = document.querySelector('.matt'),
    templates = document.querySelector('#template').content,
    formulario = document.querySelector('.form');

let resultadosEcontrados, jja, apiKey, tipoDeCambioQuetzalGT;

formulario.addEventListener('submit', e => {
    e.preventDefault();
    inputValue = input.value

    if (inputValue === "") {
        input.classList.add("is-invalid");
        toastr.error('Intenta llenar el campo vacio', 'Error', {
            "positionClass": "toast-top-right"
        });
        return;
    }
    input.classList.remove("is-invalid");

    // console.log(inputValue);
    requestApi(inputValue);
});

{
    apiKey = 'b01b0a3ad496924a55a7d78d29abf0fb';
}

const requestApi = async (products) => {
    try {
        // Amazon Products -----------------------
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': '80cc815760msh72c5604b3a444dcp1f9b8fjsn701f8105497e',
        //         'X-RapidAPI-Host': 'amazon-products1.p.rapidapi.com'
        //     }
        // };

        // // const response = await fetch('https://amazon-products1.p.rapidapi.com/summaries?country=US&asins=B073WM4KP5', options)
        // const URL = `https://api.openweathermap.org/data/2.5/weather?q=${products}&appid=${apiKey}`;
        // // B095NWYQBC%2CB081RJ8DW1%2CB081CHLF46%2CB01N1081RO----asincs
        // const response = await fetch(URL);
        // const data = await response.json();
        // console.log(data);

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

        resultadosEcontrados = data.length
        toastr.info(`${resultadosEcontrados} resultados para ${products}`, "Aviso", {
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
        console.log(item);
        quetzal = (parseInt(item.price) * 7.64);
        contres = quetzal.toFixed(3);

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