var notesData = {
    titte: [],
    text: [],
    category: [],
    allNotes: 0
}

var noteIdData = [];

var notesCounter = (notesData.allNotes === 0) ? 0 : notesData.allNotes;
var noteID;

// Expand Create Note Area
document.getElementById('input-field').addEventListener('click', function (e) {
    var textField = document.getElementById('input-note');
    var navigationField = document.getElementById('nav-field');
    e.stopImmediatePropagation();

    textField.classList.remove('hide');
    navigationField.classList.remove('hide');
});

// Hide 'Create Note' Area function
document.getElementById('app-field').addEventListener('click', hideInputs);

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
        
        
        
        console.log(notesData);
        console.log(noteIdData);
    }
});

// Hide 'Create Note' Area
function hideInputs(e) {
    var textField = document.getElementById('input-note');
    var navigationField = document.getElementById('nav-field');

    textField.classList.add('hide');
    navigationField.classList.add('hide');

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
        notesCounter--;
        notesData.allNotes--;
        
        noteIdData.splice(noteIdData.indexOf(noteContainer.getAttribute('data-noteid')), 1);
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

        // Pointing to THIS note in edit section
        noteID = noteContainer.getAttribute('data-noteid');
    })

    hideInputs();
    // incrementing quantity of notes
    notesCounter++
    notesData.allNotes++
}

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
});
