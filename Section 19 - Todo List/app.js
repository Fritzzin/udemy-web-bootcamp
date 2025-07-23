let todo = [];

input = prompt("Pick an option:");
while (input !== "quit") {
  let invalidOption = false;
  switch (input) {
    case "new":
      let entry = prompt("Enter new entry:");
      if (entry !== "quit") {
        todo.push(entry);
        invalidOption = false;
      }
      break;
    case "list":
      console.log("######");
      for (let i = 0; i < todo.length; i++) {
        console.log(`${i} - ${todo[i]}`);
      }
      console.log("######");
      break;
    case "delete":
      let idToDelete = prompt("Enter id of the entry you wish to delete:");
      if (idToDelete !== "quit") {
        if (todo[idToDelete] === undefined) {
          console.log("Please enter a valid id!");
        } else {
          todo.splice(idToDelete, 1);
        }
      }
      break;
    default:
      invalidOption = true;
      break;
  }

  if (invalidOption) {
    input = prompt("Pick a valid option:");
  } else {
    input = prompt("Pick an option:");
  }
}
console.log("Quitting");
