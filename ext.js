function saveToCloudStorage(event){
    event.preventDefault();
    const ExpenseAmount=event.target.floatingInput.value;
    const Description=event.target.floatingText.value;
    const Category=event.target.floatingSelect.value;
    const obj={
        ExpenseAmount,
        Description,
        Category
    }
        axios.post("https://crudcrud.com/api/523147393698424285c278ac44daa062/appointmentdata",obj)
        .then((response)=>{
        showNewExpenseOnScreen(response.data)
        console.log(response);
        })
        .catch((err)=>{
        console.log(err)
        });
    //localStorage.setItem(obj.Description,JSON.stringify(obj));
    //showNewExpenseOnScreen(obj);
}
window.addEventListener("DOMContentLoaded",()=>{

       axios.get("https://crudcrud.com/api/523147393698424285c278ac44daa062/appointmentdata")
       .then((response)=>{
    console.log(response)
    for(var i=0;i<response.data.length;i++){
        showNewExpenseOnScreen(response.data[i])
    }
       })
       .catch((err)=>{
       console.log(err)
        })
    });

function showNewExpenseOnScreen(expense){
    document.getElementById("floatingText").value='';
    document.getElementById("floatingInput").value='';
    document.getElementById("floatingSelect").value='';
    const parentNode=document.getElementById("listOfExpense");
    const childHTML=`<li id="${expense._id}">${expense.ExpenseAmount}-${expense.Description}-${expense.Category} 
                            <button onClick=deleteExpense('${expense._id}')>DeleteExpense</button>
                            <button onClick=editExpense('${expense.Description}','${expense.ExpenseAmount}','${expense.Category}','${expense._id}')>EditExpense</button>
                      </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}
function deleteExpense(userId){

        axios.delete(`https://crudcrud.com/api/523147393698424285c278ac44daa062/appointmentdata/${userId}`)
        .then((response)=>{
        removeFromScreen(userId)
        console.log(response)
       })
      .catch((err)=>{
      console.log(err)
    })
}
function removeFromScreen(userId){
    const parentNode=document.getElementById("listOfExpense");
    const childToBeDel=document.getElementById(userId);
       parentNode.removeChild(childToBeDel);
}
function editExpense(description,ExpenseAmount,category,userId){
    document.getElementById("floatingText").value=description;
    document.getElementById("floatingInput").value=ExpenseAmount;
    document.getElementById("floatingSelect").value=category;
    deleteExpense(userId);

}