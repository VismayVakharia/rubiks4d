import * as Cube4D from "./cube4d.js";
import * as Globals from "./globals.js";


class Quad {
  constructor(cubie_position, facing_direction, color) {
    // let cubie_dim = cubie_position.length;
    // let hypersticker_dim = cubie_dim - 1;

    this.center = cubie_position.add(facing_direction.multiply(0.5));

    let orders = facing_direction.tolist().map(x => 2 - x ** 2)  // normalized complex stochastic bezier interpolation   // 0->2, +/-1 -> 1

    this.coords = Cube4D.generate_nd_coords(orders).map(coord => nj.array(coord).add(this.center));
    // todo: think about hypersticker coord ordering gray code etc.

    this.color = color;
  }
}


/**
 * main entry point/entry function   // todo: delete this line
 * @param {Cube4D.HyperCube4D} hypercube
 * @param {p5} sketch
 */
export function render_hypercube(hypercube, sketch) {
  let quads = [];  // list of Quad
  // get list of quads for each cubie
  for (let cubie of hypercube.cubies)
    quads.push(...get_quads(cubie));

  // sort quads
  quads.sort(compare_quads);
  quads.reverse();

  // render in order
  for (let quad of quads) render_quad(quad, sketch);
}


/**
 * generate list of quads (possibly with quad centers)
 * @param {Cube4D.Cubie4D} cubie
 * @returns {Quad[]}
 */
function get_quads(cubie) {
  let quads = [];
  // loop over active_hypersticker elements
  for (let [axis_idx, orientation] of cubie.active_hyperstickers.entries()) {
    // if non-zero, construct normal vector
    if (orientation == 0) continue;
    let normal_vector = nj.zeros(3);
    normal_vector.set(axis_idx, orientation);
    // invoke Quad(cubie_position, normal, color?)
    quads.push(new Quad(cubie.position, normal_vector, "white"));
  }
  return quads;
}


/**
 * deep sort quads based on quad centers
 * [x] write compare_quads function (that possibly uses quad center)
 * @param {Quad} quad1 
 * @param {Quad} quad2 
 */
function compare_quads(quad1, quad2) {
  let center1 = quad1.center.tolist().reverse();
  let center2 = quad2.center.tolist().reverse();

  for (let idx in center1) {
    if (center1[idx] == center2[idx]) continue;
    return center1[idx] < center2[idx] ? -1 : 1;
  }
}


/**
 * render ordered list of quads from back to front (z-sort)
 * (quads: list of list of nj.arrays)
 * @param {Quad} quad
 * @param {p5} sketch
 */
function render_quad(quad, sketch) {
  let coords = [];
  const gray_code = [0, 1, 3, 2];
  // gray code sort quad coords
  for (let corner_idx of gray_code) {
    let projected = project(quad.coords[corner_idx]);
    let scaled = projected.multiply(Globals.SCALE);
    let offsetted = nj.array([[200], [200]]).add(scaled);
    coords.push(...offsetted.tolist());
  }
  // p5 render quad
  sketch.quad(...coords);
}


/**
 * 
 * @param {nj.array} coord 
 * @returns {nj.array}
 */
function project(coord) {
  let dim = coord.shape[0];
  let perspective_matrix = nj.concatenate(nj.identity(dim - 1), nj.zeros([dim - 1, 1]));
  let x = 1 / (Globals.CAMERA_DISTANCE - coord.get(dim - 1));
  for (let i = 0; i < dim - 1; i++) {
    perspective_matrix.set(i, i, x);
  }
  return nj.dot(perspective_matrix, coord.reshape([dim, 1]));
}
