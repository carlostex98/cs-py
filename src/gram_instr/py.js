const TIPO_VALX = {
	NUMERO: 'V_NUMERO',
	IDENTIFICADOR: 'V_IDENTIFICADOR',
	CADENA: 'V_CADENA',
};

const TIPO_OPERACIONX = {
	SUMA: 'O_SUMA',
	RESTA: 'O_RESTA',
	MULTIPLICACION: 'O_MULTIPLICACION',
	DIVISION: 'O_DIVISION',
	NEGATIVO: 'O_NEGATIVO',
	MAYOR_QUE: 'O_MAYOR_QUE',
	MENOR_QUE: 'O_MENOR_QUE',
	MAYOR_IGUAL: 'O_MAYOR_IGUAL',
	MENOR_IGUAL: 'O_MENOR_IGUAL',
	DOBLE_IGUAL: 'O_DOBLE_IGUAL',
	NO_IGUAL: 'O_NO_IGUAL',
	AND: 'O_AND',
	OR: 'O_OR',
	NOT: 'O_NOT',
	POW: 'O_POW',
	CONCATENACION: 'O_CONCATENACION',
	INCREMENTO: 'O_INCREMENTO',
	DECREMENTO: 'O_DECREMENTO',
	MODULO: '0_MOD'
};

const TIPO_INSTRUCCIONX = {
	PRINT: 'INSTR_PRINT',
	PRINTLN: 'INSTR_PRINTLN',
	WHILE: 'INSTR_WHILE',
	DECLARACION: 'INSTR_DECLARACION',
	ASIGNACION: 'INSTR_ASIGANCION',
	IF: 'INSTR_IF',
	IF_ELSE: 'INSTR_IFELSE',
	ELSE: 'INSTR_ELSE',
	FOR: 'INST_FOR',
	DO_WHILE: 'INSTR_DOWHILE',
	SWITCH: 'SWITCH',
	SWITCH_OP: 'SWITCH_OP',
	SWITCH_DEF: 'SWITCH_DEF',
	ASIGNACION_SIMPLIFICADA: 'ASIGNACION_SIMPLIFICADA',
	IMPORT: 'IMPORT',
	CLASS: 'CLASS',
	MAIN: 'MAIN',
	FUNCION: 'FUNCION',
	METODO: 'METODO',
	CONTINUE: 'CONTINUE',
	BREAK: 'BREAK',
	RETURN: 'RETURN',
	LLAMADA_F: "LLAMADA_F",
	AGRUPACION: "AGRUPACION",
	CASE: 'CASE',
	DEFAULT: 'DEFAULT'
};



function indent(texto){
	var res = texto.split("\n");
	texto="";
	for (let i = 0; i < res.length; i++) {
		texto+="\t"+res[i]+"\n";
	}
	return texto;
}

const instruccionesPY = {
	
	

	nuevoVal: function (tipo, nombre, valor) {
		return nombre +" = "+ valor +"\n";
	},

	nuevoPrint: function (tipo, valores) {
		return "Print ( "+valores+" )\n"
	},

	nuevoWhile: function (exprLogica, instrucciones) {
		return "while("+exprLogica+"): \n\t"+ instrucciones+"\n";
	},
	nuevoDoWhile: function (exprLogica, instrucciones) {
		return "while True: \n\t"+
				instrucciones+
				"\tif ("+exprLogica+");\n"+
				"\tbreak;";
	},

	nuevoFor: function (var_arr, expresionLogica, aumento, instrucciones) {

		return "for "+var_arr + "in range ("+aumento+")\n\t"+
				instrucciones;
	},

	nuevoIf: function (expresionLogica, instrucciones) {

		return "if ( "+expresionLogica+" ):\n\t"
				+instrucciones;

	},
	nuevoElse: function (instrucciones) {
		return "else: \n\t"+instrucciones;
	},

	nuevoElseIf: function (expresionLogica, instrx) {
		return "elif ( "+expresionLogica+" ):\n\t"
				+instrucciones;
	},

	nuevoSwitch: function (varx, casos) {

		return"def switch("+varx+"):"
				+"switcher = {\n"+casos+"}\n";		
	},

	nuevoCaso: function (valor, instr) {

		return "";

	},
	nuevoDefault: function (instr) {
		var p="<li><span class='caret'> DEFAULT </span>";
		p+="<ul class='nested'>";
		

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instr;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},

	nuevoMetodo: function (nombre, params, instrx) {

		var p="<li><span class='caret'> METODO </span>";
		p+="<ul class='nested'>";

		p+="<li>Nombre: "+nombre+"</li>"

		p+="<li><span class='caret'>Parametros</span>";
		p+="<ul class='nested'>";
		p+=params; //lista ver
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instrx;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;

	},
	nuevoFuncion: function (nombre, params, tipo, instrx) {
		var p="<li><span class='caret'> FUNCION </span>";
		p+="<ul class='nested'>";

		p+="<li>Nombre: "+nombre+"</li>"
		p+="<li>Tipo: "+tipo+"</li>"

		p+="<li><span class='caret'>Parametros</span>";
		p+="<ul class='nested'>";
		p+=params; //lista ver
		p+="</ul>";
		p+="</li>";

		p+="<li><span class='caret'>Instrucciones</span>";
		p+="<ul class='nested'>";
		p+=instrx;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},
	nuevollamada: function (nombre, params) {
		
		var p="<li><span class='caret'> LLAMADA-FUNCION </span>";
		p+="<ul class='nested'>";

		p+="<li>Nombre: "+nombre+"</li>"

		p+="<li><span class='caret'>Parametros</span>";
		p+="<ul class='nested'>";
		p+=params; //VER QUE PASA
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;

	},
	nuevoAsig: function (nombre, valores) {
		var p="<li><span class='caret'> Asignacion </span>";
		p+="<ul class='nested'>";

		p+="<li>Nombre: "+nombre+"</li>"

		p+="<li><span class='caret'>Valores</span>";
		p+="<ul class='nested'>";
		p+=valores;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},
	nuevoBreak: function () {
		//no recibe parametros
		var n = "<li> BREAK </li>"
		return n;
		
	},
	nuevoContinue: function () {
		//no recibe parametros
		var n = "<li> CONTINUE </li>"
		return n;
	},
	nuevoReturn: function (valores) {
		var p="<li><span class='caret'> RETURN </span>";
		p+="<ul class='nested'>";

		p+="<li><span class='caret'>Valores</span>";
		p+="<ul class='nested'>";
		p+=valores;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},
	nuevoValorAsg: function (tipo, valor) {//ultima derivacion
		var p="<li><span class='caret'> "+tipo+" </span>";
		p+="<ul class='nested'>";
		p+="<li>"+valor+"</li>"
		p+="</ul>";
		p+="</li>";

		return p;
	},
	nuevoParentesis: function (val) {

		var p="<li><span class='caret'> AGRUPACION </span>";
		p+="<ul class='nested'>";

		p+="<li><span class='caret'>Valores</span>";
		p+="<ul class='nested'>";
		p+=val;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";
		return p;
	},
	nuevaOpr: function (Izq, Der, tipo) {

		var p="<li><span class='caret'> OPERACION </span>";
		p+="<ul class='nested'>";
		p+="<li>"+tipo+"</li>"
		p+="<li><span class='caret'>Valore-izq</span>";
		p+="<ul class='nested'>";
		p+=Izq;
		p+="</ul>";
		p+="</li>";


		p+="<li><span class='caret'>Valore-der</span>";
		p+="<ul class='nested'>";
		p+=Der;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	},
	nuevaUnar: function (tipo, valor) {
		var p="<li><span class='caret'> OPERACION Unaria</span>";
		p+="<ul class='nested'>";
		p+="<li>"+tipo+"</li>"
	
		p+="<li><span class='caret'>Valor</span>";
		p+="<ul class='nested'>";
		p+=valor;
		p+="</ul>";
		p+="</li>";
		
		p+="</ul>";
		p+="</li>";

		return p;
	}

}

module.exports.TIPO_OPERACIONX = TIPO_OPERACIONX;
module.exports.TIPO_INSTRUCCIONX = TIPO_INSTRUCCIONX;
module.exports.TIPO_VALX = TIPO_VALX;
module.exports.instruccionesPY = instruccionesPY;