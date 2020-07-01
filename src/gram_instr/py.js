

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

		return "\t"+valor+": "+instr+",\n";

	},
	nuevoDefault: function (instr) {
		return "\tdefault: "+instr+",\n";
	},

	nuevoMetodo: function (nombre, params, instrx) {

		return "def "+ nombre +"(" + params +"):\n"+
				instrx;

	},
	nuevoFuncion: function (nombre, params, tipo, instrx) {
		return "def "+ nombre +"(" + params +"):\n"+
				instrx;
	},
	nuevollamada: function (nombre, params) {
		
		return "\t"+nombre+"("+params+")\n";

	},
	nuevoAsig: function (nombre, valores) {
		return "\t"+nombre+" = "+valores+"\n";
	},
	nuevoBreak: function () {
		//no recibe parametros
		return "\tbreak\n";
		
	},
	nuevoContinue: function () {
		//no recibe parametros
		return "\tcontinue\n";
	},
	nuevoReturn: function (valores) {
		return "\treturn "+valores+"\n";
	},
	nuevoValorAsg: function (tipo, valor) {//ultima derivacion
		return valor;
	},
	nuevoParentesis: function (val) {
		return "\t("+val+")\n"
	},
	nuevaOpr: function (Izq, Der, tipo) {

		return Izq + tipo + Der ;
	},
	nuevaUnar: function (tipo, valor) {
		return "\t"+valor+tipo+"\n";
	}

}

module.exports.instruccionesPY = instruccionesPY;