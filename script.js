document.addEventListener("DOMContentLoaded", function() {
    // Znajdź elementy formularza i listy
    var currentInput = document.getElementById("current");
    var taskDeadline = document.getElementById("taskDeadline");
    var taskList = document.getElementById("taskList");
    var saveButton = document.getElementById("saveButton");

    try {
        document.getElementById("taskList").innerHTML=localStorage.getItem("TODOList");
        delButtons = document.getElementsByClassName("dButton");
        for (const delButton of delButtons) {
            delButton.onclick = deleteElement;
        }
        textFields = document.getElementsByClassName("textF");
        for (const textField of textFields) {
            textField.addEventListener("keyup",save);
        }
        loadDate();
    }
    catch(error){

    }

    // Funkcja do dodawania nowego zadania do listy
    function addTask() {
        var taskText = currentInput.value;
        var taskDeadlineValue = taskDeadline.value;

        // Tworzenie nowego elementu listy
        var newTask = document.createElement("li");
        newTask.className = "listItem";
        var textField = document.createElement("a");
        textField.textContent = taskText;
        textField.contentEditable=true;
        textField.className = "textF";
        newTask.appendChild(textField);
        //newTask.textContent = taskText ;
        
        // Walidacja nowych zadań
        if (taskText.length >= 3 && taskText.length <= 255) {
            // Walidacja daty
            if (taskDeadlineValue === "" || new Date(taskDeadlineValue) >= new Date().setHours(0,0,0,0)) {
                var dateField= document.createElement("input");
                dateField.type="date";
                dateField.value = taskDeadline.value;
                dateField.alt = taskDeadline.value;
                dateField.className = "dateF";
                dateField.addEventListener("change", save);
                newTask.appendChild(dateField);
                
                var deleteButton = document.createElement("button");
                deleteButton.textContent = "X";
                newTask.appendChild(deleteButton);
                
                taskList.appendChild(newTask);
                currentInput.value = "";
                taskDeadline.value = "";
                deleteButton.className = "dButton";
                deleteButton.onclick = deleteElement;
                newTask.addEventListener("keyup",save);

                
            } 
        } 
        
        localStorage.setItem("TODOList", document.getElementById("taskList").innerHTML);
        console.log(localStorage.getItem("TODOList"));
    }

    // Dodaj obsługę kliknięcia przycisku "zapisz"
    saveButton.addEventListener("click", addTask);

    function search() {
        var input, ul, li, a, i, txtValue;
        var searchInput = document.getElementById("search");
        input = searchInput.value.toUpperCase(); // tekst pola wyszukania
        ul = taskList;
        li = ul.getElementsByTagName('li');
        if(input.length>1){
            for (i = 0; i < li.length; i++) {
                a = li[i].children[0];
                console.log(a);
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(input) > -1) {
                    li[i].style.display = ""; // Pokaż element
                    var ob=new Mark(li[i]);
                    ob.unmark();
                    ob.mark(
                        input,
                        { className: 'amark'} 
                    )
                } else {
                    li[i].style.display = "none"; // Ukryj element
                }
            }
        }
        else {
            for (i = 0; i < li.length; i++) {
                a = li[i];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(input) > -1) {
                    li[i].style.display = ""; // Pokaż element
                    var ob=new Mark(li[i]);
                    ob.unmark();
                }
            } 

        }
    }

    var searchInput = document.getElementById("search");
    searchInput.addEventListener("keyup", search);

    function deleteElement() {
        var listItem = this.parentElement;
        taskList.removeChild(listItem);   
        localStorage.setItem("TODOList", document.getElementById("taskList").innerHTML);
        
    }
    function save(){
        dateFields = document.getElementsByClassName("dateF");
        for (const dateField of dateFields) {
            dateField.alt = dateField.value;
        }
        localStorage.setItem("TODOList", document.getElementById("taskList").innerHTML);
    }

    function loadDate(){
        dateFields = document.getElementsByClassName("dateF");
        for (const dateField of dateFields) {
            dateField.value = dateField.alt;
            dateField.addEventListener("change", save);
        }
    }

});
