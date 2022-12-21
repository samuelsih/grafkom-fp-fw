import { OrbitControls } from "./orbit";
import * as THREE from 'three';

export class MapControls extends OrbitControls {

    constructor( object, domElement ) {

        super( object, domElement );
        this.screenSpacePanning = false; // pan orthogonal to world-space direction camera.up

        this.mouseButtons.LEFT = THREE.MOUSE.PAN;
        this.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
        this.touches.ONE = THREE.TOUCH.PAN;
        this.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;

    }
}