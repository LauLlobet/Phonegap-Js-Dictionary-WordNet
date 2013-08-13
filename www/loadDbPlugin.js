

console.log('Javascript OKloaddb');


var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.match(/android/)) {
	 document.write('<script src="cordova/cordova.js"></script>');
	 document.write('<script src="sqlite.android/SQLitePlugin.js"></script>');
}else{
	alert("IOS");
	
//	window.onerror = function(message, url, lineNumber) {
//        console.log("Error: "+message+" in "+url+" at line "+lineNumber);
//    }

	document.write('<script src="cordova.ios/cordova.js"></script>');
     document.write('<script src="sqlite.ios/SQLitePlugin.js"></script>');
}