const listadoAdmins = document.querySelector('.listadoAdmins') ,
templateAdmin = document.querySelector('#templateAdmin').content;


const datosAdmin = async () => {
    try {
        const response = await fetch("data.json");
        const data = await response.json();
    //    console.log(data);
       mostrarHTML(data);
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", datosAdmin);




const mostrarHTML = (data) => {
    listadoAdmins.textContent = "";
    const fragment = document.createDocumentFragment();
    data.forEach(item => {
        const clone = templateAdmin.cloneNode(true);
        clone.querySelector('.card-img-top').setAttribute('src', item.img);
        clone.querySelector('.name').textContent = item.nombres;
        clone.querySelector('.apellido').textContent = item.apellidos;
        clone.querySelector('.btn-primary').dataset.id = item.idUser;
        // clone.querySelector('.edad').textContent = item.edad;
        // clone.querySelector('.genero').textContent = item.genero == "M" ? "Masculino" : item.genero == "F" ?"Fenenina" : item.genero;
        // clone.querySelector('.casado').textContent = item.casado ? "SI" : "NO";
        // clone.querySelector('.email').textContent = item.email;





        // clone.querySelector('.btn-info').setAttribute('href', item.detailPageURL);
        fragment.appendChild(clone);
    });
    listadoAdmins.appendChild(fragment);
}