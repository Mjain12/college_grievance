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
        if(validate())
        $.post(actionFile, formValues, function(result){
            // Display the returned data in browser
           //alert(result);
           if(result == 0)
           	{
           		alert("you have already registered")
               window.open("http://127.0.0.1/clg_Grievance/index.html","_self");
            }
           else if( result==1 )
           {
           	alert("successfully  registered")
               window.open("http://127.0.0.1/clg_Grievance/login.html","_self");
           }
           else
       		 {alert("error in  registration")
               window.open("http://127.0.0.1/clg_Grievance/index.html","_self");
            }
         });
    });
});
function postdata(var post_fname,var post_mname,var post_lname,var post_clg_id,var post_univ_no,var post_dept,var post_mobile,var post_email,var post_password,var post_question,var post_answer){
			$.ajax({
			url: "https://data.bulimic45.hasura-app.io/v1/query",
			contentType: "application/json",
			data: JSON.stringify({
		      "type": "insert",
		      "args": {
		            "table": "student",
		            "objects": [
		                  {
		                        "fname": post_fname,
		                        "mname": post_mname,
		                        "lname": post_lname,
		                        "clg_id": post_clg_id,
		                        "university reg_no": post_univ_no,
		                        "department": post_dept,
		                        "mobile": post_mobile,
		                        "email": post_email,
		                        "password": post_password,
		                        "question": post_question,
		                        "answer": post_answer
		                  }
		            ]
		      }
			}),
			type: "POST",
			dataType: "json"
		}).done(function(json) {
			// Handle Response
		}).fail(function(xhr, status, errorThrown) {
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);
			console.dir(xhr);
		});
}

function validate() {
	// body...
	var fname=document.signup.fname.value;
	var lname=document.signup.lname.value;
	var mname=document.signup.mname.value;
	var clg_id=document.signup.clg_id.value;
	var univ_no=document.signup.univ_no.value;
	var dept=document.signup.department.value;
	var mobile_no=document.signup.mobile_no.value;
	var email=document.signup.email.value;
	var password=document.signup.password.value;
	var confirmation_password=document.signup.confirm_password.value;
	var question=document.signup.Security_question.value
	var answer=document.signup.answer.value
	
	var Name=/^[A-za-z]+$/,id=/^[0-9]{4,4}[a-z]+[0-9]{4,4}$/;
	var uno=/^2127[0-9]{8,8}$/,mobile=/^[0-9]{10,10}$/;
	var ans=/^[A-za-z0-9]+$/;

				function data_validate(){
						
					if(fname=="")
						{
							alert("first name is empty")
							return false;	
						}
					else if(!Name.test(fname))
						{
							alert("first name is is invalid")
							return false;		
						}

					if(lname=="")
						{
							alert("Last name is empty")
							return false;	
						}
					else if(!Name.test(lname))
						{
							alert("Last name is is invalid")
							return false;		
						}

					if(!Name.test(mname)&&!(mname==""))
						{
							alert("Middle name is is invalid")
							return false;		
						}

					if(clg_id=="")
						{
							alert("college id is empty")
							return false;	
						}
					else if(!id.test(clg_id))
						{
							alert("college id  is is invalid")
							return false;		
						}

					if(univ_no=="")
						{
							alert("University number is empty")
							return false;	
						}
					else if(!uno.test(univ_no))
						{
							alert("University number  is is invalid")
							return false;		
						}
					if(dept=="NA")
						{
							alert("Department is invalid")
							return false;	
						}
					if(mobile_no=="")
						{
							alert("Mobile number is empty")
							return false;	
						}
					else if(!mobile.test(mobile_no))
						{
							alert("Mobile number  is is invalid")
							return false;		
						}
					if(email=="")
						{
							alert("Email id  is empty")
							return false;	
						}
					
					if(password=="")
						{
							alert("password  is empty")
							return false;	
						}
					
					if(confirmation_password=="")
						{
							alert("confirmation password is empty")
							return false;	
						}

					if(password!=confirmation_password)
						{
							alert("password missmatched")
							return false;	
						}
					
					
					if(question=="NA")
						{
							alert("Select a Security question")
							return false;	
						}
					if(answer=="")
						{
							alert("answer is empty")
							return false;	
						}
					else if(!ans.test(answer))
						{
							alert("answer  is is invalid")
							return false;		
						}
					return true;
			}	
		if(data_validate()) alert("done");
}

