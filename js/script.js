if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('service-worker.js');
}


let count = Number(window.localStorage.getItem("count"));
if (!count) {
    window.localStorage.setItem("count", "0");
}

function createNote(noteTitle, noteContent) {
    document.getElementById("no-notes").classList.add("hidden");

    let li = document.createElement("li");
    let a = document.createElement("a");
    let h2 = document.createElement("h2");
    let xButton = document.createElement("button");
    let p = document.createElement("p");

    xButton.classList.add("delete");

    let xText = document.createTextNode("X");
    let h2Text = document.createTextNode(noteTitle);
    let pText = document.createTextNode(noteContent);

    h2.appendChild(h2Text);
    p.appendChild(pText);
    xButton.appendChild(xText);

    a.appendChild(h2);
    a.appendChild(p);
    a.appendChild(xButton);
    a.setAttribute("href", "#");

    li.appendChild(a);

    document.getElementById("notes").appendChild(li);
}

function createNoteFromInput(e) {
    e.preventDefault();

    let noteTitle = document.getElementById("new-note-title").value;
    let noteContent = document.getElementById("new-note-content").value;

    document.getElementById("new-note-title").value = "";
    document.getElementById("new-note-content").value = "";
    
    count++;
    window.localStorage.setItem("count", count);

    while (window.localStorage.getItem(noteTitle)) {
      noteTitle +=  " -1";    
    }

    window.localStorage.setItem(noteTitle, noteContent);

    createNote(noteTitle, noteContent);
}

function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure you want to delete this note?")) {
            let li = e.target.parentElement.parentElement;
            let ul = document.getElementById("notes");

            ul.removeChild(li);
        }
    }
    
    count--;
    window.localStorage.setItem("count", count);
    window.localStorage.removeItem(e.target.previousElementSibling.innerText);

    if (count<1){
        document.getElementById("no-notes").className = "";
    }
}

for (i=0; i<count + 1; i++ ) {
    let noteTitle = window.localStorage.key(i);
    let noteContent = window.localStorage.getItem(noteTitle);

    if (noteTitle !== "count" && noteTitle){
        createNote(noteTitle, noteContent);
    }
}

document.getElementById("inputForm").addEventListener("submit", createNoteFromInput, false);
document.getElementById("notes").addEventListener("click", removeItem);


