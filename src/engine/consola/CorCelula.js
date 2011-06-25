/**
 * Class de cores das células de texto
 */
var cCorCelula = new Class({
    initialize:function(__texto,__fundo)
    {
        this.texto=__texto;
        this.fundo=__fundo;
    },
/**
 * função de comparação entre duas cores
 */
    equals:function(x)
    {
        if(x.texto!=this.texto||x.fundo!=this.fundo)
            return false;
        return true;
    }
});