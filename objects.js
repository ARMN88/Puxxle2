let showCollision = false;
/*
let box = new THREE.Box3().setFromObject(value);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x*this.size, box.getSize().y*this.size, box.getSize().z*this.size),
        new THREE.MeshBasicMaterial({color: "red"})
      );
      //console.log(box.getCenter());
           
        
          d.position.x = box.getCenter().x*this.size+atm[2].object.position.x;
          d.position.y = box.getCenter().y*this.size+atm[2].object.position.y;
          d.position.z = box.getCenter().z*this.size+atm[2].object.position.z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x*this.size;
          d.sy = box.getSize().y*this.size;
          d.sz = box.getSize().z*this.size;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = value.name;
          scene.add(d);
*/
/*objv.mtlloader = new THREE.MTLLoader();
    objv.mtlloader.setTexturePath("images/objv/");
    objv.mtlloader.setPath("mtl/");
    objv.mtlloader.load("objv.mtl", function(materials) {
    materials.preload();
    objv.objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      objv.objloader.setMaterials(materials);
      objv.objloader.setPath("objs/");
      objv.objloader.load("objv.obj", function(object) {
      this.size = 160;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(0, 0, -15);
      objv.object = object;
      objv.object.name = "objv";
      scene.add(objv.object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
       }
    });
  });
*/
async function importOBJ(objf, mtl, size=160, x=0, y=0, z=0, rx=0, ry=0, rz=0, collision=true) {
  let objv = {};
  let promise = new Promise((resolve, reject) => {
  objv.mtlloader = new THREE.MTLLoader();
  objv.mtlloader.setTexturePath("images/"+objf+"/");
  objv.mtlloader.setPath("mtl/");
  objv.mtlloader.load(mtl + ".mtl", async function(materials) {
    materials.preload();
    objv.objloader = await new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      objv.objloader.setMaterials(materials);
      objv.objloader.setPath("objs/");
      await objv.objloader.load(objf + ".obj", async function(object) {
      this.size = size;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(x, y, z);
      object.rotation.set(rx, ry, rz);
      objv.object = await object;
      objv.object.name = "objv";
      scene.add(objv.object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
       }
        if(collision) {
        let box = new THREE.Box3().setFromObject(object);
        let d = new THREE.Mesh(
          new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
          new THREE.MeshBasicMaterial({color: "red"})
        );
        d.position.x = box.getCenter().x;
        d.position.y = box.getCenter().y;
        d.position.z = box.getCenter().z;
        d.x = d.position.x;
        d.y = d.position.y;
        d.z = d.position.z;
        d.sx = box.getSize().x;
        d.sy = box.getSize().y;
        d.sz = box.getSize().z;
        d.bx = d.x;
        blocks.unshift(d);
        d.material.transparent = true;
        if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
        d.name = object.name;
        scene.add(d);
      }
      resolve(objv);
    });
  });
  });
  return await promise;
}

counter.mtlloader = new THREE.MTLLoader();
    counter.mtlloader.setTexturePath("images/counter/");
    counter.mtlloader.setPath("mtl/");
    counter.mtlloader.load("counter.mtl", function(materials) {
    materials.preload();
    counter.objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      counter.objloader.setMaterials(materials);
      counter.objloader.setPath("objs/");
      counter.objloader.load("counter.obj", function(object) {
      this.size = 160;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(0, 0, -15);
      counter.object = object;
      counter.object.name = "counter";
      scene.add(counter.object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
         if(key === "5") {
         let box = new THREE.Box3().setFromObject(value);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x*this.size, box.getSize().y*this.size, box.getSize().z*this.size),
        new THREE.MeshBasicMaterial({color: "red"})
      );
          d.position.x = box.getCenter().x*this.size+counter.object.position.x;
          d.position.y = box.getCenter().y*this.size+counter.object.position.y;
          d.position.z = box.getCenter().z*this.size+counter.object.position.z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x*this.size;
          d.sy = box.getSize().y*this.size;
          d.sz = box.getSize().z*this.size;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = value.name;
          scene.add(d);
       }
       }
       let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x-5, box.getSize().y, box.getSize().z+1),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x+5/2;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z+2;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x-5;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z+1;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });
atm[0] = {};
atm[0].mtlloader = new THREE.MTLLoader();
    atm[0].mtlloader.setTexturePath("images/atm/");
    atm[0].mtlloader.setPath("mtl/");
    atm[0].mtlloader.load("atm.mtl", function(materials) {
    materials.preload();
    atm[0].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      atm[0].objloader.setMaterials(materials);
      atm[0].objloader.setPath("objs/");
      atm[0].objloader.load("atm.obj", function(object) {
      this.size = 40;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(-6, 0, -43.5);
      object.rotation.set(0, 180 * Math.PI/180, 0);
      atm[0].object = object;
      atm[0].object.name = "atm";
      scene.add(atm[0].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
         
       }
        let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

atm[1] = {};
atm[1].mtlloader = new THREE.MTLLoader();
    atm[1].mtlloader.setTexturePath("images/atm/");
    atm[1].mtlloader.setPath("mtl/");
    atm[1].mtlloader.load("atm.mtl", function(materials) {
    materials.preload();
    atm[1].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      atm[1].objloader.setMaterials(materials);
      atm[1].objloader.setPath("objs/");
      atm[1].objloader.load("atm.obj", function(object) {
      this.size = 40;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(-12, 0, -43.5);
      object.rotation.set(0, 180 * Math.PI/180, 0);
      atm[1].object = object;
      atm[1].object.name = "atm";
      scene.add(atm[1].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
          
         }
       }
         let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

atm[2] = {};
atm[2].mtlloader = new THREE.MTLLoader();
    atm[2].mtlloader.setTexturePath("images/atm/");
    atm[2].mtlloader.setPath("mtl/");
    atm[2].mtlloader.load("atm.mtl", function(materials) {
    materials.preload();
    atm[2].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      atm[2].objloader.setMaterials(materials);
      atm[2].objloader.setPath("objs/");
      atm[2].objloader.load("atm.obj", function(object) {
      this.size = 40;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(-18, 0, -43.5);
      object.rotation.set(0, 180 * Math.PI/180, 0);
      atm[2].object = object;
      atm[2].object.name = "atm";
      scene.add(atm[2].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
            
         
         }
       }
         let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

atm[3] = {};
atm[3].mtlloader = new THREE.MTLLoader();
    atm[3].mtlloader.setTexturePath("images/atm/");
    atm[3].mtlloader.setPath("mtl/");
    atm[3].mtlloader.load("atm.mtl", function(materials) {
    materials.preload();
    atm[3].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      atm[3].objloader.setMaterials(materials);
      atm[3].objloader.setPath("objs/");
      atm[3].objloader.load("atm.obj", function(object) {
      this.size = 40;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(-24, 0, -43.5);
      object.rotation.set(0, 180 * Math.PI/180, 0);
      atm[3].object = object;
      atm[3].object.name = "atm";
      scene.add(atm[3].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
       }
         let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

chair[0] = {};
chair[0].mtlloader = new THREE.MTLLoader();
    chair[0].mtlloader.setTexturePath("images/chair/");
    chair[0].mtlloader.setPath("mtl/");
    chair[0].mtlloader.load("chair.mtl", function(materials) {
    materials.preload();
    chair[0].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      chair[0].objloader.setMaterials(materials);
      chair[0].objloader.setPath("objs/");
      chair[0].objloader.load("chair.obj", function(object) {
      this.size = 30;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(21, 0, -43);
      object.rotation.set(0, -90 * Math.PI/180, 0);
      chair[0].object = object;
      chair[0].object.name = "chair[0]";
      scene.add(chair[0].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
           
         }
       }
         let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

chair[1] = {};
chair[1].mtlloader = new THREE.MTLLoader();
    chair[1].mtlloader.setTexturePath("images/chair/");
    chair[1].mtlloader.setPath("mtl/");
    chair[1].mtlloader.load("chair.mtl", function(materials) {
    materials.preload();
    chair[1].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      chair[1].objloader.setMaterials(materials);
      chair[1].objloader.setPath("objs/");
      chair[1].objloader.load("chair.obj", function(object) {
      this.size = 30;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(25, 0, -43);
      object.rotation.set(0, -90 * Math.PI/180, 0);
      chair[1].object = object;
      chair[1].object.name = "chair[1]";
      scene.add(chair[1].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
           
         }
       }
         let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

chair[2] = {};
chair[2].mtlloader = new THREE.MTLLoader();
    chair[2].mtlloader.setTexturePath("images/chair/");
    chair[2].mtlloader.setPath("mtl/");
    chair[2].mtlloader.load("chair.mtl", function(materials) {
    materials.preload();
    chair[2].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      chair[2].objloader.setMaterials(materials);
      chair[2].objloader.setPath("objs/");
      chair[2].objloader.load("chair.obj", function(object) {
      this.size = 30;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(28, 0, -39);
      object.rotation.set(0, 180 * Math.PI/180, 0);
      chair[2].object = object;
      chair[2].object.name = "chair[2]";
      scene.add(chair[2].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
            
         }
       }
         let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

chair[3] = {};
chair[3].mtlloader = new THREE.MTLLoader();
    chair[3].mtlloader.setTexturePath("images/chair/");
    chair[3].mtlloader.setPath("mtl/");
    chair[3].mtlloader.load("chair.mtl", function(materials) {
    materials.preload();
    chair[3].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      chair[3].objloader.setMaterials(materials);
      chair[3].objloader.setPath("objs/");
      chair[3].objloader.load("chair.obj", function(object) {
      this.size = 30;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(28, 0, -35);
      object.rotation.set(0, 180 * Math.PI/180, 0);
      chair[3].object = object;
      chair[3].object.name = "chair[3]";
      scene.add(chair[3].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
           
         }
       }
       let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

chair[4] = {};
chair[4].mtlloader = new THREE.MTLLoader();
    chair[4].mtlloader.setTexturePath("images/chair/");
    chair[4].mtlloader.setPath("mtl/");
    chair[4].mtlloader.load("chair.mtl", function(materials) {
    materials.preload();
    chair[4].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      chair[4].objloader.setMaterials(materials);
      chair[4].objloader.setPath("objs/");
      chair[4].objloader.load("chair.obj", function(object) {
      this.size = 30;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(17, 0, -43);
      object.rotation.set(0, -90 * Math.PI/180, 0);
      chair[4].object = object;
      chair[4].object.name = "chair[4]";
      scene.add(chair[4].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
           
         }
       }
       let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });
sstable[0] = {};
sstable[0].mtlloader = new THREE.MTLLoader();
    sstable[0].mtlloader.setTexturePath("images/sstable/");
    sstable[0].mtlloader.setPath("mtl/");
    sstable[0].mtlloader.load("sstable.mtl", function(materials) {
    materials.preload();
    sstable[0].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      sstable[0].objloader.setMaterials(materials);
      sstable[0].objloader.setPath("objs/");
      sstable[0].objloader.load("sstable.obj", function(object) {
      this.size = 34;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(14.5, 0, -43);
      sstable[0].object = object;
      sstable[0].object.name = "sstable[0]";
      scene.add(sstable[0].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
            
         }
       }
       let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

sstable[1] = {};
sstable[1].mtlloader = new THREE.MTLLoader();
    sstable[1].mtlloader.setTexturePath("images/sstable/");
    sstable[1].mtlloader.setPath("mtl/");
    sstable[1].mtlloader.load("sstable.mtl", function(materials) {
    materials.preload();
    sstable[1].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      sstable[1].objloader.setMaterials(materials);
      sstable[1].objloader.setPath("objs/");
      sstable[1].objloader.load("sstable.obj", function(object) {
      this.size = 34;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(28, 0, -42);
      sstable[1].object = object;
      sstable[1].object.name = "sstable[1]";
      scene.add(sstable[1].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
            
         }
       }
      let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

sstable[2] = {};
sstable[2].mtlloader = new THREE.MTLLoader();
    sstable[2].mtlloader.setTexturePath("images/sstable/");
    sstable[2].mtlloader.setPath("mtl/");
    sstable[2].mtlloader.load("sstable.mtl", function(materials) {
    materials.preload();
    sstable[2].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      sstable[2].objloader.setMaterials(materials);
      sstable[2].objloader.setPath("objs/");
      sstable[2].objloader.load("sstable.obj", function(object) {
      this.size = 34;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(28, 0, -32.6);
      sstable[2].object = object;
      sstable[2].object.name = "sstable[2]";
      scene.add(sstable[2].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
           
         }
       }
         let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

plant[0] = {};
plant[0].mtlloader = new THREE.MTLLoader();
    plant[0].mtlloader.setTexturePath("images/plant/");
    plant[0].mtlloader.setPath("mtl/");
    plant[0].mtlloader.load("plant.mtl", function(materials) {
    materials.preload();
    plant[0].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
        if(key === "m_1") {
          materials.materials[key].transparent = true;
          materials.materials[key].alphaMap = new THREE.TextureLoader().load("images/plant/plantalpha.png");
          materials.materials[key].alphaMap.minFilter = THREE.LinearMipMapLinearFilter;
          materials.materials[key].alphaMap.magFilter = THREE.NearestFilter;
          materials.materials[key].side = THREE.DoubleSide;
        }
      }
    }
      plant[0].objloader.setMaterials(materials);
      plant[0].objloader.setPath("objs/");
      plant[0].objloader.load("plant.obj", function(object) {
      this.size = 15;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(28, 2.1, -42);
      plant[0].object = object;
      plant[0].object.name = "plant[0]";
      scene.add(plant[0].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
       }
    });
  });

divider[0] = {};
divider[0].mtlloader = new THREE.MTLLoader();
    divider[0].mtlloader.setTexturePath("images/divider/");
    divider[0].mtlloader.setPath("mtl/");
    divider[0].mtlloader.load("divider.mtl", function(materials) {
    materials.preload();
    divider[0].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      divider[0].objloader.setMaterials(materials);
      divider[0].objloader.setPath("objs/");
      divider[0].objloader.load("divider.obj", function(object) {
      this.size = 40;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(22.7, 0, -23);
      divider[0].object = object;
      divider[0].object.name = "divider[0]";
      scene.add(divider[0].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
            
         }
       }
         let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

divider[1] = {};
divider[1].mtlloader = new THREE.MTLLoader();
    divider[1].mtlloader.setTexturePath("images/divider/");
    divider[1].mtlloader.setPath("mtl/");
    divider[1].mtlloader.load("divider.mtl", function(materials) {
    materials.preload();
    divider[1].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      divider[1].objloader.setMaterials(materials);
      divider[1].objloader.setPath("objs/");
      divider[1].objloader.load("divider.obj", function(object) {
      this.size = 40;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(15, 0, -23);
      divider[1].object = object;
      divider[1].object.name = "divider[1]";
      scene.add(divider[1].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
            
         }
       }
         let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

divider[2] = {};
divider[2].mtlloader = new THREE.MTLLoader();
    divider[2].mtlloader.setTexturePath("images/divider/");
    divider[2].mtlloader.setPath("mtl/");
    divider[2].mtlloader.load("divider.mtl", function(materials) {
    materials.preload();
    divider[2].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      divider[2].objloader.setMaterials(materials);
      divider[2].objloader.setPath("objs/");
      divider[2].objloader.load("divider.obj", function(object) {
      this.size = 40;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(7.3, 0, -23);
      divider[2].object = object;
      divider[2].object.name = "divider[2]";
      scene.add(divider[2].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
           
         }
       }
       let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

divider[3] = {};
divider[3].mtlloader = new THREE.MTLLoader();
    divider[3].mtlloader.setTexturePath("images/divider/");
    divider[3].mtlloader.setPath("mtl/");
    divider[3].mtlloader.load("divider.mtl", function(materials) {
    materials.preload();
    divider[3].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      divider[3].objloader.setMaterials(materials);
      divider[3].objloader.setPath("objs/");
      divider[3].objloader.load("divider.obj", function(object) {
      this.size = 40;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(-.4, 0, -23);
      divider[3].object = object;
      divider[3].object.name = "divider[3]";
      scene.add(divider[3].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
       }
       let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

divider[4] = {};
divider[4].mtlloader = new THREE.MTLLoader();
    divider[4].mtlloader.setTexturePath("images/divider/");
    divider[4].mtlloader.setPath("mtl/");
    divider[4].mtlloader.load("divider.mtl", function(materials) {
    materials.preload();
    divider[4].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      divider[4].objloader.setMaterials(materials);
      divider[4].objloader.setPath("objs/");
      divider[4].objloader.load("divider.obj", function(object) {
      this.size = 40;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(-8.1, 0, -23);
      divider[4].object = object;
      divider[4].object.name = "divider[4]";
      scene.add(divider[4].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
          
         }
       }
       let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

divider[5] = {};
divider[5].mtlloader = new THREE.MTLLoader();
    divider[5].mtlloader.setTexturePath("images/divider/");
    divider[5].mtlloader.setPath("mtl/");
    divider[5].mtlloader.load("divider.mtl", function(materials) {
    materials.preload();
    divider[5].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      divider[5].objloader.setMaterials(materials);
      divider[5].objloader.setPath("objs/");
      divider[5].objloader.load("divider.obj", function(object) {
      this.size = 40;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(-15.8, 0, -23);
      divider[5].object = object;
      divider[5].object.name = "divider[5]";
      scene.add(divider[5].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
            
         }
       }
       let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });
let atmsign = {};
atmsign.mtlloader = new THREE.MTLLoader();
    atmsign.mtlloader.setTexturePath("images/atmsign/");
    atmsign.mtlloader.setPath("mtl/");
    atmsign.mtlloader.load("atmsign.mtl", function(materials) {
    materials.preload();
    atmsign.objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      atmsign.objloader.setMaterials(materials);
      atmsign.objloader.setPath("objs/");
      atmsign.objloader.load("atmsign.obj", function(object) {
      this.size = 6;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(-15.8, 8, -44.3);
      atmsign.object = object;
      atmsign.object.name = "atmsign";
      scene.add(atmsign.object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
            
         }
       }
    });
  });

sstable[3] = {};
sstable[3].mtlloader = new THREE.MTLLoader();
    sstable[3].mtlloader.setTexturePath("images/sstable/");
    sstable[3].mtlloader.setPath("mtl/");
    sstable[3].mtlloader.load("sstable.mtl", function(materials) {
    materials.preload();
    sstable[3].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      sstable[3].objloader.setMaterials(materials);
      sstable[3].objloader.setPath("objs/");
      sstable[3].objloader.load("sstable.obj", function(object) {
      this.size = 34*2;
      object.scale.set(this.size, this.size/2, this.size);
      object.position.set(19, 0, -36);
      sstable[3].object = object;
      sstable[3].object.name = "sstable[3]";
      scene.add(sstable[3].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
            
         }
       }
       let box = new THREE.Box3().setFromObject(object);
      let d = new THREE.Mesh(
        new THREE.BoxGeometry(box.getSize().x, box.getSize().y, box.getSize().z),
        new THREE.MeshBasicMaterial({color: "red"})
      );
         
         
          d.position.x = box.getCenter().x;
          d.position.y = box.getCenter().y;
          d.position.z = box.getCenter().z;
          d.x = d.position.x;
          d.y = d.position.y;
          d.z = d.position.z;
          d.sx = box.getSize().x;
          d.sy = box.getSize().y;
          d.sz = box.getSize().z;
          d.bx = d.x;
          blocks.unshift(d);
          d.material.transparent = true;
          if(showCollision) { d.material.opacity = .4}else{ d.material.opacity = 0}
          d.name = object.name;
          scene.add(d);
    });
  });

let behindTable = new THREE.Mesh(
  new THREE.BoxGeometry(54, .2, 3),
  new THREE.MeshBasicMaterial({color: "#252525"})
);
behindTable.position.set(2, 2.2, -12.5);
scene.add(behindTable);

computer[0] = {};
computer[0].mtlloader = new THREE.MTLLoader();
    computer[0].mtlloader.setTexturePath("images/computer/");
    computer[0].mtlloader.setPath("mtl/");
    computer[0].mtlloader.load("computer.mtl", function(materials) {
    materials.preload();
    computer[0].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      computer[0].objloader.setMaterials(materials);
      computer[0].objloader.setPath("objs/");
      computer[0].objloader.load("computer.obj", function(object) {
      this.size = 6;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(24, 2.3, -12.7);
      computer[0].object = object;
      computer[0].object.name = "computer[0]";
      scene.add(computer[0].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
       }
    });
  });

computer[1] = {};
computer[1].mtlloader = new THREE.MTLLoader();
    computer[1].mtlloader.setTexturePath("images/computer/");
    computer[1].mtlloader.setPath("mtl/");
    computer[1].mtlloader.load("computer.mtl", function(materials) {
    materials.preload();
    computer[1].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      computer[1].objloader.setMaterials(materials);
      computer[1].objloader.setPath("objs/");
      computer[1].objloader.load("computer.obj", function(object) {
      this.size = 6;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(12, 2.3, -12.7);
      computer[1].object = object;
      computer[1].object.name = "computer[1]";
      scene.add(computer[1].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
       }
    });
  });

computer[3] = {};
computer[3].mtlloader = new THREE.MTLLoader();
    computer[3].mtlloader.setTexturePath("images/computer/");
    computer[3].mtlloader.setPath("mtl/");
    computer[3].mtlloader.load("computer.mtl", function(materials) {
    materials.preload();
    computer[3].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      computer[3].objloader.setMaterials(materials);
      computer[3].objloader.setPath("objs/");
      computer[3].objloader.load("computer.obj", function(object) {
      this.size = 6;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(-10, 2.3, -12.7);
      computer[3].object = object;
      computer[3].object.name = "computer[3]";
      scene.add(computer[3].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
       }
    });
  });
let atm1 = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshBasicMaterial({color: "green", side: THREE.DoubleSide})
);
atm1.rotation.x = -90 * Math.PI/180;
atm1.position.set(-6, 0, -43.5);
scene.add(atm1);

money[0] = {};
money[0].mtlloader = new THREE.MTLLoader();
    money[0].mtlloader.setTexturePath("images/money/");
    money[0].mtlloader.setPath("mtl/");
    money[0].mtlloader.load("money.mtl", function(materials) {
    materials.preload();
    money[0].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      money[0].objloader.setMaterials(materials);
      money[0].objloader.setPath("objs/");
      money[0].objloader.load("money.obj", function(object) {
      this.size = 10;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(6, 2.2, -12.5);
      object.rotation.set(0, 35*Math.PI/180, 0);
      money[0].object = object;
      money[0].object.name = "money[0]";
      scene.add(money[0].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
       }
    });
  });

money[1] = {};
money[1].mtlloader = new THREE.MTLLoader();
    money[1].mtlloader.setTexturePath("images/money/");
    money[1].mtlloader.setPath("mtl/");
    money[1].mtlloader.load("money.mtl", function(materials) {
    materials.preload();
    money[1].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      money[1].objloader.setMaterials(materials);
      money[1].objloader.setPath("objs/");
      money[1].objloader.load("money.obj", function(object) {
      this.size = 10;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(5.6, 2.6, -12.5);
      object.rotation.set(0, 35*Math.PI/180, 0);
      money[1].object = object;
      money[1].object.name = "money[1]";
      scene.add(money[1].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
       }
    });
  });

money[2] = {};
money[2].mtlloader = new THREE.MTLLoader();
    money[2].mtlloader.setTexturePath("images/money/");
    money[2].mtlloader.setPath("mtl/");
    money[2].mtlloader.load("money.mtl", function(materials) {
    materials.preload();
    money[2].objloader = new THREE.OBJLoader();
    for (const [key, value] of Object.entries(materials.materials)) {
      if (materials.materials[key].map) {
        materials.materials[key].map.minFilter = THREE.LinearMipMapLinearFilter;
        materials.materials[key].map.magFilter = THREE.NearestFilter;
      }
    }
      money[2].objloader.setMaterials(materials);
      money[2].objloader.setPath("objs/");
      money[2].objloader.load("money.obj", function(object) {
      this.size = 10;
      object.scale.set(this.size, this.size, this.size);
      object.position.set(5, 2.2, -12);
      object.rotation.set(0, 35*Math.PI/180, 0);
      money[2].object = object;
      money[2].object.name = "money[2]";
      scene.add(money[2].object);
       for (const [key, value] of Object.entries(object.children)) {
         if(object.children[key].geometry) {
            value.geometry.computeBoundingBox();
           this.pos = value.geometry.boundingBox.getCenter();
            value.geometry.center();
            value.gposition = {
              x: 0,
              y: 0,
              z: 0
            }
            value.gposition.x = this.pos.x;
            value.gposition.y = this.pos.y;
            value.gposition.z = this.pos.z;
            value.position.x = value.gposition.x;
            value.position.y = value.gposition.y;
            value.position.z = value.gposition.z;
         }
       }
    });
  });
// chest
chest = importOBJ("chest", "chest", 35, -28.8, 0, -32);
chest.then(object => {
  chest.ready = true;
  chest.obj = object.object;
});

// combo lock
comboLock = importOBJ("combo-lock", "combo-lock", 10, -26.3, 0.55, -32);

comboLock.then(object => {
  comboLock.ready = true;
  comboLock.obj = object.object;
});

// clock
clock = importOBJ("clock", "clock", 50, 29.3, 7, -27, 0, -90*Math.PI/180, 0, false);

clock.then(object => {
  clock.ready = true;
  clock.obj = object.object;
});

// four switches
for(let i = 0;i < 4; i++) {
  switches[i] = importOBJ("switch", "switch", 20, 29.45, 4, -(i*1.5)+42, 0, Math.PI/2, 0, false);

  switches[i].then(object => {
    switches[i].ready = true;
    switches[i].obj = object.object;
  });
}

// final lock
numLock = importOBJ("numLock", "numLock", 15, -17, 3, 44.4, 0, 0, 0, false);

numLock.then(object => {
  numLock.ready = true;
  numLock.obj = object.object;
});

let atmposter = importOBJ("atmposter", "atmposter", 50, 3, 7, -44.4, 0, 0, 0, false);

atmposter.then(object => {
  atmposter.ready = true;
  atmposter.obj = object.object;
});