const addpopupText = document.querySelector('.addpopup-text');
const inputField = document.querySelector('[name=add-field]');
const inputButton = document.querySelector('.addItem-button');

const addedpopupText = document.querySelector('.addedpopup-text');
const list = document.querySelector('#all-item');
const clearAll = document.querySelector('.addedItem-button');

let input;

function showAction(element,text)
{
    element.textContent = text;
    element.classList.add('show');
    setTimeout(function()
    {
        element.classList.remove('show');
    },3000);
}

function createItem(input)
{
    var newItem = document.createElement('li');
    newItem.classList.add('item');
    newItem.innerHTML = `<p class="item-name">${input}</p>
                        <i class="far fa-trash-alt remove"></i>`;
    list.append(newItem);
    inputField.value = '';
    showAction(addpopupText,`${input} Has Been Added To The List.`);
}

function updateStorage(input)
{
    let groceryItem;
    groceryItem = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')) : [];
    groceryItem.push(input);
    localStorage.setItem('groceryList',JSON.stringify(groceryItem));
}

function addItem()
{
    input = inputField.value;
    if(input == '')
    {
        showAction(addpopupText,'Type A Grocery Item To Add');
    }
    else
    {
        createItem(input);
        updateStorage(input);
    }
}

function editStorage(item)
{
    let groceryItem = JSON.parse(localStorage.getItem('groceryList'));
    let index = groceryItem.indexOf(item);

    groceryItem.splice(index, 1);

    localStorage.removeItem('groceryList');
    localStorage.setItem('groceryList',JSON.stringify(groceryItem));
}

function removeItem(e)
{
    let bin = e.target;
    if(bin.classList.contains('remove'))
    {
        var text = e.target.previousElementSibling.textContent;
        var item = e.target.parentElement;

        list.removeChild(item);
        showAction(addedpopupText,`${text} Has Been Removed From The List`);
        editStorage(item);
    }
}


function removeAll()
{
    localStorage.removeItem('groceryList');
    let item = document.querySelectorAll('.item');
    if(item.length > 0)
    {
        item.forEach(items => list.removeChild(items));
        showAction(addedpopupText,'All The Items Has Been Removed From List.');
    }
    else
    {
        showAction(addedpopupText,'There Is No Item In The List To Remove.');
    }
}


function displayStorge()
{
    let store = localStorage.getItem('groceryList');
    if(store)
    {
        let storeItem = JSON.parse(store);
        storeItem.forEach( element => createItem(element));
    }
}

inputButton.addEventListener('click',addItem);
list.addEventListener('click',removeItem);
clearAll.addEventListener('click',removeAll);
document.addEventListener('DOMContentLoaded', displayStorge);