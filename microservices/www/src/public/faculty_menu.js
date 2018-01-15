$(document).ready(function(){ 
  
    //Id=document.cookie;
    //alert(Id);
    profileflag=0;
    statusflag=0;
    $("#clear").click(function(){
        //alert(document.getElementById("text").html());
        hidden();

    });
    profile();
});

function profile(){
    Id = (document.cookie).split("&");
    DB=Id[1];
    Id=Id[0];
    //alert(document.cookie);
    if(DB=="faculty"){
     select_id={"college_id" : {"$eq": Id} };
    }
    else if(DB=="institute_level_faculty"){
      PROBLEMS={"stage" : {"$eq": 2} };
      select_id={"email" : {"$eq": Id} };;
    }
    else if(DB=="central_grievance_redressal_faculty"){
      PROBLEMS={"stage" : {"$eq": 3} };
      select_id={"email" : {"$eq": Id} };;
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
                    result='<b>Name: &emsp;</b><span style="margin-left:90px;"></span>'+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+'<br><br><b>College Id:&emsp;<span style="margin-left:58px;"></span></b>'+profile_row['college_id']+'<br><br><b>University Roll no:</b>&emsp;'+profile_row['university_reg_no']+'<br><br><b>Department:</b>&emsp;<span style="margin-left:45px;"></span>'+profile_row['department']+'<br><br><b>Mobile no:&emsp;<span style="margin-left:55px;"></span>+91</b>'+profile_row['mobile']+'<br><br><b>Email:&emsp;<span style="margin-left:85px;"></span></b>'+profile_row['email']+"<br><br>";
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
                              "department","student_clg_id","stage","status","time","student_university_id","category","problem_name","problem_id","commitee","student_name","date","student_email","favourable","student_mobile","refernce","seen"
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
                        result+='<tr><td>'+(i+1)+'</td><td><a href="#" onclick=\'problem("'+row['problem_id']+'")\'>'+row['problem_name']+'</a></td><td>'+row['date']+'</td><td>'+row['time']+'</td><td>'+row['category']+'</td><td>'+row['refernce']+'</td><td><a href="#" onclick=\'solution("'+row['problem_id']+'")\'>'+row['status']+'</a></td><td>'+row['seen']+'</td></tr>';
                      else         
                         result+='<tr><td>'+(i+1)+'</td><td><a href="#" onclick=\'problem("'+row['problem_id']+'")\'>'+row['problem_name']+'</a></td><td>'+row['date']+'</td><td>'+row['time']+'</td><td>'+row['category']+'</td><td>'+row['refernce']+'</td><td>'+row['status']+'</td><td>'+row['seen']+'</td></tr>';
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
            $('#problems').append("<b>Subject</b>&emsp;&emsp;"+json[0]["problem_name"]+"<br><b><br>Posted by, Name:&emsp;</b>"+json[0]["student_name"]+"&emsp;&emsp;<b>University Register No:&emsp;</b>"+json[0]["student_university_id"]+"<br><b>Date:&emsp;</b>"+json[0]["date"]+"&emsp;&emsp;<b>Time:</b>&emsp;"+json[0]["time"]+"<br><b>References:</b>&emsp;"+json[0]["refernce"]+"<br><b>Category:</b>&emsp;"+json[0]["category"]+"&emsp;&emsp;<b>Commitee:</b>&emsp;"+json[0]["commitee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json[0]["problem_discription"]+"<br><br>");
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
                                      "sub": "You Have successfully  posted the solution for the "+json[0]["problem_name"],
                                      "text": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",\nGreetings from SVCE Grievance Redressal System.!! You have successfully posted  the soltion for the Problem name:"+json[0]["problem_name"]+"<br>Regards,SVCE Grievance Team",
                                      "html": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",<br><br>Greetings from SVCE Grievance Redressal System.!!<br>You have successfully posted the soltion for the Problem name:"+json[0]["problem_name"]+"<br>Regards,<br>SVCE Grievance Team<br>"
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
                                      "text": "Dear "+json[0]['student_name']+",\nGreetings from SVCE Grievance Redressal System.!!The soltion for the Problem name:"+json[0]["problem_name"]+"<br>is Available now, and you can view it our portal,Thank you,with Regards,SVCE Grievance Team",
                                      "html": "Dear "+json[0]['student_name']+",<br><br>Greetings from SVCE Grievance Redressal System.!!<br>The soltion for the Problem name:"+json[0]["problem_name"]+"<br>is Available now, and you can view it our portal,Thank you,with Regards,<br>SVCE Grievance Team<br>"
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
              $('#problems').append("<b>Problem Name</b>&emsp;&emsp;"+json_solution[0]["problem_name"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["refernce"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>Commitee:</b>&emsp;"+json_solution[0]["commitee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_discription"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>");
          else if(DB=="institute_level_faculty")
               $('#problems').append("<b>Problem Name</b>&emsp;&emsp;"+json_solution[0]["problem_name"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["refernce"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>Commitee:</b>&emsp;"+json_solution[0]["commitee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_discription"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>"+"<br><br><b>Institute level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["dean_solution"]+"<br><br>");
          else if(DB =="central_grievance_redressal_faculty")
               $('#problems').append("<b>Problem Name</b>&emsp;&emsp;"+json_solution[0]["problem_name"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["refernce"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>Commitee:</b>&emsp;"+json_solution[0]["commitee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_discription"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>"+"<br><br><b>Institute level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["dean_solution"]+"<br><br>"+"<br><br><b>Central Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["principal_solution"]+"<br><br>");
          
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
