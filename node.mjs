export class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
  }
}

export class Node2 {
  constructor(key) {
    this.key = key
    this.next = null
  }
}

const node1 = new Node("iheanacho", "kizito")
node1.next = new Node("Iheanacho", "Tochukwu")
// console.log(node1.entries())
