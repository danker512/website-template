'use strict';

export class Demo {
  constructor(public name:string){}

  getName():string {
    return this.name;
  }
}

export class Demo2 extends Demo{

  constructor() {
    super('demo');
  }

  setName(name:string) {
    this.name = name;
  }
}
