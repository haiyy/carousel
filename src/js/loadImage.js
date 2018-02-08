class AsyncLoadImages {
    constructor(url) {
        this.wrap = document.createElement("div");
        this.wrap.className="warp";
        document.body.appendChild(this.wrap);
        this.url=url;
        this.add=0;
        this.time=null;
        console.log(this.url)
        this.init();
    }
    init() {
        this.getImages();
    }
    getImages() {
            this.createImage(this.url);
    }
    //创建图片
    createImage(path) {
        let ul=document.createElement("ul");
        ul.style.width=100*path.length+"%";
        path.map((item,inde)=>{
            let li=document.createElement("li");
            li.className="imgbox";
            let img=document.createElement("img");
            let span=document.createElement("span");
            img.src=item.url;
            li.style.width=100/path.length+"%";
            li.append(img);
            ul.append(li);
        })
        this.wrap.append(ul);
        this.createPage(this.url);
        this.createBtn(path);

    }
    //创建page
    createPage(path){
        let ol=document.createElement("ol");
        path.map((item,inde)=>{
            let li=document.createElement("li");
            li.className="pagebox";
            let img=document.createElement("img");
            img.src=item.url;
            li.append(img);
            ol.append(li);
        })
        this.wrap.append(ol);
    }
    /*//ajax
    getJson(url) {
        return new Promise((resolve, reject) => {
            let xml = new XMLHttpRequest();
            xml.open("GET", url);
            xml.onreadystatechange = function() {
                if (xml.readyState !== 4) return;
                if (xml.status == 200) {
                    resolve(xml.responseText)
                } else {
                    reject("error")
                }
            }
            xml.send(null);
        });
    }*/
    createBtn(path){
        let left=document.createElement("button");
        let right=document.createElement("button");
        left.className="left";
        right.className="right";
        left.innerText="<";
        right.innerText=">";
        this.wrap.append(left);
        this.wrap.append(right);
        this.addEven(left,right,path);
        this.warp(this.wrap,path);
    }
    warp(warp,path){
        this.Interval(path);
        warp.addEventListener("mouseenter",()=>{
            clearInterval(this.time)
        },true);
        warp.addEventListener("mouseout",()=>{
            this.Interval(path);
        },true);
    }
    addEven(left,right,path){
        let ul=document.getElementsByTagName("ul")[0];
        let imgbox=document.getElementsByClassName("imgbox")[0];
        let ol=document.getElementsByTagName("ol")[0];
        let pagebox=document.getElementsByClassName("pagebox");
        let wid=imgbox.clientWidth;
        left.addEventListener("click",(event)=>{
            if(this.add<=0) return;
            this.add--;
            console.log(this.add);
            ul.style.left=-this.add*wid+"px";
        },false);
        left.addEventListener("mouseenter",(event)=>{
            clearInterval(this.time);
        },false);
        right.addEventListener("click",(event)=>{
            if(this.add>=path.length-1) return;
            this.add++;
            ul.style.left=-this.add*wid+"px";
        },false);
        right.addEventListener("mouseenter",(event)=>{
            clearInterval(this.time);
        },false);
        [...pagebox].map((item,index)=>{
            pagebox[index].addEventListener("click",(event)=>{
                this.add=index;
                ul.style.left=-index*wid+"px";
            },false);
            pagebox[index].addEventListener("mouseenter",(event)=>{
                clearInterval(this.time);
            },false);
        });
    }
    Interval(path){
        let ul=document.getElementsByTagName("ul")[0];
        let imgbox=document.getElementsByClassName("imgbox")[0];
        let wid=imgbox.clientWidth;
        this.time=setInterval(()=>{
            this.add++;
            if(this.add>path.length-1){
             this.add=0;
            };
            ul.style.left=-this.add*wid+"px";
        },1000);
    }
}
export default AsyncLoadImages;