const input = document.querySelector('.ipt'),
    formulario = document.querySelector('.form');
let apiKey;

formulario.addEventListener('submit', e => {
    e.preventDefault();
    inputValue = input.value

    if (inputValue === "") {
        input.classList.add("is-invalid");
        // toastr.error('Intenta llenar el campo vacio', 'Error')

        toastr.error('Intenta llenar el campo vacio', 'Error',
          { "positionClass" : "toast-bottom-right"}
      );
        return;
    }
    input.classList.remove("is-invalid");
    
    console.log(inputValue);
    // requestApi(inputValue);
});


// surkhet


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

        const response = await fetch(`https://amazon-price1.p.rapidapi.com/search?marketplace=ES&keywords=${products}`, options)
        /*amd%20ryzen%209 */
        const data = await response.json();
        console.log(data);






        // mostrar(data);
        // document.querySelector('.api').innerHTML = data;
    } catch (error) {
        console.log(error);
    }
}

// function mostrar(response) {
//     console.log("entra en la fucion");
//     response.results.forEach((item, index) => {
//         console.log(index, item);
//         console.log("Entro el foreach");

//     });
// }

// const url = 'https://rickandmortyapi.com/api/character'