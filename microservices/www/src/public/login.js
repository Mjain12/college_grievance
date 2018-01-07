$(document).ready(function(){
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
        $.post(actionFile, formValues, function(result){
            // Display the returned data in browser
           //var data="success";
            //alert(result);
            var Id=$("#loginid").val();
            document.cookie=Id; 
                
                var stu="http://127.0.0.1/clg_Grievance/student_menu.html";
                var par="http://127.0.0.1/clg_Grievance/parent_menu.html";
                var fac="http://127.0.0.1/clg_Grievance/faculty_menu.html";
           
            if(result==1){
                
                    window.open(stu,"_self");
            }
            else if(result==2)
                window.open(fac,"_self");
            else{   
                    alert("Invalid login or password");
                }

        });
    });
});
function validate()
    {
        id=login.loginid.value;
        psw=login.loginpassword.value;
        beg=/^[A-Za-z_][A-Za-z0-9]{1,}$/;
        caps=/[A-z]$/;
        small=/[a-z]$/;
        num=/[0-9]$/;
        if(!(beg.test(id)))
        {
        	alert("id is invalid");
        	return false;
        }
    	else if(!(caps.test(psw) || small.test(psw) || num.test(psw)))
    		{
    			alert("password is not valid");
        		return false;
        	}
        return true;
    }
