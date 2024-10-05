// src/App.js
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import { Character } from './components/Character.js';
import { Terrain } from './components/Terrain.js';
import { Controls } from './components/Controls.js';
import { Builder } from './components/Builder.js';
import { Enemy } from './components/Enemy.js';

export class App {
    constructor() {
        this.scene = new THREE.Scene();

        // Configurar el mundo de física
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0); // Gravedad en el eje Y

        // Configurar la cámara
        this.camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight, 0.1, 1000
        );
        this.camera.position.set(0, 5, 10);

        // Configurar el renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Luces
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        directionalLight.position.set(5, 10, 7.5);
        this.scene.add(directionalLight);

        // Elementos del juego
        this.character = new Character(this.world);
        this.terrain = new Terrain(this.world);
        this.enemy = new Enemy(this.world);

        this.scene.add(this.character.mesh);
        this.scene.add(this.terrain.mesh);
        this.scene.add(this.enemy.mesh);

        // Controles
        this.controls = new Controls(this.character, this.camera);

        // Constructor
        this.builder = new Builder(this.scene, this.character);

        // Manejo de ventana
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        // Tiempo para física
        this.lastTime = performance.now();
        // Habilitar sombras en el renderer
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Opcional

        // Configurar las luces para que proyecten sombras
        directionalLight.castShadow = true;
    }

    init() {
        // Inicialización si es necesario
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Calcular deltaTime para la física
        const time = performance.now();
        const deltaTime = (time - this.lastTime) / 1000;
        this.lastTime = time;

        // Actualizar física
        this.world.step(1 / 60, deltaTime, 3);

        // Actualizar elementos
        this.controls.update(deltaTime);
        this.character.update();
        this.enemy.update();

        // Sincronizar objetos gráficos con cuerpos físicos
        this.character.syncPhysics();
        this.enemy.syncPhysics();

        // Después de actualizar la física
        this.world.addEventListener('beginContact', (event) => {
            const { bodyA, bodyB } = event;

            if ((bodyA === this.character.body && bodyB === this.enemy.body) ||
                (bodyB === this.character.body && bodyA === this.enemy.body)) {
                this.character.takeDamage(10); // Por ejemplo, reducir 10 de salud
            }
        });

        // Renderizar escena
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
