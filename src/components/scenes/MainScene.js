import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Spiral, Flower, Land } from 'objects';
import { BasicLights } from 'lights';
import * as THREE from "three";

import POSX from "./textures/Skybox/posx.jpg";
import NEGX from "./textures/Skybox/negx.jpg";
import POSY from "./textures/Skybox/posy.jpg";
import NEGY from "./textures/Skybox/negy.jpg";
import POSZ from "./textures/Skybox/posz.jpg";
import NEGZ from "./textures/Skybox/negz.jpg";
import RAINBOW from "./textures/Rainbow/rainbow2.png";

class MainScene extends Scene {
    constructor(listener) {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x000000);

        // Add spirals to scene

        var envMap = new THREE.CubeTextureLoader()
            .load([
                POSX, NEGX,
                POSY, NEGY,
                POSZ, NEGZ
            ]);
        // var envMap = new THREE.CubeTextureLoader()
        //     .load([
        //         RAINBOW, RAINBOW,
        //         RAINBOW, RAINBOW,
        //         RAINBOW, RAINBOW
        //     ]);


        // 16
        var num_spirals = 16;
        // num_spirals = 1;
        var spirals = [];
        // 0.05
        // if positive, looking like traveling up
        const speed0 = -0.005;
        // const speed0 = 0;
        const speed1 = -0.02;
        // goal: 10
        const max_iter = 7;
        for (let i = 0; i < num_spirals; i++) {
            // top
            const new_spiral_0 = new Spiral(this, listener, envMap, max_iter, 1, 1);
            // new_spiral_0.calculate();
            // new_spiral.draw_bezier();
            // new_spiral_0.draw_bubbles(i * (360 / num_spirals));
            new_spiral_0.rotate_bezier(i * (360 / num_spirals));
            new_spiral_0.rotationSpeed = speed0;
            // spirals.push(new_spiral_0);
            this.add(new_spiral_0);

            const new_spiral_1 = new Spiral(this, listener, envMap, max_iter, -1, 1);
            // new_spiral_1.calculate();
            // new_spiral.draw_bezier();
            // new_spiral_1.draw_bubbles(i * (360 / num_spirals));
            new_spiral_1.rotate_bezier(i * (360 / num_spirals));
            new_spiral_1.rotationSpeed = -speed0;
            // spirals.push(new_spiral_1);
            this.add(new_spiral_1);

            // const new_spiral_2 = new Spiral(this, envMap, max_iter, 1, -1);
            // new_spiral_2.rotate_bezier((i + 0.5) * (360 / num_spirals));
            // new_spiral_2.rotationSpeed = speed0;
            // // spirals.push(new_spiral_2);
            // this.add(new_spiral_2);

            // const new_spiral_3 = new Spiral(this, envMap, max_iter, -1, -1);
            // new_spiral_3.rotate_bezier((i + 0.5) * (360 / num_spirals));
            // new_spiral_3.rotationSpeed = -speed0;
            // // spirals.push(new_spiral_3);
            // this.add(new_spiral_3);
        }

        const lights = new BasicLights();
        this.add(lights);

        // Populate GUI
        // this.state.gui.add(this.state, 'rotationSpeed', -15, 15);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 3000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default MainScene;