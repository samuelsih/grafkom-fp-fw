<script>
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import * as THREE from 'three';
    import { OrbitControls } from '$util/orbit.js';
    import { randomArr } from '$util/rand.js';
    import { onMount } from 'svelte';
    import { alertMessage, highScore } from '../../../store';

    export let data;

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('black');
    
    // Grid
    const gridSize = 9;
    const gridDivisions = 9;
    const gridSquare = gridSize / gridDivisions;
    const grid = new THREE.GridHelper(gridSize, gridDivisions);
    scene.add(grid);

    // Grid Space
    const gridSpace = new THREE.Object3D();
    gridSpace.position.set(-(gridSize / 2) + (gridSquare / 2), 0, - (gridSize / 2) + (gridSquare / 2));
    scene.add(gridSpace);

    const start = indexToCoordinates(24);
    const purpleTileIndex = []
    let isFinish = false;
    let isOver = false;

    // Objects
    const objects = []
    const baseSize = 0.9
    const boxSize = baseSize * gridSquare
    const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);

    // 
    function indexToCoordinates(index) {
        const x = index % gridDivisions * gridSquare;
        const z = Math.floor(index / gridDivisions) * gridSquare;
        return new THREE.Vector2(x, z);
    }

    function coordinatesToIndex(coord) {
        return Math.floor(coord.y * gridDivisions + coord.x);
    }

// Plane
    function buildPlane(index) {
        const material = new THREE.MeshPhongMaterial({
            color: 'white'
        });
        const mesh = new THREE.Mesh(boxGeometry, material);

        const coord = indexToCoordinates(index);

        mesh.position.set(coord.x, 0, coord.y);
        gridSpace.add(mesh);
        objects.push(mesh);
    }

    const const_planeObjects = 72;
    let planeObjects = const_planeObjects;

    for (let i = 0; i < planeObjects; i++) {
        buildPlane(i);
    }

    // Player
    const playerMaterial = new THREE.MeshBasicMaterial({
        color: 'red',
        wireframe: true
    });
    const playerMesh = new THREE.Mesh(new THREE.SphereGeometry(boxSize / 2, 8, 8), playerMaterial);
    playerMesh.name = 'Player'
    gridSpace.add(playerMesh);

    playerMesh.position.set(start.x, boxSize, start.y)
    //

    // Wall
    function buildWall(index) {
        const material = new THREE.MeshPhongMaterial({
            color: 0xa19555
        });
        const mesh = new THREE.Mesh(boxGeometry, material);

        const coord = indexToCoordinates(index);

        mesh.position.set(coord.x, boxSize, coord.y);
        gridSpace.add(mesh);
        objects.push(mesh);
    }

    let wallIndex = [0, 1, 2, 3, 4, 5, 6, 7, 9, 14, 16, 18, 21, 22, 23, 25, 26, 27, 31, 35, 36, 44, 45, 53, 54, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
    wallIndex.forEach(function (idx) {
        buildWall(idx);
    });

    // Destination
    let destination = randomArr(data.tilesAmount);
    const destColor = 0xd69585;
    destination.forEach(function (idx) {
        const obj = objects[idx];
        obj.material.color.setHex(destColor);
    });

    // Check Kondisi Sekarang
    function checkState() {
        if (destination.length == 0) {
            isFinish = true;
        }
    }

    // Cek Dinding
    function CheckWall(idx) {
        for (let i = 0; i < wallIndex.length; i++) {
            if (wallIndex[i] == idx) {
                return false;
            }
        }
        return true;
    }

    // Cek Destinasi
    function checkDestination(idx) {
        for (let i = 0; i < destination.length; i++) {
            if (destination[i] == idx) {
                const obj = objects[destination[i]];
                obj.material.color.setHex(0xffffff);
                destination.splice(i, 1);
            }
        }
    }

    //score
    export let step = 0;

    function onKeyDown(e) {
        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
            let prev = coordinatesToIndex(new THREE.Vector2(playerMesh.position.x, playerMesh.position.z));
            switch (e.keyCode) {
                // left
                case 37:
                    if (CheckWall(prev - 1)) {
                        playerMesh.position.setX(playerMesh.position.x - (1 * gridSquare));
                    }
                    break;
                // up
                case 38:
                    if (CheckWall(prev - gridDivisions)) {
                        playerMesh.position.setZ(playerMesh.position.z - (1 * gridSquare));
                    }
                    break;

                // right
                case 39:
                    if (CheckWall(prev + 1)) {
                        playerMesh.position.setX(playerMesh.position.x + (1 * gridSquare));
                    }
                    break;

                // down
                case 40:
                    if (CheckWall(prev + gridDivisions)) {
                        playerMesh.position.setZ(playerMesh.position.z + (1 * gridSquare));
                    }
                    break;
            }

            let idx = coordinatesToIndex(new THREE.Vector2(playerMesh.position.x, playerMesh.position.z));
            checkDestination(idx);

            checkState();
            step += 1;
        }
    }

    if(browser) {
       /**
        * Camera
        */
        // Base camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
        camera.position.x = 0
        camera.position.y = 7
        camera.position.z = 7
        scene.add(camera)

         // Light
        const skyColor = 0xB1E1FF;
        const groundColor = 0xB97A20;
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);

        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        let controls =  new OrbitControls(camera, renderer.domElement);

        controls.enableDamping = true;
        controls.dampingFactor = 0.01;
        controls.screenSpacePanning = false;

        let mainLoop = () => {
            renderer.render(scene, camera);

            if(isFinish && !isOver) {
                alertMessage.update(msg => `Selamat, anda meraih score sebesar ${step}`);

                isFinish = false;
                isOver = true;

                $highScore = [...$highScore, {
                    tiles: data.tilesAmount,
                    score: step
                }]

                goto("/");
            }

            controls.update();
            requestAnimationFrame(mainLoop);
        }

        onMount(() => {
            document.body.appendChild(renderer.domElement);
            window.addEventListener('keydown', onKeyDown, false);
            mainLoop();
            
        })
    }   
</script>

<div>
    <h2 id="skor"> Score: {step}</h2>
</div>

<style>
    h2 {
        color : green;
        position: fixed;
        z-index: 99;
        margin-left: 20px;
    }
</style>