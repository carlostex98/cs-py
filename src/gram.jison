%{
	//nuestras estructuras
    let errores =[];
    let nombres=[];
    let comm=[];
    let ht = [];
    
    function in_err(tipo, lin, col, decrip){
        var c=[errores.length, tipo, lin, col, decrip];
        errores.push(c);
    }
    function in_var(tipo, nombre, ln){
        var c = [nombre, tipo, ln];
        nombres.push(c);
    }
    function in_comment(texto, ln, cl){
        var c = [texto, ln, cl];
        comm.push(c);
    }

    function in_html(texto){
        if(texto.length>1){
            ht.push(texto);
        }
        
    }

    function clear_vars(){
        errores=[];
        nombres=[];
        comm=[];
        ht = [];
    }

    function r_ht(){
        var x= "";
        for(let i =0; i<ht.length;i++){
            x+=ht[i];
        }
        return x;
    }
    function ht_fix(texto){
        for (let i = 0; i < texto.length; i++) {
            texto = texto.replace("<", "#");
        }
        for (let i = 0; i < texto.length; i++) {
            texto = texto.replace(">", "#");
        }
        return texto;
    }

    var a_c = 0;
    var b_c = 0;
    var c_c = 0;

    function r_control(){
        a_c = 0;
        b_c = 0;
        c_c = 0;
    }

    function context_return(ln, cl){
        
    }

    function context_continue(ln, cl){
        
    }

    function context_break(ln, cl){
        
    }

    function var_lst_x(tipo_var, vars, ln){

        for(let i=0; i<vars.length; i++){
            in_var(tipo_var, vars[i], ln);
        }

    }

%}


%lex

%options case-sensitive

%%
\s+                      {}                       
[/][/].*                  { in_comment(yytext, yylloc.first_line, yylloc.first_column); return 'COMENTARIO';}                      
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	       { in_comment(yytext, yylloc.first_line, yylloc.first_column); return 'COMENTARIO';}
"class"                 {return 'CLASS'}
"string"                {return 'STRING';}
"char"                  {return 'CHAR';}
"int"                    {return 'INT';}
"double"                {return 'DOUBLE';}
"bool"               {return 'BOOLEAN';}
"true"                  {return 'TRUE';}
"false"                 {return 'FALSE';}
"if"                    {return 'IF';}
"else"                  {return 'ELSE';}
"switch"                {return 'SWITCH';}
"case"                  {return 'CASE';}
"default"               {return 'DEFAULT';}
"break"                 {return 'BREAK';}
"while"                 {return 'WHILE';}
"do"                    {return 'DO';}
"for"                   {return 'FOR';}
"void"                  {return 'VOID';}
"return"                {return 'RETURN';}
"Console"                {return 'CONSOLE';}
"Write"                   {return 'WRITE';}
"main"                  {return 'MAIN';}
"continue"              {return 'CONTINUE';}
"+"                     {return 'MAS';}
"-"                     {return 'MENOS';}
"*"                     {return 'POR';}
"/"                     {return 'DIV';}
"++"                    {return 'MASM';}
"--"                    {return 'MENOSM';}
"("                     {return 'PAR_A';}
")"                     {return 'PAR_C';}
'{'                     {return 'LLAVE_A';}
'}'                   {return 'LLAVE_C';}
'.'                     {return 'PUNTO';}
";"                     {return 'PUNTO_C';}
":"                     {return 'DOS_P';}
">"                     {return 'MAYOR';}
'<'                     {return 'MENOR'};
">="                    {return 'MAYOR_I';}
'<='                    {return 'MENOR_I';}
"="                     {return 'IGUAL';}
"=="                    {return 'IGUAL_IGUAL';}
"!"                     {return 'NOT';}
'%'                     {return 'MOD';}
"!="                    {return 'NO_IGUAL';}
','                     {return 'COMA'};
"&&"                    {return 'AND';}
"||"                    {return 'OR';}
"^"                     {return 'POW';}
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\'']*\'				{in_html(yytext.substr(1,yyleng-2)); return 'CADENA_2'; }
[0-9]+"."[0-9]+  	{return 'DECIMAL';}
[0-9]+				{return 'ENTERO';}
([a-zA-Z])[a-zA-Z0-9_]*	{return 'IDENTIFICADOR';}
<<EOF>>				    {return 'EOF';}
.					    { in_err("Lexico", yylloc.first_line,yylloc.first_column, "El caracter (  "+  yytext  +"  )  no pertenece al lenguaje"); }

/lex
%{
	const TIPO_OPERACION	= require('../src/gram_instr/instr').TIPO_OPERACION;
	const TIPO_VAL		= require('../src/gram_instr/instr').TIPO_VAL;
	const instruccionesAPI	= require('../src/gram_instr/instr').instruccionesAPI;
    module.exports.clear_vars=clear_vars;
    module.exports.r_control=r_control;
%}


%start ini

%% /* gramar def */

ini
	: instr_methods EOF {return [$1,errores, nombres, r_ht()];}
;


instr_methods
    :instr_methods instr_meth   {$1.push($2); $$ = $1; }
    |instr_meth                 {$$ = [$1]; }
;
instr_meth
    : /* empty */  {}
    | CLASS IDENTIFICADOR LLAVE_A instr_methods LLAVE_C {$$=instruccionesAPI.nuevoClass($2,$4);}
    | VOID IDENTIFICADOR PAR_A params PAR_C LLAVE_A instr_methods LLAVE_C {$$=instruccionesAPI.nuevoMetodo($2,$4,$7); in_var("Void", $2, this._$.first_line);}
    | typo_var IDENTIFICADOR PAR_A params PAR_C LLAVE_A instr_methods LLAVE_C { a_c=1; $$=instruccionesAPI.nuevoFuncion($2,$4,$1,$7); in_var("Funcion", $2, this._$.first_line); }
    | VOID MAIN PAR_A PAR_C LLAVE_A instr_methods LLAVE_C {$$=instruccionesAPI.nuevoMetodo($2,"vacio",$6); in_var("main", "main", this._$.first_line);}
    | IF PAR_A asignacion PAR_C LLAVE_A instr_methods LLAVE_C {$$=instruccionesAPI.nuevoIf($3,$6);}
    | ELSE IF PAR_A asignacion PAR_C LLAVE_A instr_methods LLAVE_C {$$=instruccionesAPI.nuevoElseIf($4,$7);}
    | ELSE LLAVE_A instr_methods LLAVE_C {$$=instruccionesAPI.nuevoElse($3);}
    | WHILE PAR_A asignacion PAR_C LLAVE_A instr_methods LLAVE_C { b_c=1; c_c=1; $$=instruccionesAPI.nuevoWhile($3,$6); }
    | DO LLAVE_A instr_methods LLAVE_C WHILE PAR_A asignacion PAR_C PUNTO_C { b_c=1; c_c=1; $$=instruccionesAPI.nuevoDoWhile($7,$3);  }
    | CONSOLE PUNTO WRITE PAR_A asignacion PAR_C PUNTO_C  {$$=instruccionesAPI.nuevoPrint("ln",$5);}
    | FOR PAR_A var_for PUNTO_C asignacion PUNTO_C asignacion_icr PAR_C LLAVE_A instr_methods LLAVE_C { b_c=1; c_c=1; $$=instruccionesAPI.nuevoFor($3,$5,$7,$10); }
    | typo_var lista_v IGUAL asignacion PUNTO_C {$$=instruccionesAPI.nuevoVal($1,$2,$4); var_lst_x($1,$2, this._$.first_line);}
    | typo_var lista_v PUNTO_C {$$=instruccionesAPI.nuevoVal($1,$2,"");  var_lst_x($1,$2, this._$.first_line);}
    | BREAK PUNTO_C {$$=instruccionesAPI.nuevoBreak(); }
    | RETURN asignacion_ret PUNTO_C {$$=instruccionesAPI.nuevoReturn($2); }
    | IDENTIFICADOR sms PUNTO_C {$$=instruccionesAPI.nuevaUnar($2,$1);}
    | IDENTIFICADOR PAR_A params2 PAR_C PUNTO_C  {$$=instruccionesAPI.nuevollamada($1,$3);}
    | IDENTIFICADOR IGUAL asignacion PUNTO_C    {$$=instruccionesAPI.nuevoAsig($1,$3);}
    | SWITCH PAR_A asignacion PAR_C LLAVE_A sw_op LLAVE_C { c_c=1;$$=instruccionesAPI.nuevoSwitch($3,$6);  }
    | CONTINUE PUNTO_C {$$=instruccionesAPI.nuevoContinue();  }
    | COMENTARIO {$$=instruccionesAPI.nuevoComentario($1);}  
    | error panicMode{  in_err("Sintactico",this._$.first_line,this._$.first_column,yytext); }
;

panicMode
    : PUNTO_C {  $$=$1; }
    | LLAVE_C {  $$=$1;}
    | EOF {  $$=$1; }
;

asignacion_ret
    :/*empty*/ {}
    |asignacion {$$=$1}
;

asignacion_icr
    : IDENTIFICADOR sms {$$=[$1,$2];}

;

sms
    : MAS MAS  {$$=TIPO_OPERACION.INCREMENTO;}
    | MENOS MENOS {$$=TIPO_OPERACION.DECREMENTO;}
;

lista_v
    :lista_v COMA IDENTIFICADOR {$1.push($3); }
    | IDENTIFICADOR {$$=[$1]; }
;

sw_op
    : sw_op casos {$1.push($2); $$=$1;}
    |casos {$$=[$1];}
;

casos
    : CASE asignacion DOS_P instr_methods {$$=instruccionesAPI.nuevoCaso($2,$4);}
    | DEFAULT DOS_P instr_methods {$$=instruccionesAPI.nuevoDefault($3);}
    | COMENTARIO {$$=instruccionesAPI.nuevoComentario($1);}
    | error panicMode{  in_err("Sintactico",this._$.first_line,this._$.first_column,yytext); }  
;
var_for
    : typo_var IDENTIFICADOR IGUAL asignacion {$$=[$2,$4];}
    | IDENTIFICADOR IGUAL asignacion {$$=[$1,$3]}
;

/*para los parametros de llama de funcion*/
params2
    : /*empty*/ {$$="";}
    | params2 COMA asignacion   {$1.push($3); $$=$1;}
    | asignacion {$$=[$1];}
;
/*para los valores en la de claracion de una finc*/
params
    : /*empty*/   {$$="";}
    | params COMA typo_var IDENTIFICADOR {$1.push($3+" -> "+$4); $$=$1;}
    | typo_var IDENTIFICADOR {$$=[$1+" -> "+$2];}
;


typo_var
    : INT       {$$=$1}
    | DOUBLE    {$$=$1}
    | STRING    {$$=$1}
    | CHAR      {$$=$1}
    | BOOLEAN   {$$=$1}
;

otro_print
    : PRINT {$$=$1}
    | PRINTLN {$$=$1}
;

asignacion
    : asignacion symb asignacion {$$=instruccionesAPI.nuevaOpr($1,$3,$2);}
    | valx  {$$=$1;}
;

valx
    : ENTERO    {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.NUMERO,$1);}
    | DECIMAL   {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.NUMERO,$1);}
    | IDENTIFICADOR {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.IDENTIFICADOR,$1);}
    | IDENTIFICADOR PAR_A params2 PAR_C {$$=instruccionesAPI.nuevollamada($1,$3);}
    | TRUE {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.IDENTIFICADOR,$1);}
    | FALSE {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.IDENTIFICADOR,$1);}
    | CADENA {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.CADENA,$1);}
    | CADENA_2 {$$=instruccionesAPI.nuevoValorAsg(TIPO_VAL.CADENA,ht_fix($1));}
    | PAR_A asignacion PAR_C {$$=instruccionesAPI.nuevoParentesis($2);}
    | unar_op   {$$=$1;}
;

unar_op
    :MENOS valx {$$=instruccionesAPI.nuevaUnar(TIPO_OPERACION.RESTA,$2);}
    |NOT valx   {$$=instruccionesAPI.nuevaUnar(TIPO_OPERACION.NOT,$2);}
;

symb
    : AND {$$=TIPO_OPERACION.AND;}
    | OR {$$=TIPO_OPERACION.OR;}
    | NOT IGUAL {$$=TIPO_OPERACION.NO_IGUAL;}
    | MAS {$$=TIPO_OPERACION.SUMA;}
    | MENOS {$$=TIPO_OPERACION.RESTA;}
    | POR {$$=TIPO_OPERACION.MULTIPLICACION;}
    | DIV {$$=TIPO_OPERACION.DIVISION;}
    | MAYOR {$$=TIPO_OPERACION.MAYOR_QUE;}
    | MENOR {$$=TIPO_OPERACION.MENOR_QUE;}
    | MAYOR IGUAL {$$=TIPO_OPERACION.MAYOR_IGUAL;}
    | MENOR IGUAL {$$=TIPO_OPERACION.MENOR_IGUAL;}
    | IGUAL IGUAL {$$=TIPO_OPERACION.DOBLE_IGUAL;}
;