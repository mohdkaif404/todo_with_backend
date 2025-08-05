
let submit=document.querySelector('form')
let box=document.getElementsByClassName('color');
let task_container=document.getElementsByClassName('task-container')[0];
let wall=document.getElementsByClassName('walle')[0];
let get_color=`bg-emerald-200`;
const themeMode=document.getElementsByClassName('theme-mode')[0];
let flag=document.getElementsByClassName('active-theme')[0];
let validationErrors=document.getElementsByClassName('errors')[0];
let isloggedin=false;
const loggedIn=async()=>{
    const obj=await fetch('/auth');
    const objson=await obj.json();
    isloggedin=objson.isloggedin;
   
}
if(validationErrors){
    validationErrors.addEventListener('click',(e)=>{
        if(e.target.classList.contains('close-form')){
            e.target.parentElement.remove();
        }
    })
}
// function menu_helper(s,el){
//     let active=document.getElementsByClassName(s)[0];
//     active.classList.remove(s);
//     active.classList.add('hidden');
//     active=document.getElementsByClassName(`${el}`)[0];
//     active.classList.remove('hidden');
//     active.classList.add(s);
// }

document.getElementsByClassName('menu')[0].addEventListener('click',(e)=>{
    if(e.target.classList.contains('add-box')){
        task_container.classList.toggle('display-form')
    }
})
wall.addEventListener('click',(e)=>{
    if(e.target.classList.contains('add-task')) task_container.classList.toggle('display-form');
    else if(e.target.classList.contains('note-close')){
        
        if(localStorage.getItem(`${e.target.parentElement.id}`)) localStorage.removeItem(`${e.target.parentElement.id}`);
        else{
            fetch('/delete-todo',{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({id:e.target.parentElement.id})
            })
        }
        e.target.parentElement.remove();
    }
    
})

task_container.addEventListener('click',(e)=>{ // event delegation 
    if(e.target.classList.contains('remove-button')) e.target.parentElement.remove();

    else if(e.target.classList.contains('close-form')) task_container.classList.toggle('display-form');

    else if(e.target.classList.contains('add-button')){
        let bullets=document.getElementById('desc');
        let bullet_wrapper=document.getElementsByClassName('bullets-wrap')[0];
        bullet_wrapper.insertAdjacentHTML('afterbegin',`<div class="added-bullets flex items-center justify-between p-4 mt-3"><p>${bullets.value}</p><div class="remove-button bg-[#dc3545] text-white hover:bg-red-600 px-2 py-2 text-sm rounded-xl cursor-pointer">Remove</div>`);
        
    }

})
document.getElementsByClassName('submit')[0].addEventListener('click',(e)=>{
    const id=Math.random()*100;
    const heading=document.getElementById('head').value;
    const selected = document.querySelector('input[name="priority"]:checked').value;
    let local_obj={heading:heading,bullets:[],color:get_color,priority:selected};
    let notes=document.getElementsByClassName(`${selected}`)[0];
    let bullet=document.getElementsByClassName('added-bullets');
    
    if(notes){
        notes.lastElementChild.insertAdjacentHTML('afterbegin',`<div class="note ${get_color}" id=${id}><i class="note-close fa-solid fa-xmark p-2 mt-1 ml-1 hover:bg-white"></i><p class="task-head ml-1 text-4xl">${heading}</p><ul class="bullets-${selected} list-disc flex flex-col ml-7 p-2 items-start text-base"></ul></div>`)
    }

    Array.from(bullet).forEach((val)=>{
        local_obj.bullets.push(`<li>${val.firstElementChild.textContent}</li>`);
        if(notes){
            let li=document.createElement('li');
            li.innerText=val.firstElementChild.textContent;
            document.getElementsByClassName(`bullets-${selected}`)[0].appendChild(li);
        }       
        task_container.classList.toggle('display-form');
    });
    
    if(!isloggedin) localStorage.setItem(`${id}`,JSON.stringify(local_obj));
    else{
        fetch('/add-todo',{
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                title:local_obj.heading,
                subtasks:local_obj.bullets,
                color:local_obj.color,
                priority:local_obj.priority
            })
        })
    }
    
})

Array.from(box).forEach(element => {
    element.addEventListener('click',(e)=>{
        let active=document.getElementsByClassName('active')[0];
        active.classList.remove('active');
        element.firstElementChild.classList.toggle('active');
        element.classList.forEach((cls)=>{
            if(cls.startsWith('bg-')){
                get_color=cls;
                console.log(get_color);
            }
        })
        
    })
});

window.addEventListener('DOMContentLoaded',(e)=>{
    let theme=localStorage.getItem('thememode');
    if(theme==0){
        console.log('in')
        flag.classList.remove('fa-sun');
        flag.classList.add('fa-moon');
        document.body.classList.toggle('dark-theme');
    }
    if(localStorage.length){
        for(let i=0; i<localStorage.length; i++){
            const key=localStorage.key(i);
            let item=JSON.parse(localStorage.getItem(key)); let prior=item.priority;;
            if(prior) prior=prior.toLowerCase();
            let list=document.getElementsByClassName(`${prior}`)[0];
            if(list){
                let arr=[];
                for(let i of item.bullets){
                    arr.push(`<li>${i}</li>`);
                }
            list.lastElementChild.insertAdjacentHTML('afterbegin',`<div  class="note ${item.color}" id=${key}><i class="note-close fa-solid fa-xmark p-2 mt-1 ml-1 hover:bg-white"></i><p class="task-head ml-1 text-3x">${item.heading}</p><ul class="bullets list-disc flex flex-col ml-7 pt-2 items-start text-base">${item.bullets.join(' ')}</ul></div>`)
            }
        }
    }
})
themeMode.addEventListener('click',(e)=>{
   if(flag.classList.contains('fa-sun')){
    flag.classList.remove('fa-sun');
    flag.classList.add('fa-moon');
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('thememode',0);
   }else{
    flag.classList.remove('fa-moon');
    flag.classList.add('fa-sun');
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('thememode',1);
   }


})
loggedIn();