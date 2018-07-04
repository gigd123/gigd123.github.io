var info = [];
const selectRegion = document.querySelector('.selectRegion');
const list = document.querySelector('.list');
const pagination = document.querySelector('.pagination');
const totalAmount = document.querySelector('.totalAmount');
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
xhr.onload = function () {
    var data = JSON.parse(xhr.responseText);
    info = data.result.records;
    showAllList();
};

function showAllList(){
    let allList = '';
    let countResult ='';
    let pages ='';
for(let i=0;i<info.length;i++){
    allList+=`<div class="list-card mb-3">
    <div class="row">
    <div class="card-pic col-12 col-lg-5" style="background-image: url('${info[i].Picture1}');">
    </div>
    <div class="col-12 col-lg-7 p-5 p-lg-3">
        <h2 class="mb-3">${info[i].Name}</h2>
        <p class="card-info mb-3">${info[i].Description}</p>
        <p class="mb-2">
            <i class="fas fa-map-marker-alt"></i>${info[i].Add}</p>
        <p class="mb-2">
            <i class="fas fa-ticket-alt"></i>${info[i].Ticketinfo}</p>
        <p>
            <i class="fas fa-clock"></i>${info[i].Opentime}</p>
    </div>
</div>
</div>`;
}
list.innerHTML = allList;
const cardLen =document.querySelectorAll('.list-card').length;
    const pageNum = Math.ceil(cardLen / 4);
    for(let i = 1; i <= pageNum; i++){
        pages += `<a href="#">${i}</a>`;
    }
    pagination.innerHTML = pages;
    // 每頁顯示的資料數
    
    for(let i = 4; i < cardLen;i++){
        let excessList = document.querySelector('.list').children[i];
        excessList.style.display ='none';
    }
    
    // 搜尋結果數
    for(let i = 0; i < cardLen; i++){
        if(cardLen !== 0){
            countResult= (parseInt(cardLen));
        }else{
            countResult= '0';
        }
    }
    totalAmount.innerHTML=countResult;

}

selectRegion.addEventListener('change', function(e){
    let selectValue = e.target.value;
    let allList ='';
    let countResult ='';
    let pages ='';
    for (let i = 1; i < info.length; i++){
        if(info[i].Zone == selectValue){
            allList+=`<div class="list-card mb-3">
            <div class="row">
            <div class="card-pic col-12 col-lg-5" style="background-image: url('${info[i].Picture1}');">
            </div>
            <div class="col-12 col-lg-7 p-5 p-lg-3">
                <h2 class="mb-3">${info[i].Name}</h2>
                <p class="card-info mb-3">${info[i].Description}</p>
                <p class="mb-2">
                    <i class="fas fa-map-marker-alt"></i>${info[i].Add}</p>
                <p class="mb-2">
                    <i class="fas fa-ticket-alt"></i>${info[i].Ticketinfo}</p>
                <p>
                    <i class="fas fa-clock"></i>${info[i].Opentime}</p>
            </div>
        </div>
        </div>`;
        }else if(selectValue == '全部'){
            allList+=`<div class="list-card mb-3">
    <div class="row">
    <div class="card-pic col-12 col-lg-5" style="background-image: url('${info[i].Picture1}');">
    </div>
    <div class="col-12 col-lg-7 p-5 p-lg-3">
        <h2 class="mb-3">${info[i].Name}</h2>
        <p class="card-info mb-3">${info[i].Description}</p>
        <p class="mb-2">
            <i class="fas fa-map-marker-alt"></i>${info[i].Add}</p>
        <p class="mb-2">
            <i class="fas fa-ticket-alt"></i>${info[i].Ticketinfo}</p>
        <p>
            <i class="fas fa-clock"></i>${info[i].Opentime}</p>
    </div>
</div>
</div>`;
        }
    }
    list.innerHTML = allList;

// 頁數計算
const cardLen =document.querySelectorAll('.list-card').length;
const pageNum = Math.ceil(cardLen / 4);
for(let i = 1; i <= pageNum; i++){
    pages += `<a href="#">${i}</a>`;
}
pagination.innerHTML = pages;
// 每頁顯示的資料數

for(let i = 4; i < cardLen;i++){
    let excessList = document.querySelector('.list').children[i];
    excessList.style.display ='none';
}

// 搜尋結果數
for(let i = 0; i < cardLen; i++){
    if(cardLen !== 0){
        countResult= (parseInt(cardLen));
    }else{
        countResult= '0';
    }
}
totalAmount.innerHTML=countResult;

});

// 切換頁面
pagination.addEventListener('click',changePage);
function changePage(e){
    let num =e.target.nodeName;
    if(num == 'A'){
        const cardLen =document.querySelectorAll('.list-card').length;
        for(let i = 0; i < cardLen; i++){
            let excessList = document.querySelector('.list').children[i];
            excessList.style.display ='none';
        };
        let currentPage = parseInt(e.target.innerHTML);
        let currentList = currentPage*4;
        for(let i=currentList -4; i<currentList; i++){
            let currentList = document.querySelector('.list').children[i];
           currentList.style.display ='block';
        }
    }
}



// 搜尋
const search = document.getElementById('search-input');

search.addEventListener('keydown',searchData);
function searchData(e){

    let selectValue = document.getElementById('search-input').value;
    let allList ='';
    let countResult ='';
    let pages ='';
    for (let i = 1; i < info.length; i++){
        if(info[i].Zone.indexOf(selectValue) > -1 ){
            allList+=`<div class="list-card mb-3">
    <div class="row">
    <div class="card-pic col-12 col-lg-5" style="background-image: url('${info[i].Picture1}');">
    </div>
    <div class="col-12 col-lg-7 p-5 p-lg-3">
        <h2 class="mb-3">${info[i].Name}</h2>
        <p class="card-info mb-3">${info[i].Description}</p>
        <p class="mb-2">
            <i class="fas fa-map-marker-alt"></i>${info[i].Add}</p>
        <p class="mb-2">
            <i class="fas fa-ticket-alt"></i>${info[i].Ticketinfo}</p>
        <p>
            <i class="fas fa-clock"></i>${info[i].Opentime}</p>
    </div>
</div>
</div>`;
        }else if(info[i].Name.indexOf(selectValue) > -1){
            allList+=`<div class="list-card mb-3">
    <div class="row">
    <div class="card-pic col-12 col-lg-5" style="background-image: url('${info[i].Picture1}');">
    </div>
    <div class="col-12 col-lg-7 p-5 p-lg-3">
        <h2 class="mb-3">${info[i].Name}</h2>
        <p class="card-info mb-3">${info[i].Description}</p>
        <p class="mb-2">
            <i class="fas fa-map-marker-alt"></i>${info[i].Add}</p>
        <p class="mb-2">
            <i class="fas fa-ticket-alt"></i>${info[i].Ticketinfo}</p>
        <p>
            <i class="fas fa-clock"></i>${info[i].Opentime}</p>
    </div>
</div>
</div>`;
        }
    }
    list.innerHTML = allList;
    const cardLen =document.querySelectorAll('.list-card').length;
    const pageNum = Math.ceil(cardLen / 4);
    for(let i = 1; i <= pageNum; i++){
        pages += `<a href="#">${i}</a>`;
    }
    pagination.innerHTML = pages;
    // 每頁顯示的資料數
    
    for(let i = 4; i < cardLen;i++){
        let excessList = document.querySelector('.list').children[i];
        excessList.style.display ='none';
    }
    
    // 搜尋結果數
    for(let i = 0; i < cardLen; i++){
            countResult= (parseInt(cardLen)); 
    }
    totalAmount.innerHTML=countResult;
}