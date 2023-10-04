import Node from "./Node.js";

//Testing Arr
const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

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
  }
  // Case 2: Both children exist on node being deleted
}

// Provided by TOP for tree visualization
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const BST = new Tree(testArr);
// BST.insert(45);
console.log(BST);
prettyPrint(BST.root);

BST.delete(23);
console.log(BST);
prettyPrint(BST.root);
