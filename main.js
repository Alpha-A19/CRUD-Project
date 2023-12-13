let contData = [];

const objUser = {
    id: '',
    name: '',
    description: ''
}

let edit = false;

const form = document.querySelector("#form");
const nameIn = document.querySelector("#name");
const descriptionIn = document.querySelector("#description");
const btnAgg = document.querySelector("#contAgg");

form.addEventListener('submit', validateForm)

function validateForm(e) {
    e.preventDefault();

    if(nameIn.value === '' || descriptionIn.value === ''){
        alert("Debe llenar todos los campos");
        return;
    }

    if (edit) {
        editColumn();
        edit = false;
    } else {
        objUser.id = Date.now();
        objUser.name = nameIn.value;
        objUser.description = descriptionIn.value;
        console.log(objUser);

        aggUser();
    }
}

function aggUser() {
    contData.push({...objUser});
    showUser();
    form.reset();
    cleanObjet();
    console.log(contData);
}
function cleanObjet() {
    objUser.id = '';
    objUser.name = '';
    objUser.description = '';
}
function showUser() {

    cleanHTML();

    const contUser = document.querySelector('.contAgg');

    contData.forEach( user => {
        const { id, name, description } = user;

        const text = document.createElement('span');
        
        
        text.textContent = `${id} - ${name} - ${description}`;
        text.dataset.id = id;
        
        const contButton = document.createElement('div');
        contButton.classList.add('contButton')
        text.appendChild(contButton);

        const editButton = document.createElement('button');
        editButton.onclick = () => loadUser(user);
        editButton.textContent = 'Editar';
        editButton.classList.add('btn', 'btnEdit');
        contButton.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.onclick = () => deleteUser(id);
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('btn', 'btnDelete');
        contButton.appendChild(deleteButton);

        const hr = document.createElement('hr');

        contUser.appendChild(text);
        contUser.appendChild(hr)
    })

}
function cleanHTML() {
    const containerUser = document.querySelector('.contAgg');
    while (containerUser.firstChild) {
        containerUser.removeChild(containerUser.firstChild);
    }
}
function loadUser(user) {
    const {id, name, description } = user;

    nameIn.value = name;
    descriptionIn.value = description;
    console.log(description)

    objUser.id = id;

    form.querySelector('button[type="submit"]').textContent = "Actualizar";
    edit = true;
}

function editColumn() {
    objUser.name = nameIn.value;
    objUser.description = description.value;
    console.log(objUser.description);
    console.log(objUser.name);

    contData.map(user => {
        if(user.id === objUser.id) {
            user.id = objUser.id;
            user.name = objUser.name;
            user.description = objUser.description;
        }
    })

    cleanHTML();
    showUser();
    form.reset();
    form.querySelector('button[type="submit"]').textContent = "Agregar";
    edit = false;
}

function deleteUser(id) {
    contData = contData.filter(user => user.id !== id);

    cleanHTML();
    showUser();
}
