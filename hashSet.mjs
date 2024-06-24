import { linkedList2 } from "./linkedList.mjs"

export default class HashSet {
  constructor() {
    this.capacity = 17
    this.loadFactor = 0.75
    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new linkedList2())
  }

  _hash(key) {
    let total = 0
    const primeNumber = 31
    for (let i = 0; i < key.length; i++) {
      total = (primeNumber * total + key.charCodeAt(i)) % this.capacity
    }

    return total
  }

  checkNoOfFilledBuckets() {
    let size = 0
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i].head) {
        size++
      }
    }
    return size
    const calcLoadFactor = size / this.capacity
  }
  currentLoadFactor() {
    return this.length() / this.capacity
  }

  //   set(key) set key in a node
  set(key) {
    const index = this._hash(key)
    const bucket = this.buckets[index]
    if (bucket.head) {
      // if bucket is not empty
      let current = bucket.head
      while (current) {
        // loop through the bucket
        if (current.key === key) {
          // if key is found
          console.log(`${key} already exist`)
          return
        }
        current = current.next
      }
      // if key is not found
      bucket.append(key)
    } else {
      // if bucket is empty
      bucket.append(key)
    }

    let currentLoadFactor = this.currentLoadFactor()
    if (currentLoadFactor >= this.loadFactor) {
      this.growBucket()
    }
    console.log(`${key} is in bucket ${index}`)
  }

  has(key) {
    const index = this._hash(key) % this.capacity
    const bucket = this.buckets[index]
    if (bucket.head) {
      // if bucket is not empty
      let current = bucket.head
      while (current) {
        if (current.key === key) {
          return true
        }
        current = current.next
      }
      return false
    }

    return false
  }

  remove(key) {
    const index = this._hash(key) % this.capacity
    const bucket = this.buckets[index]
    if (bucket.head) {
      // if bucket is not empty
      let current = bucket.head
      if (bucket.head.key === key) {
        // if key is head
        bucket.head = bucket.head.next
        console.log(`${index}: ${key} removed`)
        return true
      }

      while (current && current.next) {
        if (current.next.key === key) {
          // if key is found
          current.next = current.next.next
          console.log(`${index}: ${key} removed`)
          return true
        }
        current = current.next
      }
    }
    console.log(`${key} not found`)
    return false
  }

  // keys() return an array containing all the keys inside the hash map
  keys() {
    let keys = []
    for (let i = 0; i < this.capacity; i++) {
      let current = this.buckets[i].head
      while (current) {
        keys.push(current.key)
        current = current.next
      }
    }
    return keys
  }

  // returns the number of stored keys in the hashmap
  length() {
    let count = 0
    for (let i = 0; i < this.capacity; i++) {
      let current = this.buckets[i].head
      while (current) {
        count++
        current = current.next
      }
    }
    return count
  }

  growBucket() {
    let keys = this.keys()
    this.capacity *= 2
    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new linkedList2())

    keys.forEach((entry) => {
      this.set(entry)
    })
  }
}
