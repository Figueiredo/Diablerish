var cLog = new Class({
    initialize: function()
    {
        this.MAX_LINHAS = 5;
        this.lista = [];
        this.painel = new cConsola(70, this.MAX_LINHAS);
    },
    log: function(_msg, _cor)
    {
        if (_cor === undefined) _cor = Cores.defaultTexto;        
        this.lista.unshift({msg: _msg,cor: _cor});        
        while (this.lista.length > this.MAX_LINHAS)
        {
            this.lista.pop();
        }
    },
    escreveBuffer: function()
    {
        this.painel.limpaEcran();
        for (var y = 0; y < this.lista.length; y++)
        {
            this.painel.setCorTexto(this.lista[y].cor);
            this.painel.escreveTexto(0, y, this.lista[y].msg);
        }
    }  
});

var Log = new cLog();
