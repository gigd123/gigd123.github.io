// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB7isFGFrQcv7THhtPohldDy3CIx_F_HDQ",
    authDomain: "bmi-todolist.firebaseapp.com",
    databaseURL: "https://bmi-todolist.firebaseio.com",
    projectId: "bmi-todolist",
    storageBucket: "bmi-todolist.appspot.com",
    messagingSenderId: "966570316611"
  };
//defined firebase
firebase.initializeApp(config);
const bmiItems = firebase.database().ref('bmiItem');
const bmiTodos = firebase.database().ref('bmiTodos');



// dom element binding
const Height = document.getElementById('userHeight');
const Weight = document.getElementById('userWeight');
const submitData = document.getElementById('submitData');
const list = document.querySelector('.data-list');
const diagnos = document.querySelector('.diagnosis');
const btnIcon = document.querySelector('.btn-load-none');
const btnBmiValue = document.querySelector('.bmi-value');
const btnBmi = document.querySelector('.bmi-onBtn');
const sendBtn = document.querySelector('.send-btn');
const tipText = document.getElementById('tips');
const ridiculous = document.getElementById('ridiculous');
const btnResult =document.querySelector('.showResult');
let buttonClick = false;

// make click button restore
const buttonRestore = ()=>{
    sendBtn.className ='send-btn';
    btnBmiValue.className ='bmi-value';
    btnBmi.className = 'bmi-onBtn';
    btnIcon.className = 'btn-load-none';
    btnResult.textContent = '看結果';
    diagnos.textContent = '';
    btnBmiValue.textContent = '';
    btnBmi.textContent = '';
}

if(btnResult.textContent ===''){
    buttonRestore();
}

// click event
const clickBtn = ()=> {
    buttonClick = true;
    const userWeight = +Weight.value;
    const userHeight = +Height.value;

    //make sure the button view is right 
    if(btnResult.textContent ===''){
        buttonRestore();
    }else{
        addBmiData(userWeight ,userHeight);
    }  
}

submitData.addEventListener('click', clickBtn);

// filte and save the data
const addBmiData = (userWeight ,userHeight)=>{
    //make sure user input number
    if(!isNaN(userWeight) && !isNaN(userHeight) && Weight.value !== '' && Height.value !=='' && userWeight !== 0 && userHeight !== 0){
        const bmiObj = {
            weight: userWeight,
            height: userHeight,
            bmi: calculateBmi(userWeight, userHeight),
            date: showTime()
        }
        bmiTodos.push(bmiObj);

        // after data is send
        Height.value = '';
        Weight.value = '';
        btnBmiValue.textContent = calculateBmi(userWeight, userHeight);   
        
        // show result view on button
        bmiItems.on('value', function(bmiItems){
            const txtItems = bmiItems.val()
            sortWeightButton(+btnBmiValue.textContent, txtItems);
        })


        if(userWeight > 500 || userHeight > 300){
            ridiculous.textContent = "你輸入的數據有點驚人 （⊙ｏ⊙）"
        }   
    }else{
        tipText.textContent = "請輸入正確的身高體重數字";
        // if user didn't input number then empty the  wrong value and focus input
        if(isNaN(userWeight) && !isNaN(userHeight)){
            console.log('userHeight is wrong')
            Height.value = '';
            Weight.value = ''; 
            Height.focus();
        }else if(isNaN(userHeight)){
            Height.value = '';
            Height.focus();
        }else if(isNaN(userWeight)){
            Weight.value = '';   
            Weight.focus();
        }else if(userHeight === 0 && userWeight===0){
            Height.value = '';
            Weight.value = ''; 
            Height.focus();
        }else if(userHeight === 0){
            Height.value = '';
            Height.focus();
        }else if(userWeight === 0){
            Weight.value = '';   
            Weight.focus();
        }
    }
}

// calculate bmi
const calculateBmi = (weight, height)=>{
    const bmi = (weight / Math.pow(height*0.01, 2)).toFixed(2);
    return bmi;
}

// show bmiTodo
const showBmiTodo = (data)=>{
    let str ='';
    const bmiData = data.val();
    bmiItems.on('value', function(bmiItems){
        const txtItems = bmiItems.val()
        for( item in bmiData){
            const sortData = sortWeightList(bmiData, txtItems);
            str +=`<li class="${sortData.color} d-flex justify-content-between"><div class="col">${sortData.bmiTxt}</div><div class="col"><span>BMI</span>${bmiData[item].bmi}</div>
                <div class="col"><span>Weight</span>${bmiData[item].weight}</div>
                <div class="col"><span>Height</span>${bmiData[item].height}</div>
                <div class="col"><span>${bmiData[item].date}</span></div>
                <div class="col"><button class="btn-delete" data-index="${item}">刪除</button></li>`;
        }
        list.innerHTML = str;
    })
}

bmiTodos.on('value', showBmiTodo)

//  sortWeight for button
const diagnosChange=(color)=>{diagnos.className = color;}
const sendBtnChange=(color)=>{sendBtn.className = color;}
const btnIconChange=(color)=>{btnIcon.className = color;}
const diagnosText=(text)=>{diagnos.textContent = text;}


const changeButtonView=(diagnosColor ,sendBtnColor ,btnIconColor ,text)=>{
    diagnosChange(diagnosColor);
    sendBtnChange(sendBtnColor);
    btnIconChange(btnIconColor);
    diagnosText(text);
    btnResult.textContent ='';
    btnBmiValue.classList.add('active');
    btnBmi.classList.add('active');
}

const sortWeightButton =(bmi, txtItems)=>{
    if(bmi < 18.5){
        if(!!buttonClick){
            changeButtonView('font-g' ,'green' ,'btn-load-block bg-g' ,txtItems.underWeight);
        }
    }else if(bmi > 18.5 &&　bmi < 25){
        if(!!buttonClick){
            changeButtonView('font-b' ,'blue' ,'btn-load-block bg-b' ,txtItems.ideal);
        }
    }else if(bmi > 25 && bmi < 30){
        if(!!buttonClick){
            changeButtonView('font-o1' ,'orange1' ,'btn-load-block bg-o1' ,txtItems.mildObesity);
        }
    }else if(bmi > 30 && bmi < 35){
        if(!!buttonClick){
            changeButtonView('font-o2' ,'orange2' ,'btn-load-block bg-o2' ,txtItems.moderateObesity);
        }
    }else if(bmi > 35 && bmi < 40){
        if(!!buttonClick){
            changeButtonView('font-o3' ,'orange3' ,'btn-load-block bg-o3' ,txtItems.overWeight);
        }
    }else if(bmi > 40){
        if(!!buttonClick){
            changeButtonView('font-r' ,'red' ,'btn-load-block bg-r' ,txtItems.severeObesity);
        }
    }
}



// sortWeight for list
const sortWeightList = (bmiData, txtItems)=>{
    let sortData ={};
    if(bmiData[item].bmi < 18.5){
        sortData.bmiTxt = txtItems.underWeight;
        sortData.color = 'border-l-g';
    }else if(bmiData[item].bmi > 18.5 &&　bmiData[item].bmi < 25){
        sortData.bmiTxt = txtItems.ideal;
        sortData.color = 'border-l-b';
    }else if(bmiData[item].bmi > 25 && bmiData[item].bmi < 30){
        sortData.bmiTxt = txtItems.mildObesity;
        sortData.color = 'border-l-o1';
    }else if(bmiData[item].bmi > 30 && bmiData[item].bmi < 35){
        sortData.bmiTxt = txtItems.moderateObesity;
        sortData.color = 'border-l-o2';
    }else if(bmiData[item].bmi > 35 && bmiData[item].bmi < 40){
        sortData.bmiTxt = txtItems.overWeight;
        sortData.color = 'border-l-o3';
    }else if(bmiData[item].bmi > 40){
        sortData.bmiTxt = txtItems.severeObesity;
        sortData.color = 'border-l-r';
    }
    return sortData;
}

// Date function
const showTime = ()=>{
    const today = new Date();
    const showDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    return showDate;
}

// delete bmi
function deleteData (e) {
    e.preventDefault()
    if (e.target.tagName !== 'A') { return }
    let str = e.target.dataset.index
    dataRef.child(str).remove()
    updataLiet()
  }
const deleteToDo = (e)=> {
    if(e.target.nodeName === 'BUTTON'){
      const key =  e.target.dataset.index;
      bmiTodos.child(key).remove();
    }
  }

  list.addEventListener('click', deleteToDo);