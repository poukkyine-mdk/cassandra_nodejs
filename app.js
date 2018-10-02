var courses_data=[{
	courseCode:"INFS4332",
	courseName:"How to have a life",
	courseLecturer:"Mr Pouk",	
}];

//include packages
var cassandra = require("cassandra-driver");
var async = require('async');
//connect to the cluster
var client = new cassandra.Client({contactPoints:['127.0.0.1'],keyspace:'demo'});
//read users and print to console

var express=require("express");
var app=express();

app.set("view engine","ejs");
var str="";
app.get("/",function(req,res){
	client.execute("SELECT lastname, age, city, email, firstname FROM users WHERE email='bob@gg.com'", function(err,result){
		if(!err){
			if(result.rows.length>0){
				var user = result.rows[0];
				str+="name = %s, age =%d", user.firstname, user.age;
			}else{
				str+="no result";
			}
		}else {
			str+="no result";
		}
		
	})
	res.send(str)
})

app.get("/courses",function(req,res){
	res.render("courses")
})
app.post("/courses",function(req,res){
	res.redirect("/courses")
})
app.get("/courses/new",function(req,res){
	res.render("new_course")
})

app.listen(8081,function(){
	console.log("Server Started");
})
