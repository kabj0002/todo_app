//To Do APP
// Todo-task’en skal være kompleks og objektet skal indeholde mindst disse properties:
// Task-string - hvad er det der skal gøres/købes
// Hvor mange - hvis det er et indkøb
// done - er indkøbet udført / er tasken done
// ID

// Der skal vedligeholdes en liste over de tasks der er done.
//(note: randomUUID(); Skal lave en unik ID til hver task)

// Din ToDo-app skal være i stand til at:
// Oprette en ny opgave med et unikt ID og en beskrivelse.
// Gemme mere end en simpel streng for hver opgave for at øge kompleksiteten.
// Dette kunne være kvantitet (antal) eller anden relevant information.
// Tillade brugerne at markere opgaver som "færdige", hvorefter de flyttes til en
// "Færdig"-liste.
// Tillade brugerne at fortryde færdiggørelsen af en opgave, så den ryger tilbage
// til "ToDo"-listen.
// Tillade brugerne at slette opgaver.

const toDoListQsl = document.querySelector(".to_do_list");
const completedListQsl = document.querySelector(".completed_list");
const newTaskInput = document.querySelector(".new_task_input"); // Input felt
const newTaskButton = document.querySelector(".new_task_button"); // Tilføj task-knap

// Hent eksisterende tasks fra localStorage eller opret et tomt array
let toDoArr = JSON.parse(localStorage.getItem("toDoList")) || [];

//const toDoArr = []; Udkommenterer når jeg lægger til loacalStorage
//   {
//     id: self.crypto.randomUUID(),
//     text: "Gåtur med lille Mona",
//     done: false,
//   },
//   {
//     id: self.crypto.randomUUID(),
//     text: "Ret opgaver",
//     done: false,
//   },
//   {
//     id: self.crypto.randomUUID(),
//     text: "Øv din skala",
//     done: false,
//   },
// ];

//Kalder funktionen for at vise den
filterAndSort();

//Local Storage function
function saveToLocalStorage() {
  localStorage.setItem("toDoList", JSON.stringify(toDoArr));
}

function filterAndSort() {
  const toDoTasks = toDoArr.filter((task) => !task.done);
  const completedTasks = toDoArr.filter((task) => task.done);

  //foretag filtreringer og sorteringer
  showToDo(toDoTasks, toDoListQsl);
  showToDo(completedTasks, completedListQsl);
}

function showToDo(listToShow, listContainer) {
  listContainer.innerHTML = ""; //Sørger for at den ikke henter hele array igen når man klikker på "mark as done" button

  listToShow.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML += `<div class="added_task"><input type="checkbox" class="mark_toggle_done" ${
      task.done ? "checked" : ""
    }><h3>${task.text}</h3><input type="number" value="${
      task.quantity
    }" class="input_number"><button class="delete_button">Delete task</button></div>`;

    li.classList.add(task.done ? "colorDone" : "colorTodo"); //ninja kode
    //Ovenstående er det samme som det nedenstående:
    // if (task.done) {
    //   li.classList.add("colorDone"); //true i array
    // } else {
    //   li.classList.add("colorTodo"); //false i array
    // }

    li.addEventListener("click", (event) => {
      const currentTarget = event.currentTarget;
      const target = event.target;
      //console.log("currentTarget", event.currentTarget);
      //console.log("target", target);
      if (target.classList.contains("mark_toggle_done")) {
        //console.log("JEG HAR KLIKKET PÅ Mark as done");
        task.done = !task.done;
        //Ovenstående (ninja kode) er det samme som nedenstående
        // if (task.done) {
        //   task.done = false;
        // } else {
        //   task.done = true;
        // }
        //console.log("toDoArr", toDoArr); //Viser array i consolen

        saveToLocalStorage(); // Gem ændringen i localStorage
        filterAndSort(); //Flytter task mellem listerne
      }
    });

    const numberInput = li.querySelector(".input_number");
    numberInput.addEventListener("input", (event) => {
      task.quantity = event.target.value; // Gemmer værdien i arrayet
      saveToLocalStorage(); // Gem ændringen i localStorage
    });

    // Delete button event listener
    li.querySelector(".delete_button").addEventListener("click", () => {
      deleteTask(task.id);
    });

    listContainer.appendChild(li);
  });
}

// Funktion til at slette en task fra arrayet
function deleteTask(taskId) {
  const index = toDoArr.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    toDoArr.splice(index, 1); // Fjern task fra arrayet
    saveToLocalStorage(); // Gem ændringen i localStorage
    filterAndSort(); // Opdater listerne
  }
}

// Funktion til at tilføje en ny task
function addNewTask() {
  const taskText = newTaskInput.value.trim(); // Henter inputværdien og fjerner mellemrum

  if (taskText === "") {
    alert("You have to write a to do!"); // Simpel validering
    return;
  }

  const newTask = {
    id: self.crypto.randomUUID(),
    text: taskText,
    done: false,
    quantity: 0, // Standardværdi
  };

  toDoArr.push(newTask); // Tilføjer til listen
  newTaskInput.value = ""; // Tøm inputfeltet
  saveToLocalStorage(); // Gem ændringen i localStorage
  filterAndSort(); // Opdaterer visningen
}

// Event listener til "Add new task" knappen
newTaskButton.addEventListener("click", addNewTask);

//Pointer move effect
document.addEventListener("mousemove", (event) => {
  let xProcent = (event.clientX / window.innerWidth) * 100;
  let yProcent = (event.clientY / window.innerHeight) * 100;

  document.body.style.setProperty("--lightness", `${xProcent}%`);
  document.body.style.setProperty("--saturation", `${yProcent}%`);
});
