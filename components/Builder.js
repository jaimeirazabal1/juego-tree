// src/components/Builder.js
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class Builder {
    constructor(scene, character) {
        this.scene = scene;
        this.character = character;
        this.world = character.body.world; // Obtener el mundo físico

        this.init();
    }

    init() {
        document.addEventListener('keydown', (event) => {
            if (event.key.toLowerCase() === 'b') {
                this.buildWall();
            }
        });
    }

    buildWall() {
        const geometry = new THREE.BoxGeometry(2, 3, 0.1);
        const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
        const wallMesh = new THREE.Mesh(geometry, material);
        wallMesh.castShadow = true;
        wallMesh.receiveShadow = true;

        // Posicionar la pared frente al personaje
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(this.character.mesh.quaternion);
        const position = this.character.mesh.position.clone().add(direction.multiplyScalar(3));
        wallMesh.position.copy(position);

        // Añadir el mesh a la escena
        this.scene.add(wallMesh);

        // Crear el cuerpo físico
        const shape = new CANNON.Box(new CANNON.Vec3(1, 1.5, 0.05));
        const wallBody = new CANNON.Body({
            mass: 0, // La pared es estática
            position: new CANNON.Vec3().copy(wallMesh.position),
            shape: shape
        });

        this.world.addBody(wallBody);
    }
}
