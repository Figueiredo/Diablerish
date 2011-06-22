function errorlog(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

function logger()
{
    this.MAX_LINHAS=5;
    this.lista = [];
    this.painel = new vConsola(70,this.MAX_LINHAS);    
}

logger.prototype.log=function(_msg,_cor)
{
    if(_cor===undefined)
        _cor = Cores.defaultTexto;
    this.lista.unshift({msg:_msg,cor:_cor});
    while(this.lista.length>this.MAX_LINHAS)
    {
        this.lista.pop();
    }
};

logger.prototype.escreveBuffer=function()
{
    this.painel.limpaEcran();
    for(var y=0;y<this.lista.length;y++)
    {
        this.painel.setCorTexto(this.lista[y].cor);
        this.painel.escreveTexto(0,y,this.lista[y].msg);
    }
};

var Log = new logger();