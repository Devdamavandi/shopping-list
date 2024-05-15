
// Definitions
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter =document.getElementById('filter');
const clrBtn = document.querySelector('.btn-clear');
const formBtn = document.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

function onAddItemSubmit(e)  { 

    e.preventDefault();
    const newItem = itemInput.value;

    // Validate Input
    if ( newItem === '') {
        alert('please add an Item!');
        return;
    }

    // check edit mode
    if (isEditMode) {
        const itemToEdit = document.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else if (checkDuplicate(newItem)) {
        alert('Item already Exist!!');
        return;
    }

    // Create item DOM element
    addItemToDOM(newItem);

    // Add item to Local Storage
    addItemToStorage(newItem);
    
    checkUI();
    // Clear input field
    itemInput.value = '';
    
}



function createButton(classes) {
    const removeButton = document.createElement('button');
    removeButton.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    removeButton.appendChild(icon);
    return removeButton;
}

// creat an icon for the button
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
    checkUI();
}


function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
       removeItem(e.target.parentElement.parentElement);
    } else {
        checkDuplicate(e.target.parentElement.parentElement.value);
        setItemToEdit(e.target);
    }
}


function removeItem(item) {
        if (confirm('Are you Sure?')){
            // remove item from DOM
            item.remove();

            //remove item from storage
            removeItemFromStorage(item.textContent);
            checkUI();
        }
    }

    function removeItemFromStorage(item){
        let itemsFromStorage = getItemsFromStorage();

        // seperate items that should not be removed
        itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

        // Update Local Storage
        localStorage.setItem('items', JSON.stringify(itemsFromStorage));
    }


function removeAll() {
    if (confirm('Are you Sure?')){
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
            checkUI();
        }

    // remove from local storage
        localStorage.clear();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function searchItem(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    
    items.forEach((element) => {
        const itemName = element.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1){
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    })
}

// Creat item DOM element
function addItemToDOM(item) {
    const li = document.createElement('li');
    li.textContent = item;
   
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);
}


function addItemToStorage(item) {
    
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    // Add new item to array
    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function setItemToEdit(item) {
    
    isEditMode = true;

    itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');

    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}






// check UI function
function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clrBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clrBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = 'black';

    isEditMode = false;
}

function checkDuplicate(item) {
    const itemsFromStorage = getItemsFromStorage();
    if (itemsFromStorage.includes(item)) {
        return true;
    } else {
        return false;
    }
}

function init() {
    // Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clrBtn.addEventListener('click', removeAll);
itemFilter.addEventListener('input', searchItem);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();

}

init();
