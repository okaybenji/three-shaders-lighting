// Based on this tutorial: https://gamedevelopment.tutsplus.com/tutorials/a-beginners-guide-to-coding-graphics-shaders-part-3--cms-24351

/** Set up Three.js **/
// First we initialize the scene and our camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// We create the WebGL renderer and add it to the document
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/** Configure our shader **/
// Prepare the texture
THREE.ImageUtils.crossOrigin = ''; // Allows us to load an external image
const tex = THREE.ImageUtils.loadTexture( 'https://raw.githubusercontent.com/tutsplus/Beginners-Guide-to-Shaders/master/Part3/images/blocks.JPG' );

// And its normal map
const normal = THREE.ImageUtils.loadTexture( 'https://raw.githubusercontent.com/tutsplus/Beginners-Guide-to-Shaders/master/Part3/normal_maps/blocks_normal.JPG' );

// Get the shader code
const fragmentShader = document.getElementById('fragShader').innerHTML;

// Configure the uniforms
const startTime = Date.now();
const uniforms = {
  resolution: {
    type: 'v2',
    value: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  time: {
    type: 'f',
    value: 0.,
  },
  texture: {
    type: 't',
    value: tex,
  },
  normalMap: {
    type:'t',
    value: normal,
  },
  mousePos: {
    type:'v2',
    value: new THREE.Vector2(),
  },
};

/** Set up the scene **/
const geometry = new THREE.PlaneBufferGeometry( 10, 10 );
const material = new THREE.ShaderMaterial( {fragmentShader, uniforms} );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
mesh.position.z = -1.25; // Shift the mesh back so we can see it

/** Start animating **/
const render = () => {
  // Update our shader's uniforms.
  uniforms.time.value = Date.now() - startTime;

  // Animate the scene.
  requestAnimationFrame( render );
  renderer.render( scene, camera );
};

render();

// Listen for events to update uniforms.
window.onresize = function(event){
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.resolution.value.x = window.innerWidth;
  uniforms.resolution.value.y = window.innerHeight;
}

document.onmousemove = function(event){
    //Update the light source to follow our mouse
    uniforms.mousePos.value.x = event.clientX;
    uniforms.mousePos.value.y = event.clientY;
}
