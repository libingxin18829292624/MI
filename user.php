<?php 
	
	$username = $_POST['username'];
	$password = $_POST['password'];
	$type = $_POST['type'];


	if($type == 0){
		$conn = mysql_connect("localhost","root","root");
		mysql_select_db("mi",$conn);

		//查询用户名是否存在
		$query = "select * from miaccount where username='".$username."'";
		$table = mysql_query($query,$conn);
		$rows = mysql_num_rows($table);
		if($rows > 0){
			echo 0;
		}else{
			echo 1;
		}
		mysql_close($conn);
	}else if($type == 1){
		$conn = mysql_connect("localhost","root","root");
		mysql_select_db("mi",$conn);

		//查询用户名是否存在
		$query = "insert into miaccount values('".$username."','".$password."')";
		mysql_query($query,$conn);
		echo 1;
		mysql_close($conn);
	}else if($type == 2){
		$conn = mysql_connect("localhost","root","root");
		mysql_select_db("mi",$conn);

		//查询用户名是否存在
		$query = "select * from miaccount where username='".$username."' and password='".$password."'";
		$table = mysql_query($query,$conn);
		$rows = mysql_num_rows($table);
		if($rows > 0){
			echo 1;
		}else{
			echo 0;
		}
		mysql_close($conn);
	}

 ?>