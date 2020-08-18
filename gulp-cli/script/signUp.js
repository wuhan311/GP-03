var user=document.querySelector("#username");
var pass=document.querySelector("#password");
var add=document.querySelector(".signUp");

add.onclick = function (){
    if (!user.value || !pass.value) {
        alert('账号或密码不能为空！');
        return false;
    }
    ajax({
        url: '../PHP/user.php',
        type: 'post',
        data: {
            type: 'add',
            user: user.value,
            pass: pass.value
        },
        dataType: 'json',
        success: function (data){
            var json = JSON.parse(data);
            alert(json.msg);
            if(json.msg=="注册成功"){
                alert("三秒后跳转到登录页");
                setTimeout(function (){
                    location.href="http://127.0.0.1/server/Second%20stage%20project/gulp-cli/dist/pages/signIn.html#";
                },3000)
            }
        },
        error: function (status){
            alert('提交失败');
        }
    });
}