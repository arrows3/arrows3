//declaramos las variables 

let scene, camera, renderer, clock , deltaTime, totalTime;

let arToolkitSource, arToolkitContext; 

let markerRoot1;
let markerRoot2; 
let markerRoot3; 
let markerRoot4; 
let markerRoot5; 



let mesh1;

init();
animate();

function init(){
    
    //ESCENA
    scene =  new THREE.Scene();


    //LUCES
    let light = new THREE.PointLight(0xf000000, 1, 1000);
    light.position.set(0,4,4);
    light.castShadow =  true;
    scene.add(light);

    let lightSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.1),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        })
    );

    lightSphere.position.copy(light);
    scene.add(lightSphere);
    //creamos luces 
    let ambientLight = new THREE.AmbientLight(0xcccccc); //creo las luz
    scene.add(ambientLight); //agrego la luz a mi escena. 


    camera =  new THREE.Camera();
    scene.add(camera);

    
    //RENDERER
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setClearColor(new THREE.Color('lightgrey'), 0);
    renderer.setSize(1920, 1080);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(renderer.domElement); // agregarlo a nuestra pagina web

    //TIME
    clock = new THREE.Clock();
    deltaTime = 0;
    totalTime = 0;
   
    //AR Setup
    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });

    function onResize() {
        arToolkitSource.onResizeElement()
        arToolkitSource.copyElementSizeTo(renderer.domElement)
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
        }
    }


    arToolkitSource.init(function onReady() {
        onResize();
    });

    //agregamos un event listener
    window.addEventListener('resize', function () { onResize() });

    //Setup ArKitContext
    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'data/camera_para.dat',
        detectionMode: 'mono'
    });

    arToolkitContext.init(function onCompleted() {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    //MARKERS
    markerRoot1 =  new THREE.Group();
    scene.add(markerRoot1);
    //Creamos nuestro marcador 
    let markerControl = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {

        type: 'pattern', patternUrl: 'data/guantes.patt',
    });

    markerRoot2 =  new THREE.Group();
    scene.add(markerRoot2);
    //Creamos nuestro marcador 
    let markerControl2 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot2, {

        type: 'pattern', patternUrl: 'data/tv.patt',
    });

    markerRoot3 =  new THREE.Group();
    scene.add(markerRoot3);
    //Creamos nuestro marcador 
    let markerControl3 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot3, {

        type: 'pattern', patternUrl: 'data/cono.patt',
    });

    markerRoot4 =  new THREE.Group();
    scene.add(markerRoot4);
    //Creamos nuestro marcador 
    let markerControl4 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot4, {

        type: 'pattern', patternUrl: 'data/robot.patt',
    });

    markerRoot5 =  new THREE.Group();
    scene.add(markerRoot5);
    //Creamos nuestro marcador 
    let markerControl5 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot5, {

        type: 'pattern', patternUrl: 'data/saco.patt',
    });


    

    //////OBJETO RHINO 1///////////////
   
    /////// OBJ IMPORT/////////////////////
    function onProgress(xhr) { console.log((xhr.loaded / xhr.total * 100) + "% loaded"); }
    function onError(xhr) { console.log("ha ocurrido un error") };
    
    //GUANTES
    new THREE.MTLLoader()
    .setPath('data/guantes/')
    .load('guantes.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/guantes/')
            .load('guantes.obj', function (group) {
                RhinoMesh = group.children[0];
                RhinoMesh.material.side = THREE.DoubleSide;
                RhinoMesh.scale.set(0.2, 0.2, 0.2);
                RhinoMesh.castShadow = true;
                RhinoMesh.receiveShadow = false;
                RhinoMesh.position.y=-.5;
                markerRoot1.add(RhinoMesh);
            }, onProgress, onError);
    });
    
    //TV
    new THREE.MTLLoader()
    .setPath('data/tv/')
    .load('tv.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/tv/')
            .load('tv.obj', function (group) {
                RhinoMesh = group.children[0];
                RhinoMesh.material.side = THREE.DoubleSide;
                RhinoMesh.scale.set(0.2, 0.2, 0.2);
                RhinoMesh.castShadow = true;
                RhinoMesh.receiveShadow = false;
                RhinoMesh.position.y=-.5;
                markerRoot2.add(RhinoMesh);
            }, onProgress, onError);
    });
//ARBOL
new THREE.MTLLoader()
.setPath('data/ARBOL/')
.load('ARBOL.mtl', function (materials) {
    materials.preload();
    new THREE.OBJLoader()
        .setMaterials(materials)
        .setPath('data/tv/')
        .load('ARBOL.obj', function (group) {
            RhinoMesh = group.children[0];
            RhinoMesh.material.side = THREE.DoubleSide;
            RhinoMesh.scale.set(0.2, 0.2, 0.2);
            RhinoMesh.castShadow = true;
            RhinoMesh.receiveShadow = false;
            RhinoMesh.position.y=-.5;
            markerRoot2.add(RhinoMesh);
        }, onProgress, onError);
});

    //CONO
    new THREE.MTLLoader()
    .setPath('data/cono/')
    .load('cono.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/cono/')
            .load('cono.obj', function (group) {
                RhinoMesh = group.children[0];
                RhinoMesh.material.side = THREE.DoubleSide;
                RhinoMesh.scale.set(0.2, 0.2, 0.2);
                RhinoMesh.castShadow = true;
                RhinoMesh.receiveShadow = false;
                RhinoMesh.position.y=-.5;
                markerRoot3.add(RhinoMesh);
            }, onProgress, onError);
    });

    //ROBOT
    new THREE.MTLLoader()
    .setPath('data/robot/')
    .load('robot.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/robot/')
            .load('robot.obj', function (group) {
                RhinoMesh = group.children[0];
                RhinoMesh.material.side = THREE.DoubleSide;
                RhinoMesh.scale.set(0.2, 0.2, 0.2);
                RhinoMesh.castShadow = true;
                RhinoMesh.receiveShadow = false;
                RhinoMesh.position.y=-.5;
                markerRoot4.add(RhinoMesh);
            }, onProgress, onError);
    });

    //SACO
    new THREE.MTLLoader()
    .setPath('data/saco/')
    .load('saco.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/saco/')
            .load('saco.obj', function (group) {
                RhinoMesh = group.children[0];
                RhinoMesh.material.side = THREE.DoubleSide;
                RhinoMesh.scale.set(0.2, 0.2, 0.2);
                RhinoMesh.castShadow = true;
                RhinoMesh.receiveShadow = false;
                RhinoMesh.position.y=-.5;
                markerRoot5.add(RhinoMesh);
            }, onProgress, onError);
    });

    //CREACION DE MASCARA
    let geoMask =  new THREE.BoxGeometry(1,1,1);
    
    console.log(geoMask.faces);
    geoMask.faces.splice(4,2);
    material2 =  new THREE.MeshBasicMaterial(

        {
            colorWrite: false
        }
    );

    let meshMask =  new THREE.Mesh(geoMask, material2);
    meshMask.scale.set(1,1,1).multiplyScalar(1.015);
    meshMask.position.y= -.5
    markerRoot1.add(meshMask);





} 


//FUNCIONES ADICIONAlES PARA EJECUCION DE APP
function update() {
    //actualiza contenido de nuestra app AR
    if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement);
    }
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    deltaTime = clock.getDelta();
    totalTime += deltaTime; // totalTime =  totalTime + deltaTime 
    update();
    render();
}

