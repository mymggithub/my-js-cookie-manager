// JavaScript cookies
function mycookies(){
	return document.cookie;
}
function setCookie(c_name,value,exdays){
	value = (value == null || value == undefined) ? "" : value;
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? '' : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name){
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1){c_start = c_value.indexOf(c_name + "=");}
	if (c_start == -1){c_value = null;}
	else{
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1){c_end = c_value.length;}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

function delCookie(c_name,delType) {
	var cookies = document.cookie.split(";");
	var end = ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
	for (var i = 0; i < cookies.length; i++) {
		//all deleted
		if (c_name == undefined || c_name == "" || delType == "all"){
			var cookie = cookies[i];
			var eqPos = cookie.indexOf("=");
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=" + end;
		}else if (delType == "some"){// DEL SOME
		console.log("some");
			if(cookies[i].indexOf(c_name)>-1){
				var cookie = cookies[i];
				var eqPos = cookie.indexOf("=");
				var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
				document.cookie = name + "=" + end;
				console.log("some2");
			}
		}else{
			if(cookies[i].trim().indexOf(c_name + "=")>-1){
				console.log("c -"+c_name);
				var cookie = cookies[i].trim();
				var eqPos = cookie.indexOf("=");
				var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
				console.log("name -"+name);
				document.cookie = name + "=" + end;
			}
		}
	}
	return document.cookie;
}
function setIncrementingCookie(c_name,value,exdays) {
	var cookies = document.cookie;
	i=0;
	do{
		i++;
	} while(cookies.match(RegExp("("+c_name+i+"[=])+","g")) );//&& i < 100
	setCookie(c_name+i,value,exdays);
}
function getIncrementingCookie(c_name,valOnly) {
	var cookies = document.cookie.match(RegExp("("+c_name+"[0-9]*((=){1})[^;]+){1}","g"));
	cookiesVal = [];
	if (valOnly != null){
		$.each(cookies,function(i){
			c_a = cookies[i].split("=");
			cookiesVal.push(c_a[1]);
		});
		return cookiesVal;
	}
	if (cookies == null){
		cookies = [];
	}
	return cookies;
}
function search_cookies(value,name){
	if (value != undefined){		
		if (name == undefined || name == ""){name = "(*)";}
		value = (value == "")?"(*)":value;
		value = value.replace("(*)","[a-zA-Z-\_0-9]*");//[^=; ]*
		name = name.replace("(*)","[a-zA-Z-\_0-9]*");//[^=; ]*
		cookies = document.cookie.match(RegExp("(^| )"+name+"="+value,"g"));
		if (cookies == null){cookies = [];}
		$.each(cookies,function(k,v){cookies[k]=v.trim()})
		return cookies;
	}
}