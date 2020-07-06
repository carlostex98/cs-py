const { main } = require("../gram");


function indent(texto) {
	if (texto != undefined) {
		var res = texto.split("\n");
		texto = "";
		for (let i = 0; i < res.length; i++) {
			texto += "\t" + res[i] + "\n";
		}
		return texto;
	} else {
		return "";
	}

}

const instruccionesPY = {

	nuevoVal: function (tipo, nombre, valor) {
		return nombre + " = " + valor + "\n";
	},

	nuevoPrint: function (tipo, valores) {
		return "Print ( " + valores + " )\n"
	},

	nuevoWhile: function (exprLogica, instrucciones) {
		return "while(" + exprLogica + "): \n" + indent(instrucciones) + "\n";
	},
	nuevoDoWhile: function (exprLogica, instrucciones) {
		return "while True: \n" +
			indent(instrucciones) +
			"\tif (" + exprLogica + ");\n" +
			"\tbreak;";
	},

	nuevoFor: function (var_arr, expresionLogica, aumento, instrucciones) {

		return "for " + var_arr[0] + " in range (" + var_arr[1] + " ," + expresionLogica + " ," + aumento + "):\n" +
			indent(instrucciones);
	},

	nuevoIf: function (expresionLogica, instrucciones) {

		return "if ( " + expresionLogica + " ):\n"
			+ indent(instrucciones);

	},
	nuevoElse: function (instrucciones) {
		return "else: \n" + indent(instrucciones);
	},

	nuevoElseIf: function (expresionLogica, instrx) {
		return "elif ( " + expresionLogica + " ):\n"
			+ indent(instrx);
	},

	nuevoSwitch: function (varx, casos) {

		return "def switch(" + varx + "):\n"
			+ indent("switcher = {\n" + indent(casos) + "}\n");
	},

	nuevoCaso: function (valor, instr) {

		return valor + ": " + instr + ",\n";

	},
	nuevoDefault: function (instr) {
		return "default: " + instr + ",\n";
	},

	nuevoMetodo: function (nombre, params, instrx) {

		return "def " + nombre + "(" + params + "):\n" +
			indent(instrx);

	},
	nuevoFuncion: function (nombre, params, tipo, instrx) {
		return "def " + nombre + "(" + params + "):\n" +
			indent(instrx);
	},
	nuevollamada: function (nombre, params) {

		return nombre + "(" + params + ")";

	},
	nuevollamada2: function (nombre, params) {

		return nombre + "(" + params + ")\n";

	},
	nuevoAsig: function (nombre, valores) {
		return nombre + " = " + valores + "\n";
	},
	nuevoBreak: function () {
		//no recibe parametros
		return "break\n";

	},
	nuevoContinue: function () {
		//no recibe parametros
		return "continue\n";
	},
	nuevoReturn: function (valores) {
		return "return " + valores + "\n";
	},
	nuevoValorAsg: function (tipo, valor) {//ultima derivacion
		return valor;
	},
	nuevoParentesis: function (val) {
		return "(" + val + ")"
	},
	nuevaOpr: function (Izq, Der, tipo) {

		return Izq + tipo + Der;
	},
	nuevaUnar: function (tipo, valor) {
		return tipo + valor;
	},
	nuevoMain: function () {
		return "if __name__=\"main\" \n\tmain()"
	},
	nuevoClass: function (nombre, instrucciones) {
		return "class " + nombre + ":\n" +
			indent(instrucciones);
	}

}

module.exports.instruccionesPY = instruccionesPY;