
$(document).ready(function(){
    profileflag=0;
    statusflag=0;
    profile(); 
    //alert(Id);
    $("form").submit(function(event){
        // Stop form from submitting normally
        //$("form").trigger('reset');
        event.preventDefault();
                        $.ajax({
                                url: "https://data.bulimic45.hasura-app.io/v1/query",
                                contentType: "application/json",
                                data: JSON.stringify({
                                    "type": "bulk",
                                    "args": [
                                          {
                                                "type": "select",
                                                "args": {
                                                      "table": "grievance_problem_id",
                                                      "columns": [
                                                            "id"
                                                      ]
                                                }
                                          },
                                          {
                                                "type": "select",
                                                "args": {
                                                      "table": "faculty",
                                                      "columns": [
                                                            "email"
                                                      ],
                                                      "where": {
                                                            "department": {
                                                                  "$eq": "Department of Computer Science"
                                                            }
                                                      }
                                                }
                                          }
                                    ]
                                }),
                                type: "POST",
                                dataType: "json"
                              }).done(function(json) {
                                              var old_id=(json[0][0]["id"]).split("D")
                                              var new_id=old_id[0]+"D"+(parseInt(old_id[1])+1).toString();

                                                                      $.ajax({
                                                                        url: "https://data.bulimic45.hasura-app.io/v1/query",
                                                                        contentType: "application/json",
                                                                        data: JSON.stringify({
                                                                            "type": "update",
                                                                            "args": {
                                                                                  "table": "grievance_problem_id",
                                                                                  "where": {},
                                                                                  "$set": {
                                                                                        "id": new_id
                                                                                  }
                                                                            }
                                                                        }),
                                                                        type: "POST",
                                                                        dataType: "json"
                                                                      });

                                              var faculty_email_id=json[1][0]["email"];
                                              for(var i=0;i<json[1].length-1;i++)
                                                  faculty_email_id+=","+json[1][i]["email"];
                                              var problem_discription_value=(document.getElementById("Grievance").value).split("\n");
                                              var problem_discription_data=problem_discription_value.join("<br>");
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
                                                                                        "problem_id": new_id,
                                                                                        "problem_discription": problem_discription_data,
                                                                                        "problem_name": document.getElementById("griv_name").value,
                                                                                        "date": ($('#Time').val()).split(" ")[0],
                                                                                        "time": ($('#Time').val()).split(" ")[1],
                                                                                        "refernce": document.getElementById("ref").value,
                                                                                        "category": document.getElementById("Grievance_Category").value,
                                                                                        "commitee": "Department level Grievance Redressal Committee",
                                                                                        "department": profile_row['department'],
                                                                                        "student_email":profile_row['email'],
                                                                                        "student_mobile":profile_row['mobile']
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
                                                                              "text": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",\nGreetings from SVCE Grievance Redressal System.!! You have successfully posted your Problem to Department level Grievance Redressal Committee and \nYou will soon recieve the solution for your problem from our commitee Regards,SVCE Grievance Team",
                                                                              "html": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",<br><br>Greetings from SVCE Grievance Redressal System.!!<br>You have successfully posted your Problem to Department level Grievance Redressal Committee and <br>You will soon recieve the solution for your problem from our commitee<br><br>Regards,<br>SVCE Grievance Team<br>"
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
                              }).fail(function(xhr, status, errorThrown) {
                                console.log("Error: " + errorThrown);
                                console.log("Status: " + status);
                                console.dir(xhr);
                              });



    });
    $("#clear").click(function(){
        //alert(document.getElementById("text").html());
        hidden();

    }); 

});


 function hidden()
 {
    $("#griv_form").hide();
    $("#text").hide();
    $("#griv_status").hide();
    $('#problems').empty();

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
                    
                    //alert(row["fname"]);
                    var result='<b>Name: &emsp;</b><span style="margin-left:90px;"></span>'+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+'<br><br><b>College Id:&emsp;<span style="margin-left:58px;"></span></b>'+profile_row['clg_id']+'<br><br><b>University Roll no:</b>&emsp;'+profile_row['university reg_no']+'<br><br><b>Department:</b>&emsp;<span style="margin-left:45px;"></span>'+profile_row['department']+'<br><br><b>Mobile no:&emsp;<span style="margin-left:55px;"></span>+91</b>'+profile_row['mobile']+'<br><br><b>Email:&emsp;<span style="margin-left:85px;"></span></b>'+profile_row['email']+"<br><br>";
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

 function dat()
 {
    var date=new Date();
    var val=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
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
                  "department","student_clg_id","stage","status","time","student_university_id","category","problem_name","problem_id","commitee","student_name","date","student_email","favourable","student_mobile","refernce"
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
            result+='<tr><td>'+row['problem_id']+'</td><td><a href="#" onclick=\'problem("'+row['problem_id']+'")\'>'+row['problem_name']+'</a></td><td>'+row['date']+'</td><td>'+row['time']+'</td><td>'+row['category']+'</td><td>'+row['refernce']+'</td><td><a href="#" onclick=\'solution("'+row['problem_id']+'")\'>'+row['status']+'</a></td></tr>';
          else         
             result+='<tr><td>'+row['problem_id']+'</td><td><a href="#" onclick=\'problem("'+row['problem_id']+'")\'>'+row['problem_name']+'</a></td><td>'+row['date']+'</td><td>'+row['time']+'</td><td>'+row['category']+'</td><td>'+row['refernce']+'</td><td>'+row['status']+'</td></tr>';
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
            $('#problems').append("<b>Problem Name</b>&emsp;&emsp;"+json[0]["problem_name"]+"<br><br><b>Date:&emsp;</b>"+json[0]["date"]+"&emsp;&emsp;<b>Time:</b>&emsp;"+json[0]["time"]+"<br><b>References:</b>&emsp;"+json[0]["refernce"]+"<br><b>Category:</b>&emsp;"+json[0]["category"]+"&emsp;&emsp;<b>Commitee:</b>&emsp;"+json[0]["commitee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json[0]["problem_discription"]+"<br><br>");
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
          if(json_solution[0]["stage"]=="1")
              $('#problems').append("<b>Problem Name</b>&emsp;&emsp;"+json_solution[0]["problem_name"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["refernce"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>Commitee:</b>&emsp;"+json_solution[0]["commitee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_discription"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>");
          else if(json_solution[0]["stage"]=="2")
               $('#problems').append("<b>Problem Name</b>&emsp;&emsp;"+json_solution[0]["problem_name"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["refernce"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>Commitee:</b>&emsp;"+json_solution[0]["commitee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_discription"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>"+"<br><br><b>Institute level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["dean_solution"]+"<br><br>");
          else if(json_solution[0]["stage"]=="3")
               $('#problems').append("<b>Problem Name</b>&emsp;&emsp;"+json_solution[0]["problem_name"]+"<br><br><b>Date:&emsp;</b>"+json_solution[0]["date"]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+json_solution[0]["time"]+"<br><b>References:</b>&emsp;"+json_solution[0]["refernce"]+"<br><b>Category:</b>&emsp;"+json_solution[0]["category"]+"&emsp;&emsp;<b>Commitee:</b>&emsp;"+json_solution[0]["commitee"]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+json_solution[0]["problem_discription"]+"<br><br><b>Department level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["hod_solution"]+"<br><br>"+"<br><br><b>Institute level Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["dean_solution"]+"<br><br>"+"<br><br><b>Central Grievance Redressal Committee Solution:</b><br>&emsp;"+json_solution[0]["principal_solution"]+"<br><br>");
          if(json_solution[0]["favourable"]=="favourable")
            $('#problems').prepend("<span style='background-color:lightgreen;'><b>Solution favourable</b></sapan><br>");
          else if(json_solution[0]["favourable"]=="notfavourable")
            $('#problems').prepend("<span style='background-color:red;'><b>Solution NOT favourable</b></sapan><br>");
          else
            $('#problems').append("<br><input type=\"button\" onclick='return Solutionfavourable(\""+Name+"\",\""+json_solution[0]["stage"]+"\")' value='favourable'>&emsp;&emsp;<input type=\"button\" onclick='return Solutionnotfavourable(\""+Name+"\")' value='Not Favourable'><br>");
            
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
                                                  "favourable": "favourable"
                                            }
                                      }
                                  }),
                                  type: "POST",
                                  dataType: "json"
                                });
                                alert("Thankyou for using our portal");
                                window.open("./student_menu.html","_self");
            }
function Solutionnotfavourable(Name,STAGE){
                                if(confirm("Do you want to post this problem to higher level")){
                                    STAGE=parseInt(STAGE);
                                  if(STAGE<=2) 
                                    STAGE+=+1;
                                  STAGE=STAGE.toString();
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
                                            "text": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",\nGreetings from SVCE Grievance Redressal System.!! You have successfully posted your Problem to Higher level Grievance Redressal Committee and \nYou will soon recieve the solution for your problem from our commitee Regards,SVCE Grievance Team",
                                            "html": "Dear "+profile_row['fname']+' '+profile_row['mname']+' '+profile_row['lname']+",<br><br>Greetings from SVCE Grievance Redressal System.!!<br>You have successfully posted your Problem to Higher level Grievance Redressal Committee and <br>You will soon recieve the solution for your problem from our commitee<br><br>Regards,<br>SVCE Grievance Team<br>"
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
                                                  "status":"Problem Posted to Level "+STAGE
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
                                                  "favourable": "notfavourable"
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