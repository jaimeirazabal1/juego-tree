// src/components/Enemy.js
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class Enemy {
    constructor(world) {
        // Crear la geometría y material para el enemigo
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;

        // Posición inicial
        this.mesh.position.set(0, 5, -20);

        // Crear el cuerpo físico
        const shape = new CANNON.Sphere(1);
        this.body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 5, -20),
            shape: shape
        });
        this.body.linearDamping = 0.9;

        world.addBody(this.body);
    }

    update() {
        // Movimiento simple hacia el jugador (opcional)
        // Aquí puedes implementar la lógica de movimiento del enemigo
    }

    syncPhysics() {
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}
