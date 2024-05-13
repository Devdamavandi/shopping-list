

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e)  { 
    e.preventDefault();
    const newItem = itemInput.value;

    // Validate Input
    if ( newItem === '' || iSpace()) {
        alert('please add an Item!');
        return;
    }

    // Create List Item
    const li = document.createElement('li');
    li.textContent = newItem;
   

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);

    // Clear input field
    itemInput.value = '';

    console.log(li,itemList);
    
}

function iSpace(e) {
    if (e.KeyCode === 32) {
        console.warn('Empty space cannot be Added!');
    }
}




// create button
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


// Event Listeners
itemForm.addEventListener('submit', addItem);