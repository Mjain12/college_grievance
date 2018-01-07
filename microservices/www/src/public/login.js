$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        ID=login.loginid.value;
	    psw=login.loginpassword.value;
	    //alert(ID);
	    document.cookie=ID;
	    //alert(document.cookie);
	    		var stu="./student_menu.html?"+ID;	
                var par="./parent_menu.html?"+ID;
                var fac="./faculty_menu.html?"+ID;
			$.ajax({
				url: "https://data.bulimic45.hasura-app.io/v1/query",
				contentType: "application/json",
				data: JSON.stringify({
			      "type": "bulk",
			      "args": [
			            {
			                  "type": "select",
			                  "args": {
			                        "table": "student",
			                        "columns": [
			                              "email"
			                        ],
			                        "where": {
			                              "$and": [
			                                    {
			                                          "clg_id": {
			                                                "$eq": ID
			                                          }
			                                    },
			                                    {
			                                          "password": {
			                                                "$eq": psw
			                                          }
			                                    }
			                              ]
			                        }
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
			                              "$and": [
			                                    {
			                                          "college_id": {
			                                                "$eq":ID
			                                          }
			                                    },
			                                    {
			                                          "password": {
			                                                "$eq": psw
			                                          }
			                                    }
			                              ]
			                        }
			                  }
			            }
			      ]
				}),
				type: "POST",
				dataType: "json"
			}).done(function(json) {
				if(json[0].length==0 && json[1].length==0)
					alert("invalid username or password");
				else if(json[0].length==1)
					 window.open(stu,"_self","location=0");
				else if(json[1].length==1)
					window.open(fac,"_self","location=0");
			}).fail(function(xhr, status, errorThrown) {
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			});

    });
});

