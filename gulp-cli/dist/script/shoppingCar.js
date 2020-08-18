(function (){
    var xhr=new XMLHttpRequest();
    xhr.open("GET","../data/oil.json");
    xhr.addEventListener("load",loadHandler);
    xhr.send();
})()


var list=document.querySelector(".list");
function loadHandler(){
    var json=JSON.parse(this.response);
    
    var goodsArr=[];
    if(localStorage.getItem("goods")){
        goodsArr=JSON.parse(localStorage.getItem("goods"));
        console.log(goodsArr);
        var goodsStr="";
        goodsArr.forEach(function (item,index){
            for(var i=0;i<json.length;i++){
                for(var j=0;j<json[i].length;j++){
                    if(item.id==json[i][j].id){
                        var data=json[i][j];
                    }
                }
            }
            // console.log(data);
            
            goodsStr +=`
            <li>
                <img src="${data.src}" alt="">
                <h3>${data.title}</h3>
                <p>￥${data.price}</p>
                <span>${item.num}</span>
                <h2>￥${(item.num*Number(data.price)).toFixed(2)}</h2>
                <em id=${item.id}>删除</em>
            </li>`
        })
        list.innerHTML=goodsStr;

        var del=document.querySelectorAll(".list em");
        del=Array.from(del);
        del.forEach(function (item,index){
            item.onclick=function (){
                // console.log(this.id);
                var self=this;
                goodsArr.forEach(function (obj,index){
                    if(self.id==obj.id){
                        goodsArr.splice(index,1);
                    }
                })
                if(goodsArr.length>0){
                    localStorage.setItem("goods",JSON.stringify(goodsArr));
                }else{
                    localStorage.clear();
                    var newLi = '<li style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</li>';
                    list.innerHTML=newLi;
                }
                this.parentNode.remove();
            }
        })
        
    }else {
        var newLi = '<li style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</li>';
        list.innerHTML=newLi;
    }
}