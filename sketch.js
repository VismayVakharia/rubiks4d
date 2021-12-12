import { render_hypercube } from "./render.js";
import HyperCube4D from "./cube4d.js";

var sketch = new p5(p5 => { });

sketch.setup = function () {
  sketch.createCanvas(400, 400);
  sketch.background(200);
  sketch.hyperCube4d = new HyperCube4D(2);

  // console.log(sketch.faces[0]);
};

sketch.draw = function () {
  // sketch.noFill();
  // for (let face of shuffle(sketch.faces)) {
  //   let quad = [];
  //   for (let index of [0, 1, 3, 2]) {
  //     let corner = face[index];
  //     let point = nj.array([[200], [200]]).add(corner.multiply(SCALE));
  //     quad.push(point.get(0, 0), point.get(1, 0));
  //   }
  //   sketch.quad(...quad);
  // }
  render_hypercube(sketch.hyperCube4d, sketch);
  sketch.noLoop();
}

console.log();
