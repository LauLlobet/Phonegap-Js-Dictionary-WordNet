
var test = new test( [ new wordset('swift','bird',['dog','ape','mamal']) ,
                       new wordset('prison','place',['lake','river','book']) ,
                       new wordset('job','work',['sentence','escape','pain'])
					] , 30 ) ;


function init()
{
	init_test();
}

$(document).ready(function() {

    $('#btn_op_a').on('vclick', function() { 
    	test_answer(0);
    	 next_slide();
//    	 $.mobile.changePage( "index.html#ptest", { transition: "slide"} );
    	 $.mobile.changePage( "index.html#pok", { transition: "slide"} );
          return false;
    });
    
        $('#btn_op_b').on('vclick', function() { 
    	test_answer(1);
    	next_slide();
//    	$.mobile.changePage( "index.html#ptest", { transition: "slide"} );
    	 $.mobile.changePage( "index.html#pok", { transition: "slide"} );
         return false;
    });
    
        $('#btn_op_c').on('vclick', function() { 
    	test_answer(2);
    	next_slide();
//    	$.mobile.changePage( "index.html#ptest", { transition: "slide"} );
    	 $.mobile.changePage( "index.html#pok", { transition: "slide"} );
         return false;
    });

    $('#btn_l1').on('vclick', function() { 
        $.mobile.changePage( "index.html#pgrid", { transition: "slide"} );
        return false;
     });
        
});


