$(function(){

	//footer字体颜色变化
	let $someFunc = $(".some-func a");
	$someFunc.click(function(){
		$someFunc.removeClass("focus-func");
		$(this).addClass("focus-func");
	});


	$(".footer-self").load("login.html .footer");
	$(".agree i").click(function(){
		$(".agree i").toggleClass("selected");
	});
});