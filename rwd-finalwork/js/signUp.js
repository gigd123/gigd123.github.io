/* 註冊*/

/* 密碼確認*/
var repasswordId = document.getElementById('repassword');
repasswordId.addEventListener('blur',checkPassWord);
function checkPassWord(){
    var passwordValue = document.getElementById('password').value;
    var repasswordValue = document.getElementById('repassword').value;
    if(passwordValue !== repasswordValue){
        alert('需輸入相同密碼');
    }
}
/* 註冊成功與否*/
var signUp = document.getElementById('signUp-btn');

signUp.addEventListener('click',signUpData);

function signUpData(){
    var addressId = document.getElementById('address').value;
    var repasswordId= document.getElementById('repassword').value;
    var prompt = document.querySelector('.prompt');  
    var data ={};
    data.email = addressId;
    data.password = repasswordId;
    xhr = new XMLHttpRequest();
    xhr.open('post','https://hexschool-tutorial.herokuapp.com/api/signup',true);
    xhr.setRequestHeader('Content-type','application/json');
    var sendData = JSON.stringify(data);
    xhr.send(sendData);
    xhr.onload = function(){
        var callBackData = JSON.parse(xhr.responseText);
        var str =callBackData.message;
        if (str == '帳號註冊成功'){
            alert('帳號註冊成功');
        }else{
            prompt.textContent = '此帳號已被使用';
        }
    }
}

