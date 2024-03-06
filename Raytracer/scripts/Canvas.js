class Canvas {
    constructor({ canvasId = null }) {
        if (canvasId == null) {
            throw new Error(
                "Error - CanvasId not provided to canvas constructor"
            );
        }
        this.element = document.getElementById(canvasId);
        if (this.element == null) {
            throw new Error("Error - CanvasId provided is invalid");
        }
        this.ctx = this.element.getContext("2d");
        this.width = this.element.width;
        this.height = this.element.height;
    }

    drawPixel(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.rect(x + this.width / 2, -y + this.height / 2, 1, 1);
        this.ctx.fill();
    }
}

export default Canvas;
