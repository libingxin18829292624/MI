$(function(){

	//footer字体颜色变化
	let $someFunc = $(".some-func a");
	$someFunc.click(function(){
		$someFunc.removeClass("focus-func");
		$(this).addClass("focus-func");
	});


	//登录方式改变的js
	let $loginMethod = $(".login-method span");
	$loginMethod.click(function(){
		$loginMethod.removeClass("checked");
		$(this).addClass("checked");
	});

	$(".login-acount").click(function(){
		$(".login-div-acount").css("display","block");
		$(".login-div-ma").css("display","none");
	});
	$(".login-ma").click(function(){
		$(".login-div-acount").css("display","none");
		$(".login-div-ma").css("display","block");
	});

	$("#user-name");
	$("#pass-word");

	let usernameCheck = false;
	let passwordCheck = false;

	$("#log-in").click(function(){
		if($("#user-name").val() == "" || $("#pass-word").val() == ""){
			$(".error").html("帐号密码不能为空！");
		}else{
			$.post("user.php",{
				"username":$("#user-name").val(),
				"password":$("#pass-word").val(),
				"type":2
			},function(data){
				if(data == 1){
					location.href = "index.html";
				}else{
					$(".error").html("帐号密码不正确！");
				}
			});
		}
	})


});