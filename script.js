// OPTENER EL ELEMENTO DONDE CAMBIAR LOS DATOS DE LA PERSONA
let display = document.getElementById('display');

// OPTENER EL ELEMENTO DONDE SE CAMBIARAN LOS TIPOS DE DATOS DE LA PERSONA
let typeData = document.getElementById('type-data');

// OPTENER UNA LISTA DE HIJO DE LA LISTA
let childs = document.getElementById('info-list').children;

let datos;

// UNA PROMESA QUE TRAE LOS DATOS DESDE UNA API GRATUITA
// ESTOS DATOS SE GUARDAN EN UNA VARIABLE PARA SER UTILIZADA
// Y MOSTRAR DICHOS DATOS EN PANTALLA DE ACUERDO A LOS DIFERENTES EVENTOS
(async () => {
	datos = await fetch('https://randomuser.me/api/').then(response => response.json())
		.then(json => json.results[0]);
	displayName();
	displayAdditionalData();
	console.log(datos)
	document.getElementById('profile-photo').src = datos.picture.large;
})();

function listHover(e) {
	handleDisplay(e.currentTarget.id);
	for (let child of childs) {
		child.classList.remove('nav-li-active');
		child.classList.add('nav-li');
	}
	e.currentTarget.classList.remove('nav-li');
	e.currentTarget.classList.add('nav-li-active');
}

for (let child of childs) {
	child.addEventListener('mouseover', listHover);
}

displayName = () => {
	typeData.innerHTML = 'Hola, mi nombre es';
	display.innerHTML = datos.name.first + ' ' + datos.name.last;
}

displayEmail = () => {
	typeData.innerHTML = 'Mi email es';
	display.innerHTML = datos.email;
}

displayBirthdate = () => {
	let date = new Date(datos.dob.date);
	let dia = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate();
	let mes = date.getMonth().toString().length > 1 ? date.getMonth() : '0' + date.getMonth();
	typeData.innerHTML = 'Mi fecha de nacimiento es';
	display.innerHTML = dia + '/' + mes + '/' + date.getFullYear();
}

displayLocation = () => {
	typeData.innerHTML = 'Mi dirección es';
	display.innerHTML = datos.location.city + ' ' + datos.location.street.number + ' ' + datos.location.street.name;
}

displayPhone = () => {
	typeData.innerHTML = 'Mi telefono es';
	display.innerHTML = datos.phone;
}

// METODO MANEJADOR PARA LO QUE SE MUESTRA EN PANTALLA
// CUANDO SE REALIZA EL EVENTO HOVER EN ALGUNO DE LOS ICONOS
// DE ACUERDO AL ID
handleDisplay = (id) => {
	switch (id) {
		case 'name':
			displayName();
			break;
		case 'email':
			displayEmail();
			break;
		case 'date':
			displayBirthdate();
			break;
		case 'location':
			displayLocation();
			break;
		case 'phone':
			displayPhone();
			break;
		default:
			displayName();
			break;
	}
}

// AGREGA UN EVENTO CLICK A LA FOTO DE PERFIL PARA DESPLEGAR UN GLOBO
// ESTE MOSTRARA EL NOMBRE DE LA PERSONA EN PANTALLA
document.getElementById('profile-photo').addEventListener('click', () => {
	let globo = document.getElementById('globo');
	globo.classList.add("globo");
	globo.innerHTML = 'Hola me llamo ' + datos.name.first + ' ' + datos.name.last;;
});

// AGREGA UN EVENTO CUANDO SALE EL MOUSE DE LA IMAGEN DE PERFIL
// QUE BORRA EL GLOBO QUE FUE MOSTRADO CUANDO SE PRODUJO EN EVENTO ANTERIOR
document.getElementById('profile-photo').addEventListener('mouseleave', () => {
	let globo = document.getElementById('globo');
	globo.classList.remove("globo");
	globo.innerHTML = '';
})

displayAdditionalData = () => {
	document.getElementById('age').innerHTML = 'Edad: ' + datos.dob.age;
	document.getElementById('gender').innerHTML = 'Genero: ' + datos.gender;
	document.getElementById('country').innerHTML = 'Pais: ' + datos.location.country;
	document.getElementById('state').innerHTML = 'Estado: ' + datos.location.state;
	document.getElementById('city').innerHTML = 'Ciudad: ' + datos.location.city;
	document.getElementById('postcode').innerHTML = 'Codigo Postal: ' + datos.location.postcode;
}
