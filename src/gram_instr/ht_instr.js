const instruccionesHT = {
    html: function(head, body){
        return{
            "HTML":{
                head,
                body
            }
        }
    },
    head: function(contenido){
        return {
            "HEAD": {contenido}
        }
    },
    body: function(contenido, estilo){
        return{
            "BODY":{
                "ESTILO": estilo,
                "CONTENIDO": contenido
            },
        }
    },
    title:function(texto){
        return{
            "TITLE": texto
        }
    },
    div:function(contenido){
        return {
            "DIV":{contenido}
        }
    },
    br:function () {
        return "BR";
    },
    p: function (texto) {
        return {
            "P": texto
        }
    },
    ht:function(n, texto){
        return{
            "H":texto
        }
    },
    button:function(contenido){
        return{
            "BUTTON": contenido
        }
    },
    label:function(texto){
        return{
            "LABEL": texto
        }
    },
    input:function(texto){
        return{
            "INPUT": texto
        }
    }

}

module.exports.instruccionesHT = instruccionesHT;