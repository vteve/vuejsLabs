"use strict";
class BinaryTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        const newNode = { value, left: null, right: null };
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            }
            else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }
    search(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.value) {
                return true;
            }
            else if (value < current.value) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        return false;
    }
    remove(value) {
        this.root = this.removeNode(this.root, value);
    }
    removeNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value === node.value) {
            if (node.left === null && node.right === null) {
                return null;
            }
            else if (node.left === null) {
                return node.right;
            }
            else if (node.right === null) {
                return node.left;
            }
            else {
                const minRight = this.findMin(node.right);
                node.value = minRight.value;
                node.right = this.removeNode(node.right, minRight.value);
                return node;
            }
        }
        else if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        }
        else {
            node.right = this.removeNode(node.right, value);
            return node;
        }
    }
    findMin(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }
    height() {
        return this.calculateHeight(this.root);
    }
    calculateHeight(node) {
        if (node === null) {
            return 0;
        }
        return 1 + Math.max(this.calculateHeight(node.left), this.calculateHeight(node.right));
    }
}
const tree = new BinaryTree();
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
console.log(tree.search(7));
console.log(tree.search(12));
console.log(tree.height());
tree.remove(5);
console.log(tree.height());
