
/* 登入*/  
var signIn = document.getElementById('signIn');



function signInData(){
    var address = document.getElementById('signIn-address').value;
    var password = document.getElementById('signIn-password').value;
    var data = {};
    data.email = address;
    data.password = password;
    var xhr = new XMLHttpRequest();
    xhr.open('post','https://hexschool-tutorial.herokuapp.com/api/signin',true);
    xhr.setRequestHeader('Content-type','application/json');
    var sendData = JSON.stringify(data);
    xhr.send(sendData);
    xhr.onload = function(){
        var callBackData = JSON.parse(xhr.responseText);
        var str = callBackData.message;
        if(str =='登入成功'){
            alert('登入成功');
        }else{
            alert('此帳號不存在或帳號密碼錯誤');
        }
    };
};
signIn.addEventListener('click',signInData);

