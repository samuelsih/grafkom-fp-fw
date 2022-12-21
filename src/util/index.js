import * as THREE from 'three';

export const indexToCoordinates = (gridDivisions, gridSquare, index) => {
    const x = index % gridDivisions * gridSquare;
    const z = Math.floor(index / gridDivisions) * gridSquare;
    return new THREE.Vector2(x, z);
}

export const coordinatesToIndex = (gridDivisions, coord) => {
    return Math.floor(coord.y * gridDivisions + coord.x);
}

    // Plane
export const buildPlane = (boxGeometry, coord, index) => {
    const material = new THREE.MeshPhongMaterial({
        color: 'white'
    });
    const mesh = new THREE.Mesh(boxGeometry, material);

    const coord = indexToCoordinates(index);

    mesh.position.set(coord.x, 0, coord.y);
    gridSpace.add(mesh);
    objects.push(mesh);
}

// unused
export const randomDestination = () => {
    let num = []

    const min = 30
    const max = 60;

    for(let i = 0; i < 7; ++i) {
        const n = Math.floor(Math.random() * (max - min + 1)) + min;
        num.push(n)
    }

    return num;
}