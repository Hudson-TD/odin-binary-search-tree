import Tree from "./Tree.js";

//Testing Arr
const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

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

// General logging for visualization
console.log(BST);
prettyPrint(BST.root);

// Testing insert(data), delete(data)
BST.insert(69);
BST.insert(12);
BST.insert(100);
BST.delete(9);
console.log(BST);
prettyPrint(BST.root);

//Testing find(data)
// BST.find(14);

//Testing levelOrder with and without callback
// function consoleLogging(node) {
//   console.log(node);
// }

// Breadth First Search
// BST.levelOrder();
// BST.levelOrder(consoleLogging);

// Inorder (left>node>right) traversal of BST
// BST.inOrder();
// BST.inOrder(consoleLogging);

// Preorder (node>left>right) traversal of BST
// BST.preOrder();
// BST.preOrder(consoleLogging);

// Postorder (left>right>node) traversal of BST
// BST.postOrder();
// BST.postOrder(consoleLogging);
