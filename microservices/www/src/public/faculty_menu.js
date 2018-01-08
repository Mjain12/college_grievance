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
                              "department","student_clg_id","stage","status","time","student_university_id","category","problem_name","problem_id","commitee","student_name","date","student_email","favourable","student_mobile","refernce"
                        ],
                        "where": PROBLEMS,"order_by": [
                              {
                                  "column": "status",
                                  "order": "desc"
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
                        result+='<tr><td>'+row['problem_id']+'</td><td><a href="#" onclick=\'problem("'+row['problem_id']+'")\'>'+row['problem_name']+'</a></td><td>'+row['date']+'</td><td>'+row['time']+'</td><td>'+row['category']+'</td><td>'+$row['refernce']+'</td><td><a href="#" onclick=\'solution("'+row['problem_id']+'")\'>'+row['status']+'</a></td></tr>';
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
   //alert(Name);
   hidden();
   var prob=Name;
   prob="&problem="+prob;
   //alert(prob);
   $.post("http://127.0.0.1/clg_Grievance/problem.php",prob,function(result){
        //alert(result);
        //$("#datas").append(result);
        result=result.split("&");
        $('#problems').append("<b>Problem Id: &emsp;"+Name+"<br><br>Problem Name</b>&emsp;&emsp;"+result[0]+"<br><br><b>Date:&emsp;</b>"+result[1]+"&emsp;&emsp;&emsp;<b>Time:</b>&emsp;"+result[2]+"<br><b>References:</b>&emsp;"+result[3]+"<br><b>Category:</b>&emsp;"+result[4]+"&emsp;&emsp;<b>Commitee:</b>&emsp;"+result[5]+"<br><br><b>Problem Statement:</b><br>&emsp;&emsp;"+result[6]+"<br><br><b>Solution</b><br><br>");
        $('#problems').append('<form name="solution" id="solution" value ="'+prob+'" action="http://127.0.0.1/clg_Grievance/post_solution.php" method ="post" onsubmit = "return solution()"><textarea cols="10" rows="10" class="form-control" name="griv"></textarea><br><input type="submit" name="submit" value="submit">&emsp;<input type="reset" name="reset" value="reset"></form><br>');
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
        //if(validate())
        formValues+="&problem="+Name;
        //alert(formValues);
        $.post(actionFile, formValues+"&id="+Id, function(result){
            // Display the returned data in browser
           alert(result);
           window.open("http://127.0.0.1/clg_Grievance/faculty_menu.html","_self");

        });
    });
         
      });
   
   document.getElementById("text").value="problems";
   return true;
 }
  function solution(Name)
 {
  
    hidden();
  var prob=Name;
   prob="&problem="+prob+"&id="+Id;
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
