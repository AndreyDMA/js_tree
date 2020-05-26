import Tree from './tree.js'

const treeRendering = document.querySelector('#tree');
const tree = new Tree();
const createTreeButton = document.querySelector('#create');
const addItemButton = document.querySelector('#add');
const changeBranchButton = document.querySelector('#change-branch');
const deleteItemButton = document.querySelector('#delete-item');
const deleteBranchButton = document.querySelector('#delete-branch');
const deleteTreeButton = document.querySelector('#delete');

createTreeButton.onclick = function () {
  if (tree.idGen !== 0) {
    alert('Tree is already exists!');
    return;
  }

  const data = window.prompt('Enter info for root element', '');

  if (data === null) return;

  tree.addItem(data);
  renderTree(treeRendering, tree);
}

deleteTreeButton.onclick = function () {
  tree.idGen = 0;
  tree.size = 0;
  tree.rootItem = null;
  renderTree(treeRendering, tree);
}

addItemButton.onclick = function () {
  const data = window.prompt('Enter info you want to store', '');

  if (data === null) return;

  const place = window.prompt('In what item you want to store it? Enter ID', '');

  tree.addItem(data, +place);
  renderTree(treeRendering, tree);
}

deleteItemButton.onclick = function () {
  const id = window.prompt('Enter item ID', '');

  if (id === null) return;

  if (id === 0) {
    window.alert('Root item can not be removed. Delete Tree instead')
    return;
  }

  tree.deleteItem(+id);
  renderTree(treeRendering, tree);
}

deleteBranchButton.onclick = function () {
  const id = window.prompt('Enter branch item ID', '');

  if (id === null) return;

  if (id === 0) {
    window.alert('Root item can not be removed. Delete Tree instead')
    return;
  }

  tree.deleteSubTree(+id);
  renderTree(treeRendering, tree);
}

changeBranchButton.onclick = function () {
  const id = window.prompt('Enter ID of item to move', '');

  if (id === null) return;

  const newRoot = window.prompt('Enter ID of item where to put', '');

  if (newRoot === null) return;

  tree.moveItem(+id, +newRoot);
  renderTree(treeRendering, tree);
}

function renderTree(container, elements) {
  if (container.children.length !== 0) {
    container.innerHTML = '';
  }

  const item = elements.rootItem;
  const div = document.createElement('div');

  div.className = 'root';
  div.innerText = item.id + ' : ' + item.value;
  container.append(div);

  renderer(item, container);

  function renderer(item, innerContainer) {
    const ul = document.createElement('ul');

    if (innerContainer === undefined) {
      innerContainer = container;
    }

    ul.className = item.id;
    innerContainer.append(ul);

    for (let child of item.children) {
      const innerContainer = document.getElementsByClassName(child.rootId)[0];
      const li = document.createElement('li');

      li.className = 'tree-item';
      li.innerText = child.id + ' : ' + child.value;
      ul.append(li);

      if (child.children.length !== 0) {
        renderer(child, innerContainer);
      }
    }
  }

  console.log(tree);
}
