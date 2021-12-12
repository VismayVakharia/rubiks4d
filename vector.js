/** DEPRECATED */
class Vector {
  /** DEPRECATED */
  constructor(...args) {
    if (args.length == 1 && Array.isArray(args[0])) {
      this.array = [...args[0]];
    } else {
      this.array = args;
    }
    this.dim = this.array.length;
  }

  copy() {
    return new Vector(this.array);
  }
  
  print() {
    console.log("vec<", ...this.array, ">");
  }

  // operations involving one vector

  scaled(value) {
    let result = this.copy();
    for (let i=0; i<this.dim; i++)
    result.array[i] *= value;
    return result;
  }

  norm() {
    let result = 0;
    for (let i=0; i<this.dim; i++)
      result += this.array[i]**2;
    return Math.sqrt(result);
  }

  normalized() {
    return this.scaled(1/this.norm());
  }
  
  // operations involving two vectors
  
  // for binary operators
  validate(other) {
    if (other.constructor.name === "Vector" && this.dim != other.dim) 
      throw ReferenceError;
  }
  
  add(other) {
    this.validate(other);
    let result = [];
    for (let i=0; i<this.dim; i++)
      result.push(this.array[i] + other.array[i]);
    return new Vector(result);
  }
  
  sub(other) {
    this.validate(other);
    return this.add(other.scaled(-1));
  }
  
  dot(other) {
    this.validate(other);
    let result = 0;
    for (let i=0; i<this.dim; i++)
      result += this.array[i] * other.array[i];
    return result;
  }
  
  projected() {
    let result = this.copy();
    result.array.splice(this.dim - 1);  // unused return value
    return result;
  }

}
