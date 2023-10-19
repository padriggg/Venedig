//import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";

/* import { GUI } from "three/addons/libs/lil-gui.module.min.js";
			import { OrbitControls } from "three/addons/controls/OrbitControls.js";
			import { Line2 } from "three/addons/lines/Line2.js";
			import { LineMaterial } from "three/addons/lines/LineMaterial.js";
			import { LineGeometry } from "three/addons/lines/LineGeometry.js";
			import * as GeometryUtils from "three/addons/utils/GeometryUtils.js";
      import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";*/

//import * as THREE from "../modules/three.module.js";
import { RGBELoader } from "../modules/RGBELoader.js";
import { OrbitControls } from "../modules/OrbitControls.js";

new RGBELoader().load("../image/bild3.hdr", function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = texture;
  scene.environment = texture;
});

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Initialisieren Sie die Szene, die Kamera und das Renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
var renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.8;
renderer.outputEncoding = THREE.sRGBEncoding;

camera.position.z = 200;

//Licht
const pointLight = new THREE.PointLight(0xffffff, 1.25);
pointLight.position.set(50, 50, 50);

const pointLightHelp = new THREE.PointLightHelper(pointLight);

scene.add(pointLight);
scene.add(pointLightHelp);

//scene.add(spotLight)

// Erstellen Sie eine Kugel
//Objekte

const geometry = new THREE.SphereGeometry(35, 60, 60);
const material = new THREE.MeshStandardMaterial({
  roughness: 0.1,
  metalness: 0.1,
  color: 0xff0000,
});

const sphere = new THREE.Mesh(geometry, material);
sphere.position.y = 0;
scene.add(sphere);

/*const geometry1 = new THREE.BoxGeometry(20,20,20,150);
			const material1 = new THREE.MeshStandardMaterial({ color: 0xffff00, wireframe:true});
			const cube = new THREE.Mesh(geometry1, material1);
			scene.add(cube);*/

// Animationsfunktion
var animate = function () {
  requestAnimationFrame(animate);

  sphere.rotateY(0.008);

  renderer.render(scene, camera);
};
//cube.rotateY(0.005)

animate();
