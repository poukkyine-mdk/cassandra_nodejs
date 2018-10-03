var courses_data=[{
	courseCode:"INFS4332",
	courseName:"How to have a life",
	courseLecturer:"Mr Pouk",	
}];

//include packages
var cassandra = require("cassandra-driver");
var async = require('async');
//connect to the cluster
var client = new cassandra.Client({contactPoints:['172.18.0.22'],keyspace:'demo'});
var str="working"

var express=require("express");
var app=express();

app.set("view engine","ejs");

app.get("/",function(req,res){
	//read users and print to console
client.execute("SELECT lastname, age, city, email, firstname FROM users WHERE email='bob@gg.com'", function(err,result){
	if(!err){
		if(result.rows.length>0){
			var user = result.rows[0];
			console.log("name = %s, age =%d", user.firstname, user.age);
			str+= "name = %s, age =%d", user.firstname, user.age
		}else{
			console.log("No results");
		}
	}else {
		console.log(err);
		str+=err;
	}
	
})
	res.send(str);
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

app.listen(3000,function(){
	console.log("Server Started");
})
