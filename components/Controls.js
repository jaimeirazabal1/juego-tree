// src/components/Controls.js
export class Controls {
    constructor(character, camera) {
        this.character = character;
        this.camera = camera;

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.jump = false;

        this.init();
    }

    init() {
        document.addEventListener('keydown', (event) => {
            switch (event.key.toLowerCase()) {
                case 'w':
                    this.moveForward = true;
                    break;
                case 's':
                    this.moveBackward = true;
                    break;
                case 'a':
                    this.moveLeft = true;
                    break;
                case 'd':
                    this.moveRight = true;
                    break;
                case ' ':
                    this.jump = true;
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key.toLowerCase()) {
                case 'w':
                    this.moveForward = false;
                    break;
                case 's':
                    this.moveBackward = false;
                    break;
                case 'a':
                    this.moveLeft = false;
                    break;
                case 'd':
                    this.moveRight = false;
                    break;
                case ' ':
                    this.jump = false;
                    break;
            }
        });
    }

    update(deltaTime) {
        const velocity = this.character.body.velocity;
        const moveSpeed = 5;

        // Movimiento en X y Z
        let x = 0;
        let z = 0;

        if (this.moveForward) {
            z -= moveSpeed;
        }
        if (this.moveBackward) {
            z += moveSpeed;
        }
        if (this.moveLeft) {
            x -= moveSpeed;
        }
        if (this.moveRight) {
            x += moveSpeed;
        }

        // Actualizar la velocidad del personaje
        this.character.body.velocity.x = x;
        this.character.body.velocity.z = z;

        // Salto
        if (this.jump && Math.abs(velocity.y) < 0.1) {
            this.character.body.velocity.y = 8;
        }

        // Actualizar la cámara para seguir al personaje
        this.camera.position.x = this.character.mesh.position.x;
        this.camera.position.z = this.character.mesh.position.z + 10;
        this.camera.position.y = this.character.mesh.position.y + 5;
        this.camera.lookAt(this.character.mesh.position);
    }
}
