var GeradorMapas=new Class({
    initialize:function()
    {
        this.Basico1=0;
        this.Basico2=1;    
    },
    gera:function(tipo,l,a)
    {
        var gerador;
        switch(tipo)
        {
            case GM.Basico1:                            
                return (new GMTipo1(l,a)).gera(10,6,30);
            case GM.Basico2:
                return (new GMTipo1(l,a)).gera(6,4,10);                
            default:            
                return undefined;
        }
    }
});

var GM = new GeradorMapas();
