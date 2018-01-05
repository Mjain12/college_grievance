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
function change()
{

    if(document.login.profession.value=="student")
    document.getElementById("Link").href="student_menu.html";
    else if(document.login.profession.value=="Parent")
        document.getElementById("Link").href="parent_menu.html";
    else if(document.login.profession.value=="faculty")
        document.getElementById("Link").href="faculty_menu.html";
    return true;
    }
