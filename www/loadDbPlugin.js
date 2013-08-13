
var userAgent = navigator.userAgent.toLowerCase();
	
if (userAgent.match(/android/)) {
	 document.write('<script src="sqlite.android/SQLitePlugin.js"></script>');
}else if (userAgent.match(/iphone/)){
     document.write('<script src="sqlite.android/SQLitePlugin.js"></script>');
}