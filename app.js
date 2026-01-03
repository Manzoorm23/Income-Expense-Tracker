
let data = JSON.parse(localStorage.getItem("data")) || [];
let editIndex = null;

const list = document.getElementById("list");

function update(){
  let balance=0,cash=0,account=0;
  list.innerHTML="";
  data.forEach((t,i)=>{
    const li=document.createElement("li");
    li.innerHTML=`
      <b>${t.type.toUpperCase()}</b> ₹${t.amount}<br>
      ${t.category} | ${t.date} | ${t.mode}<br>
      ${t.note || ""}
      <div class="actions">
        <button class="edit" onclick="editTxn(${i})">Edit</button>
        <button class="delete" onclick="deleteTxn(${i})">Delete</button>
      </div>
    `;
    list.appendChild(li);

    if(t.type==="income"){
      balance+=t.amount;
      t.mode==="cash"?cash+=t.amount:account+=t.amount;
    }else{
      balance-=t.amount;
      t.mode==="cash"?cash-=t.amount:account-=t.amount;
    }
  });
  document.getElementById("balance").innerText="₹"+balance;
  document.getElementById("cash").innerText=cash;
  document.getElementById("account").innerText=account;
  localStorage.setItem("data",JSON.stringify(data));
}

function deleteTxn(i){
  if(confirm("Delete this transaction?")){
    data.splice(i,1);
    update();
  }
}

function editTxn(i){
  const t=data[i];
  type.value=t.type;
  amount.value=t.amount;
  category.value=t.category;
  date.value=t.date;
  mode.value=t.mode;
  note.value=t.note;
  editIndex=i;
}

document.getElementById("form").addEventListener("submit",e=>{
  e.preventDefault();
  const txn={
    type:type.value,
    amount:+amount.value,
    category:category.value,
    date:date.value,
    mode:mode.value,
    note:note.value
  };
  if(editIndex!==null){
    data[editIndex]=txn;
    editIndex=null;
  }else{
    data.push(txn);
  }
  e.target.reset();
  update();
});

update();
