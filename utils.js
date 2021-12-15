import { COLORS } from "./globals.js";

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
 * 
 * @param {nj.array} facing_direction 
 * @returns {String}
 */
export function get_color(facing_direction) {
  let sum = 0;
  for (let [idx, value] of facing_direction.tolist().entries()) {
    sum += Math.abs(value * ((value + 1) / 2 + idx * 2));
  }
  return COLORS[sum];
}
