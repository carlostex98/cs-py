%{
	//nuestras estructuras
    let errores =[];
   
%}

%lex

%options case-insensitive

%%
\s+                      {}


"="              {return 'IGUAL';}

"<h1>"              {return 'H';}
"<h2>"              {return 'H';}
"<h3>"              {return 'H';}
"<h4>"              {return 'H';}
"<h5>"              {return 'H';}

"</h1>"              {return 'HX';}
"</h2>"              {return 'HX';}
"</h3>"              {return 'HX';}
"</h4>"              {return 'HX';}
"</h5>"              {return 'HX';}

"<html>"           {return 'HTML';}
"</html>"           {return 'HTMLX';}

"<head>"           {return 'HEAD';}
"</head>"           {return 'HEADX';}

"<body>"           {return 'BODY';}
"</body>"           {return 'BODYX';}

"<title>"          {return 'TITLE';}
"</title>"          {return 'TITLEX';}

"<div>"            {return 'DIV';}
"</div>"            {return 'DIVX';}

"<br>"             {return 'CONTENT';}

"<p>"              {return 'P';}
"</p>"              {return 'PX';}

"<button>"         {return 'BUTTON';}
"</button>"         {return 'BUTTONX';}

"<label>"          {return 'LABEL';}
"</label>"          {return 'LABELX';}

"<input>"          {return 'INPUT';}
"</input>"          {return 'INPUTX';}

\"[^\"]*\"		 { return 'CADENA'; }
<<EOF>>				    {return 'EOF';}
.					    { return 'CONTENT' }

/lex
%{
	
	const instruccionesHT	= require('../src/gram_instr/ht_instr.js').instruccionesHT;
%}


%start ini

%% /* gramar def */

ini
	: instrucciones EOF {return $1;}
;

instrucciones
    : instrucciones general {$$ = $1+$2;}
    | general        {$$ = $1;}
;

general
    : HTML instrucciones  HTMLX {$$=instruccionesHT.html($2);}
    | HEAD instrucciones  HEADX {$$=instruccionesHT.head($2);}
    | BODY instrucciones  BODYX {$$=instruccionesHT.body($2, "yellow");}
    | DIV instrucciones  DIVX {$$=instruccionesHT.div($2,"yellow");}
    | BUTTON instrucciones  BUTTONX {$$=instruccionesHT.button($2);}
    | LABEL instrucciones  LABELX {$$=instruccionesHT.label($2);}
    | INPUT instrucciones  INPUTX {$$=instruccionesHT.input($2);}
    | P instrucciones  PX{$$=instruccionesHT.p($2);}
    | H instrucciones  HX {$$=instruccionesHT.ht($2);}
    | TITLE instrucciones  TITLEX {$$=instruccionesHT.title($2);}
    | CONTENT {$$=$1;}
;


