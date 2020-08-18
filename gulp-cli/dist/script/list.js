//oil数据渲染
var user=location.search.replace("?","");
(function (){
    var xhr=new XMLHttpRequest();
    xhr.open("GET","../data/oil.json");
    xhr.addEventListener("load",loadHandler);
    xhr.send();
})()

var oilbox=document.querySelector(".oil");
var grocerybox=document.querySelector(".grocery");
var fruitbox=document.querySelector(".fruit");
function loadHandler(){
    // console.log(JSON.parse(this.response));
    var json=JSON.parse(this.response);
    var str="";
    var str1="";
    var str2="";
    for(var i=0;i<json[0].length;i++){
        str+=`<div class="item" id="${json[0][i].id}">
        <div class="picCon">
          <a href="../pages/detail.html?id=1-${i}&${user}"><img src="${json[0][i].src}" alt=""></a>
        </div>
        <p class="title">
          ${json[0][i].title}
        </p>
        <p class="price"><span>￥</span><span>${json[0][i].price}</span></p>
      </div>`;
    }
    oilbox.innerHTML=str;
    for(var j=0;j<json[1].length;j++){
        str1+=`<div class="item" id="${json[1][j].id}">
        <div class="picCon">
        <a href="../pages/detail.html?id=2-${j}&${user}"><img src="${json[1][j].src}" alt=""></a>
        </div>
        <p class="title">
          ${json[1][j].title}
        </p>
        <p class="price"><span>￥</span><span>${json[1][j].price}</span></p>
      </div>`;
    }
    grocerybox.innerHTML=str1;
    for(var k=0;k<json[1].length;k++){
        str2+=`<div class="item" id="${json[2][k].id}">
        <div class="picCon">
        <a href="../pages/detail.html?id=3-${k}&${user}"><img src="${json[2][k].src}" alt=""></a>
        </div>
        <p class="title">
          ${json[2][k].title}
        </p>
        <p class="price"><span>￥</span><span>${json[2][k].price}</span></p>
      </div>`;
    }
    fruitbox.innerHTML=str2;
}

//判断用户是否登录了，并显示欢迎
var user=location.search.replace("?","");
var list=document.querySelector(".list-l");
// console.log(list.children[1]);
// console.log(user);
if(user){
  list.children[1].remove();
  var li=document.createElement("li");
  li.textContent="亲爱的"+decodeURIComponent(user);
  list.insertBefore(li,list.firstElementChild);
}

var tag=document.querySelector(".tiao");
var tag1=document.querySelector(".tiao1");
tag.href="./list.html?"+user;
tag1.href="./index.html?"+user;