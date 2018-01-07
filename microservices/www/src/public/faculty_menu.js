
$(document).ready(function(){ 
  
    Id=document.cookie;
    alert(Id);
    profileflag=0;
    statusflag=0;
    $("#clear").click(function(){
        //alert(document.getElementById("text").html());
        hidden();

    });
    profile();
    
    
    


});

function profile(){

 	  hidden();
        if(document.getElementById("text").value!="profile" && profileflag==0){

            $("#text").show();

     	   //profile=" <b>Name:</b><span></span><br> <b>College Id no:</b><span></span>  <br> <b>Register no:</b><span></span><br> <b>Department:</b><span></span><br> <b>Section:</b><span></span>  <br> <b>Year:</b><span></span><br> <b>Mobile no:</b><span></span><br> <b>Email:</b><span></span><br> <b>Address:</b><span></span>    </div>"
  
     	   $.post('http://127.0.0.1/clg_Grievance/profile.php',"id="+Id, function(result){
            // Display the returned data in browser
           //alert(result);
           if(result==0)
            alert("error in loading your profile");
          else
           $("#text").append(result);
           //window.open("http://127.0.0.1/clg_Grievance/student_menu.html","_self");

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
    
       $.post("http://127.0.0.1/clg_Grievance/grievance.php", "id="+Id,function(result){
       // alert(result+Id);
        $("#datas").append(result);
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
