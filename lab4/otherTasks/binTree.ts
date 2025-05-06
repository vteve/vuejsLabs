type TreeNode<T> = {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
  };
  
  class BinaryTree<T> {
    private root: TreeNode<T> | null = null;
  
    insert(value: T): void {
      const newNode: TreeNode<T> = { value, left: null, right: null };
  
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
        } else {
          if (current.right === null) {
            current.right = newNode;
            return;
          }
          current = current.right;
        }
      }
    }
  
    search(value: T): boolean {
      let current = this.root;
      while (current !== null) {
        if (value === current.value) {
          return true;
        } else if (value < current.value) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return false;
    }
  
    remove(value: T): void {
      this.root = this.removeNode(this.root, value);
    }
  
    private removeNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
      if (node === null) {
        return null;
      }
  
      if (value === node.value) {
        if (node.left === null && node.right === null) {
          return null;
        } else if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        } else {
          const minRight = this.findMin(node.right);
          node.value = minRight.value;
          node.right = this.removeNode(node.right, minRight.value);
          return node;
        }
      } else if (value < node.value) {
        node.left = this.removeNode(node.left, value);
        return node;
      } else {
        node.right = this.removeNode(node.right, value);
        return node;
      }
    }
  
    private findMin(node: TreeNode<T>): TreeNode<T> {
      let current = node;
      while (current.left !== null) {
        current = current.left;
      }
      return current;
    }
  
    height(): number {
      return this.calculateHeight(this.root);
    }
  
    private calculateHeight(node: TreeNode<T> | null): number {
      if (node === null) {
        return 0;
      }
      return 1 + Math.max(
        this.calculateHeight(node.left),
        this.calculateHeight(node.right)
      );
    }
  }
  
  const tree = new BinaryTree<number>();
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