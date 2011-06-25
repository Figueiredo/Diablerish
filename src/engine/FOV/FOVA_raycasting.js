var FOVA_raycasting = new Class({
    Extends: FOVAlgo,
    initialize: function(__mapa)
    {
        this.parent(__mapa);
    },
    calcula: function(__x,__y,__raio,__paredes)
    {
        var baseX=__x;
        var baseY=__y;
        var raio=__raio;
        var paredes = __paredes!==undefined?__paredes:true;
        this.mapa.limpaVisivel();
        for(var i=0;i<360;i++)
        {
            var x=Math.cos(i*0.01745);
            var y=Math.sin(i*0.01745);
            var ox= baseX+0.5;
            var oy= baseY+0.5;
            for(var j=0;j<raio;j++)
            {
                this.mapa.setVisivel(Math.floor(ox),Math.floor(oy));
                if(this.mapa.isBloqueado(Math.floor(ox),Math.floor(oy)))
                {
                    break;
                }
                ox+=x;
                oy+=y;
            }
        }        
    }    
});
