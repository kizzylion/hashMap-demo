import linkedList from "./linkedList.mjs"

export default class HashMap {
  constructor() {
    this.capacity = 17
    this.loadFactor = 0.75
    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new linkedList())
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

  growBucket() {
    let entries = this.entries()
    this.capacity *= 2
    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new linkedList())

    entries.forEach((entry) => {
      this.set(entry[0], entry[1])
    })
  }
  //   set(key,value) set key and value in a node
  set(key, value) {
    const index = this._hash(key)
    const bucket = this.buckets[index]
    if (bucket.head) {
      // if bucket is not empty
      let current = bucket.head
      while (current) {
        // loop through the bucket
        if (current.key === key) {
          // if key is found
          current.value = value
          return
        }
        current = current.next
      }
      // if key is not found
      bucket.append(key, value)
    } else {
      // if bucket is empty
      bucket.append(key, value)
    }

    let currentLoadFactor = this.currentLoadFactor()
    if (currentLoadFactor >= this.loadFactor) {
      this.growBucket()
    }
    console.log(`${key} is in bucket ${index}`)
  }
  get(key) {
    const index = this._hash(key)
    const bucket = this.buckets[index]

    if (bucket.head) {
      // if bucket is not empty
      let current = bucket.head
      while (current) {
        // loop through the bucket
        if (current.key === key) {
          // if key is found
          console.log(current.value)
          return current.value
        }
        current = current.next
      }
      // if key is not found
      console.log(`${key} not found`)
      return
    }
    console.log(`${key} is  empty`)
  }

  has(key) {
    const index = this._hash(key) % this.capacity
    const bucket = this.buckets[index]
    if (bucket.head) {
      // if bucket is not empty
      let current = bucket.head
      while (current) {
        if (current.key === key) {
          console.log("true")
          return true
        }
        current = current.next
      }
      console.log("false")
      return false
    }
    console.log("false")
    return false
  }

  //remove(key) takes a key as an argument. if the given key is in the hash,
  //it should remove the entry with that key and return true. else return false
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
  // clear() removes all entries in the hash map.
  clear() {
    this.capacity = 17
    this.loadFactor = 0.75
    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new linkedList())
    console.log("HashMap Cleared")
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

  // values() return an array containing all the values inside the hash map
  values() {
    let values = []
    for (let i = 0; i < this.capacity; i++) {
      let current = this.buckets[i].head
      while (current) {
        values.push(current.value)
        current = current.next
      }
    }
    return values
  }

  // entries() return an array that contains each key, value pair.
  // Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries() {
    let entries = []
    for (let i = 0; i < this.capacity; i++) {
      let current = this.buckets[i].head
      while (current) {
        entries.push([current.key, current.value])
        current = current.next
      }
    }
    return entries
  }
}
