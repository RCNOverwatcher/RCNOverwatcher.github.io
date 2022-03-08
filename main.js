//import 3
import * as THREE from "/three.module.js"

//make scene
const scene = new THREE.Scene();

//make camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//make renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})

//configure the renderer a bit
renderer.setPixelRatio( window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30);
renderer.render(scene, camera);

//make the shape geometry
const geometry = new THREE.TorusGeometry(10, 3, 5)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} )
const staticShape = new THREE.Mesh(geometry, material);

/*scene.add(staticShape)*/


// rcn box lmao
const rcnTexture = new THREE.TextureLoader().load('assets/RCN.png');
const rcn = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: rcnTexture }));
scene.add(rcn);

//moon shape
const moonTexture = new THREE.TextureLoader().load('assets/moon.jpg')
const normalTexture = new THREE.TextureLoader().load('assets/normalMoon.jpg')

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    })
);

scene.add(moon)


//make the lighting
const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.position.set(5,5,5)
scene.add(ambientLight)


//add the stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry,material)
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star)
}

Array(200).fill().forEach(addStar)


//load the background texture
const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg')
scene.background = spaceTexture;

//configure the moon a little bit
moon.position.z = 20;
moon.position.setX(-5);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    rcn.rotation.y += 0.01;
    rcn.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera

function animate() {
    requestAnimationFrame(animate)

    staticShape.rotation.x += 0.01;
    staticShape.rotation.y += 0.005;
    staticShape.rotation.z += 0.01;
    renderer.render(scene, camera)
}

animate()