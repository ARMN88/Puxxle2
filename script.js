eruda.init();


// ****************************** VARIABLES ******************************
// Three JS
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(1);
document.body.appendChild(renderer.domElement);
let camera, controls, data;

// 3d Models
let counter = {};
let atm = [];
let table = [];
let chair = [];
let sstable = [];
let plant = [];
let divider = [];
let computer = [];
let money = [];
let chest;
let comboLock;
let clock;
let switches = [];
let numLock;

// Text
let text = "This is some text!".split("");

// animation is done bool
let height = 4.5;

// Collisions
let blocks = [];

// Key Clicks
let keyboard = {};

// Textures
const doorTexture = new THREE.TextureLoader().load(
  "https://cdn.glitch.com/c84ddf0b-22b2-44f5-885a-f7c6a5d353ed%2Fpixil-frame-0.png?v=1631116183278"
);
doorTexture.magFilter = THREE.NearestFilter;
doorTexture.minFilter = THREE.NearestFilter;

let doorMat = [
  new THREE.MeshBasicMaterial({
    map: doorTexture,
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: doorTexture,
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({ color: "#4f4f4f", side: THREE.DoubleSide}),
  new THREE.MeshBasicMaterial({ color: "#4f4f4f", side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: "#4f4f4f", side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: "#4f4f4f", side: THREE.DoubleSide })
];

// frames
let stats;

// ticks for text
let upnum = 0;

// Set Collision Space
let v = .2;

// Set Speed
let speed = .48;

// ****************************** INITALIZE CANVAS AND STATS ******************************
function init() {
  // create camera and controls
  camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, .1, 150);   
  camera.position.set(0, 4.5, -30);
  
  controls = new THREE.PointerLockControls(camera, document.body);
  document.onclick = function() {
    controls.lock();
  }
  
  // init stats
  stats = createStats();
  document.body.appendChild( stats.domElement );
  
  // create Room
  Room(0, 0, 0, 60, 10, 90);
}

// ****************************** UPDATE THE SCENE ******************************
function update() {
  // update ticks
  upnum += 1;
  
  // update stats
  stats.update();
  
  // Text on Screen
  Text("Use WASD to Walk.", 100);
  Text("Use E to interact with objects.", 300);
  
  // door
  for(let i = 0; i < blocks.length;i++) {
    if(blocks[i].name === "door") {
      if(getDistance(camera.position.x, camera.position.z, blocks[i].bx, blocks[i].z) <= 10.5) {
        if(counter.object.children[5].position.x > -.195) {
          counter.object.children[5].position.x -= .0005;
        }else {
          counter.object.children[5].position.x = -.195;
          blocks[i].x = -100;
          blocks[i].position.x = -100;
        }
      }else {
        if(counter.object.children[5].position.x < -.16875) {
          counter.object.children[5].position.x += .0005;
          blocks[i].x = blocks[i].bx;
          blocks[i].position.x = blocks[i].bx;
        }
      }
      break;
    }
  }
  
  // Keyboard Movement
  if(keyboard[87] || keyboard[83] || keyboard[65] || keyboard[68]) {
    if(keyboard[87]) {
      camera.translateZ(-speed);
    }
    if(keyboard[83]) {
      camera.translateZ(speed);
    }
    if(keyboard[65]) {
      camera.translateX(-speed/1.5);
    }
    if(keyboard[68]) {
      camera.translateX(speed/1.5);
    }
    for (let i = 0; i < blocks.length; i++) {
      if (
        camera.position.x <= blocks[i].x + blocks[i].sx / 2 + v &&
        camera.position.x >= blocks[i].x - blocks[i].sx / 2 - v &&
        camera.position.z <= blocks[i].z + blocks[i].sz / 2 + v &&
        camera.position.z >= blocks[i].z - blocks[i].sz / 2 - v
      ) {
        if(keyboard[87]) {
          camera.translateZ(speed);
        }
        if(keyboard[83]) {
          camera.translateZ(-speed);
        }
        if(keyboard[65]) {
          camera.translateX(speed/1.5);
        }
        if(keyboard[68]) {
          camera.translateX(-speed/1.5);
        }
      }
    }
  }
  // keep camera level
   camera.position.y = height;
  if(keyboard[16]) {if(camera.position.y > 2.5) {height-=0.5}else{speed = .25}}else{if(camera.position.y < 4.5) {height+=0.5}else{speed = .48}}
  // render scene
  renderer.render(scene, camera);
}

// ****************************** RUN EVERYTHING AFTER LOADING ******************************
window.onload = function() {
  init();
  setInterval(update, 1000/60);
  //update();
  readTextFile("animations/chest.json", data => {
    chest.then(() => {
      chest.obj.done = true;
      animate(JSON.parse(data), chest.obj, "open");
    });
  });
  
  readTextFile("animations/combo-lock.json", data => {
    comboLock.then(() => {
      comboLock.obj.done = true;
      animate(JSON.parse(data), comboLock.obj, "close");
    });
  });
  readTextFile("animations/switch.json", data => {
    switches[0].then(() => {
      switches[0].obj.done = true;
      animate(JSON.parse(data), switches[0].obj, "open");
    });
  });
};

// ****************************** FUNCTIONS ******************************
// animate model
function animate(jsn, obj, anim) {
  let jsjsjs = {};
  if(obj && jsn && obj.done) {
    obj.done = false;
    jsjsjs[obj.name] = {};
    jsjsjs[obj.name].x = 0;
    jsjsjs[obj.name].poso = {};
    jsjsjs[obj.name].rot = {};
    jsjsjs[obj.name].frames = {};
    jsjsjs[obj.name].timeline = {};
    jsjsjs[obj.name].timelineTime = {};
    jsjsjs[obj.name].dur = 0;
    for (const [key, value] of Object.entries(obj.children)) {
     
      for (const [skey, svalue] of Object.entries(jsn.animations[anim].bones[value.name].position)) {
        if(!jsjsjs[obj.name].frames[value.name]) {
          jsjsjs[obj.name].frames[value.name] = [];
        }
        jsjsjs[obj.name].nkeys = Object.keys(jsn.animations[anim].bones[value.name].position);
        jsjsjs[obj.name].nextIndex = jsjsjs[obj.name].nkeys.indexOf(skey) -1;
        jsjsjs[obj.name].nextItem = jsjsjs[obj.name].nkeys[jsjsjs[obj.name].nextIndex];
        jsjsjs[obj.name].dur = 0;
        if(jsjsjs[obj.name].nextItem) {
          jsjsjs[obj.name].dur = Number(skey) - Number(jsjsjs[obj.name].nextItem);
        }
        jsjsjs[obj.name].frames[value.name].push({
          x: jsn.animations[anim].bones[value.name].position[skey][0],
          y: jsn.animations[anim].bones[value.name].position[skey][1],
          z: jsn.animations[anim].bones[value.name].position[skey][2],
          rx: jsn.animations[anim].bones[value.name].rotation[skey][0],
          ry: jsn.animations[anim].bones[value.name].rotation[skey][1],
          rz: jsn.animations[anim].bones[value.name].rotation[skey][2],
          duration: jsjsjs[obj.name].dur
        });
      }
      jsjsjs[obj.name].poso[key] = {
        x: value.position.x,
        y: value.position.y,
        z: value.position.z,
        rx: 0,
        ry: 0,
        rz: 0
      }
      jsjsjs[obj.name].timelineTime[key] = 0;
      jsjsjs[obj.name].timeline[key] = gsap.to(jsjsjs[obj.name].poso[key], {
        keyframes: jsjsjs[obj.name].frames[value.name]
      });
    }
    jsjsjs[obj.name].x++;
  }
  let inter = setInterval(function() {
  if(obj && jsjsjs[obj.name] && !obj.done) {
  for (const [key, value] of Object.entries(obj.children)) {
    value.geometry.computeBoundingBox();
    jsjsjs[obj.name].timelineTime[key] += 0.01;
    jsjsjs[obj.name].timeline[key].seek(jsjsjs[obj.name].timelineTime[key]);
    value.position.x = -map(jsjsjs[obj.name].poso[key].x) + value.gposition.x;
    value.position.y = map(jsjsjs[obj.name].poso[key].y) + value.gposition.y;
    value.position.z = map(jsjsjs[obj.name].poso[key].z) + value.gposition.z;
    value.rotation.x = jsjsjs[obj.name].poso[key].rx * -Math.PI/180;
    value.rotation.y = jsjsjs[obj.name].poso[key].ry* Math.PI/180;
    value.rotation.z = jsjsjs[obj.name].poso[key].rz* Math.PI/180;
    if(jsjsjs[obj.name].timelineTime[key] >= Number(jsn.animations[anim].animation_length)) {
      jsjsjs[obj.name].timelineTime[key] = 0;
      clearInterval(inter);
      obj.done = true;
    }
  }
  }
    }, 10);
}

// map blockbench position to threejs position
function map(num) {
  return (((num - 0) * (0.625 - 0)) / (1 - 0) + 0) / 10;
}

// read JSON file
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

// input system
window.onkeydown = function(e) {
  keyboard[e.keyCode] = true;
}

window.onkeyup = function(e) {
  keyboard[e.keyCode] = false;
}

// custom block function
function Block(x, y, z, sx, sy, sz, texture) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.sx = sx;
  this.sy = sy;
  this.sz = sz;

  this.display = function() {
    if(texture === doorMat) {
      let geo = new THREE.BoxGeometry(sx, sy, sz);
      let cube = new THREE.Mesh(geo, texture);
      this.cube = cube;
      cube.position.set(x, y, z);
      cube.name = "cubeobj";
      scene.add(cube);
    }else {
      let geo = new THREE.BoxGeometry(sx, sy, sz);
      let mat = new THREE.MeshBasicMaterial({ color: texture});
      let cube = new THREE.Mesh(geo, mat);
      this.cube = cube;
      cube.name = "cubeobj";
      cube.position.set(x, y, z);
      scene.add(cube);
    }
  };
}


// custom room function
function Room(x, y, z, sx, sy, sz) {
  blocks.unshift(new Block(x, sy / 2 + y, -sz / 2 + z, sx, sy, 1, "#dedede"));//"#4c869e"));//"#ccc9f9"));//pre 1 //"#5f4746"));//pre 0 //"#ffe4b5"));
  blocks[0].display();
  blocks.unshift(new Block(x, sy / 2 + y, sz / 2 + z, sx, sy, 1, "#dedede"));//"#4c869e"));//"#ccc9f9"));//pre 1 //"#5f4746")); // pre 0 //"#ffe4b5"));
  blocks[0].display();
  blocks.unshift(new Block(-sx / 2 + x, sy / 2 + y, z, 1, sy, sz, "#d4d4d4"));//"#4a7e98"));//"#aca9dd"));//pre 1 //"#6a504e")); // pre 0 //"#f7dbac"));
  blocks[0].display();
  blocks.unshift(new Block(sx / 2 + x, sy / 2 + y, z, 1, sy, sz, "#d4d4d4"));//"#4a7e98"));//"#aca9dd"));//pre 1 //"#6a504e")); // pre 0 //"#f7dbac"));
  blocks[0].display();
  blocks.unshift(
    new Block(-20, 3, sz/2-.2, 1, 6, 3, doorMat)
  );
  blocks[0].display();
  blocks[0].cube.rotation.y = 90 * Math.PI/180;
  this.planeGeo = new THREE.PlaneGeometry(sx, sz);
  this.planeMat = new THREE.MeshBasicMaterial({
    color: "#cfcfcf",//"#487794", // pre 2 //"#8484ad", //pre 1 //"#553f3e", // pre 0
    //map: ceilingTexture,
    side: THREE.DoubleSide
  });
  this.bplaneMat = new THREE.MeshBasicMaterial({
    //map: floorTexture,
    color: "#3a3e3d",
    side: THREE.DoubleSide
  });
  this.tplane = new THREE.Mesh(this.planeGeo, this.bplaneMat);
  scene.add(this.tplane);
 
  
  this.bplane = new THREE.Mesh(this.planeGeo, this.planeMat);
  scene.add(this.bplane);
  this.tplane.position.x = x;
  this.tplane.position.y = y + 0.05;
  this.tplane.position.z = z;
  this.tplane.rotation.x = (90 * Math.PI) / 180;
  this.bplane.rotation.x = (90 * Math.PI) / 180;
  this.bplane.position.y = sy + y - 0.05;
  this.bplane.position.x = x;
  this.bplane.position.z = z;
}

// get distance between 2 points
function getDistance(x, y, px, py) {
  let diffY = y - py;
  let diffX = x - px;
  return Math.sqrt(diffX * diffX + diffY * diffY);
}

// create stats for fps
function createStats() {
      var stats = new Stats();
      stats.setMode(0);

      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0';
      stats.domElement.style.top = '0';

      return stats;
}

// display text on bottom (CC)
function Text(str, tm) {
  if(upnum >= tm && upnum < str.split("").length + tm) {
  if(upnum == tm) {
    document.querySelector("p").innerHTML = "";
  } 
    document.querySelector("p").innerHTML += str.split("")[upnum-tm];
  }
}
// ****************************** SAMPLES ******************************
/*
readTextFile("animations/chest.json", data => {
    if(chest.ready) {
      animate(JSON.parse(data), chest.obj, "close");
    }
  });
*/