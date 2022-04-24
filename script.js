window.onload = () => {
    //Se carga el botón
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '+';
    // Se cargan los lugares
    let places = staticLoadPlaces();
    renderPlaces(places);
};
//Se carga las función
function staticLoadPlaces() {
    return [
        {
            //Se cargan los datos y las coordenadas
            name: 'Pokémon',
            location: {
                lat: 4.65920,
                lng:-74.05830
                // lat: 4.614677655561734, 
                // lng: -74.16896757643268,
            },
        },
    ];
}

//Se cargan los modelos y sus atributos
var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.5 0.5 0.5',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];

//variables del modelo
var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    //Conecta info con css
    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    //Carga la escena
    let scene = document.querySelector('a-scene');

    // Crear funciones para lat y lng
    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        //Carga modelos
        let model = document.createElement('a-entity');

        //Definir atributos de los modelos
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        //Opciones del botón
        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });
        //Run it
        scene.appendChild(model);
    });
}