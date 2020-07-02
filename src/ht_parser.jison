%lex

%options case-sensitive

%%
\s+                      {}

"<"              {return 'A';}
">"              {return 'B';}
"/"              {return 'CR';}
"="              {return 'IGUAL';}
"html"           {return 'HTML';}
"head"           {return 'HEAD';}
"body"           {return 'BODY';}
"title"          {return 'TITLE';}
"div"            {return 'DIV';}
"br"             {return 'BR';}
"p"              {return 'P';}
"h"              {return 'H';}
"button"         {return 'BUTTON';}
"label"          {return 'LABEL';}
"input"          {return 'INPUT';}
"style"          {return 'STYLE';}
[1-5]+		     {return 'NUMERO';}
\"[^\"]*\"		 { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }

