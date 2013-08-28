
function obj(a,b,c){
	this.op= [];
	this.op[0]=a;
	this.op[1]=b;
	this.op[2]=c;
}
function init()
{

	b = new obj(1,2,3);
	alert("hola");
	alert(b.op[2]+"okS");

}