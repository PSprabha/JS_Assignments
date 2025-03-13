
let totalIncome = 0;
let totalExpense = 0;
let balance = 0;

const addButton = document.getElementById("add");   //form
const currBalanceField = document.getElementById("curr_balance");   //current - balance
const totalIncomeField = document.getElementById("curr_income");    //total - income
const totalExpenseField = document.getElementById("curr_expense");  //total - expense

const historyTable = document.getElementById('history_data');   //history-table

addButton.addEventListener("submit", (event)=>{
        event.preventDefault();

        let amount = parseFloat(document.getElementById("famount").value);
        
        let desc = document.getElementById("fdescription").value.trim();
        if(amount>0){
            totalIncome+=amount;    
            balance+=amount;
            addTransaction(amount,"Income",desc);
        }
        else if(amount<0){
            totalExpense-=amount;
            balance+=amount;
            addTransaction(amount,"Expense",desc);
        }
        else{

        }
        updateData();
    }
);
function updateData(){
    totalIncomeField.textContent = "₹"+totalIncome.toFixed(2);
    totalExpenseField.textContent = "₹"+totalExpense.toFixed(2);
    currBalanceField.textContent = "₹"+balance.toFixed(2);
    document.getElementById("famount").value = '';
    document.getElementById("fdescription").value = '';
}
function addTransaction(amount, type, description){
    const row = document.createElement('tr');
    const color = amount > 0 ? "green" : "red";
    amount = amount < 0 ? -amount : amount;
    console.log(type);
    row.innerHTML = `
        <td>${getDate()}</td>
        <td>${description}</td>
        <td style="color: ${color};">${amount.toFixed(2)}</td>
        <td><button onclick="deleteTransaction(this, '${type}', ${amount})">Delete</button></td>
    `;
    historyTable.appendChild(row);
}
function deleteTransaction(button, type, amount){
    console.log(type);
    const row = button.parentElement.parentElement;
    row.remove();

    if (type === "Income") {
       balance -= amount;
       totalIncome -=amount;
    } else if (type === "Expense") {
        totalExpense -= amount;
        balance += amount;
    }
    updateData();
}

function getDate(){
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const formattedDate = `${dd}-${mm}-${yyyy}`;
    return formattedDate;
}