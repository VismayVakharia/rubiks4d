class Cubie4D {
  /**
   * active_hyperstickers format:
   *   `[+1,  -1,   0,  +1]`
   *   `(+x) (-y) (!z) (+w)`
   */
  constructor(position, active_hyperstickers, orientation) {
    this.position = position; // numjs 4d array
    this.dim = position.shape[0];
    this.active_hyperstickers = active_hyperstickers;
    this.orientation = typeof(orientation) === "undefined" ? nj.identity(this.dim) : orientation;
  }
}


// two ways to call:
//   - generate_nd_coords([order1, order2, ..., orderk])
//   - generate_nd_coords(order, dim) -> generate_nd_coords([order, order, ... (dim times)])
export function generate_nd_coords(orders, dim) { // -> [(x, y, z, w)]
  if (typeof(orders) === "number") { // shorthand notation
    let order = orders;
    orders = [];
    for (let i = 0; i < dim; i++)
      orders.push(order);
  } else { // all orders provided
    dim = orders.length;
  }

  // console.log(orders, dim);

  let coords = [];
  const cur_order = orders.shift();
  if (orders.length == 0) { // base case
    let limit = (cur_order - 1) / 2;
    for (let coord = -limit; coord <= limit; coord++) {
      coords.push([coord]);
    }
  } else {
    let remaining_coords = generate_nd_coords(orders, dim - 1);
    for (let cur_idx of generate_nd_coords(cur_order, 1)) {
      for (let coord of remaining_coords) {
        coords.push(cur_idx.concat(coord));
      }
    }
  }
  return coords;
}


export default class HyperCube4D {
  constructor(order) {
    this.order = order;
    this.dim = 3;
    this.limit = (order - 1) / 2;
    this.cubies = this.initCubies();
  }

  initCubies() {
    let cubies = [];
    //  - find positions
    let positions = generate_nd_coords(this.order, this.dim);

    //  - which hyperstickers active
    for (let pos of positions) {
      // which coords are equal to +/- limit
      let active_hyperstickers = pos.map(x => parseInt(x / this.limit));
      // if no active hyperstickers, dont add cubie
      if (active_hyperstickers.reduce((a, b) => a + b ** 2, 0) != 0)
        cubies.push(new Cubie4D(nj.array(pos), active_hyperstickers));
    }

    return cubies;
  }
}
