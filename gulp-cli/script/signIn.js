var user=document.querySelector("#username");
var pass=document.querySelector("#password");
var login=document.querySelector(".login");


login.onclick = function (){
    if (!user.value || !pass.value) {
        alert('账号或密码不能为空！');
        return false;
    }
    ajax({
        url: '../PHP/user.php',
        type: 'post',
        data: {
            type: 'login',
            user: user.value,
            pass: pass.value
        },
        dataType: 'json',
        success: function (data){
            var json = JSON.parse(data);
            alert(json.msg);
            if(json.msg=="登录成功"){
                alert("三秒后跳转到首页");
                setTimeout(function (){
                    location.href="http://127.0.0.1:3000/pages?"+decodeURI(user.value);
                },3000)
            }
        },
        error: function (status){
            alert('提交失败');
        }
    });
    
    
}

