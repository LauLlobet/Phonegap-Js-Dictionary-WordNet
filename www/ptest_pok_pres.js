

function question(a)
{
	
	var word = a[0];
	var op_c = a[1];
	var op_e1 = a[2];
	var op_e2 = a[3]
	
	
	this.word=word;
	this.op_c=op_c;
	this.op_e1=op_e1;
	this.op_e2=op_e2;
	
	var rand=Math.floor(Math.random()*3);
	var rand2=Math.floor(Math.random()*3);
	var rand3=Math.floor(Math.random()*3);
	
	this.op = new Array();
	this.op[rand]=op_c;
	
	while(rand2 == rand){
		rand2=Math.floor(Math.random()*3);
	}
	this.op[rand2]=op_e1;
	

	while(rand3 == rand || rand3 ==rand2){
		rand3=Math.floor(Math.random()*3);
	}
	this.op[rand3]=op_e2;
	
	this.correct=rand;
}

function answer(text,id){
	
	this.text = text;
	this.id = id;
}

function wordset(word,op_c,op_e_array){
	this.word = word;
	this.op_c = op_c;
	this.op_e_array = op_e_array;
	
	if(op_e_array.length < 2){
		alert("wordset constructor dont have enough false questions");
	}
	

	this.get_word_ops=get_word_ops;
	function get_word_ops(){
		
		if(op_e_array.length < 2){
			alert("wordset getwordops dont have enough false questions");
		}
		var rand = Math.floor(Math.random()*(op_e_array.length-1));
		var op_e1 = op_e_array[rand];
		
		var rand2 = Math.floor(Math.random()*(op_e_array.length-1));
		while(rand2 == rand){
			rand2 = Math.floor(Math.random()*(op_e_array.length-1));
		}
		var op_e2 = op_e_array[rand2];
		
		return [this.word,this.op_c,op_e1,op_e2];
	}
	
}

function Test(){
	this.questions = [];
	
	var prob_selected = 35;
	var prob_unselected = 70;
	var prob_other = 30;
	
	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
		wordsxsenses.forEach(function(x) {
		
			alert(x.selected);
			//alert(x.rows.lemma);
		
		});
	});
	
	for(i=0;i<4;i++){
	
		//this.questions.push(["swift","bird","plane","ship"]);// = new question(wordset_array[i].get_word_ops());
		this.questions.push( new question([new answer('swift',23),new answer('bird',12),new answer('plane',45),new answer('ship',77)]));
		//this.questions.push( new question(['swift','bird','plane','ship']));
		//var wer = new answer("adsas",23);
		
	}
	this.current_question = -1;
}



/// -------------------------------- FUNCTIONS --------------------------------


function init_test(){
	
	next_slide();
//	test.current_question--;
	
}

function next_slide()
{

	test.current_question++;
	
	var array = test.questions;

	if( test.current_question  == array.length )
		return;
	
	csc = document.getElementById("currentQuestionCounter");
	csc.innerHTML = test.current_question + 1;//""+test.current_slide;
	csc = document.getElementById("tatalQuestionCounter");
	csc.innerHTML = test.questions.length ;//""+test.current_slide;
	
	var q = test.questions[test.current_question]; 
	document.getElementById("test_word").innerHTML = q.word.text;
	document.getElementById("test_op0").innerHTML = q.op[0].text;
	document.getElementById("test_op1").innerHTML = q.op[1].text;
	document.getElementById("test_op2").innerHTML = q.op[2].text;

}

function test_answer(ans){

	document.getElementById("test_op_ok0").innerHTML = "";
	document.getElementById("test_op_ok1").innerHTML = "";
	document.getElementById("test_op_ok2").innerHTML = "";
	
	console.log(test.questions[test.current_question].op[ans]+test.questions[test.current_question].op_c );
	save_answered_question(ans);
	
	
	if( test.questions[test.current_question].correct == ans )
	{
		console.log("correct");

	}else{
		
		document.getElementById("test_op_ok"+ans).innerHTML = "<img id=\"nok\" src=\"img/nok.png\">";
		console.log("incorrect");
	}
	
	document.getElementById("test_op_ok"+test.questions[test.current_question].correct ).innerHTML = 
		"<img id=\"nok\" src=\"img/ok.png\">";


	var a = test.current_question;
	var b = test.questions.length;
	
	if( test.current_question  == test.questions.length -1 ){
		console.log("okok");
		document.getElementById("pok_next").href="#pres";
		prepare_pres();
	}
}

function prepare_pres(){
	
	// acces a db de preguntes ben contestades
	//calcul de %encerts %improvment baixades i puijades
	
}

function save_answered_question(ans){
	// guardar la id de la resposta triada encara que sigui falsa a la subtaula de la paraula a a la llista de preferides +info +power
	// guardr encerts/errors a la db de paraules preferides
}
