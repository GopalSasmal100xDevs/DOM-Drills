let firstBoxList = [
  { title: "JS", checked: true, id: 123123 },
  { title: "HTML", checked: false, id: 123124 },
  { title: "CSS", checked: true, id: 123125 },
  { title: "TS", checked: true, id: 122125 },
];
let secondBoxList = [
  { title: "React", checked: false, id: 1231123 },
  { title: "Angular", checked: false, id: 1232124 },
  { title: "Vue", checked: false, id: 1232125 },
  { title: "Svelte", checked: false, id: 193125 },
];

const itemCount = { item1: 2, item2: 0 };

function moveAllItemsToRight() {
  secondBoxList = [...secondBoxList, ...firstBoxList];
  uncheckAllItems(secondBoxList);
  firstBoxList = [];
  render();
}

function moveAllItemsToLeft() {
  firstBoxList = [...firstBoxList, ...secondBoxList];
  uncheckAllItems(firstBoxList);
  secondBoxList = [];
  render();
}

function uncheckAllItems(list) {
  list.forEach((_, index, arr) => {
    arr[index]["checked"] = false;
  });
}

function moveItemsLeft() {
  const selectedItems = secondBoxList.filter(({ checked }) => checked === true);
  firstBoxList = [...firstBoxList, ...selectedItems];
  secondBoxList = secondBoxList.filter(({ checked }) => checked === false);
  uncheckAllItems(firstBoxList);
  render();
}

function moveItemsRight() {
  const selectedItems = firstBoxList.filter(({ checked }) => checked === true);
  secondBoxList = [...secondBoxList, ...selectedItems];
  firstBoxList = firstBoxList.filter(({ checked }) => checked === false);
  uncheckAllItems(secondBoxList);
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
  disableButton();
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
  checkboxCount(firstBoxList, secondBoxList); // counting active checked items
  renderList(firstBoxList, firstBoxContainer);
  renderList(secondBoxList, secondBoxContainer);
}

function checkboxCount(list1, list2) {
  itemCount["item1"] = 0;
  itemCount["item2"] = 0;

  list1.forEach(({ checked }) => {
    if (checked) itemCount["item1"] += 1;
  });

  list2.forEach(({ checked }) => {
    if (checked) itemCount["item2"] += 1;
  });
}

function disableButton() {
  if (firstBoxList.length === 0) {
    allItemsRightBtn.setAttribute("disabled", "disabled");
  } else {
    allItemsRightBtn.removeAttribute("disabled");
  }

  if (secondBoxList.length === 0) {
    allItemsLeftBtn.setAttribute("disabled", "disabled");
  } else {
    allItemsLeftBtn.removeAttribute("disabled");
  }

  if (itemCount["item1"] === 0) {
    moveRightBtn.setAttribute("disabled", "disabled");
  } else {
    moveRightBtn.removeAttribute("disabled");
  }

  if (itemCount["item2"] === 0) {
    moveLeftBtn.setAttribute("disabled", "disabled");
  } else {
    moveLeftBtn.removeAttribute("disabled");
  }
}

render();
