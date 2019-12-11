let incomesID = 1;
let outcomesID = 1;
let sumPlus = 0;
let sumMinus = 0;
const incomes = [];
const outcomes = [];

// const incomes = [
//   { description: "salary 1", amount: 26000, id: 1 },
//   { description: "salary 2", amount: 12000, id: 2 }
// ];
// const outcomes = [
//   { description: "coffee", amount: 400, id: 1 },
//   { description: "fuel", amount: 1000, id: 2 }
// ];



function handleGetIncomes() {
  return incomes
}

function handleGetOutcomes() {
  return outcomes
}


function handleDelete(req, res) {
  console.log(req.body)
  if (req.body.type === 'incomes') {
    deleteOne(req.params.id * 1, incomes, 1);

  }
  else {
    deleteOne(req.params.id * 1, outcomes, 0)
  }
};

function deleteOne(id, arr, type) {
  let index = arr.map(x => { return x.id }).indexOf(id);
  if (type === 1) {
    sumPlus = sumPlus - incomes[index].amount * 1;
    arr.splice(index, 1)
  }
  else {
    sumMinus = sumMinus - outcomes[index].amount * 1
    arr.splice(index, 1)
  }
}

function handleCreate(req, res) {
  const newIncome = {
    description: req.body.description,
    amount: req.body.amount,
  };

  switch (req.body.currentOperator) {
    case '+':
      sumPlus += (req.body.amount * 1);
      newIncome.id = incomesID
      incomesID++
      incomes.push(newIncome);;
      res.send(incomes)
      break;

    case '-':
      sumMinus += (req.body.amount * 1);
      newIncome.id = outcomesID;
      outcomesID++
      outcomes.push(newIncome);
      res.send(outcomes);
      break;
  }

};

function getBalance() {
  return {
    sumPlus: sumPlus,
    sumMinus: sumMinus
  };
}

module.exports.getBalance = getBalance;
module.exports.handleGetIncomes = handleGetIncomes;
module.exports.handleGetOutcomes = handleGetOutcomes;
module.exports.handleDelete = handleDelete;
module.exports.handleCreate = handleCreate;



// var incoms = {
//   handleGet: function (array, req, res) {
//     {
//       if (req.query.description == undefined) {
//         // got /incomes
//         res.send(array);
//       } else {
//         // got e.g. /incomes?description=salary 1
//         // -- got query string -> req.query.description
//         const item = array.find(
//           it => it.description == req.query.description
//         );
//         if (item == undefined) {
//           res.sendStatus(404);
//         } else {
//           res.send(item);
//         }
//       }
//     }
//   },
//   handleDelete: function (array, req, res) {
//     const index = array.findIndex(it => it.id == req.params.id);
//     if (index == -1) {
//       res.sendStatus(404);
//     } else {
//       array.splice(index, 1);
//       res.sendStatus(200)
//     }
//   }
// }
