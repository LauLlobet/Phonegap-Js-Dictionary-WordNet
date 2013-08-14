

console.log('Javascript OKloaddb');


var userAgent = navigator.userAgent.toLowerCase();
//alert("MATCH:::::"+userAgent);
if (userAgent.match(/android/i)) {
	// alert("android");
	 document.write('<script src="cordova/cordova.js"></script>');
	 document.write('<script src="sqlite.android/SQLitePlugin.js"></script>');
}else if (userAgent.match(/ipad/i) || userAgent.match(/iphone/i) ) {
	//alert("iphone");
	document.write('<script src="cordova.ios/cordova.js"></script>');
     document.write('<script src="sqlite.ios/SQLitePlugin.js"></script>');
}else{
	alert("ripple");
	document.write('<script src="ripple.ios/cordova.js"></script>');
    document.write('<script src="sqlite.ios/SQLitePlugin.js"></script>');

}
