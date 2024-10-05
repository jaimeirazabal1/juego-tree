// src/components/Terrain.js
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class Terrain {
    constructor(world) {
        // Crear la geometría y material para el terreno
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.receiveShadow = true;

        // Crear el cuerpo físico
        const shape = new CANNON.Plane();
        this.body = new CANNON.Body({
            mass: 0, // Masa cero para objetos estáticos
            shape: shape,
            quaternion: new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0)
        });

        world.addBody(this.body);
    }
}
