var notesData = (localStorage.getItem('savedNotes')) ? JSON.parse(localStorage.getItem('savedNotes')) : {titte: [], text: [], category: []};

var noteIdData = [];
var notesCounter = 0;

// Just for identification what note is editing
var noteID;

renderNotes();
calendar();

document.getElementById('search').addEventListener('change', showCategories);

// Expand Create Note Area
document.getElementById('input-field').addEventListener('click', function (e) {
    e.stopPropagation();

    var textField = document.getElementById('input-note');
    var navigationField = document.getElementById('nav-field');

    textField.classList.remove('hide');
    navigationField.classList.remove('hide');
});

// Hide 'Create Note' Area function
document.getElementById('app-field').addEventListener('click', hideInputs);

// Increasing heigh of Text Input for beter readability
document.getElementById('input-note').addEventListener('keydown', function (e) {
    var inputNote = this;

    if (e.keyCode === 13) {
        inputNote.style.height = inputNote.offsetHeight + 10 + "px";
    }
});

// Adding new note
document.getElementById('add').addEventListener('click', function (e) {
    e.stopPropagation();

    var tittleValue = document.getElementById('note-tittle').value;
    var noteValue = document.getElementById('input-note').value;
    var categoryValue = document.getElementById('categories').value;

    if (tittleValue && noteValue || tittleValue) {
        noteIdData.push("n" + notesCounter);

        addNote(tittleValue, noteValue, categoryValue);

        notesData.titte.push(tittleValue);
        notesData.text.push(noteValue);
        notesData.category.push(categoryValue);

        saveNotes();
    }
});

// Adding changes to note - Editing 
document.getElementById('edit-add').addEventListener('click', function () {
    var editSection = document.getElementById('edit');
    var editTittle = document.getElementById('edit-note-tittle').value;
    var editNote = document.getElementById('edit-input-note').value;
    var editCategory = document.getElementById('edit-categories').value;

    var noteTittle = document.querySelector("div[data-noteid=" + noteID + ']').childNodes[0];
    var noteText = document.querySelector("div[data-noteid=" + noteID + ']').childNodes[1];
    var noteCategory = document.querySelector("div[data-noteid=" + noteID + ']');
    var editedNoteId = noteIdData.indexOf(noteCategory.getAttribute('data-noteid'));

    noteCategory.classList.remove(noteCategory.classList[1]);
    noteCategory.classList.add(editCategory);

    noteTittle.innerText = editTittle;
    noteText.innerText = editNote;

    notesData.titte[editedNoteId] = editTittle;
    notesData.text[editedNoteId] = editNote;
    notesData.category[editedNoteId] = editCategory;

    editSection.classList.add('hide');

    saveNotes();
});

// Hide Edit Section when you discard changes by clicking out of inputs
document.getElementById('edit').addEventListener('click', function(e) {    
    this.classList.add('hide');
});    
document.getElementById('edit-input-field').addEventListener('click', function(e){
    e.stopPropagation();
})


// Creating previous Notes List
function renderNotes() {
    if (notesData.category.length) {
        for (a = 0; a < notesData.category.length; a++) {
            noteIdData.push("n" + notesCounter);
            addNote(notesData.titte[a], notesData.text[a], notesData.category[a]);

        }
    }
}

// Save all Notes Data to local storage as a JSON File
function saveNotes() {
    localStorage.setItem('savedNotes', JSON.stringify(notesData));
}

// Hide 'Create Note' Area
function hideInputs() {
    var textField = document.getElementById('input-note');
    var navigationField = document.getElementById('nav-field');

    textField.classList.add('hide');
    navigationField.classList.add('hide');
    
    // reset input height
    textField.style.height = 40 + 'px';
}

// Function to add new note and start to edit and remove
function addNote(tittleValue, noteValue, category) {
    var noteSection = document.getElementsByClassName('note-section')[0];
    var noteContainer = document.createElement('div');
    noteContainer.className = 'note' + ' ' + category;
    // Seting attribute to identife every note
    noteContainer.setAttribute('data-noteid', 'n' + notesCounter);
    noteContainer.style.order = (notesCounter === "0") ? 0 : "-" + notesCounter;

    var noteHeader = document.createElement('div');
    noteHeader.classList.add('note-header');
    noteHeader.innerText = tittleValue;

    var noteText = document.createElement('div');
    noteText.classList.add('note-text');
    noteText.innerText = noteValue;

    var editButton = document.createElement('i');
    editButton.className = "far fa-edit";

    var removeButton = document.createElement('i');
    removeButton.className = "fas fa-trash";

    noteSection.appendChild(noteContainer);
    noteContainer.appendChild(noteHeader);
    noteContainer.appendChild(noteText);
    noteContainer.appendChild(editButton);
    noteContainer.appendChild(removeButton);

    // Clear inputs after creating
    document.getElementById('note-tittle').value = "";
    document.getElementById('input-note').value = "";

    // Reset Height of note Input
    document.getElementById('input-note').style.height = 40 + "px";

    // Remove created note
    removeButton.addEventListener('click', function () {
        noteSection.removeChild(noteContainer);

        notesData.titte.splice(notesData.titte.indexOf(tittleValue), 1);
        notesData.text.splice(notesData.text.indexOf(noteValue), 1);
        notesData.category.splice(notesData.category.indexOf(category), 1);

        noteIdData.splice(noteIdData.indexOf(noteContainer.getAttribute('data-noteid')), 1);
        notesCounter = getLastNote();
        saveNotes();
        showCategories();
    })

    // Adding edit to note
    editButton.addEventListener('click', function () {
        var editSection = document.getElementById('edit');
        var editTittle = document.getElementById('edit-note-tittle');
        var editNote = document.getElementById('edit-input-note');
        var editCategory = document.getElementById('edit-categories');

        editSection.classList.remove('hide');
        editTittle.value = noteHeader.innerText;
        editNote.value = noteText.innerText;
        editCategory.value = noteContainer.classList[1];

        showCategories();
        
        // Pointing to THIS note in edit section
        noteID = noteContainer.getAttribute('data-noteid');
    })

    hideInputs();
    showCategories();
    // incrementing quantity of notes
    notesCounter++
}

// See what is the ID Number of last created note
function getLastNote() {
    var lastNote = (noteIdData.length) ? noteIdData[noteIdData.length - 1].split('') : [0];
    var lastChar = parseInt(lastNote[lastNote.length - 1]) + 1;

    return lastChar
}

function showCategories() {
    var selectedCategory = document.getElementById('search').value;
    var allNotes = document.querySelector('.note-section').children;
    var general = document.querySelectorAll('.general');
    var private = document.querySelectorAll('.private');
    var work = document.querySelectorAll('.work');

    if (selectedCategory === 'all') {
        for (i = 0; i < allNotes.length; i++) {
            allNotes[i].classList.remove('hide');
        }
    } else if (selectedCategory === 'general') {
        for (i = 0; i < allNotes.length; i++) {
            allNotes[i].classList.add('hide');
        }
        for (j = 0; j < general.length; j++) {
            general[j].classList.remove('hide');
        }
    } else if (selectedCategory === 'private') {
        for (i = 0; i < allNotes.length; i++) {
            allNotes[i].classList.add('hide');
        }
        for (j = 0; j < private.length; j++) {
            private[j].classList.remove('hide');
        }
    } else if (selectedCategory === 'work') {
        for (i = 0; i < allNotes.length; i++) {
            allNotes[i].classList.add('hide');
        }
        for (j = 0; j < work.length; j++) {
            work[j].classList.remove('hide');
        }
    }
}

function calendar() {
    var d = new Date()
    var taskData = document.getElementById('date');
    var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    taskData.innerText = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
}