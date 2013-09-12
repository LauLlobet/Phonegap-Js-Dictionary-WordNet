
	var prob_selected = 35;
	var prob_unselected = 70;
	var prob_other = 100;


var SenseAns = "";
JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
		
		SenseAns = new Class({
			include: Comparable,
			
		    initialize: function(text,id,cid,lemma,status,inc,correct,incorrect) {
		    	this.text = text;
		    	this.id = id;
		    	this.cid = cid;
		    	this.lemma = lemma;
		    	this.status = status;
		    	this.inc = inc;
		    	this.correct = correct;
		    	this.incorrect = incorrect;
				//alert(row.lemma+"instanciant:"+row.sensecaseid);
		    },
		    equals: function(object) {
		    	return (object instanceof this.klass)
		        	 && object.id == this.id;
		    },
		    hash: function() {
		        return this.id;
		    },
		    
		    compareTo: function(other) {
		        if (this.id < other.id) return 1;
		        if (this.id > other.id) return -1;
		        return 0;
		    }
		    
		    
		});	
});
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
	//console.log(rand);
	//alert("rand:"+rand);
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

function answer(text,id,cid,lemma){
	
	this.text = text;
	this.id = id;
	this.cid = cid;
	this.lemma = lemma;
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

function Test(callit){
	this.questions = [];
	test = this;
	this.current_question = -1;
	
	this.points = 0;
	this.up = 0;
	this.down = 0;
	this.equal = 0;
	this.level_points = 0;
	
	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
		
		var selected = new Set([]);
		var unselected = new Set([]);
		var randoms = new Set([]);
		
		wordsxsenses.forEach(function(x) {
			if(x.selected == 1){
				selected.add(new SenseAns(x.row.definition,x.row.synsetid,x.sensecaseid,x.row.lemma,x.status,x.inc,x.correct,x.incorrect));
			}else
				unselected.add(new SenseAns(x.row.definition,x.row.synsetid,x.sensecaseid,x.row.lemma,x.status,x.inc,x.correct,x.incorrect));
		});

		var id = 4545; 
		
		fill_randoms(0,selected,randoms,function(){fill_test(selected,unselected,callit,randoms); }); 
		
	
	});
}

function fill_randoms(i,selected,randoms,callback){
	
	if(i==selected.count()*3){
		callback();
		return;
	}
		
	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
		
		db.transaction(function(tx) {
			var pos =  Math.floor(Math.random()*117370) +1 ;
			tx.executeSql("SELECT * FROM sensesXindex where id="+pos+";", [], function(tx, res5) {
				randoms.add(new SenseAns(res5.rows.item(0).definition,res5.rows.item(0).synsetid,-1,"Error:random-loaded",-293,0.6969696,0,0));
				fill_randoms(i+1, selected, randoms, callback);
			});
		});
	});
}


function randPick(set){

	var done = false;
	var ans = -1;
	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
		var pos =  Math.floor(Math.random()*set.count());
	
		ans = set.toArray()[pos];
		done = true;
	});
	
	while(!done){
		console.log("randpick waiting");
	}
	return ans;

}


function fill_test(selected,unselected,callit,randoms) {
	
	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {	
	
		if(selected.count()==0){
			//alert("end");
			callit();
		}
		var x = selected.toArray()[0];
		selected.remove(x);
		
		var brothers = new Set([]);

		var traps = ["",""];
		find_brothers(0,new Set([x]),brothers,function(){
			
		var safe_selected = selected.difference(brothers);
		var safe_unselected = unselected.difference(brothers);
		var safe_randoms = randoms.difference(brothers).difference(selected);
	
		for(var i=0;i<2;i++){
			
			 var rand = Math.random()*100;
			 traps[i] = new answer('error 3434',12,12,'error 3434');
			 
			 if(rand < prob_selected && !safe_selected.isEmpty() ){
				 traps[i] = randPick(safe_selected);
				 safe_selected.remove(traps[i]);
				 //.lemma);
			 }else 
			 if( (rand > prob_selected && rand < prob_unselected || safe_selected.isEmpty() ) && !safe_unselected.isEmpty() ){
				 traps[i] = randPick(safe_unselected);
				 safe_unselected.remove(traps[i]);
				 //alert(randPick(safe_unselected).lemma); 
			 }else
				 traps[i] = randPick(safe_randoms);
		}
		test.questions.push( new question([x,x,traps[0],traps[1]] ));
		fill_test(selected,unselected,callit,randoms);
		return;	
		})

	});
}

function find_brothers(i,selected,brothers,callback){
	
	if(i==selected.count()){
		callback();
		return;
	}
		
	JS.require('JS.Set','JS.SortedSet','JS.Comparable','JS.Class', function(Set,SortedSet,Comparable,Class) {
		
		db.transaction(function(tx) {
			tx.executeSql("select definition , synsetid  , lemma  from dict where lemma='"+selected.toArray()[i].lemma+"';", [], function(tx, res1) {
				for(var j=0; j<res1.rows.length ; j++){
					brothers.add(new SenseAns(res1.rows.item(j).definition,res1.rows.item(j).synsetid,-1,res1.rows.item(j).lemma,294,0.6868686,0,0));
				}
				find_brothers(i+1, selected, brothers, callback);
			});
		});
	});
}



/// -------------------------------- FUNCTIONS --------------------------------


function init_test(){
	
	next_slide();
//	test.current_question--;
	
}

function next_slide()
{

	test.current_question++;
	
	if(test.current_question == 0 ){
		var d = new Date();
		var n = d.getTime();
		
		db.transaction(function(tx) {
			
			tx.executeSql("update test set stime = "+n+" where testid=(select MAX(testid) from test);", [], function(tx, res1) {});
				
		});
	}
	
	
	var array = test.questions;

	if( test.current_question  == array.length )
		return;
	
	csc = document.getElementById("currentQuestionCounter");
	csc.innerHTML = test.current_question + 1;//""+test.current_slide;
	csc = document.getElementById("tatalQuestionCounter");
	csc.innerHTML = test.questions.length ;//""+test.current_slide;
	
	var q = test.questions[test.current_question]; 
	document.getElementById("test_word").innerHTML = q.word.lemma;
	document.getElementById("test_op0").innerHTML = q.op[0].text;
	document.getElementById("test_op1").innerHTML = q.op[1].text;
	document.getElementById("test_op2").innerHTML = q.op[2].text;

	alert("acum:"+q.op_c.status+"\n inc+-:"+q.op_c.inc+" points:"+test.points);
	var d = new Date();
	var n = d.getTime();
	db.transaction(function(tx) {
		tx.executeSql("update ans_sense_cases set stime ="+n+", trap1id = " + test.questions[test.current_question].op_e1.id +", trap2id="+ test.questions[test.current_question].op_e2.id+" where sensecaseid="+test.questions[test.current_question].op_c.cid+";", [], function(tx, res1) {});
	});
}

function test_answer(ans){

	document.getElementById("test_op_ok0").innerHTML = "";
	document.getElementById("test_op_ok1").innerHTML = "";
	document.getElementById("test_op_ok2").innerHTML = "";
	
	console.log(test.questions[test.current_question].op[ans]+test.questions[test.current_question].op_c );
	save_answered_question(ans);
	
	
	var d = new Date();
	var n = d.getTime();
	var next_lvl = 4;
	var ant_lvl =  get_level(test.questions[test.current_question].op_c.correct,test.questions[test.current_question].op_c.incorrect)[0];
	db.transaction(function(tx) {
		tx.executeSql("update ans_sense_cases set etime ="+n+", anssid = " + test.questions[test.current_question].op[ans].id + " where sensecaseid="+test.questions[test.current_question].op_c.cid+";", [], function(tx, res1) {});
	});
	
	if( test.questions[test.current_question].correct == ans )
	{	
		db.transaction(function(tx) {
			tx.executeSql("update selected_senses set correct = correct +1  where synsetid = "+test.questions[test.current_question].op_c.id+" and dtime is NULL;;", [], function(tx, res1) {});
		});
		test.points += test.questions[test.current_question].op_c.inc;

		next_lvl = get_level(test.questions[test.current_question].op_c.correct + 1,test.questions[test.current_question].op_c.incorrect)[0];
		
		
	}else{
		
		document.getElementById("test_op_ok"+ans).innerHTML = "<img id=\"nok\" src=\"img/nok.png\">";
		db.transaction(function(tx) {
			tx.executeSql("update selected_senses set incorrect = incorrect +1  where synsetid = "+test.questions[test.current_question].op_c.id+" and dtime is NULL;", [], function(tx, res1) {});
		});
		test.points -= test.questions[test.current_question].op_c.inc;
		
		next_lvl = lvl = get_level(test.questions[test.current_question].op_c.correct,test.questions[test.current_question].op_c.incorrect + 1)[0];
		
	}
	
	// test.questions[test.current_question].op_c.level + test.questions[test.current_question].op_c.status;
	test.level_points += ( ant_lvl + test.questions[test.current_question].op_c.status );
	alert("tlp:"+test.level_points);
	if(ant_lvl>next_lvl)
		test.up++;
	if(ant_lvl<next_lvl)
		test.down++;
	if(ant_lvl==next_lvl)
		test.equal++;
	
	document.getElementById("test_op_ok"+test.questions[test.current_question].correct ).innerHTML = 
		"<img id=\"nok\" src=\"img/ok.png\">";


	var a = test.current_question;
	var b = test.questions.length;
	
	if( test.current_question  == test.questions.length -1 ){
		console.log("okok");
		
		$('#pok_next').off('vclick');
		$('#pok_next').on('vclick', function(){ 
		    	next_slide();
		    	 $.mobile.changePage( "index.html#pres", { transition: "slide"} );
		         return false;
		    });
		
		prepare_pres();
	}
}

function prepare_pres(){
	
	var d = new Date();
	var n = d.getTime();
	
	db.transaction(function(tx) {
		tx.executeSql("update test set etime = "+n+" where testid=(select MAX(testid) from test);", [], function(tx, res1) {});
	});
	
	var percent_total = Math.round(1000*test.points*100/test.questions.length)/1000;
	var level_total_ant = test.level_points/test.questions.length;
	document.getElementById("pres_points").innerHTML=percent_total+"-"+level_total_ant;
	document.getElementById("pres_up").innerHTML=test.up;
	document.getElementById("pres_down").innerHTML=test.down;
	document.getElementById("pres_equal").innerHTML=test.equal;
			
	// acces a db de preguntes ben contestades
	//calcul de %encerts %improvment baixades i puijades
	
}

function save_answered_question(ans){
	// guardar la id de la resposta triada encara que sigui falsa a la subtaula de la paraula a a la llista de preferides +info +power
	// guardr encerts/errors a la db de paraules preferides
}
