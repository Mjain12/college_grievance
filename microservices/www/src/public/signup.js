var myobject={
	post_Email: function(email_id,email_fname,email_mname,email_lname,email_clg_id,email_password){
		$.ajax({
			url: "https://notify.bulimic45.hasura-app.io/v1/send/email",
			contentType: "application/json",
			headers: {
		      "Authorization": "Bearer 4af1623b3c51f78e03754e69c60d3490f5509de98a7cc57a"
			},
			data: JSON.stringify({
		      "to": email_id,
		      "from": "clggrievances@gmail.com",
		      "fromName": "SVCE Grievance Redressal Committee",
		      "sub": "SVCE College Grievance Account Registration",
		      "text": "Dear "+email_fname+" "+email_mname+" "+email_lname+",Greetings from SVCE Grievance Redressal System.!!Thanks for Registration, Your Login Id: "+email_clg_id+"Password: "+email_password+"Regards,SVCE Grievance Team",
		      "html": "Dear "+email_fname+" "+email_mname+" "+email_lname+",<br><br>Greetings from SVCE Grievance Redressal System.!!<br>Thanks for Registration, <br><br> Your Login Id: "+email_clg_id+"<br>Password: "+email_password+"<br><br>Regards,<br>SVCE Grievance Team<br>"
			}),
			type: "POST",
			dataType: "json"
		});
		alert("Congratulation, You Have Successfully Registered and you soon receive email confirmation");
		window.open("https://www.bulimic45.hasura-app.io/","_self");
			
	}
};
function postdata(post_fname,post_mname,post_lname,post_clg_id,post_univ_no,post_dept,post_mobile,post_email,post_password,post_question,post_answer){
			
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
			
			myobject.post_Email(post_email,post_fname,post_mname,post_lname,post_clg_id,post_password);

		}).fail(function(xhr, status, errorThrown) {
			alert("you have already registered");
			window.open("https://www.bulimic45.hasura-app.io/","_self");
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
		if(data_validate()){ 
			postdata(fname,mname,lname,clg_id,univ_no,dept,mobile_no,email,password,question,answer);
		}		
}

