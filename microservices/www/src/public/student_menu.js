
$(document).ready(function(){
    profileflag=0;
    statusflag=0;
    profile(); 
    //alert(Id);
    $("form").submit(function(event){
        // Stop form from submitting normally
        //$("form").trigger('reset');
        event.preventDefault();
      var problem_description_value=(document.getElementById("Grievance").value).split("\n");
      var problem_description_data=problem_description_value.join("<br>");
      problem_description_data=(problem_description_data.split("\"")).join("'");
      problem_description_data=(problem_description_data.split("\t")).join("&emsp;&emsp;");
                $.ajax({
                          url: "https://data.bulimic45.hasura-app.io/v1/query",
                          contentType: "application/json",
                          data: JSON.stringify({
                              "type": "insert",
                              "args": {
                                    "table": "Grievance",
                                    "objects": [
                                          {
                                                "student_name": profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname'],
                                                "student_clg_id": profile_row['clg_id'],
                                                "student_university_id": profile_row['university reg_no'],
                                                "stage": "1",
                                                "status": "Problem Posted",
                                                //"problem_id": new_id,
                                                "problem_description": problem_description_data,
                                                "subject": document.getElementById("griv_name").value,
                                                "date": (($('#Time').val()).split(" ")[0]).split("-")[2],
                                                "month": (($('#Time').val()).split(" ")[0]).split("-")[1],
                                                "year": (($('#Time').val()).split(" ")[0]).split("-")[0],
                                                "time": ($('#Time').val()).split(" ")[1],
                                                "reference": document.getElementById("ref").value,
                                                "category": document.getElementById("Grievance_Category").value,
                                                "committee": "Department level Grievance Redressal Committee",
                                                "department": profile_row['department'],
                                                "student_email":profile_row['email'],
                                                "student_mobile":profile_row['mobile'],
                                                "seen":"Not Seen"
                                          }
                                    ]
                              }
                          }),
                          type: "POST",
                          dataType: "json"
                        }).done(function(json) {
                              $.ajax({
                                  url: "https://notify.bulimic45.hasura-app.io/v1/send/email",
                                  contentType: "application/json",
                                  headers: {
                                      "Authorization": "Bearer 4af1623b3c51f78e03754e69c60d3490f5509de98a7cc57a"
                                  },
                                  data: JSON.stringify({
                                      "to": profile_row["email"],
                                      "from": "clggrievances@gmail.com",
                                      "fromName": "SVCE Grievance Redressal Committee",
                                      "sub": "successfully  post of your grievance",
                                      "text": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",\nGreetings from SVCE Grievance Redressal System.!! You have successfully posted your Problem to Department level Grievance Redressal Committee and \nYou will soon recieve the solution for your problem from our committee Regards,SVCE Grievance Team",
                                      "html": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",<br><br>Greetings from SVCE Grievance Redressal System.!!<br>You have successfully posted your Problem to Department level Grievance Redressal Committee and <br>You will soon recieve the solution for your problem from our committee<br><br>Regards,<br>SVCE Grievance Team<br>"
                                  }),
                                  type: "POST",
                                  dataType: "json"
                                });
                          alert("Congragulation you have succesfully posted the problem");
                          window.open("./student_menu.html","_self");
                        }).fail(function(xhr, status, errorThrown) {
                          console.log("Error: " + errorThrown);
                          console.log("Status: " + status);
                          console.dir(xhr);
                        }); 
                              

    });
    $("#clear").click(function(){
        //alert(document.getElementById("text").html());
        hidden();
        $("#report").show();

    }); 

});


 function hidden()
 {
    $("#griv_form").hide();
    $("#text").hide();
    $("#griv_status").hide();
    $('#problems').empty();
    $("#report").hide();

 }

function profile(){
    hidden();
    Id = (document.cookie).split("&")[0];
    //alert(Id);
        if(document.getElementById("text").value!="profile" && profileflag==0){

            $("#text").show();

              $.ajax({
                url: "https://data.bulimic45.hasura-app.io/v1/query",
                contentType: "application/json",
                data: JSON.stringify({
                                "type": "select",
                                "args": {
                                      "table": "student",
                                      "columns": [
                                            "*"
                                      ],
                                      "where": {
                                            "clg_id": {
                                                  "$eq": Id
                                            }
                                      }
                                }
                          }),
                type: "POST",
                dataType: "json"
              }).done(function(json) {
                  //alert(json[0][0]);
                  if(json.length==1)
                  {
                    profile_row=json[0];
				    var result='<b>Name: &emsp;</b><span style="margin-left:90px;"></span>'+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+'<br><br><b>College Id:&emsp;<span style="margin-left:58px;"></span></b>'+profile_row['clg_id']+'<br><br><b>University Roll no:</b>&emsp;'+profile_row['university reg_no']+'<br><br><b>Department:</b>&emsp;<span style="margin-left:45px;"></span>'+profile_row['department']+'<br><br><b>Mobile no:&emsp;<span style="margin-left:55px;"></span>+91</b>'+profile_row['mobile']+'<br><br><b>Email:&emsp;<span style="margin-left:85px;"></span></b>'+profile_row['email']+"<br><br>";
                    $("#text").append(result);                
				    if(profile_row["count"]==1){
				    	document.getElementById('Agreement').style.display = "block";
				    }
                                      }
                  
              }).fail(function(xhr, status, errorThrown) {
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
              }); 
           document.getElementById("text").value="profile";
           profileflag=1;
    
    }
    else
        $("#text").show();
 }

function close_agreement(){
		//alert("hi")
		document.getElementById('Agreement').style.display = "none";
}
 function Form()
 {
 	hidden();
    dat();
    $("#griv_form").show();
 }

 function dat()
 {
    var date=new Date();
    var val=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    var time=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    if($("#Date").val()!="date")
    {
     
     $("#Date").append(val);
     $("#Time").append(time);
     $("#Date").val("date");
     $('#Time').val(val+" "+time);
     

   }

 }
 function dept()
 {
    var dep = document.getElementById("Grievance_Category").value;
    $("#griv_dept").empty();    
    if(dep!=""){
       $("#griv_dept").empty();
       $("#griv_dept").append("Department Level Grievance Redressal Committee");
       $("#griv_dept").val("Department%20Level%20Grievance%20Redressal%20Committee");
       
    }
    
 


    //$("#griv_dept").val(dep);
 }
 function clear_dept(){
    $("#griv_dept").empty();
 }
function status()
 {
    hidden();
    if(document.getElementById("text").value!="datas" && statusflag==0){
    $("#griv_status").show();
$.ajax({
  url: "https://data.bulimic45.hasura-app.io/v1/query",
  contentType: "application/json",
  data: JSON.stringify({
      "type": "select",
      "args": {
            "table": "Grievance",
            "columns": [
                  "department","student_clg_id","stage","status","time","student_university_id","category","subject","problem_id","committee","student_name","date","month","year","student_email","favourable","student_mobile","reference","seen"
            ],
            "where": {
                  "student_clg_id": {
                        "$eq": Id
                  }},"order_by": [
                        {
                            "column": "status",
                            "order": "asc"
                        }
                    ]
            
      }
  }),
  type: "POST",
  dataType: "json"
}).done(function(json) {
      result="";
      for(var i=0;i<json.length;i++){
           var row=json[i];
          if(row['status']=='Available')
            result+='<tr><td>'+(i+1)+'</td><td><a href="#" onclick=\'problem("'+row['problem_id']+'")\'>'+row['subject']+'</a></td><td>'+row['date']+"-"+row['month']+"-"+row['year']+'</td><td>'+row['time']+'</td><td>'+row['category']+'</td><td>'+row['reference']+'</td><td><a href="#" onclick=\'solution("'+row['problem_id']+'")\'>'+row['status']+'</a></td><td>'+row['seen']+'</td></tr>';
          else         
             result+='<tr><td>'+(i+1)+'</td><td><a href="#" onclick=\'problem("'+row['problem_id']+'")\'>'+row['subject']+'</a></td><td>'+row['date']+"-"+row['month']+"-"+row['year']+'</td><td>'+row['time']+'</td><td>'+row['category']+'</td><td>'+row['reference']+'</td><td>'+row['status']+'</td><td>'+row['seen']+'</td></tr>';
      }
      result+="</table>";
      $("#datas").append(result);
}).fail(function(xhr, status, errorThrown) {
  console.log("Error: " + errorThrown);
  console.log("Status: " + status);
  console.dir(xhr);
});
    document.getElementById("text").value="datas";
     statusflag=1;
  }
  else 
    $("#griv_status").show();
    


 }
 function problem(Name)
 {
   hidden();
        //$("#datas").append(result);
          $.ajax({
            url: "https://data.bulimic45.hasura-app.io/v1/query",
            contentType: "application/json",
            data: JSON.stringify({
                "type": "select",
                "args": {
                      "table": "Grievance",
                      "columns": [
                            "*"
                      ],
                      "where": {
                            "problem_id": {
                                  "$eq": Name
                            }
                      }
                }
            }),
            type: "POST",
            dataType: "json"
          }).done(function(json) {
            $('#problems').append("<b>Subject</b>&emsp;&emsp;"+json[0]["subject"]+"<br><br><b>Date:&emsp;</b>"+json[0]["date"]+"-"+json[0]['month']+"-"+json[0]['year']+"&emsp;&emsp;<b>Time:</b>&emsp;"+json[0]["time"]+"<br><b>References:</b>&emsp;"+json[0]["reference"]+"<br><b>Category:</b>&emsp;"+json[0]["category"]+"&emsp;&emsp;<b>committee:</b>&emsp;"+json[0]["committee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json[0]["problem_description"]+"<br><br>");
          }).fail(function(xhr, status, errorThrown) {
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
          });
   document.getElementById("text").value="problems";
   return true;
 }
 function solution(Name)
 {
  
    hidden();
        $.ajax({
          url: "https://data.bulimic45.hasura-app.io/v1/query",
          contentType: "application/json",
          data: JSON.stringify({
              "type": "select",
              "args": {
                    "table": "Grievance",
                    "columns": [
                          "*"
                    ],
                    "where": {
                          "problem_id": {
                                "$eq": Name
                          }
                    }
              }
          }),
          type: "POST",
          dataType: "json"
        }).done(function(json_solution) {
          STAGE=json_solution[0]["stage"];
          if(json_solution[0]["stage"]=="1")
              $('#problems').append("<b>Subject</b>&emsp;&emsp;"+json_solution[0]["subject"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"-"+json_solution[0]['month']+"-"+json_solution[0]['year']+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["reference"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>committee:</b>&emsp;"+json_solution[0]["committee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_description"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>");
          else if(json_solution[0]["stage"]=="2")
               $('#problems').append("<b>Subject</b>&emsp;&emsp;"+json_solution[0]["subject"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"-"+json_solution[0]['month']+"-"+json_solution[0]['year']+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["reference"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>committee:</b>&emsp;"+json_solution[0]["committee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_description"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>"+"<br><br><b>Institute level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["dean_solution"]+"<br><br>");
          else if(json_solution[0]["stage"]=="3")
               $('#problems').append("<b>Subject</b>&emsp;&emsp;"+json_solution[0]["subject"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"-"+json_solution[0]['month']+"-"+json_solution[0]['year']+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["reference"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>committee:</b>&emsp;"+json_solution[0]["committee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_description"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>"+"<br><br><b>Institute level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["dean_solution"]+"<br><br>"+"<br><br><b>Central Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["principal_solution"]+"<br><br>");
          if(json_solution[0]["favourable"]=="favourable")
            $('#problems').prepend("<span style='background-color:lightgreen;'><b>Solution Satisfied</b></sapan><br>");
          else if(json_solution[0]["favourable"]=="notfavourable")
            $('#problems').prepend("<span style='background-color:red;'><b>Solution NOT Satisfied</b></sapan><br>");
          else
            $('#problems').append("<br><input type=\"button\" onclick='return Solutionfavourable(\""+Name+"\")' value='Satisfied'>&emsp;&emsp;<input type=\"button\" onclick='return Solutionnotfavourable(\""+Name+"\")' value='Not Satisfied'><br>");
            
        }).fail(function(xhr, status, errorThrown) {
          console.log("Error: " + errorThrown);
          console.log("Status: " + status);
          console.dir(xhr);
        });
   document.getElementById("text").value="solution";
   return true;
 }
 function Solutionfavourable(Name){
                                $.ajax({
                                  url: "https://data.bulimic45.hasura-app.io/v1/query",
                                  contentType: "application/json",
                                  data: JSON.stringify({
                                      "type": "update",
                                      "args": {
                                            "table": "Grievance",
                                            "where": {
                                                  "problem_id": {
                                                        "$eq": Name
                                                  }
                                            },
                                            "$set": {
                                                  "favourable": "favourable",
                                                  "seen":"seen"
                                            }
                                      }
                                  }),
                                  type: "POST",
                                  dataType: "json"
                                });
                                alert("Thankyou for using our portal");
                                window.open("./student_menu.html","_self");
            }
function Solutionnotfavourable(Name){
                                //alert(STAGE);
                                if(confirm("Do you want to post this problem to higher level") && STAGE!="3"){
                                    if(STAGE=="1") STAGE="2",post_commitee="Institute level Grievance Redressal Committee";
                                    else if(STAGE=="2") STAGE="3",post_commitee="Central Grievance Redressal Committee";
                                  $.ajax({
                                        url: "https://notify.bulimic45.hasura-app.io/v1/send/email",
                                        contentType: "application/json",
                                        headers: {
                                            "Authorization": "Bearer 4af1623b3c51f78e03754e69c60d3490f5509de98a7cc57a"
                                        },
                                        data: JSON.stringify({
                                            "to": profile_row["email"],
                                            "from": "clggrievances@gmail.com",
                                            "fromName": "SVCE Grievance Redressal Committee",
                                            "sub": "successfully  post of your grievance",
                                            "text": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",\nGreetings from SVCE Grievance Redressal System.!! You have successfully posted your Problem to Higher level Grievance Redressal Committee and \nYou will soon recieve the solution for your problem from our committee Regards,SVCE Grievance Team",
                                            "html": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",<br><br>Greetings from SVCE Grievance Redressal System.!!<br>You have successfully posted your Problem to Higher level Grievance Redressal Committee and <br>You will soon recieve the solution for your problem from our committee<br><br>Regards,<br>SVCE Grievance Team<br>"
                                        }),
                                        type: "POST",
                                        dataType: "json"
                                      });

                                $.ajax({
                                  url: "https://data.bulimic45.hasura-app.io/v1/query",
                                  contentType: "application/json",
                                  data: JSON.stringify({
                                      "type": "update",
                                      "args": {
                                            "table": "Grievance",
                                            "where": {
                                                  "problem_id": {
                                                        "$eq": Name
                                                  }
                                            },
                                            "$set": {
                                                  "stage": STAGE,
                                                  "favourable":"NULL",
                                                  "seen":"Not Seen",
                                                  "status":"Problem Posted to Level "+STAGE,
                                                  "committee":post_commitee
                                            }
                                      }
                                  }),
                                  type: "POST",
                                  dataType: "json"
                                }).done(function(json) {
                                alert("Thankyou for using our portal your problem as been poster to higher level");
                                window.open("./student_menu.html","_self");
                              
                                }).fail(function(xhr, status, errorThrown) {
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                    console.dir(xhr);
                                  });
                                  
                                }
                              else {
                                $.ajax({
                                  url: "https://data.bulimic45.hasura-app.io/v1/query",
                                  contentType: "application/json",
                                  data: JSON.stringify({
                                      "type": "update",
                                      "args": {
                                            "table": "Grievance",
                                            "where": {
                                                  "problem_id": {
                                                        "$eq": Name
                                                  }
                                            },
                                            "$set": {
                                                  "favourable": "notfavourable",
                                                  "seen":"Seen"
                                            }
                                      }
                                  }),
                                  type: "POST",
                                  dataType: "json"
                                });
                                alert("Thankyou for using our portal");
                                window.open("./student_menu.html","_self");
                              } 
                            }
function report(){
	var fromdate=$("#fromdate").val();
	var todate=$("#todate").val();
	fromdate=fromdate.split("-");
	todate=todate.split("-");
	$("#datareport").empty();
	$.ajax({
	url: "https://data.bulimic45.hasura-app.io/v1/query",
	contentType: "application/json",
	data: JSON.stringify({
      "type": "select",
      "args": {
            "table": "Grievance",
            "columns": [
                  "stage",
                  "status",
                  "problem_id",
                  "problem_description",
                  "subject",
                  "reference",
                  "category",
                  "committee",
                  "favourable",
                  "hod_solution",
                  "dean_solution",
                  "principal_solution","date","month","time","year"
            ],
            "where": {
                  "$and": [
                        {
                              "$and": [
                                    {
                                          "date": {
                                                "$gte": fromdate[0]
                                          }
                                    },
                                    {
                                          "date": {
                                                "$lte": todate[0]
                                          }
                                    }
                              ]
                        },
                        {
                              "$and": [
                                    {
                                          "month": {
                                                "$gte": fromdate[1]
                                          }
                                    },
                                    {
                                          "month": {
                                                "$lte": todate[1]
                                          }
                                    }
                              ]
                        },
                        {
                              "$and": [
                                    {
                                          "year": {
                                                "$gte": fromdate[2]
                                          }
                                    },
                                    {
                                          "year": {
                                                "$lte": todate[2]
                                          }
                                    }
                              ]
                        },
                        {
		                    "student_clg_id": {
		                        "$eq": Id
		                    }
	                	}
                  ]
            }
      }
	}),
	type: "POST",
	dataType: "json"
}).done(function(json) {
	if(json.length==0)
	$("#datareport").append("no records found");
	else{
		$("#datareport").append("<b>Total no of problems Posted:</b> "+json.length);
	var dept_fav_prob="",dept_unfav_prob="",dept_unsolved_prob="",dept_unseen_prob="";
	var dept_fav_prob_count=0,dept_unfav_prob_count=0,dept_unsolved_prob_count=0,dept_unseen_prob_count=0;

	var ins_fav_prob="",ins_unfav_prob="",ins_unsolved_prob="",ins_unseen_prob="";
	var ins_fav_prob_count=0,ins_unfav_prob_count=0,ins_unsolved_prob_count=0,ins_unseen_prob_count=0;

	var cen_fav_prob="",cen_unfav_prob="",cen_unsolved_prob="",cen_unseen_prob="";
	var cen_fav_prob_count=0,cen_unfav_prob_count=0,cen_unsolved_prob_count=0,cen_unseen_prob_count=0;
	
	for(var i=0;i<json.length;i++){
		if(json[i]["stage"]==1){
				
				if(json[i]["status"]=="Available"){
					if(json[i]["favourable"]=="favourable"){
						dept_fav_prob_count++;
						dept_fav_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><br><div id='Problem"+json[i]["problem_id"]+"'></div>";
					}
					else if(json[i]["favourable"]=="notfavourable"){
						dept_unfav_prob_count++;
						dept_unfav_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:40px;'>"+"<b>Problem Statement:</b><br>"+json[i]["problem_description"]+"<br><b>Department Level Committee Solution:</b><br>"+json[i]["hod_solution"]+"<br>"+"</div>";
					}
					else{
						dept_unseen_prob_count++;
						dept_unseen_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><br><div id='Problem"+json[i]["problem_id"]+"'></div>";
					}
					
				}
				else{
					dept_unsolved_prob_count++;
					dept_unsolved_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><br><div id='Problem"+json[i]["problem_id"]+"'></div>";
						
				}

		  }
		  else if(json[i]["stage"]==2){
			  	if(json[i]["status"]=="Available"){
					if(json[i]["favourable"]=="favourable"){
						ins_fav_prob_count++;
						ins_fav_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><br><div id='Problem"+json[i]["problem_id"]+"'></div>";
					}
					else if(json[i]["favourable"]=="notfavourable"){
						ins_unfav_prob_count++;
						ins_unfav_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><br><div id='Problem"+json[i]["problem_id"]+"'></div>";
					}
					else{
						ins_unseen_prob_count++;
						ins_unseen_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><br><div id='Problem"+json[i]["problem_id"]+"'></div>";
					
					}		  	
				}
				else{
						ins_unsolved_prob_count++;
						ins_unsolved_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><br><div id='Problem"+json[i]["problem_id"]+"'></div>";
					
				}
		  }
		  else{
				  	if(json[i]["status"]=="Available"){
					  	if(json[i]["favourable"]=="favourable"){
							cen_fav_prob_count++;
							cen_fav_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><br><div id='Problem"+json[i]["problem_id"]+"'></div>";
						}
						else if(json[i]["favourable"]=="notfavourable"){
							cen_unfav_prob_count++;
							cen_unfav_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><br><div id='Problem"+json[i]["problem_id"]+"'></div>";
						}
						else{
							cen_unsolved_prob_count++;
							cen_unsolved_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><br><div id='Problem"+json[i]["problem_id"]+"'></div>";
						}
					}
					else{
							cen_unseen_prob_count++;
							cen_unseen_prob="<br><div>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><br><div id='Problem"+json[i]["problem_id"]+"'></div>";
							
					}
		  }
		


		}
	var dept_count=dept_fav_prob_count+dept_unfav_prob_count+dept_unseen_prob_count;
	var ins_count=ins_fav_prob_count+ins_unfav_prob_count+ins_unseen_prob_count;
	var cen_count=cen_fav_prob_count+cen_unfav_prob_count+cen_unseen_prob_count;
	var total_count=dept_count+ins_count+cen_count;
	var table_content="";
	table_content+="<br><table class=\"table table-striped\"><thead class=\"table-inverse\"><tr><th>Committee</th><th>Total posted</th><th>Solved</th><th>UnSolved</th><th>favourable</th><th>UnFaourable</th><th>Not Seen</th></tr></thead>";
	table_content+="<tbody><tr><td>Department level</td><td>"+(dept_count+dept_unsolved_prob_count)+"</td><td>"+dept_count+"</td><td>"+dept_unsolved_prob_count+"</td><td>"+dept_fav_prob_count+"</td><td>"+dept_unfav_prob_count+"</td><td>"+dept_unseen_prob_count+"</td></tr>";
	table_content+="<tr><td>Institute level</td><td>"+(ins_count+ins_unsolved_prob_count)+"</td><td>"+ins_count+"</td><td>"+ins_unsolved_prob_count+"</td><td>"+ins_fav_prob_count+"</td><td>"+ins_unfav_prob_count+"</td><td>"+ins_unseen_prob_count+"</td></tr>";
	table_content+="<tr><td>Central level</td><td>"+(cen_count+cen_unsolved_prob_count)+"</td><td>"+cen_count+"</td><td>"+cen_unsolved_prob_count+"</td><td>"+cen_fav_prob_count+"</td><td>"+cen_unfav_prob_count+"</td><td>"+cen_unseen_prob_count+"</td></tr></tbody></table>";
	$("#datareport").append("<br><b>Total no of problems solved:</b> "+total_count+table_content);
	$("#datareport").append("<br><h4><b>Department Level Problems<b></h4><br><h5>&emsp;<b>favourable Problems</b></h5>"+dept_fav_prob+"<h5>&emsp;<b>Unfavourable Problems</b></h5>"+dept_unfav_prob+"<h5>&emsp;<b>Unsolved Problems</b></h5>"+dept_unsolved_prob);
	
	/*for(var i=0;i<json.length;i++){
				var divid=("#problem"+json[i]["problem_id"]);

				if(json[i]["stage"]==1){
						
						alert(divid)
						if(json[i]["status"]=="Available"){
							$(divid).append("<b>Problem Statement:</b><br>"+json[i]["problem_description"]+"<br><b>Department Level Committee Solution:</b><br>"+json[i]["hod_solution"]+"<br>");
						}
						/*else{
								
						}*/

				  //}
				/*  else if(json[i]["stage"]==2){
					  	if(json[i]["status"]=="Available"){
						}
						else{
							
						}
				  }
				  else{
						  	if(json[i]["status"]=="Available"){
							}
							else{
									
							}
				  }*/
				


		//}
	}
	//$("#problemscount").append(json.length);
}).fail(function(xhr, status, errorThrown) {
	alert("error");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
});
	
}