
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
	
	
    var db = window.sqlitePlugin.openDatabase({name: "new_canvas"})

    
    db.transaction(function(tx) {			
    	tx.executeSql("insert into test(lastssenseid) values(200);",[],function(tx,res){

    		//db.transaction(function(ty) {
    			tx.executeSql("select count(lastssenseid) as cnt from test;", [], function(tx, res) {
    				alert("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
    			});
    		//});
    	});
        alert("hola canvas");
    });
    alert("hola canvas2");
    /*$(document).delegate("#pinit", "pageshow", function() {
        load_words();
    });
    
	//load_words();
    alto = $(document).height();
    load_words();
    //load_pinit();
	//load_grid();
	*/
}