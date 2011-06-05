/**
 * Class de cores das células de texto
 */
function cCorCelula(__texto,__fundo)
{
    this.texto=__texto;
    this.fundo=__fundo;
}

/**
 * função de comparação entre duas cores
 */
cCorCelula.prototype.equals=function(x){if(x.texto!=this.texto||x.fundo!=this.fundo)return false;return true;};