
$(document).ready(function(){
    profileflag=0;
    statusflag=0;
    profile(); 
    //alert(Id);
    $("form").submit(function(event){
        // Stop form from submitting normally
        //$("form").trigger('reset');
        event.preventDefault();
        
        // Get action URL
    var actionFile = $(this).attr("action");

        /* Serialize the submitted form control values to be sent to the web server with the request */
        var formValues = $(this).serialize();
    //alert(actionFile,formValues);        
        // Send the form data using post
        //alert(formValues+"\n");
        formValues=formValues+"&Id="+Id+"&time="+$('#Time').val()+"&griv_dept="+$("#griv_dept").val();
        //alert(formValues);
        $.post(actionFile, formValues, function(result){
            // Display the returned data in browser
           alert(result);
           window.open("http://127.0.0.1/clg_Grievance/student_menu.html","_self");

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
    Id = document.cookie;
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
                    row=json[0];
                    
                    //alert(row["fname"]);
                    result='<b>Name: &emsp;</b><span style="margin-left:90px;"></span>'+row['fname']+' '+row['mname']+' '+row['lname']+'<br><br><b>College Id:&emsp;<span style="margin-left:58px;"></span></b>'+row['clg_id']+'<br><br><b>University Roll no:</b>&emsp;'+row['university reg_no']+'<br><br><b>Department:</b>&emsp;<span style="margin-left:45px;"></span>'+row['department']+'<br><br><b>Mobile no:&emsp;<span style="margin-left:55px;"></span>+91</b>'+row['mobile']+'<br><br><b>Email:&emsp;<span style="margin-left:85px;"></span></b>'+row['email']+"<br><br>";
                    $("#text").append(result);
                  }
                  else if(json[1].length==1){
                    row=json[0][1];
                    //result='<b>Name: &emsp;</b><span style="margin-left:90px;"></span>'+row['fname']+' '+row['mname']+' '+row['lname'].+'<br><br><b>College Id:&emsp;<span style="margin-left:58px;"></span></b>'+row['clg_id']+'<br><br><b>University Roll no:</b>&emsp;'+row['university reg_no']+'<br><br><b>Department:</b>&emsp;<span style="margin-left:45px;"></span>'+row['department']+'<br><br><b>Mobile no:&emsp;<span style="margin-left:55px;"></span>+</b>'+row['mobile']+'<br><br><b>Email:&emsp;<span style="margin-left:85px;"></span></b>'+email+"<br><br>";
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
    if(dep=="Academic" || dep=="Grievance related to Attendance" || dep=="Harassment by colleague students or the teachers etc"){
       $("#griv_dept").empty();
       $("#griv_dept").append("Department Level Grievance Redressal Committee");
       $("#griv_dept").val("Department%20Level%20Grievance%20Redressal%20Committee");
       
    }
    else if(dep!="")
    {
        $("#griv_dept").empty();
       $("#griv_dept").append("Institution Level Grievance Redressal Committee");
       $("#griv_dept").val("Institution%20Level%20Grievance%20Redressal%20Committee");
       
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
     //alert("id="+Id);

       $.post("http://127.0.0.1/clg_Grievance/grievance.php", "id="+Id, function(result){
            // Display the returned data in browser
           //alert(result);
           $("#datas").append(result);
           //window.open("http://127.0.0.1/clg_Grievance/student_menu.html","_self");

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
   var prob=Name;
   prob="&problem="+prob;
   //alert(prob);
   $.post("http://127.0.0.1/clg_Grievance/problem.php",prob,function(result){
        //alert(result);
        //$("#datas").append(result);
        result=result.split("&");
        $('#problems').append("<b>Problem Id: &emsp;"+Name+"<br><br>Problem Name</b>&emsp;&emsp;"+result[0]+"<br><br><b>Date:&emsp;</b>"+result[1]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+result[2]+"<br><b>References:</b>&emsp;"+result[3]+"<br><b>Category:</b>&emsp;"+result[4]+"&emsp;&emsp;<b>Commitee:</b>&emsp;"+result[5]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+result[6]+"<br><br>");
        
    });
   

   document.getElementById("text").value="problems";
   return true;
 }
 function solution(Name)
 {
  
    hidden();
  var prob=Name;
   prob="&problem="+prob;
   //alert(prob);
   $.post("http://127.0.0.1/clg_Grievance/problem.php",prob,function(result){
        //alert(result);
        //$("#datas").append(result);
        result=result.split("&");
        $('#problems').append("<b>Problem Id: &emsp;"+Name+"<br><br>Problem Name</b>&emsp;&emsp;"+result[0]+"<br><br><b>Date:&emsp;</b>"+result[1]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+result[2]+"<br><b>References:</b>&emsp;"+result[3]+"<br><b>Category:</b>&emsp;"+result[4]+"&emsp;&emsp;<b>Commitee:</b>&emsp;"+result[5]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+result[6]+"<br><br><b>Solution:</b><br>&emsp;"+result[7]+"<br><br>");
        
    });

   document.getElementById("text").value="solution";
   return true;
   
 }