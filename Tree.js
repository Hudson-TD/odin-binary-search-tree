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
    if (root == null) {
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
BST.insert(45);
prettyPrint(BST.root);
