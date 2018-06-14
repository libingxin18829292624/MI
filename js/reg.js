$(function(){

	//footer字体颜色变化
	let $someFunc = $(".some-func a");
	$someFunc.click(function(){
		$someFunc.removeClass("focus-func");
		$(this).addClass("focus-func");
	});


	//协议的选中和非选中样式改变
	$(".agree i").click(function(){
		$(".agree i").toggleClass("selected");
	});

	//登录验证
	let $username = $("#username");
	let $password = $("#password");
	let $checkMa = $("#check-ma");
	let $error = $(".error");
	let $select = $(".agree i");
	let $reg = $("#reg");

	let usernameReg = /^[a-zA-Z]\w{5,15}$/;
	let passwordReg1 = /^\S{6,16}$/;
	let passwordReg2 = /^\d{6,16}$/;
	let usernameCheck = false;
	let passwordCheck = false;
	let checkMaCheck = false;
	let selectCheck = false;
	let checkmaArr = [{
						"url":"img/QQ截图20180613140856.png",
						"data":"79vs"
					  },
					  {
						"url":"img/QQ截图20180613175150.png",
						"data":"v9am"
					  }
					 ];
	let random = 0;
	let canReg = false;

	$username.focusout(function(){
		// let xhr = new XMLHttpRequest();
		// xhr.open("post","user.php",true);
		// xhr.onreadystatechange = function(){
		// 	if(xhr.readyState == 4 && xhr.status == 200){
		// 		if(xhr.responseText == 0){	
		// 			$error.html('<i class="iconfont">&#xe633;</i> 此帐号已存在！');
		// 		}
		// 	}
		// }
		// xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		// xhr.send("username=" + str);
		let str = $username.val();
		let usernamePhpCheck = false;
		
		if(str == ""){
			$error.html('<i class="iconfont">&#xe633;</i> 请填写帐号！');
			usernameCheck = false;
		}else{
			$.post("user.php",{
					"username":$username.val(),
					"password":$password.val(),
					"type":0
				},function(data){
					if(data == 0){
						$error.html('<i class="iconfont">&#xe633;</i> 此帐号已存在！');
						usernamePhpCheck = false;
						usernameCheck = false;
						$username.addClass("red-border");
					}else{
						usernamePhpCheck = true;
						$username.removeClass("red-border");
						if(usernameCheck == true){
							$error.html('&nbsp;');
						}
					}
			});
			if(usernameReg.test(str) == true){
				usernameCheck = true;
				if(usernamePhpCheck == true){
					$username.removeClass("red-border");
				}
				
				$error.html("&nbsp;");
			}else{
				usernameCheck = false;
				$error.html('<i class="iconfont">&#xe633;</i> 帐号格式不正确！');

			}
		}
		if(usernameCheck == false){
			$username.addClass("red-border");
		}
		checkSelect();
		checkAll();
	});
	$password.focusout(function(){
		let str = $password.val();
		if(passwordReg1.test(str) == true && passwordReg2.test(str) == false){
			passwordCheck = true;
			$password.removeClass("red-border");
			$error.html("&nbsp;");
		}else{
			passwordCheck = false;
			$error.html('<i class="iconfont">&#xe633;</i> 密码格式不正确！');
			$password.addClass("red-border");
		}
		checkSelect();
		checkAll();
	});
	$checkMa.focusout(function(){
		let str = $checkMa.val();
		if(str.toLowerCase() == checkmaArr[random].data){
			checkMaCheck = true;
			$checkMa.removeClass("red-border");
			$error.html("&nbsp;");
		}else{
			checkMaCheck = false;
			$error.html('<i class="iconfont">&#xe633;</i> 验证码不正确！');
			$checkMa.addClass("red-border");
		}
		checkSelect();
		checkAll();
	});

	$select.click(function(){
		checkSelect();
		checkAll();
	});

	function checkSelect(){
		if($select.hasClass("selected") == true){
			selectCheck = true;
		}else{
			selectCheck = false;
		}
	}

	function checkAll(){
		if(usernameCheck == true && passwordCheck == true && checkMaCheck == true && selectCheck == true){
			canReg = true;
		}else{
			canReg = false;
		}
	}

	function changeMa(){
		random = parseInt(Math.random() * checkmaArr.length);
		$(".check-img").attr("src",checkmaArr[random].url);
	}
	changeMa();

	$(".check-img").click(function(){
		changeMa();
	});

	$reg.click(function(){
		checkAll();
		if(canReg == true){
			$.post("user.php",{
				"username":$username.val(),
				"password":$password.val(),
				"type":1
			},function(data){
				if(data == 1){
					location.href = "regSuccess.html";
				}
			});
		}
	})
});