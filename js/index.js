	//轮播图
	class Lunbotu{
		constructor(obj){
			this.boxDom = obj.boxDom;
			this.domObj = null;
			this.width = obj.width;
			this.height = obj.height;
			this.imgs = obj.imgs;
			this.speed = obj.speed;
			this.myTimer = null;
			this.imgDoms = [];
			this.liDoms = [];
			this.ord = 0;
			this.initUI();
			this.initEvent();
		}
		initUI(){
			this.boxDom.style.position = "relative";
			this.domObj = document.createElement("div");
			this.ulDom = document.createElement("ul");
			for(let i = 0; i < this.imgs.length; i++){
				this.imgDom = document.createElement("img");
				this.imgDom.src = this.imgs[i];
				this.imgDom.style.cssText = "position:absolute;left:0;top:0;";
				this.imgDom.style.width = this.width + "px";
				this.imgDom.style.height = this.height + "px";
				this.imgDoms.push(this.imgDom);
				this.domObj.appendChild(this.imgDom);
				this.ulDom.style.cssText = "position:absolute;right:30px;bottom:30px;z-index:100;";
				this.liDom = document.createElement("li");
				this.liDom.style.cssText = "width:6px;height:6px;display:inline-block;border:2px solid #a2b6ae;background-color:#666;margin:0 10px;border-radius:50%;";
				this.liDoms.push(this.liDom);
				this.ulDom.appendChild(this.liDom);
				this.boxDom.appendChild(this.domObj);
				this.boxDom.appendChild(this.ulDom);
			}
			this.upDom = document.createElement("div");
			this.upDom.style.cssText = "width:42px;height:68px;position:absolute;left:234px;top:195px;z-index:100;line-height:68px;text-align:center;color:#757575;border-radius:0 2px 2px 0;user-select:none;";
			this.upDom.setAttribute("class","up");
			this.upDom.innerHTML = '<i class="iconfont-up-down">&#xe729;</i>';
			this.downDom = document.createElement("div");
			this.downDom.style.cssText = "width:42px;height:68px;position:absolute;right:0;top:195px;z-index:100;line-height:68px;text-align: center;color:#757575;border-radius:2px 0 0 2px;user-select:none;";
			this.downDom.setAttribute("class","down");
			this.downDom.innerHTML = '<i class="iconfont-up-down">&#xe62e;</i>';
			this.boxDom.appendChild(this.upDom);
			this.boxDom.appendChild(this.downDom);
			this.imgDoms[0].style.zIndex = 1;
			this.liDoms[0].style.backgroundColor = "#f3f3f3";
		}
		initEvent(){
			let obj = this;
			let ord = this.ord;
			let inOrd;
			let outOrd;
			let opacityTimer = null;
			run();

			obj.domObj.onmouseover = function(){
				clearInterval(obj.myTimer);
			}

			obj.domObj.onmouseout = function(){
				run();
			}

			obj.upDom.onclick = function(){
				clearInterval(obj.myTimer);
				clearInterval(opacityTimer);
				outOrd = ord;
				ord--;
				if(ord < 0){
					ord = obj.imgs.length - 1;
				}
				inOrd = ord;
				showImg(outOrd, inOrd);
				run();
			}
			obj.downDom.onclick = function(){
				clearInterval(obj.myTimer);
				clearInterval(opacityTimer);
				outOrd = ord;
				ord++;
				if(ord > obj.imgs.length - 1){
					ord = 0;
				}
				inOrd = ord;
				showImg(outOrd, inOrd);
				run();
			}

			for(let j = 0; j < obj.imgs.length; j++){
				obj.liDoms[j].onmouseover = function(){
					this.style.backgroundColor = "#f3f3f3";
				}
				obj.liDoms[j].onmouseout = function(){
					this.style.backgroundColor = "#666";
				}

				obj.liDoms[j].onclick = function(){
					clearInterval(obj.myTimer);
					clearInterval(opacityTimer);
					showImg(ord, j);
					run();
				}
			}

			function run(){
				obj.myTimer = setInterval(() => {
					outOrd = ord;
					ord++;
					if(ord > obj.imgs.length - 1){
						ord = 0;
					}
					inOrd = ord;
					showImg(outOrd, inOrd);
				}, obj.speed);
			}
			function showImg(outOrd, inOrd){
				if(outOrd == inOrd){
					return ;
				}
				for(let i = 0; i < obj.imgs.length; i++){
					obj.imgDoms[i].style.zIndex = 0;
					obj.liDoms[i].style.backgroundColor = "#666";
				}
				obj.imgDoms[ord].style.zIndex = 1;
				obj.imgDoms[inOrd].style.zIndex = 1;
				obj.liDoms[inOrd].style.backgroundColor = "#f3f3f3";

				let opacity = 1;
				let step = 0.01;
				let currOpacity = opacity;
				opacityTimer = setInterval(function(){
					currOpacity -= step;
					if(currOpacity <= 0){
						clearInterval(opacityTimer);
						currOpacity = 0;
					}
					obj.imgDoms[ord].style.opacity = currOpacity;
					obj.imgDoms[inOrd].style.opacity = 1 - currOpacity;
				},1);
			}
		}
	}

$(function(){
	//new一个轮播图
	let lunbotu = new Lunbotu({
		"boxDom":$("#banner")[0],
		"width":1226,
		"height":460,
		"imgs":["img/xmad_15281008179499_nDjKA.jpg","img/xmad_15281903421079_gNHme.jpg","img/xmad_152834130272_FMYlc.jpg","img/xmad_1528338897295_SexTp.jpg","img/xmad_15284583873858_RXFTn.jpg","img/xmad_15278464616714_okpnd.jpg"],
		"speed":2500
	});

	//页面初始的滚动条高度设置
	$(document).scrollTop(120);


	//倒计时
	let $hours = $(".hours");
	let $minutes = $(".minutes");
	let $seconds = $(".seconds");
	let minSeconds = 24*60*60*1000;
	let date = new Date(minSeconds);
	let lessTimer = setInterval(function(){
		minSeconds -= 3;
		date.setTime(minSeconds);
		$hours.html(date.getHours());
		$minutes.html(date.getMinutes());
		$seconds.html(date.getSeconds());
	});

	//other-list元素hover样式改变
	let $otherList = $(".other-list li");
	$otherList.eq(0).addClass("focus");
	$otherList.mouseenter(function(){
		$otherList.removeClass("focus");
		$(this).addClass("focus");
	})

	//部分元素需要包裹超链接
	let a = document.createElement("a");
	a.href = "#";
	let $commandGood = $(".command-good");
	$commandGood.wrap(a);

	let $item = $(".item");
	$item.wrapInner(a);

	let $friends = $(".friends img");
	$friends.wrap(a);

	let $searchGoodList = $(".search-good-list li");
	$searchGoodList.wrap(a);


	//回到顶部按钮的显示或隐藏判断
	$(document).scroll(function(){
		if($(document).scrollTop() > $(window).height()){
		//滚动条高度大于一屏显示回到顶部
			$(".go-to-top").css("display","block");
		}else{
			$(".go-to-top").css("display","none");
		}
	});

	let $allGoodsList = $(".all-goods-list li");
	let $allGoods = $(".all-goods");
	$allGoodsList.hover(function(){
		$allGoods.css("display","block");
	},function(){
		$allGoods.css("display","none");
	});

	$allGoods.load("agency.html#all-goods-1");
	$allGoods.mouseover(function(){
		$allGoods.css("display","block");
	});
	$allGoods.mouseout(function(){
		$allGoods.css("display","none");
	});


	
	//nav区域的动画效果
	let $navMenu = $(".nav-menu");
	let $navGoods = $(".nav-goods");
	let entertimer = null;
	let leavetimer = null;
	let height = 230;
	let step = 8;
	let currHeight1 = 0;
	let currHeight2 = 230;
	function enter(){
		entertimer = setInterval(function(){
			currHeight1 += step;
			$navGoods.css("height",currHeight1 + "px");
			if(currHeight1 >= height){
				clearInterval(entertimer);
				currHeight1 = 0;
			}
		},1);
	}
	function leave(){
		leavetimer = setInterval(function(){
			currHeight2 -= step;
			$navGoods.css("height",currHeight2 + "px");
			if(currHeight2 <= 0){
				clearInterval(leavetimer);
				currHeight2 = 230;
			}
		},1);
	}
	
	$navMenu.mouseenter(function(){
		enter();
	});
	$navMenu.mouseleave(function(){
		leave();
	});
	$navGoods.mouseenter(function(){
		clearInterval(leavetimer);
	});
	$navGoods.mouseleave(function(){
		leave();
	});


	//搜索框的动态效果
	let $searchInput = $("#search-input");
	let $searchBtn = $("#search-btn");
	let $search = $(".search");
	let $commandA = $(".command-a");
	let focusTimer = null;
	$searchInput.focus(function(){
		$(".search-good-list").css("display","block");
		$searchInput.css("border","1px solid #ff6700");
		$searchBtn.css("border","1px solid #ff6700");
		$searchBtn.css("border-left","0px");
		$commandA.css("opacity","0");
	});
	$searchInput.blur(function(){
		$(".search-good-list").css("display","none");
		$searchInput.css("border","1px solid #e0e0e0");
		$searchBtn.css("border","1px solid #e0e0e0");
		$searchBtn.css("border-left","0px");
		$commandA.css("opacity","1");
	});
	$search.mouseover(function(){
		$searchInput.css("border","1px solid #b0b0b0");
		$searchBtn.css("border","1px solid #b0b0b0");
		$searchBtn.css("border-left","0px");
	});
	$search.mouseout(function(){
		$searchInput.css("border","1px solid #e0e0e0");
		$searchBtn.css("border","1px solid #e0e0e0");
		$searchBtn.css("border-left","0px");
	});

});
