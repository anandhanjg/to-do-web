

var tasks=[];

function Task(data,createdAt){
    this.id=Date.now();
    this.data=data;
    this.createdAt=createdAt || Date.now();
    this.deleted=false;
}

function addData(e){
    e.preventDefault();
    let input=document.querySelector('#input-text');
    if(!input.value){
        return alert("Please Give Some Value");
    }
    tasks.push(new Task(input.value));
    e.target.reset();
    appendData(tasks[tasks.length-1]);
}


function appendData(task){
    let div=document.createElement('div');
    div.id="div-"+task.id;
    div.className="task-div"
    div.ondblclick=deleteCrossedData;
    div.innerHTML=`
        <p class="task-data" id="task-data-${task.id}">${task.data}</p>
        <button class="task-delete" id="btn-task-${task.id}" onclick="deleteData(this);">Delete</button>
    `;

    if(listDiv.children[0] && listDiv.children[0].tagName=='SPAN'){
        listDiv.innerHTML="";
        listDiv.style.justifyContent="start";
    }
    listDiv.appendChild(div);
}


// setInterval(()=>{
//     console.table(tasks);
// },1000);

function deleteData(e){
    console.log(e);
    let id=e.id.replace("btn-task-","");
    tasks.forEach(task=>{
        if(task.id==id){
            task.deleted=true;
        }
    });

    let div=document.querySelector(`#task-data-${id}`);
    div.style.textDecoration="line-through";
    e.disabled=true;
    e.style.display="none";
}

function deleteCrossedData(e){
        let id,div;
        if(e.target.tagName=='DIV' && e.target.children[0].style.textDecoration=='line-through'){
            // e.target.style.visibility='hidden'
            div=e.target
            id=div.id.replace("div-","");
            div.parentElement.removeChild(e.target);  
        }else if(e.target.tagName=='P' && e.target.style.textDecoration=='line-through'){
            div=e.target.parentElement;
            // div.style.visibility='hidden';
            id=e.target.id.replace("task-data-",""); 
            div.parentElement.removeChild(div);
        }

        console.log(div);
        if(div){
            div=document.querySelector(".task-list");
            console.log(div);
            if(div.children.length==0){
                div.innerHTML=`<span>No Task is there.</span>`
                div.style.justifyContent="center";
            }
        }
        if(id){
            tasks=tasks.filter(task=>task.id!=id);
        }
    
}


var listDiv=document.querySelector('.task-list');
document.querySelector('#input-form').addEventListener('submit',addData);

