

function question(word,op_c,op_e1,op_e2)
{
	this.word=word;
	this.op_c=op_c;
	this.op_e1=op_e1;
	this.op_e2=op_e2;
	
	var rand=Math.floor(Math.random()*3);
	var rand2=Math.floor(Math.random()*3);
	var rand3=Math.floor(Math.random()*3);
	
	this.op = new Array();
	this.op[rand]=op_c;
	
	while(rand2 == rand)
		rand2=Math.floor(Math.random()*3);
	this.op[rand2]=op_e1;
	

	while(rand3 == rand || rand3 ==rand2)
		rand3=Math.floor(Math.random()*3);
	this.op[rand3]=op_e2;
	
	this.correct=rand;
}

function wordset(word,op_c,op_e_array{
	this.word = word;
	this.op_c = op_c;
	this.op_e_array = op_e_array;
	
}

function test(wordset_array){
	
	
}


var test = new Object();
var slides = new Array();

test.total_slides = 20;
test.current_slide = 7; 

//$(document).on('vclick','button',next_slide());
		
		
function init()
{
}

function next_slide()
{
	test.current_slide++;
	csc = document.getElementById("currentSlideCounter");
	csc.innerHTML = test.current_slide ;//""+test.current_slide;
	
	var q = new question("Word","correct","incorrect1","incorrect2"); 
	document.getElementById("test_word").innerHTML = q.word;
	document.getElementById("test_op1").innerHTML = q.op[0];
	document.getElementById("test_op2").innerHTML = q.op[1];
	document.getElementById("test_op3").innerHTML = q.op[2];
}

function correct_slide{
	
	
	
	
}





$(document).ready(function() {

    $('#btn_op_a').on('vclick', function() { 
    	next_slide();
        return false;
    });
});
