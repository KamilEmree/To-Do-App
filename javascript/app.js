const html = document.querySelector('html');
const Card = document.getElementById('Card');
const HeaderSection = document.getElementById('Header-section');
const ModeDark = document.getElementById('Mode-Dark');
const ModeLight = document.getElementById('Mode-Light');
const Taskİtem = document.getElementsByClassName('Task-İtem');
const AddİtemToList = document.getElementById('AddİtemToList');
const TaskList = document.getElementById('TaskList');
const İconTheClear = document.getElementById('Clear');


function ChangeDark() {
    ModeDark.style.display = 'none';
    html.style.backgroundColor = '#0a0908'
    Card.style.backgroundColor = '#c6ac8f';
    HeaderSection.style.backgroundColor = '#22333b';
    TaskList.scrollLeft.backgroundColor = '#c6ac8f'
    ModeLight.style.display = 'block';
}

function ChangeLight() {
    ModeLight.style.display = 'none';
    html.style.backgroundColor = '#264653'
    Card.style.backgroundColor = '#FFF';
    HeaderSection.style.backgroundColor = '#E76F51';
    ModeDark.style.display = 'block';
}

let Data;
LoadTheList();

function SubmitTheİtem() {
    if(AddİtemToList.value === '' || AddİtemToList.value.trim() === '') {
        alert('Please add new task!');
        AddİtemToList.value =  AddİtemToList.value.trim('');
        return false;
    }
    if(AddİtemToList.value.length > 51) {
        alert('You reached the letter limit')
        AddİtemToList.value = '';
        return false;
    }
    SetTheLocalS(AddİtemToList.value);
}

function Createİtems(Text) {
    const Li = document.createElement('li');
    const Span = document.createElement('span');
    Li.className = 'Task-İtem';
    Li.innerText = Text;
    Span.id = 'Clear';
    Span.className = 'material-icons';
    Span.innerText = 'clear';
    TaskList.appendChild(Li);
    Li.appendChild(Span);
    Span.onclick = (event) => {
        event.target.parentElement.remove();
        const Text = event.target.parentElement.textContent.replace('clear','');
        DeleteToLocalS(Text);
    }
    Li.onmouseover = () => {
        Span.style.display = 'block'; 
    }
    Li.onmouseleave = () => {
        Span.style.display = 'none'; 
    }
    AddİtemToList.value = '';
}

function LoadTheList() {
    Data = GetTheLocalS();
    Data.forEach(element => {
        Createİtems(element);
    });
}

function GetTheLocalS() {
    if(localStorage.getItem('Data') === null) {
        Data = [];
    } else {
        Data = JSON.parse(localStorage.getItem('Data',Data));
    }
    return Data;
}

function SetTheLocalS(Text) {
    Data = GetTheLocalS();
    Data.push(Text);
    localStorage.setItem('Data',JSON.stringify(Data));
    Createİtems(Text);
}

function DeleteToLocalS(Text) {
    Data.forEach((element,index) => {
        if(element === Text) {
            Data.splice(index, 1);
        }
    })
    
    localStorage.setItem('Data',JSON.stringify(Data))
}