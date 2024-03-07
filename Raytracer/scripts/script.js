/**
 *  BASIC RAYTRACER
 */

/* ************************************************** */
/* Import*/

import Canvas from "./Canvas.js";
import Vector from "./Vector.js";
import Viewport from "./Viewport.js";
import Sphere from "./Sphere.js";

/* ************************************************** */
/* Function definitions */

const canvasToViewport = (x, y) => {
    return new Vector(
        (x * vp.width) / canvas.width,
        (y * vp.height) / canvas.height,
        distCameraViewport
    );
};

const intersectRaySphere = (origin, rayDirVector, sphere) => {
    const radius = sphere.radius;
    const sphereCenterVector = origin.copy().sub(sphere.center);
    const a = rayDirVector.dot(rayDirVector);
    const b = 2 * sphereCenterVector.dot(rayDirVector);
    const c = sphereCenterVector.dot(sphereCenterVector) - radius * radius;
    const delta = b * b - 4 * a * c;
    let t1, t2;
    if (delta < 0) {
        return [Infinity, Infinity];
    }
    t1 = ((-b - Math.sqrt(delta)) / 2) * a;
    t2 = ((-b + Math.sqrt(delta)) / 2) * a;
    return [t1, t2];
};

const traceRay = (origin, rayDirVector, tMin, tMax) => {
    let closestT = Infinity;
    let closestSphere = null;
    let t1, t2;

    for (const sphere of spheres) {
        [t1, t2] = intersectRaySphere(origin, rayDirVector, sphere);
        if (t1 >= tMin && t1 < tMax && t1 < closestT) {
            closestT = t1;
            closestSphere = sphere;
        }
        if (t2 >= tMin && t2 < tMax && t2 < closestT) {
            closestT = t2;
            closestSphere = sphere;
        }
    }
    if (closestSphere == null) {
        return "#FFFFFF";
    }
    return closestSphere.color;
};

/* ************************************************** */
/* Application */

const canvas = new Canvas({ canvasId: "canvas" });
const vp = new Viewport(1, 1);
const origin = new Vector(0, 0, 0);
const distCameraViewport = 1;
const spheres = [];

spheres.push(
    new Sphere(new Vector(0, -1, 3), 1, "#FF0000"),
    new Sphere(new Vector(2, 0, 4), 1, "#0000FF"),
    new Sphere(new Vector(-2, 0, 4), 1, "#00FF00")
);
let color;
let rayDirVector;
for (let x = -canvas.width / 2; x <= canvas.width / 2; x++) {
    for (let y = -canvas.height / 2; y <= canvas.height / 2; y++) {
        rayDirVector = canvasToViewport(x, y);
        color = traceRay(origin, rayDirVector, 1, Infinity);
        canvas.drawPixel(x, y, color);
    }
}

