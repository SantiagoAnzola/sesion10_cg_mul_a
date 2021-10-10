// create a scene, that will hold all our elements such as objects, cameras and lights.
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado) {
  var cubeGeometry = new THREE.BoxGeometry(x, y, z);
  var cubeMaterial;
  switch (material) {
    case "Basic":
      cubeMaterial = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Standard":
      cubeMaterial = new THREE.MeshStandardMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Physical":
      cubeMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Phong":
      cubeMaterial = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Lambert":
      cubeMaterial = new THREE.MeshLambertMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;
  }

  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // add the cube to the scene
  scene.add(cube);
  return cube;
}


function init() {
  // create a scene, that will hold all our elements such as objects, cameras and lights.

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // create a render and set the size
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // show axes in the screen
  var axes = new THREE.AxesHelper(20);
  scene.add(axes);

  // create a cube

  // position the cube
  dim = 5;
  delta = 9;
  angulo = Math.PI / 2;
  Cubo = []; // Definir un array unidimensional

  Cubo.push(cubo(dim, dim, dim, 0x00ff7f, "Standard", false));
  Cubo.push(cubo(dim, dim, dim, 0xffdd00, "Physical", false));
  Cubo.push(cubo(dim, dim, dim, 0xe80000, "Physical", false));

  Cubo[0].rotateZ(angulo); //Metodo rotacion en el eje Z
  Cubo[0].translateX(delta);
  Cubo[1].rotateX(angulo); //Metodo rotacion en el eje X
  Cubo[1].translateY(delta);
  Cubo[2].rotateY(angulo); //Metodo rotacion en el eje Y
  Cubo[2].translateZ(delta);

   /*
  La funcion tranlsate, se usa llamando al objeto en cuention. Posteriormente se  define el eje de tranlación. 
  En caso de ser en el eje X  ==> translateX 
  En caso de ser en el eje Y  ==> translateY 
  En caso de ser en el eje Z  ==> translateZ
  posteriormente se  abre un parentesis(), donde se indicara la longitud de la traslación 
*/

  //Luz (requerida para el material MeshLambertMaterial)
  light = new THREE.PointLight(0xffff00); //  Luz proveniente de un punto en el espacio,
  //  semejante al sol.
  light.position.set(-10, 5, 10); //  Localización de la luz. (x, y, z).
  scene.add(light);

  // position and point the camera to the center of the scene
  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);

  // add the output of the renderer to the html element
  document.getElementById("webgl-output").appendChild(renderer.domElement);

/*Por otro metodo, haciendo uso del metodo promopt
var angulo2 = prompt("Introduzca el angulo en grados(0°-90°):", "35");//Cuadro de dialogo que solicita angulo
if (angulo2 == null || opcion == ""|| angulo2>90 || angulo2<0) {
        alert ("ERROR");//Cuadro  de alerta
        } 
}

*/
  //Se inicializa el valor de los controles
  var controls = new (function () {
    this.rotation = 0;
  })();

  //Se llama a la libreria gui
  var gui = new dat.GUI();
  //Se agrega el control con sus limites desde 0 hasta 90 grados 
  gui.add(controls, 'rotation', 0, 90);


  //Cada vez que se cambia el valor en el control, se actualiza el programa 
  render();

  function render() {
    var cub;
   
    //Se escoge uno de los tres cubos al azar por medio de Math.random
    var ranCubo= Math.floor(Math.random() * 3); 
    if (ranCubo == 0) {
      cub = 0;
    } else if (ranCubo == 1) {
      cub = 1;
    } else {
      cub = 2;
    }
  
   //Se escoge uno de los tres ejes al azar por medio de Math.random
   var ranEje= Math.floor(Math.random() * 3); 
    if (ranEje==0){
      Cubo[cub].rotateX(controls.rotation * (Math.PI / 180));
    }else if(ranEje==1){
      Cubo[cub].rotateY(controls.rotation * (Math.PI / 180));
    }else{
      Cubo[cub].rotateZ(controls.rotation * (Math.PI / 180));
    }

   
    // render the scene
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.rotation = 0;
  }
 
}
