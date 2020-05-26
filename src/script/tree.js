export default class Tree {
  idGen = 0;
  size = 0;

  constructor(data) {
    if (data !== undefined) {
      this.rootItem = new Item(data);
      this.rootItem.id = this.idGen++;
      this.size++;
    }
  }

  addItem(data, place = 0) {
    if (this.idGen === 0) {
      this.rootItem = new Item(data);
      this.rootItem.id = this.idGen++;
    } else {
      const root = this.getItemById(place);
      const itemToAdd = new Item(data);

      itemToAdd.id = this.idGen++;
      this.size++;
      itemToAdd.rootId = place;
      root.children.push(itemToAdd);
    }
  }

  moveItem(itemId, newRootId) {
    const itemToMove = this.getItemById(itemId);
    const oldRoot = this.getItemById(itemToMove.rootId);
    const newRoot = this.getItemById(newRootId);

    oldRoot.children = oldRoot.children.filter(
      item => item !== itemToMove);
    itemToMove.rootId = newRootId;
    newRoot.children.push(itemToMove);
  }

  deleteSubTree(id) {
    const subTree = this.getItemById(id);
    const subTreeRoot = this.getItemById(subTree.rootId);

    subTreeRoot.children = subTreeRoot.children.filter(
      item => item !== subTree);
    this.size = this.childrenCounter(this.rootItem) + 1;
  }

  deleteItem(id) {
    const itemToDelete = this.getItemById(id);
    const newRoot = this.getItemById(itemToDelete.rootId);

    newRoot.children = newRoot.children.filter(
      item => item !== itemToDelete);

    for (let child of itemToDelete.children) {
      child.rootId = newRoot.id;
      newRoot.children.push(child);
    }

    this.size--;
  }

  getItemById(id) {
    if (id < 0 || id >= this.idGen) {
      window.alert('No item with such id: ' + id);
      return null;
    }

    if (id === 0) {
      return this.rootItem;
    }

    let root = this.rootItem;
    let res = null;

    function getItem(root) {

      for (let child of root.children) {
        if (child.id !== id) {
          getItem(child);
        } else {
          res = child;
        }
      }

      return res;
    }

    return getItem(root) === null
      ? window.alert('No item with such id: ' + id)
      : getItem(root);
  }


  childrenCounter(item) {
    let count = item.children.length;

    function counter(item) {
      for (let child of item.children) {
        count += child.children.length;
        if (child.children.length !== 0) {
          counter(child);
        }
      }

      return count;
    }

    return counter(item);
  }
}

class Item {
  constructor(data) {
    this.value = data;
    this.children = [];
  }
}
