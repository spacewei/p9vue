<template>
  <div class="pic">
    <canvas class="big-canvas big-img" @mousemove="zoomMove" @mouseover="zoomStart" @mouseout="zoomEnd">
      <canvas class="enlarge"></canvas>
    </canvas>
    <ul class="small-img-ul">
      <li class="small-img" @mouseover="carouselStop(0)" :class="{redBorder: (imgNumber===0)}">
        <img :src="sImgStr+sImg0">
      </li>
      <li class="small-img" @mouseover="carouselStop(1)" :class="{redBorder: (imgNumber===1)}">
        <img :src="sImgStr+sImg1">
      </li>
      <li class="small-img" @mouseover="carouselStop(2)" :class="{redBorder: (imgNumber===2)}">
        <img :src="sImgStr+sImg2">
      </li>
      <li class="small-img" @mouseover="carouselStop(3)" :class="{redBorder: (imgNumber===3)}">
        <img :src="sImgStr+sImg3">
      </li>
      <li class="small-img" @mouseover="carouselStop(4)" :class="{redBorder: (imgNumber===4)}">
        <img :src="sImgStr+sImg4">
      </li>
    </ul>
    <div>{{imgNumber}}</div>
  </div>
</template>
<script>
    import jQuery from 'jquery';
    export default{
        data(){
            return{
              imgNumber :0,
              bImgStr : "../../static/img/p9Picture/bigPicture/",
              sImgStr : "../../static/img/p9Picture/smallPicture/",
              bImg :"goods_430x430_0.jpg",
              bImg0 :"goods_430x430_0.jpg",
              bImg1 :"goods_430x430_1.jpg",
              bImg2 :"goods_430x430_2.jpg",
              bImg3 :"goods_430x430_3.jpg",
              bImg4 :"goods_430x430_4.jpg",
              sImg0 : "goods_60x60_0.jpg",
              sImg1 :"goods_60x60_1.jpg",
              sImg2 :"goods_60x60_2.jpg",
              sImg3 :"goods_60x60_3.jpg",
              sImg4 :"goods_60x60_4.jpg",
              bigImgUrl: "",
              carousel: {},
              zoomP: {},
              img: {},
              bigCanvas: {},
              canvasEnlarge: {}
            }
        },
      methods: {
        /*求余方法*/
        mod: function(self,i){
          let remainder = i.i % 5;
          self.imgNumber = remainder;
          i.i = i.i + 1;
          if(i.i == 10){
            i.i = 5
          }
        },
        /*轮播定时结束*/
        carouselStop: function(i){
          window.clearInterval(this.carousel);
          this.imgNumber = i;
        },
        /*轮播定时开始*/
        carouselStart: function(i,self){
          let ii = {i:(i + 1)};
          self.carousel = setInterval(function(){
            self.mod(self,ii);
          },1000);
        },
        /*watch imgNumber变化,改变img的src*/
        changeImgSrc: function(img){
          this.bigImgUrl = this.bImgStr + "goods_430x430_" + this.imgNumber + ".jpg";
          img.src = this.bigImgUrl;
        },
        /*坐标系变换*/
        coordinateChange: function(canvasDom,x,y){
          let bbox = canvasDom.getBoundingClientRect();
          let X = Math.round(x - bbox.left);
          let Y = Math.round(y - bbox.top);
          return {x:X,y:Y};
        },
        /*鼠标移入大图,加载放大镜*/
        zoomStart: function(e){
          this.carouselStop(this.imgNumber,this);
          this.zoom(e)
        },
        /*得到鼠标移动时的放大镜*/
        zoomMove: function(e){
          this.zoom(e)
        },
        /*移出大图,取消放大镜*/
        zoomEnd: function(){
          let canvasEnlargeContext = this.canvasEnlarge.getContext('2d');
          let bigCanvasContext = this.bigCanvas.getContext('2d');
          canvasEnlargeContext.clearRect(0,0,canvasEnlargeContext.width,canvasEnlargeContext.height);
          bigCanvasContext.drawImage(this.img,0,0);
        },
        /*放大方法*/
        zoom: function(e){
          this.zoomP = this.coordinateChange(e.target,e.clientX,e.clientY);
          //放大镜半径
          let r = 100;
          //放大倍数
          let k = 4;
          let canvasEnlargeContext = this.canvasEnlarge.getContext('2d');
          let bigCanvasContext = this.bigCanvas.getContext('2d');
          //先清除之前的放大镜内容,重载大图canvas的内容
          canvasEnlargeContext.clearRect(0,0,canvasEnlargeContext.width,canvasEnlargeContext.height);
          bigCanvasContext.drawImage(this.img,0,0,this.img.width,this.img.height);
          //发大大图局部内容,再加载到大图中
          canvasEnlargeContext.drawImage(this.img,this.zoomP.x-(r/2),this.zoomP.y-(r/2),2*r,2*r,0,0,k*r,k*r);
          bigCanvasContext.drawImage(this.canvasEnlarge,0,0,4*r,4*r,this.zoomP.x-(1*r),this.zoomP.y-(1*r),3*r,4*r);
        }
      },
      mounted: function(){
        let self = this;
        self.carouselStart(0,self);
        //由ImgNumber变动得到的大图url
        this.bigImgUrl = this.bImgStr + "goods_430x430_" + this.imgNumber + ".jpg";
        //img对象
        this.img = new Image();
        this.img.src = this.bigImgUrl;
        this.img.onload = function(){
          //放大镜canvas
          self.canvasEnlarge = jQuery('.enlarge').get(0);
          //大图canvas
          self.bigCanvas = jQuery('.big-canvas').get(0);
          let bigCanvasContext = self.bigCanvas.getContext('2d');
          //依据实际图片大小,得到大图canvas的宽高
          self.bigCanvas.width = self.img.width;
          self.bigCanvas.height = self.img.height;
          bigCanvasContext.drawImage(self.img,0,0);
        };
      },
      watch: {
        imgNumber: function(){
          this.changeImgSrc(this.img);
        }
      }
    }
</script>
<style>
  .pic{
    position: absolute;
    left: 0;
  }
  .big-img{
    cursor: pointer;
  }
  .small-img-ul{
    text-align: center;
    margin: 0;
    padding: 0;
  }
  .small-img-ul:after{
    content: "";
    display: block;
    clear: both;
  }
  .small-img-ul li{
    display: inline-block;
    margin-left: 1rem;
    box-sizing: border-box;
    border: 1px solid white;
  }
  .small-img{
    cursor: pointer;
  }
  li.redBorder{
    border: 1px solid red;
  }
</style>