// src/components/Character.js
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class Character {
    constructor(world) {
        // Crear la geometría y material para el personaje
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.health = 100; // Salud inicial
        // Posición inicial
        this.mesh.position.y = 5;

        // Crear el cuerpo físico
        const shape = new CANNON.Box(new CANNON.Vec3(0.5, 1, 0.5));
        this.body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 5, 0),
            shape: shape
        });
        this.body.linearDamping = 0.9; // Amortiguación para evitar deslizamiento

        world.addBody(this.body);
    }

    update() {
        // Lógica adicional si es necesario
    }
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            console.log('El personaje ha muerto');
            // Implementar lógica de muerte
        }
    }
    syncPhysics() {
        // Sincronizar la posición y rotación del mesh con el cuerpo físico
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}
