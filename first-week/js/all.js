document.querySelector('.wrap').style.height = window.innerHeight+'px';
window.onresize= function(){
    this.document.querySelector('.wrap').style.height =window.innerHeight+'px';
};

/*focus在addTask時候，觸發事件*/ 
const addTask = document.getElementById('addTask');
addTask.addEventListener('focus',addTitleBox);
const taskList = document.querySelector('.taskList');
const addBox = document.querySelector('.addBox');
const title = document.querySelector('.addTitle');
const data = JSON.parse(localStorage.getItem('allData')) || [];

/*focus在addTask時候，隱藏addBox，顯示title編輯畫面*/ 
function addTitleBox(){ 
    addBox.style.display ='none'; 
    title.classList.add('active');

};
/*點擊cancel時候，關閉addTask，顯示addBox*/ 
const cancelBtn = document.querySelector('.editTask-btn-cancel');
cancelBtn.addEventListener('click',cancelAdd);
function cancelAdd(e){
    e.preventDefault();
    title.classList.remove('active');
    addBox.style.display ='block'; 
};
/*點擊add Task時候，新增Task*/ 
const addBtn = document.querySelector('.editTask-btn-add');
addBtn.addEventListener('click',addData);
updateList(data);
function addData(){
   const titleTxt = document.querySelector('.title-text').value;
   const deadLineDate =document.getElementById('deadLine-date').value;
   const deadLineTime =document.getElementById('deadLine-time').value;
   const file =document.getElementById('task-file').value;
   const comment = document.getElementById('title-comment').value;
   const ary = {
       title:titleTxt,
       deadLineDate:deadLineDate,
       deadLineTime:deadLineTime,
       file:file,
       comment:comment
   };
   data.push(ary);
   updateList(data);
   localStorage.setItem('allData',JSON.stringify(data));
   title.classList.remove('active');
   addBox.style.display ='block'; 
};

function updateList(items){
    let str='';
    const len =items.length;
    for(let i=0;i<len;i++){
        str += `<li data-num="${i}" class="new-title">
        <div class="title-roof">
            <input class="title-check" type="checkbox" name="vehicle" value="Bike">
            <input type="text" class="title-text" placeholder="${items[i].title}">
            <span class="title-focus">
                <i class="far fa-star"></i>
            </span>
            <span class="title-edit">
                <i class="fas fa-pencil-alt"></i>
            </span>
        </div>
        <div class="title-footer">
            <span>
                <i class="far fa-calendar-alt fa-xs">${items[i].deadLineDate}</i>
            </span>
            <span>
                <i class="far fa-file fa-xs"></i>
            </span>
            <span>
                <i class="far fa-comment-dots fa-xs"></i>
            </span>
        </div>
        <div class="editTask-hide">
            <ul class="editTask">
                <li class="deadLine">
                    <span>
                        <i class="far fa-calendar-alt fa-xs"></i>Deadline
                    </span>
                    <h2>
                        <input type="date" name="" id="deadLine-date" value="${items[i].deadLineDate}">
                        <input type="time" name="" id="deadLine-time" value="${items[i].deadLineTime}">
                    </h2>
                </li>
                <li>
                    <span>
                        <i class="far fa-file fa-xs"></i>File
                    </span>
                    <h2>
                        <label for="task-file" class="task-file">
                            <input id="task-file" type="file" name="" id="" hidden="hidden">
                        </label>
                    </h2>
                </li>
                <li>
                    <span>
                        <i class="far fa-comment-dots fa-xs"></i>Comment
                    </span>
                    <h2>
                        <textarea id="title-comment" name="" id="" cols="30" rows="10" placeholder="Type your memo here…">${items[i].comment}</textarea>
                    </h2>
                </li>
                <li class="editTask-btn">
                    <a href="#" class="editTask-cancel">× Cancel</a>
                    <a href="#" class="editTask-add">+ Add Task</a>
                </li>
            </ul>
        </div>
        <div class="task-delete" data-delete="${i}"><i class="far fa-trash-alt"></i></div>
    </li>`;
    }
    taskList.innerHTML =str;
};
/*點擊pencil，編輯task*/ 

/*點擊cancel時候，關閉addTask，顯示addBox*/ 
$(document).ready(function () {
    $('.title-edit').click(function(e){
        e.preventDefault();
        $(this).parent().siblings('.editTask-hide').slideToggle(1000);
        $(this).parent().parent().siblings('.new-title').find('.editTask-hide').slideUp(1000);
    });
    $('.editTask-cancel').click(function(e){
        e.preventDefault();
        $(this).parent().parent().parent().slideUp(1000);
    });
});
/*點擊垃圾桶，刪除資料*/ 
var taskDelete = document.querySelector('.task-delete');
taskDelete.addEventListener('click',deleteTask);
function deleteTask(e){
    var deleteNum = e.target.dataset.num;
    data.splice(deleteNum,1);
    localStorage.setItem('allData',JSON.stringify(data));
    updateList(data);
}