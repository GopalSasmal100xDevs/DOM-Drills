let firstBoxList = [
  { title: "Read", checked: true, id: 123123 },
  { title: "Write", checked: false, id: 123124 },
  { title: "Code", checked: true, id: 123125 },
];
let secondBoxList = [
  { title: "React", checked: false, id: 1231123 },
  { title: "JavaScript", checked: false, id: 1232124 },
  { title: "Node", checked: false, id: 1232125 },
];

function moveAllItemsToRight() {
  secondBoxList = [...secondBoxList, ...firstBoxList];
  firstBoxList = [];
  render();
}

function moveAllItemsToLeft() {
  firstBoxList = [...firstBoxList, ...secondBoxList];
  secondBoxList = [];
  render();
}

function moveItemsLeft() {
  const selectedItems = secondBoxList.filter(({ checked }) => checked === true);
  firstBoxList = [...firstBoxList, ...selectedItems];
  secondBoxList = secondBoxList.filter(({ checked }) => checked === false);
  render();
}

function moveItemsRight() {
  const selectedItems = firstBoxList.filter(({ checked }) => checked === true);
  secondBoxList = [...secondBoxList, ...selectedItems];
  firstBoxList = firstBoxList.filter(({ checked }) => checked === false);
  render();
}

function uncheckItem(itemId, list) {
  list.forEach(({ id, checked }, index, arr) => {
    if (itemId === id) {
      arr[index]["checked"] = !checked;
    }
  });
  render();
}

function renderList(list, parent) {
  parent.innerHTML = "";
  list.forEach(({ title, checked, id }) => {
    const listItem = document.createElement("div");
    listItem.setAttribute("class", "list-item");
    listItem.setAttribute("key", id);

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    if (checked) {
      checkBox.setAttribute("checked", "checked");
    }

    checkBox.addEventListener("change", () => uncheckItem(id, list));

    const listTitle = document.createElement("h4");
    listTitle.innerText = title;
    listTitle.setAttribute("id", id);

    listItem.appendChild(checkBox);
    listItem.appendChild(listTitle);

    parent.appendChild(listItem);
  });
}

const allItemsRightBtn = document.querySelector("#all-right-btn");
allItemsRightBtn.addEventListener("click", moveAllItemsToRight);

const allItemsLeftBtn = document.querySelector("#all-left-btn");
allItemsLeftBtn.addEventListener("click", moveAllItemsToLeft);

const moveLeftBtn = document.querySelector("#left-btn");
moveLeftBtn.addEventListener("click", moveItemsLeft);

const moveRightBtn = document.querySelector("#right-btn");
moveRightBtn.addEventListener("click", moveItemsRight);

function render() {
  const firstBoxContainer = document.querySelector("#first-box");
  const secondBoxContainer = document.querySelector("#second-box");
  renderList(firstBoxList, firstBoxContainer);
  renderList(secondBoxList, secondBoxContainer);
}

render();
