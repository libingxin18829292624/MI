$(function(){


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

	$(".main-left li").wrapInner("<a href='#'></a>");

	$(".init-li a").addClass("focus");
});