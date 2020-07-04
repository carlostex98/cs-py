const instruccionesHT = {
    html: function(contenido){
        return JSON.stringify({
            "HTML":{
                contenido
            }
        })
    },
    head: function(contenido){
        return JSON.stringify({
            "HEAD": {contenido}
        })
    },
    body: function(contenido, estilo){
        return JSON.stringify({
            "BODY":{
                "ESTILO": estilo,
                "CONTENIDO": contenido
            },
        })
    },
    title:function(texto){
        return JSON.stringify({
            "TITLE": texto
        })
    },
    div:function(contenido, estilo){
        return JSON.stringify({
            "DIV":{
                "ESTILO": estilo,
                "CONTENIDO": contenido
            }
        })
    },
    br:function () {
        return "BR";
    },
    p: function (texto) {
        return JSON.stringify({
            "P": texto
        })
    },
    ht:function( texto){
        return JSON.stringify({
            "H":texto
        })
    },
    button:function(contenido){
        return JSON.stringify({
            "BUTTON": contenido
        })
    },
    label:function(texto){
        return JSON.stringify({
            "LABEL": texto
        })
    },
    input:function(texto){
        return  JSON.stringify({
            "INPUT": texto
        })
    }

}

module.exports.instruccionesHT = instruccionesHT;