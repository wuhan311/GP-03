var left = document.querySelector('.left');
var leftImg=document.querySelector(".left img");
var mask = document.querySelector('.mask');
var maxBox = document.querySelector('.maxBox');
var maxImg = document.querySelector('.maxBox img');
var bottom=document.querySelector(".bottom");

//放大镜
left.onmouseenter = function (){
    mask.style.display = 'block';
    maxBox.style.display = 'block';
}
left.onmouseleave = function (){
    mask.style.display = 'none';
    maxBox.style.display = 'none';
}
left.onmousemove = function (ev){
    var e = ev || event;
    // 蒙板的定位值
    var rect=left.getBoundingClientRect();
    var maskX = e.clientX -  rect.x- mask.clientWidth/2;
    var maskY = e.clientY - rect.y - mask.clientHeight/2;

    // 边界判断
    if (maskX <= 0){
        maskX = 0;
    }
    if (maskX >= (left.clientWidth - mask.clientWidth)) {
        maskX = left.clientWidth - mask.clientWidth;
    }
    if (maskY <= 0){
        maskY = 0;
    }
    if (maskY >= (left.clientHeight - mask.clientHeight)) {
        maskY = left.clientHeight - mask.clientHeight;
    }
    mask.style.left = maskX + 'px';
    mask.style.top = maskY + 'px';

    // 移动比例
    var scaleX = maskX / (left.clientWidth - mask.clientWidth);
    var scaleY = maskY / (left.clientHeight - mask.clientHeight);
    // 大图移动的坐标
    var maxImgX = scaleX * (maxImg.clientWidth - maxBox.clientWidth);
    var maxImgY = scaleY * (maxImg.clientHeight - maxBox.clientHeight);
    maxImg.style.left = -maxImgX + 'px';
    maxImg.style.top = -maxImgY + 'px';
}


//鼠标滑过添加边框
bottom.onmouseover=mouseoverHandler;
var preImg;
function mouseoverHandler(e){
    if(e.target.nodeName!="IMG") return;
    if(preImg){
        preImg.style.border="2px solid rgba(255,0,0,0)";
    }
    preImg=e.target;
    preImg.style.border="2px solid rgba(255,0,0,1)";
    leftImg.src=maxImg.src=e.target.src;
}

//点击按钮选择购买数量
var btnL=document.querySelector(".less");
var btnA=document.querySelector(".add");
var ipt=document.querySelector(".ipt");
// console.log(ipt);
btnL.onclick=function (){
    if(ipt.value<=1){
        return;
    }
    ipt.value--;
}
btnA.onclick=function (){
    ipt.value++;
}




//商品描述的tab切换

var lis=document.querySelectorAll(".content ul li");
var goodWarp=document.querySelector(".goodWarp");
var goodWarp1=document.querySelector(".goodWarp1");
lis=Array.from(lis);
var prevLi=0;
lis.forEach(function (item,index){
    item.onclick=function (){
        if(index==0){
            goodWarp.style.display="block";
            goodWarp1.style.display="none";
        }else{
            goodWarp.style.display="none";
            goodWarp1.style.display="block";
        }
        lis[prevLi].style.background="#ddd";
        this.style.background="white";
        prevLi=index;
    };
})

var title=document.querySelector(".title");
var price=document.querySelector(".price em");

//根据页面url获取数据并渲染
var id=location.search.split("=")[1].replace("&","");
// console.log(id);
(function (){
    var xhr=new XMLHttpRequest();
    xhr.open("GET","../data/oil.json");
    xhr.addEventListener("load",loadHandler);
    xhr.send();
})()


function loadHandler(){
    var json=JSON.parse(this.response);
    // console.log(json);
    for(var i=0;i<json.length;i++){
        for(var j=0;j<json[i].length;j++){
            if(id==json[i][j].id){
                var data=json[i][j];
            }
        }
    }
    leftImg.src=data.fsrc;
    maxImg.src=data.fsrc;
    bottom.firstElementChild.src=data.fsrc;
    bottom.lastElementChild.src=data.msrc;
    title.textContent=data.title;
    price.textContent=data.price;
}

//添加到购物车

var shopping=document.querySelector(".shopping");
shopping.onclick=function (e){
    e.preventDefault();
    var goodsArr = [];
        if (localStorage.getItem('goods')) {
            goodsArr = JSON.parse(localStorage.getItem('goods'));
        }
    
        // 标记是否已经加入过购物车
        var flag = false;
        
        goodsArr.forEach(function (item,index){
            if(item.id==id){
                item.num=Number(ipt.value)+Number(item.num);
                flag=true;
                return false;
            }
        })
        // 购物车没有此商品，push {code: 'abc1',num: 1}
        if (!flag) {
            goodsArr.push({"id": id,"num": ipt.value});
        }
        // 数据存储到 localStorage中
        // console.log(goodsArr);
        localStorage.setItem('goods',JSON.stringify(goodsArr));
        alert('加入购物车成功！');
}


//判断用户是否登录了，并显示欢迎
var user=location.search.split("&")[1];
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