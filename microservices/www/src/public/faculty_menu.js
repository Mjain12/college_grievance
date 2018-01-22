$(document).ready(function(){ 
  
    //Id=document.cookie;
    //alert(Id);
    profileflag=0;
    statusflag=0;
    $("#clear").click(function(){
      hidden();
      $("#report").show();
    });
    profile();
});

function profile(){
    Id = (document.cookie).split("&");
    DB=Id[1];
    Id=Id[0];
    //alert(document.cookie);
    if(DB=="faculty"){
     select_id={"faculty_id" : {"$eq": Id} };
    }
    else if(DB=="institute_level_faculty"){
      PROBLEMS={"stage" : {"$eq": 2} };
      select_id={"faculty_id" : {"$eq": Id} };;
    }
    else if(DB=="central_grievance_redressal_faculty"){
      PROBLEMS={"stage" : {"$eq": 3} };
      select_id={"faculty_id" : {"$eq": Id} };;
    }

 	  hidden();
        if(document.getElementById("text").value!="profile" && profileflag==0){

            $("#text").show();
              
              $.ajax({
                url: "https://data.bulimic45.hasura-app.io/v1/query",
                contentType: "application/json",
                data: JSON.stringify({
                                "type": "select",
                               "args": {
                                      "table": DB,
                                      "columns": [
                                            "*"
                                      ],
                                      "where": select_id
                                }
                          }),
                type: "POST",
                dataType: "json"
              }).done(function(json) {
                  //alert(json[0][0]);
                  if(json.length==1)
                  {
                    profile_row=json[0];
                    if(DB=="faculty")
                        PROBLEMS={"$and": [ {  "department": {  "$eq": profile_row["department"]}},{"stage": {"$eq": "1"}}]};
                    //alert(row["fname"]);
                    result='<b>Name: &emsp;</b><span style="margin-left:90px;"></span>'+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+'<br><br><b>faculty Id:&emsp;<span style="margin-left:58px;"></span></b>'+profile_row['faculty_id']+'<br><br><b>Department:</b>&emsp;<span style="margin-left:45px;"></span>'+profile_row['department']+'<br><br><b>Mobile no:&emsp;<span style="margin-left:55px;"></span>+91</b>'+profile_row['mobile']+'<br><br><b>Email:&emsp;<span style="margin-left:85px;"></span></b>'+profile_row['email']+"<br><br>";
                    $("#text").append(result);
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
 function Form()
 {
    hidden();
    dat();
    $("#griv_form").show();
 }
 function hidden()
 {
    
    $("#griv_form").hide();
    $("#text").hide();
    $("#griv_status").hide();
    $('#problems').empty();
    $("#report").hide();
 }
 function dat()
 {
    var date=new Date();
    var val=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    var time=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    if($("#Date").val()!="date"){
     
     $("#Date").append(val);
     $("#Time").append(time);
     $("#Date").val("date");
   }

 }
 function dept()
 {
    var dep = document.getElementById("Grievance_Category").value;
    $("#griv_dept").empty();    
    if(dep=="Academic" || dep=="Grievance related to Attendance" || dep=="Harassment by colleague students or the teachers etc"){
       $("#griv_dept").empty();
       $("#griv_dept").append("Department Level Grievance Redressal Committee");
       
    }
    else if(dep!="")
    {
        $("#griv_dept").empty();
       $("#griv_dept").append("Institution Level Grievance Redressal Committee");
       
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
                        "where": PROBLEMS
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
   //alert(Name);
   hidden();
   //alert(prob);
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
            $('#problems').append("<b>Subject</b>&emsp;&emsp;"+json[0]["subject"]+"<br><b><br>Posted by, Name:&emsp;</b>"+json[0]["student_name"]+"&emsp;&emsp;<b>University Register No:&emsp;</b>"+json[0]["student_university_id"]+"<br><b>Date:&emsp;</b>"+json[0]["date"]+"-"+json[0]['month']+"-"+json[0]['year']+"&emsp;&emsp;<b>Time:</b>&emsp;"+json[0]["time"]+"<br><b>References:</b>&emsp;"+json[0]["reference"]+"<br><b>Category:</b>&emsp;"+json[0]["category"]+"&emsp;&emsp;<b>committee:</b>&emsp;"+json[0]["committee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json[0]["problem_description"]+"<br><br>");
            if(DB=="faculty")
              $('#problems').append("<br><b>Solution</b><br>");
            else if(DB=="institute_level_faculty")
              $('#problems').append("<br><b>Department level Grievance Redressal Committee Solution</b><br>&emsp;&emsp;"+json[0]["hod_solution"]+"<br><b>Institute level Grievance Redressal Committee Solution</b><br>");
            else if(DB=="central_grievance_redressal_faculty")
              $('#problems').append("<br><b>Department level Grievance Redressal Committee Solution</b><br>&emsp;&emsp;"+json[0]["hod_solution"]+"<br><b>Institute level Grievance Redressal Committee Solution</b><br>&emsp;&emsp;"+json[0]["dean_solution"]+"<br><b>Central Grievance Redressal Committee</b><br>");
            $('#problems').append('<form name="solution" id="solution" value ="'+Name+'" action="#" method ="post" onsubmit = "return solution()"><textarea cols="10" rows="10" class="form-control" id="Grievance_solution"></textarea><br><input type="submit" name="submit" value="submit">&emsp;<input type="reset" name="reset" value="reset"></form><br>');
                          $("form").submit(function(event){
                      // Stop form from submitting normally
                      //$("form").trigger('reset');
                      event.preventDefault();
                      var problem_solution_value=(document.getElementById("Grievance_solution").value).split("\n");
                      var problem_solution_data=problem_solution_value.join("<br>");
                      problem_solution_data=(problem_solution_data.split("\"")).join("'");                        
                      problem_solution_data=(problem_solution_data.split("\t")).join("&emsp;&emsp;");
                                              
                            if(DB=="faculty"){
                                 SOLUTION={
                                            "hod_solution": problem_solution_data,
                                            "favourable": "NULL",
                                            "status": "Available"
                                      };
                                }
                                else if(DB=="institute_level_faculty"){
                                   SOLUTION={
                                            "dean_solution": problem_solution_data,
                                            "favourable": "NULL",
                                            "status": "Available"
                                      };                                }
                                else if(DB=="central_grievance_redressal_faculty"){
                                     SOLUTION={
                                            "principal_solution": problem_solution_data,
                                            "favourable": "NULL",
                                            "status": "Available"
                                      };
                                }

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
                                      "$set": SOLUTION
                                }
                            }),
                            type: "POST",
                            dataType: "json"
                          }).done(function(json1) {
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
                                      "sub": "You Have successfully  posted the solution for the "+json[0]["subject"],
                                      "text": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",\nGreetings from SVCE Grievance Redressal System.!! You have successfully posted  the soltion for the subject:"+json[0]["subject"]+"<br>Regards,SVCE Grievance Team",
                                      "html": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",<br><br>Greetings from SVCE Grievance Redressal System.!!<br>You have successfully posted the soltion for the subject:"+json[0]["subject"]+"<br>Regards,<br>SVCE Grievance Team<br>"
                                  }),
                                  type: "POST",
                                  dataType: "json"
                                });
                                $.ajax({
                                  url: "https://notify.bulimic45.hasura-app.io/v1/send/email",
                                  contentType: "application/json",
                                  headers: {
                                      "Authorization": "Bearer 4af1623b3c51f78e03754e69c60d3490f5509de98a7cc57a"
                                  },
                                  data: JSON.stringify({
                                      "to": json[0]["student_email"],
                                      "from": "clggrievances@gmail.com",
                                      "fromName": "SVCE Grievance Redressal Committee",
                                      "sub": "Solution for your problem is Available!!!!",
                                      "text": "Dear "+json[0]['student_name']+",\nGreetings from SVCE Grievance Redressal System.!!The soltion for the subject:"+json[0]["subject"]+"<br>is Available now, and you can view it our portal,Thank you,with Regards,SVCE Grievance Team",
                                      "html": "Dear "+json[0]['student_name']+",<br><br>Greetings from SVCE Grievance Redressal System.!!<br>The soltion for the subject:"+json[0]["subject"]+"<br>is Available now, and you can view it our portal,Thank you,with Regards,<br>SVCE Grievance Team<br>"
                                  }),
                                  type: "POST",
                                  dataType: "json"
                                });
                          alert("Congragulation you have succesfully posted the problem");
                          window.open("./faculty_menu.html","_self");
                          }).fail(function(xhr, status, errorThrown) {
                            console.log("Error: " + errorThrown);
                            console.log("Status: " + status);
                            console.dir(xhr);
                          });
                  });
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
          if(DB=="faculty")
              $('#problems').append("<b>subject</b>&emsp;&emsp;"+json_solution[0]["subject"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"-"+json_solution[0]["month"]+"-"+json_solution[0]["year"]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["reference"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>committee:</b>&emsp;"+json_solution[0]["committee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_description"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>");
          else if(DB=="institute_level_faculty")
               $('#problems').append("<b>subject</b>&emsp;&emsp;"+json_solution[0]["subject"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"-"+json_solution[0]["month"]+"-"+json_solution[0]["year"]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["reference"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>committee:</b>&emsp;"+json_solution[0]["committee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_description"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>"+"<br><br><b>Institute level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["dean_solution"]+"<br><br>");
          else if(DB =="central_grievance_redressal_faculty")
               $('#problems').append("<b>subject</b>&emsp;&emsp;"+json_solution[0]["subject"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"-"+json_solution[0]["month"]+"-"+json_solution[0]["year"]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["reference"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>committee:</b>&emsp;"+json_solution[0]["committee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_description"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>"+"<br><br><b>Institute level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["dean_solution"]+"<br><br>"+"<br><br><b>Central Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["principal_solution"]+"<br><br>");
          
          if(json_solution[0]["favourable"]=="favourable")
            $('#problems').prepend("<span style='background-color:lightgreen;'><b>Solution Satisfied</b></sapan><br>");
          else if(json_solution[0]["favourable"]=="notfavourable")
            $('#problems').prepend("<span style='background-color:red;'><b>Solution NOT Satisfied</b></sapan><br>");
          

        }).fail(function(xhr, status, errorThrown) {
          console.log("Error: " + errorThrown);
          console.log("Status: " + status);
          console.dir(xhr);
        });
   document.getElementById("text").value="solution";
   return true;
   
 }
function showproblem(problem_name){
  problem_name="#Problem"+problem_name;
  $(problem_name).slideToggle();
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
                        "department": {
                            "$eq": profile_row["department"]
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
            dept_fav_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
          }
          else if(json[i]["favourable"]=="notfavourable"){
            dept_unfav_prob_count++;
            dept_unfav_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
          }
          else{
            dept_unseen_prob_count++;
            dept_unseen_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
          }
          
        }
        else{
          dept_unsolved_prob_count++;
          dept_unsolved_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
            
        }

      }
      else if(json[i]["stage"]==2){
          if(json[i]["status"]=="Available"){
          if(json[i]["favourable"]=="favourable"){
            ins_fav_prob_count++;
            ins_fav_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
          }
          else if(json[i]["favourable"]=="notfavourable"){
            ins_unfav_prob_count++;
            ins_unfav_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
          }
          else{
            ins_unseen_prob_count++;
            ins_unseen_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"'style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
          
          }       
        }
        else{
            ins_unsolved_prob_count++;
            ins_unsolved_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
          
        }
      }
      else{
            if(json[i]["status"]=="Available"){
              if(json[i]["favourable"]=="favourable"){
              cen_fav_prob_count++;
              cen_fav_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
            }
            else if(json[i]["favourable"]=="notfavourable"){
              cen_unfav_prob_count++;
              cen_unfav_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
            }
            else{
              cen_unsolved_prob_count++;
              cen_unsolved_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
            }
          }
          else{
              cen_unseen_prob_count++;
              cen_unseen_prob="<div style='margin-top:10px;'>&emsp;&emsp;&emsp;<b>Subject: "+json[i]["subject"]+"</b>&emsp;&emsp;<b>Date: </b>"+json[i]["date"]+"-"+json[i]["month"]+"-"+json[i]["year"]+"&emsp;&emsp;<b>Time: </b>"+json[i]["time"]+"<span class=\"addbtn\" onclick='showproblem(\""+json[i]["problem_id"]+"\")'>+</span><br>&emsp;&emsp;&emsp;<b>Category: </b>"+json[i]["category"]+"</div><div id='Problem"+json[i]["problem_id"]+"' style='margin-left:70px;display:none;margin-bottom:10px;'></div>";
              
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
  $("#datareport").append("<br><h4><b>Department Level Problems<b></h4><br><h5>&emsp;<b>favourable Problems</b></h5>"+dept_fav_prob+"<h5>&emsp;<b>Unfavourable Problems</b></h5>"+dept_unfav_prob+"<h5>&emsp;<b>UnSeen Problems</b></h5>"+dept_unseen_prob+"<h5>&emsp;<b>Unsolved Problems</b></h5>"+dept_unsolved_prob);
  $("#datareport").append("<br><h4><b>Institute Level Problems<b></h4><br><h5>&emsp;<b>favourable Problems</b></h5>"+ins_fav_prob+"<h5>&emsp;<b>Unfavourable Problems</b></h5>"+ins_unfav_prob+"<h5>&emsp;<b>UnSeen Problems</b></h5>"+ins_unseen_prob+"<h5>&emsp;<b>Unsolved Problems</b></h5>"+ins_unsolved_prob);
  $("#datareport").append("<br><h4><b>Central Level Problems<b></h4><br><h5>&emsp;<b>favourable Problems</b></h5>"+cen_fav_prob+"<h5>&emsp;<b>Unfavourable Problems</b></h5>"+cen_unfav_prob+"<h5>&emsp;<b>UnSeen Problems</b></h5>"+cen_unseen_prob+"<h5>&emsp;<b>Unsolved Problems</b></h5>"+cen_unsolved_prob);
  
  for(var i=0;i<json.length;i++){
        var divid=("#Problem"+json[i]["problem_id"]);

        if(json[i]["stage"]==1){
            
            //alert(divid)
            if(json[i]["status"]=="Available"){
              $(divid).append("</b><h5>Problem Statement:</h5><br>"+json[i]["problem_description"]+"<br><b>Department Level Committee Solution:</b><br>"+json[i]["hod_solution"]+"<br>");
            }
            else{
              $(divid).append("<b>Problem Statement:</b><br>"+json[i]["problem_description"]+"<br>");
                
            }

          }
         else if(json[i]["stage"]==2){
              if(json[i]["status"]=="Available"){
                  $(divid).append("<b>Problem Statement:</b><br>"+json[i]["problem_description"]+"<br><b>Department Level Committee Solution:</b><br>"+json[i]["hod_solution"]+"<br><b>Institute Level Committee Solution:</b><br>"+json[i]["dean_solution"]+"<br>");
            
            }
            else{
                $(divid).append("<b>Problem Statement:</b><br>"+json[i]["problem_description"]+"<br><b>Department Level Committee Solution:</b><br>"+json[i]["hod_solution"]+"<br>");   
            }
          }
          else{
                if(json[i]["status"]=="Available"){
                                    $(divid).append("<b>Problem Statement:</b><br>"+json[i]["problem_description"]+"<br><b>Department Level Committee Solution:</b><br>"+json[i]["hod_solution"]+"<br><b>Institute Level Committee Solution:</b><br>"+json[i]["dean_solution"]+"<br><b>Central Level Committee Solution:</b><br>"+json[i]["principal_solution"]+"<br>");
              }
              else{
                                  $(divid).append("<b>Problem Statement:</b><br>"+json[i]["problem_description"]+"<br><b>Department Level Committee Solution:</b><br>"+json[i]["hod_solution"]+"<br><b>Institute Level Committee Solution:</b><br>"+json[i]["dean_solution"]+"<br>"); 
              }
          }
        


    }
  }
  //$("#problemscount").append(json.length);
}).fail(function(xhr, status, errorThrown) {
  alert("error");
  console.log("Error: " + errorThrown);
  console.log("Status: " + status);
  console.dir(xhr);
});
  
}
function filedownload(){

      /*var options = {};
      var doc = new jsPDF('p', 'pt', 'a4');
      /*pdf.addHTML($("#datareport"), 15, 15, options, function() {
        pdf.save('pageContent.pdf');
      });
    var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
	};

    doc.fromHTML($('#datareport').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');
    */
        var doc = new jsPDF();
        var specialElementHandlers = {
      '#[id^=Problem]': function (element, renderer) {
      return true;
      }
      };
      margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 100
        };
      alert($('#datareport')[0].value);
      doc.fromHTML($('#datareport')[0],margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                doc.save('report.pdf');
            }, margins
        );
}