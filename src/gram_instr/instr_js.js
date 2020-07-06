const TIPO_VAL = {
    NUMERO: 'V_NUMERO',
    IDENTIFICADOR: 'V_IDENTIFICADOR',
    CADENA: 'V_CADENA',
};

const TIPO_OPERACION = {
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

const TIPO_INSTRUCCION = {
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

//estaba diseñado para devolver un json, pero lo arregle para que 
// devuelva un arbol en html
const instruccionesAPI = {

    nuevoVal: function (tipo, nombre, valor) {

        return {
            "variable": {
                "tipo": tipo,
                "nombre": nombre,
                "valor": valor
            }
        };
    },

    nuevoPrint: function (tipo, valores) {
        return {
            "print": {
                "valor": valores
            }
        }
    },

    nuevoWhile: function (exprLogica, instrucciones) {

        return {
            "while": {
                "valor_logico": exprLogica,
                "instrucciones": instrucciones
            }
        }

    },
    nuevoDoWhile: function (exprLogica, instrucciones) {
        return {
            "do-while": {
                "valor_logico": exprLogica,
                "instrucciones": instrucciones
            }
        }
    },

    nuevoFor: function (var_arr, expresionLogica, aumento, instrucciones) {


        return {
            "for": {
                "variable": var_arr,
                "expresion_logica": expresionLogica,
                "aumento": aumento,
                "instrucciones": instrucciones
            }
        };
    },

    nuevoIf: function (expresionLogica, instrucciones) {

        return {
            "if": {
                "valor_logico": expresionLogica,
                "instrucciones": instrucciones
            }
        }

    },
    nuevoElse: function (instrucciones) {
        return {
            "else": {
                "instrucciones": instrucciones
            }
        }
    },

    nuevoElseIf: function (expresionLogica, instrx) {
        return {
            "else-if": {
                "valor_logico": expresionLogica,
                "instrucciones": instrx
            }
        }
    },

    nuevoSwitch: function (varx, casos) {

        return {
            "switch": {
                "variable_de_control": varx,
                "casos": casos
            }
        }
    },

    nuevoCaso: function (valor, instr) {

        return {
            "caso_switch": {
                "valor": valor,
                "instrucciones": instr
            }
        }

    },
    nuevoDefault: function (instr) {
        return {
            "caso_default": {
                "instrucciones": instr
            }
        }
    },

    nuevoMetodo: function (nombre, params, instrx) {

        return {
            "metodo": {
                "nombre": nombre,
                "parametros": params,
                "instrucciones": instrx
            }
        }

    },
    nuevoFuncion: function (nombre, params, tipo, instrx) {
        return {
            "funcion": {
                "nombre": nombre,
                "tipo": tipo,
                "parametros": params,
                "instrucciones": instrx
            }
        }
    },
    nuevollamada: function (nombre, params) {

        return {
            "llamada-funcion": {
                "nombre": nombre,
                "parametros": params
            }
        }

    },
    nuevoAsig: function (nombre, valores) {
        return {
            "asignacion": {
                "nombre": nombre,
                "valores": valores
            }
        }
    },
    nuevoBreak: function () {
        return {
            "break": "eoi"
        }

    },
    nuevoContinue: function () {
        //no recibe parametros
        return {
            "continue": "eoi"
        }
    },
    nuevoReturn: function (valores) {
        return {
            "return": {
                "valores": valores
            }
        }
    },
    nuevoValorAsg: function (tipo, valor) {//ultima derivacion
        return {
            "valor": {
                "tipo": tipo,
                "valor": valor
            }
        }
    },
    nuevoParentesis: function (val) {

        return {
            "parentesis": {
                "valores": val
            }
        }
    },
    nuevaOpr: function (Izq, Der, tipo) {

        return {
            "operacion": {
                "izq": Izq,
                "der": Der,
                "tipo": tipo
            }
        }
    },
    nuevaUnar: function (tipo, valor) {
        return {
            "operacion_unaria":{
                "tipo": tipo,
                "valor": valor
            }
        }
    },
    nuevoComentario:function(texto){
        return{
            "comentario":{
                "texto":texto
            } 
        }
    }, nuevoClass:function(nombre, instrucciones){
        return{
            "class":{
                "nombre": nombre,
                "instrucciones": instrucciones
            }
        }
    }

}

module.exports.TIPO_OPERACION = TIPO_OPERACION;
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION;
module.exports.TIPO_VAL = TIPO_VAL;
module.exports.instruccionesAPI = instruccionesAPI;