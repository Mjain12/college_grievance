
$(document).ready(function(){ 
    profileflag=0;
    statusflag=0;
    profile();
    $("#clear").click(function(){
        //alert(document.getElementById("text").html());
        hidden();


    }); 
});

function profile(){

 	  hidden();
        if(document.getElementById("text").value!="profile" && profileflag==0){

            $("#text").show();

     	   //profile=" <b>Name:</b><span></span><br> <b>College Id no:</b><span></span>  <br> <b>Register no:</b><span></span><br> <b>Department:</b><span></span><br> <b>Section:</b><span></span>  <br> <b>Year:</b><span></span><br> <b>Mobile no:</b><span></span><br> <b>Email:</b><span></span><br> <b>Address:</b><span></span>    </div>"
     	   
           var $Name="Santhosh";
           var $reg_no=212715104129;
           var $clg_id="2015CSE0102";
           var $dept="CSE";
           var $year="3rd year";
           var $sec="C";
           var $mobile=8428953969;
           var $email="santhoshkumar.ssk322@gmail.com";
           var $address="T.nagar,ch-17"


           $("#text").append("<b>Name: </b>")
           $("#text").append("<b>"+$Name+"</b>");
           
           $("#text").append("<br>","<b>University Register No: </b>")
           $("#text").append("<b>"+$reg_no+"</b>");



           $("#text").append("<br>","<b>College Id: </b>")
           $("#text").append("<b>"+$clg_id+"</b>");


           $("#text").append("<br>","<b>Department: </b>")
           $("#text").append("<b>"+$dept+"</b>");


           $("#text").append("<br>","<b>year: </b>")
           $("#text").append("<b>"+$year+"</b>");


           $("#text").append("<br>","<b>Section: </b>")
           $("#text").append("<b>"+$sec+"</b>");

           $("#text").append("<br>","<b>Mobile No: </b>")
           $("#text").append("<b>"+$mobile+"</b>");


           $("#text").append("<br>","<b>Email Id: </b>")
           $("#text").append("<b>"+$email+"</b>");


           $("#text").append("<br>","<b>Address: </b>")
           $("#text").append("<b>"+$address+"</b><br><br>");


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

    var n=3;
    var  data=new Array(n);
    for(var i=0;i<n;i++)
      data[i]=new Array(4);

    data[0][0]='1.';
    data[0][1]='Projector problem';
    data[0][2]='Non-Academic';
    data[0][3]='Not Available';

    data[1][0]='2.';
    data[1][1]='Error in marksheet';
    data[1][2]='In Academic';
    data[1][3]='Not Available';

    data[2][0]='3.';
    data[2][1]='Change of food recipe';
    data[2][2]='Non-Academic';
    data[2][3]='Available';
   
    val="";
    for(var i=0;i<3;i++)
    {
      val+='<tr>';
      for(j=0;j<4;j++)
        { if(j==1 )
          val+="<td><a href='#' onclick='problem(\""+data[i][1]+"\")'>"+data[i][j]+"</a></td>";
          
          else if( (j==3 && data[i][3]=='Available'))
          val+="<td><a href='#' onclick='solution(\""+data[i][1]+"\")'>"+data[i][j]+"</a></td>";
          
          else
            val+="<td>"+data[i][j]+"</td>";
        }
      val+='</tr>';
    }
    //alert(val);
    $('#datas').append(val);
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

   $('#problems').append("<center><b>"+prob+"</b></center><br><br><b>Solution</b><br>");
   $('#problems').append('<form name="solution" value ="'+prob+'" action="http://127.0.0.1/clg_Grievance/sample.php" method ="post"><textarea cols="10" rows="10" class="form-control"></textarea><br><input type="submit" name="submit" value="submit">&emsp;<input type="reset" name="reset" value="reset"></form><br>');
   document.getElementById("text").value="problems";
   return true;
 }
