let myhtml;
//-- פונקציית תאריך
(function () {
  let now = new Date();
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let month = now.getMonth();
  let year = now.getFullYear();
  document.getElementById("date").innerHTML = months[month] + ' ' + year;
}());

//-- פונקציית מחיקה

function deleteById(ev, id) {
  let type = ev.parentElement.parentElement.parentElement.parentElement.parentElement.id
  const url = `/dell/${id}`;
  axios.delete(url, {
    data: {
      type: type
    }
  }).then(() => {
    getIncomesAndOutcomes();

  })
}



function createIncome() {
  // ---לקיחת ערכים מהדום
  const description = document.getElementById("input_description").value;
  const amount = document.getElementById("input_amount").value;
//-- איפוס שדות חיפוש
  const Reset_input_description = document.getElementById("input_description").value = ''
  const Reset_input_amount = document.getElementById("input_amount").value = ''
//-- בחירת פוס או מינוס
  const currentOperator = document.getElementById("plus_minus_select").value;
//-- פונקציית בדיקת שהשדות קלט מלאים
  if (amount > 0 && description != '') {

    //--יציירת הפונקציה על גבי הדום ומחיקת שדו קלט
    axios.post("/incomes", {
      description: description,
      amount: amount,
      currentOperator: currentOperator,
      Reset_input_description: Reset_input_description,
      Reset_input_amount: Reset_input_amount,
    })
      .then(function (response) {
        getIncomesAndOutcomes();
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // --- call the server using post

  }
}

getIncomesAndOutcomes();
function getIncomesAndOutcomes() {
  getIncomes()
  getoutcomes()
  getBalance()
}

function getBalance() {
  axios.get("/balance")
    .then((response) => {
      document.getElementById('balance').innerHTML = `
      <div>
        <h4>${response.data.sumPlus - response.data.sumMinus}</h4>
        <span> - ${response.data.sumMinus}<b> -הוצאות</b></span><br />
        <span> + ${response.data.sumPlus}<b> -הכנסות</b></span>

      </div>
      `
    });
}

function getIncomes() {
  axios.get("/incomes").then((response) => {
    console.log(response)
    draw(response.data, 1)
  });
}

function getoutcomes() {
  axios.get("/outcomes").then((response) => {
    console.log(response)
    draw(response.data, 0)
  });
}

function draw(data, type) {
  myhtml =
  
    `
  <table>
    <tr>
      <th>Descreption</th>
      <th>Amount</th>
      <th>ID</th>
      <th></th>
    </tr>`
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    myhtml += `
    <tr>  
      <td>
        <span>${element.description}</span>
      </td>
      <td>
        <span>${element.amount}</span>
      </td>     
      <td>
        <span> ${element.id}</span>
      </td>     
      <td>
        <button onclick="deleteById(this, ${element.id})">Delete</button>
      </td>
    </tr>`
  }
  myhtml += `</table>`
  if (type === 1) {
    let incomes = document.getElementById("incomes");
    incomes.innerHTML = myhtml;
  }
  else if (type === 0) {
    let outcomes = document.getElementById("outcomes");
    outcomes.innerHTML = myhtml;
  }

}
document.getElementById("plus").style.color = "green";
document.getElementById("minus").style.color = "red";

function changeColor(selectTag) {
  if (selectTag.value == '+') {
    selectTag.style.color = "green"
    document.getElementById("plus").style.color = "green";
  }
  else {
    selectTag.style.color = "red"
    document.getElementById("minus").style.color = "red";
  }

}

