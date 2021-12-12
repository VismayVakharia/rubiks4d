/**
 * Shuffles array in place.
 * from: https://stackoverflow.com/a/6274381
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

/**
 * reverse numjs array
 * @param {nj.array} array;
 */
export function reverse(array) {
  return array.slice([null, null, -1])
}
