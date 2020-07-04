%{
	//nuestras estructuras
    var vmx=0;
   function s_main(){
       if(vmx!=0){
           return instruccionesPY.nuevoMain();
       }
   }
%}


%lex

%options case-sensitive

%%
\s+                      {}                       
"//".*	                  {}                      
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	       { }
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
\"[^\"]*\"				{ return 'CADENA'; }
\'[^\'']*\'				{ return 'CADENA'; }
[0-9]+"."[0-9]+  	{return 'DECIMAL';}
[0-9]+				{return 'ENTERO';}
([a-zA-Z])[a-zA-Z0-9_]*	{return 'IDENTIFICADOR';}
<<EOF>>				    {return 'EOF'; vmx=0;}
.					    { }

/lex
%{
	
	const instruccionesPY	= require('../src/gram_instr/py.js').instruccionesPY;
%}


%start ini

%% /* gramar def */

ini
	: instr_methods EOF {return $1+s_main();}
;


instr_methods
    :instr_methods instr_meth   {$$=$1+$2; }
    |instr_meth                 {$$ = $1;}
;



instr_meth
    : VOID IDENTIFICADOR PAR_A params PAR_C LLAVE_A instr_methods LLAVE_C {$$=instruccionesPY.nuevoMetodo($2,$4,$7); }
    | typo_var IDENTIFICADOR PAR_A params PAR_C LLAVE_A instr_methods LLAVE_C {$$=instruccionesPY.nuevoFuncion($2,$4,$1,$7); }
    | VOID MAIN PAR_A PAR_C LLAVE_A instr_methods LLAVE_C {$$=instruccionesPY.nuevoMetodo($2," ",$6); vmx=1;}

    | IF PAR_A asignacion PAR_C LLAVE_A instr_methods LLAVE_C {$$=instruccionesPY.nuevoIf($3,$6);}
    | ELSE IF PAR_A asignacion PAR_C LLAVE_A instr_methods LLAVE_C {$$=instruccionesPY.nuevoElseIf($4,$7);}
    | ELSE LLAVE_A instr_methods LLAVE_C {$$=instruccionesPY.nuevoElse($3);}
    | WHILE PAR_A asignacion PAR_C LLAVE_A instr_methods LLAVE_C {$$=instruccionesPY.nuevoWhile($3,$6);}
    | DO LLAVE_A instr_methods LLAVE_C WHILE PAR_A asignacion PAR_C PUNTO_C {$$=instruccionesPY.nuevoDoWhile($7,$3);}
    | CONSOLE PUNTO WRITE PAR_A asignacion PAR_C PUNTO_C  {$$=instruccionesPY.nuevoPrint("ln",$5);}
    | FOR PAR_A var_for PUNTO_C asignacion PUNTO_C asignacion_icr PAR_C LLAVE_A instr_methods LLAVE_C {$$=instruccionesPY.nuevoFor($3,$5,$7,$10);}
    | typo_var lista_v IGUAL asignacion PUNTO_C {$$=instruccionesPY.nuevoVal($1,$2,$4); }
    | typo_var lista_v PUNTO_C {$$=instruccionesPY.nuevoVal($1,$2,"");  }
    | BREAK PUNTO_C {$$=instruccionesPY.nuevoBreak();}
    | RETURN asignacion_ret PUNTO_C {$$=instruccionesPY.nuevoReturn($2);}
    | IDENTIFICADOR sms PUNTO_C {$$=instruccionesPY.nuevaUnar($2,$1);}
    | IDENTIFICADOR PAR_A params2 PAR_C PUNTO_C  {$$=instruccionesPY.nuevollamada($1,$3);}
    | IDENTIFICADOR IGUAL asignacion PUNTO_C    {$$=instruccionesPY.nuevoAsig($1,$3);}
    | SWITCH PAR_A asignacion PAR_C LLAVE_A sw_op LLAVE_C {$$=instruccionesPY.nuevoSwitch($3,$6);}
    | CONTINUE PUNTO_C {$$=instruccionesPY.nuevoContinue();}
    | error PUNTO_C{  }
;


asignacion_ret
    :/*empty*/ {}
    |asignacion {$$=$1}
;

asignacion_icr
    : IDENTIFICADOR sms {$$=$1+$2;}

;

sms
    : MAS MAS  {$$="++";}
    | MENOS MENOS {$$="--";}
;

lista_v
    :lista_v COMA IDENTIFICADOR {$1.push($3);}
    | IDENTIFICADOR {$$=[$1]; }
;

sw_op
    : sw_op casos {$$=$1+$2;}
    |casos {$$=$1;}
;

casos
    : CASE asignacion DOS_P instr_methods {$$=instruccionesPY.nuevoCaso($2,$4);}
    | DEFAULT DOS_P instr_methods {$$=instruccionesPY.nuevoDefault($3);}
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
    | params COMA typo_var IDENTIFICADOR {$1.push($4); $$=$1;}
    | typo_var IDENTIFICADOR {$$=[$2];}
;


typo_var
    : INT       {$$=$1}
    | DOUBLE    {$$=$1}
    | STRING    {$$=$1}
    | CHAR      {$$=$1}
    | BOOLEAN   {$$=$1}
;



asignacion
    : asignacion symb asignacion {$$=instruccionesPY.nuevaOpr($1,$3,$2);}
    | valx  {$$=$1;}
;

valx
    : ENTERO    {$$=$1}
    | DECIMAL   {$$=$1}
    | IDENTIFICADOR {$$=$1}
    | IDENTIFICADOR PAR_A params2 PAR_C {$$=instruccionesPY.nuevollamada($1,$3);}
    | TRUE {$$=$1}
    | FALSE {$$=$1}
    | CADENA {$$=$1}
    | PAR_A asignacion PAR_C {$$=instruccionesPY.nuevoParentesis($2);}
    | unar_op   {$$=$1;}
;

unar_op
    :MENOS valx {$$=instruccionesPY.nuevaUnar("-",$2);}
    |NOT valx   {$$=instruccionesPY.nuevaUnar("!",$2);}
;

symb
    : AND {$$=" and ";}
    | OR {$$=" or ";}
    | NOT IGUAL {$$=" not ";}
    | MAS {$$=" + ";}
    | MENOS {$$=" - ";}
    | POR {$$=" * ";}
    | DIV {$$=" / ";}
    | MAYOR {$$=">";}
    | MENOR {$$="<";}
    | MAYOR IGUAL {$$=" >= ";}
    | MENOR IGUAL {$$=" <= ";}
    | IGUAL IGUAL {$$=" == ";}
;