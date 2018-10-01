//include packages
var cassandra = require("cassandra-driver");
var async = require('async');
//connect to the cluster
var client = new cassandra.Client({contactPoints:['127.0.0.1'],keyspace:'demo'});
//read users and print to console
client.execute("SELECT lastname, age, city, email, firstname FROM users WHERE email='bob@gg.com'", function(err,result){
	if(!err){
		if(result.rows.length>0){
			var user = result.rows[0];
			console.log("name = %s, age =%d", user.firstname, user.age);
		}else{
			console.log("No results");
		}
	}else {
		console.log(err);
	}
	
})

var express=require("express");
var app=express();
app.get("/",function(req,res){
	res.send("Hello Angel");
})
app.listen(3000,function(){
	console.log("Server Started");
})
