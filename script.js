document.addEventListener("DOMContentLoaded", function () {
  const course = document.getElementById("inputOne");
  const expense = document.getElementById("inputTwo");
  const btnOne = document.getElementById("first-btn");
  const total = document.getElementById("expense");

  let result = JSON.parse(localStorage.getItem("data")) || [];
  let totalExp = 0;
//save localstorage
  function saveSync() {
    localStorage.setItem("data", JSON.stringify(result));
  }
// button add the create and add
  btnOne.addEventListener("click", function () {
    const firstInput = course.value.trim().toLowerCase();
    const secondInput = Number(expense.value.trim());

    if (!firstInput || !secondInput || secondInput <= 0) {
      const message = document.createElement("p");
      message.textContent = "the fill is empty plz fill it or invalid entery";
      message.className = "msg";
      message.style.color = "red";
      message.style.fontWeight = "700";
      message.style.padding = "10px";
      total.appendChild(message);
      setTimeout(() => {
        message.remove();
      }, 3000);
      return;
    }
    const data = {
      id: Date.now(),
      one: firstInput,
      two: secondInput,
    };
    result.push(data);
    saveSync();
    console.log(result);
    course.value = "";
    expense.value = "";
    addExpense();
  });
// add expense one by one into the dom
  function addExpense() {
    totalExp = 0;
    total.innerHTML = "";
    if (result) {
      const list = document.createElement("div");
      list.id = "list";
      result.forEach((item) => {
        totalExp += item.two;
        list.innerHTML += `
      <article class="cards"> <span>event: ${item.one}</span>
       <span>expense: ${item.two}</span> <button data-id="${item.id}">delete</button></article>
      `;

        
      });
      total.appendChild(list);
      AddTotalExpense();
    }
  }
// show total expense in dom
  function AddTotalExpense() {
    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `
  <h2>Total Expenses:${totalExp}</h2>
  `;
    total.appendChild(totalDiv);
  }
// delete the item from dom
  total.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const id = Number(event.target.getAttribute("data-id"));
      console.log(id);

      result = result.filter((data) => data.id !== id);
      addExpense();
      saveSync();
    }
  });

  addExpense();
});
