import Node from "./Node.js";

export default class Tree {
  constructor(arr) {
    // console.log(arr);
    const sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    console.log(sortedArr);
    this.root = this.buildTree(sortedArr);
  }

  buildTree(sortedArr, start = 0, end = sortedArr.length - 1) {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);
    const newNode = new Node(sortedArr[mid]);

    newNode.left = this.buildTree(sortedArr, start, mid - 1);
    newNode.right = this.buildTree(sortedArr, mid + 1, end);

    return newNode;
  }

  insert(data) {
    let root = this.root;
    root = this.insertRec(root, data);
  }

  insertRec(root, data) {
    if (root === null) {
      root = new Node(data);
      return root;
    }

    if (root.data > data) {
      root.left = this.insertRec(root.left, data);
    } else if (root.data < data) {
      root.right = this.insertRec(root.right, data);
    }

    return root;
  }

  delete(data) {
    let root = this.root;
    root = this.deleteRec(root, data);
  }

  deleteRec(root, data) {
    if (root === null) {
      return root;
    }
    // Recursively traverse BST until below conditions can't be met i.e. node data = searched data
    if (root.data > data) {
      root.left = this.deleteRec(root.left, data);
      return root;
    } else if (root.data < data) {
      root.right = this.deleteRec(root.right, data);
      return root;
    }

    // Case 1: One child exists on node being deleted
    console.log(`Found match: ${root.data} === ${data}, processing deletion`);
    if (root.left === null) {
      root = root.right;
      return root;
    } else if (root.right === null) {
      root = root.left;
      return root;
    }
    // Case 2: Both children exist on node being deleted
    else {
      let successorParent = root;
      let successor = root.right;
      let temp = root.left;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }
      console.log(`Successor identified as ${successor.data}`);

      root = successor;
      console.log(`New Root: ${root.data}`);
      successor.left = temp;
    }
    return root;
  }
  // Recursive search for passed data param starting at head
  find(data, root = this.root) {
    const node = root;
    if (node === null) return console.log("Not found");
    if (node.data !== data) {
      return node.data < data
        ? this.find(data, node.right)
        : this.find(data, node.left);
    }
    return console.log(`Node ${node.data} found`);
  }

  levelOrder(callback) {
    if (this.root === null) return [];

    const queue = [this.root];
    const results = [];
    // While queue exists execute
    while (queue.length !== 0) {
      let treeSize = queue.length;
      for (let i = 0; i < treeSize; i++) {
        // Hold first node for processing, remove from queue
        let node = queue.shift();
        results.push(node.data);
        // Check for children
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        // If callback is implemented carry that out before returning to next queue item
        if (callback) callback(node);
      }
    }
    if (!callback) return console.log(results);
  }

  inOrder(callback) {
    const stack = [];
    const results = [];
    let node = this.root;

    while (stack.length || node) {
      while (node) {
        stack.push(node);
        node = node.left;
      }
      node = stack.pop();
      results.push(node.data);
      node = node.right;
    }

    if (callback) {
      results.forEach((entry) => {
        callback(entry);
      });
    } else {
      return console.log(results);
    }
  }

  preOrder(callback) {
    const stack = [this.root];
    const results = [];

    while (stack.length) {
      let node = stack.pop();
      results.push(node.data);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }

    if (callback) {
      results.forEach((entry) => {
        callback(entry);
      });
    } else {
      return console.log(results);
    }
  }

  postOrder(callback) {
    const stack = [this.root];
    const stackTwo = [];
    let node;

    while (stack.length) {
      node = stack.pop();
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
      stackTwo.push(node.data);
    }

    const results = stackTwo.reverse();

    if (callback) {
      results.forEach((entry) => {
        callback(entry);
      });
    } else {
      return console.log(results);
    }
  }
}
