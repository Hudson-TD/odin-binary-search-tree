import Node from "./Node.js";

//Testing Arr
const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  removeDuplicates(arr) {
    let n = arr.length;
    if (n.length == 0 || n.length == 1) {
      return arr;
    }

    let temp = new Array();
    let counter = 0;

    for (let i = 0; i < n - 1; i++) {
      if (arr[i] != arr[i + 1]) {
        temp[counter++] = arr[i];
      }
    }
    arr = temp;
    console.log(arr);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }

    let mid = Math.floor(parseInt((start + end) / 2));
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

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
const testTwo = [1, 2, 2, 2, 3, 4, 5, 6, 6, 7, 8, 9, 9, 9];

BST.removeDuplicates(testTwo);
// prettyPrint(BST.root);
