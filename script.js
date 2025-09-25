let toDoInput=document.getElementById("input");
let list =document.querySelector("ul");
let localStoreToDo=[];

// Sayfa açıldığında kayıtlı görevleri yükle
document.addEventListener("DOMContentLoaded", () => {
    let savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
        localStoreToDo = JSON.parse(savedTodos);
        localStoreToDo.forEach(item => addTaskFromStorage(item.text, item.completed));
    }
});

function addTask(){

    if(toDoInput.value.trim()==="" || toDoInput.value===null ){
        toast("Boş yada hiçbirşey yazılmamış")
    }else{

    let li =document.createElement("li")
    li.classList.add("flex", "items-center","justify-between")

    let taskText = document.createElement("span");
    taskText.classList.add("bg-gray-200", "p-2", "my-2", "rounded", "hover:bg-gray-300","flex-1", "text-center")
    taskText.innerText = toDoInput.value;




//Tamamlandı butonu ve işlevi

    let completeBtn =document.createElement("button");
    completeBtn.classList.add("bg-green-500", "text-white","px-6", "py-3","rounded-lg","hover:bg-green-700","active:scale-95","transition","duration-200")
    completeBtn.innerText="Tamamlandı"
    completeBtn.addEventListener("click",function(){
            taskText.classList.toggle("line-through");
            taskText.classList.toggle("text-gray-500");

    })


//Silme butonu ve işlevi func olarak aşağıda silme özelliği vardır 

    let deleteBtn=document.createElement("button");
    deleteBtn.classList.add("bg-red-500", "text-white","px-6", "py-3","rounded-lg","hover:bg-red-700","active:scale-95","transition","duration-200")
    deleteBtn.innerText = "Siliniz";
    deleteBtn.addEventListener("click",function(){
        deleteTask(li,taskText)
    })



//inputa girlren değerlerin ul ye li olarak ataması
    
    li.appendChild(taskText);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
    

       // array ve localStorage'a ekle
    localStoreToDo.push({text: toDoInput.value, completed:false});
    localStorage.setItem("todos", JSON.stringify(localStoreToDo));


    toDoInput.value="";
        
    }
    
    
    
}




function deleteTask(li,a){
    li.remove();
    localStoreToDo=localStoreToDo.filter(t=> t.text!==a.innerText);
    localStorage.setItem("todos",JSON.stringify(localStoreToDo));
    
}



function toast (msg){
    let toastDiv =document.getElementById("toast-container");
    let toast =document.createElement("div")

    toast.innerText=msg;
    toastDiv.appendChild(toast);

    toast.classList.add(
        "bg-red-500", "text-white", "px-4", "py-2", "rounded-lg",
        "shadow-lg", "animate-fadeIn", "transition-all", "duration-300"
    );

    setTimeout(()=>{
        toast.remove();
    },3000)

}

function addTaskFromStorage(text,completed){

    let li =document.createElement("li")
    li.classList.add("flex", "items-center","justify-between")

    let taskText = document.createElement("span");
    taskText.classList.add("bg-gray-200", "p-2", "my-2", "rounded", "hover:bg-gray-300","flex-1", "text-center")
    taskText.innerText = text;
    if(completed){
        taskText.classList.toggle("line-through");
        taskText.classList.toggle("text-gray-500");
    }

    let completeBtn =document.createElement("button");
    completeBtn.classList.add("bg-green-500", "text-white","px-6", "py-3","rounded-lg","hover:bg-green-700","active:scale-95","transition","duration-200")
    completeBtn.innerText="Tamamlandı"
    completeBtn.addEventListener("click",function(){
            taskText.classList.toggle("line-through");
            taskText.classList.toggle("text-gray-500");
    })


    
//Silme butonu ve işlevi func olarak aşağıda silme özelliği vardır 

    let deleteBtn=document.createElement("button");
    deleteBtn.classList.add("bg-red-500", "text-white","px-6", "py-3","rounded-lg","hover:bg-red-700","active:scale-95","transition","duration-200")
    deleteBtn.innerText = "Siliniz";
    deleteBtn.addEventListener("click",function(){
        deleteTask(li,taskText)
    })


    

//inputa girlren değerlerin ul ye li olarak ataması
    
    li.appendChild(taskText);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);

}