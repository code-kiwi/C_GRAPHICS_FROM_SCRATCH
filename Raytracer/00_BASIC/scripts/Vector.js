class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    length() {
        return Math.sqrt(this.x * this.x, this.y * this.y);
    }

    log() {
        console.log(`Vector(${this.x}, ${this.y}, ${this.z})`);
    }

    copy() {
        return new Vector(this.x, this.y, this.z);
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        return this;
    }

    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
        return this;
    }

    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }
}

export default Vector;
