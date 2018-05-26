var healthy = [
    {
        txt:'理想'
    },
    {
        txt: '過輕'
    },
    {
        txt: '過重'
    },
    {
        txt: '輕度肥胖'
    },
    {
        txt: '中度肥胖'
    },
    {
        txt: '重度肥胖'
    }
];
var sendData =document.getElementById('send');
var sendBtn = document.querySelector('.send-btn');
var list = document.querySelector('.data-list');
var btnHit =document.querySelector('.hit');
var diagnos = document.querySelector('.diagnosis');
var btnIcon = document.querySelector('.btn-load-none');
var btnBmiValue = document.querySelector('.bmi-value');
var btnBmi = document.querySelector('.bmi-onBtn');

sendData.addEventListener('click',addData);
var data = JSON.parse(localStorage.getItem('listData')) || [];
updateList(data);
function addData(){

    var myHeight = document.getElementById('myHeight').value;
    var myWeight = document.getElementById('myWeight').value;
    var bmi = (myWeight / Math.pow(myHeight*0.01, 2)).toFixed(2);
    if(myHeight == 0 || myWeight ==0){
        alert('請確實填寫身高、體重');
    };
    var ary = {
        bmiData:bmi,
        heightData:myHeight,
        weightData:myWeight
    };
    data.push(ary);
    updateList(data);
    localStorage.setItem('listData',JSON.stringify(data));
    btnHit.textContent ='';
    btnBmiValue.classList.add('active');
    btnBmiValue.textContent = bmi;
    btnBmi.classList.add('active');
};

function updateList(items){
    var str='';
    var len=items.length;
    var Today = new Date();
    var showDate = Today.getDate() + '-' + (Today.getMonth() + 1) + '-' + Today.getFullYear();
    for(var i=0;i<len;i++){
        if(items[i].bmiData <18.5){
            diagnos.textContent = healthy[1].txt;
            diagnos.className ='font-g';
            sendBtn.className = 'green';
            btnIcon.className = 'btn-load-block bg-g';
            str += '<li class="border-l-g d-flex justify-content-between"><div>' + healthy[1].txt + '</div><div><span>BMI</span>' + items[i].bmiData+'</div>'+
                '<div><span>Weight</span>' + items[i].weightData + '</div>' +
                '<div><span>Height</span>' + items[i].heightData + '</div>' +
                '<div><span>'+showDate+'</span></div></li>';
        } else if (items[i].bmiData > 18.5 && items[i].bmiData<25){ 
            diagnos.textContent = healthy[0].txt;
            diagnos.className = 'font-b';
            sendBtn.className = 'blue';
            btnIcon.className = 'btn-load-block bg-b';
            str += '<li class="border-l-b d-flex justify-content-between"><div>' + healthy[0].txt + '</div><div><span>BMI</span>' + items[i].bmiData + '</div>' +
                '<div><span>Weight</span>' + items[i].weightData + '</div>' +
                '<div><span>Height</span>' + items[i].heightData + '</div>' +
                '<div><span>' + showDate + '</span></div></li>';
        } else if (items[i].bmiData > 25 && items[i].bmiData < 30){
            diagnos.textContent = healthy[2].txt;
            diagnos.className = 'font-o1';
            sendBtn.className = 'orange1';
            btnIcon.className = 'btn-load-block bg-o1';
            str += '<li class="border-l-o1 d-flex justify-content-between"><div>' + healthy[2].txt + '</div><div><span>BMI</span>' + items[i].bmiData + '</div>' +
                '<div><span>Weight</span>' + items[i].weightData + '</div>' +
                '<div><span>Height</span>' + items[i].heightData + '</div>' +
                '<div><span>' + showDate + '</span></div></li>';
        } else if (items[i].bmiData > 30 && items[i].bmiData < 35) {
            diagnos.textContent = healthy[3].txt;
            diagnos.className = 'font-o2';
            sendBtn.className = 'orange2';
            btnIcon.className = 'btn-load-block bg-o2';
            str += '<li class="border-l-o2 d-flex justify-content-between"><div>' + healthy[3].txt + '</div><div><span>BMI</span>' + items[i].bmiData + '</div>' +
                '<div><span>Weight</span>' + items[i].weightData + '</div>' +
                '<div><span>Height</span>' + items[i].heightData + '</div>' +
                '<div><span>' + showDate + '</span></div></li>';
        } else if (items[i].bmiData > 35 && items[i].bmiData < 40) {
            diagnos.textContent = healthy[4].txt;
            diagnos.className = 'font-o3';
            sendBtn.className = 'orange3';
            btnIcon.className = 'btn-load-block bg-o3';
            str += '<li class="border-l-o3 d-flex justify-content-between"><div>' + healthy[4].txt + '</div><div><span>BMI</span>' + items[i].bmiData + '</div>' +
                '<div><span>Weight</span>' + items[i].weightData + '</div>' +
                '<div><span>Height</span>' + items[i].heightData + '</div>' +
                '<div><span>' + showDate + '</span></div></li>';
                '<span>' + showDate + '</span></li>';
        } else if(items[i].bmiData > 40) {
            diagnos.textContent = healthy[5].txt;
            diagnos.className = 'font-r';
            sendBtn.className = 'red';
            btnIcon.className = 'btn-load-block bg-r';
            str += '<li class="border-l-r d-flex justify-content-between"><div>' + healthy[5].txt + '</div><div><span>BMI</span>' + items[i].bmiData + '</div>' +
                '<div><span>Weight</span>' + items[i].weightData + '</div>' +
                '<div><span>Height</span>' + items[i].heightData + '</div>' +
                '<div><span>' + showDate + '</span></div></li>';
        }
    }
    list.innerHTML =str;
}