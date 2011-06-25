var FOVA_basico = new Class({
    Extends: FOVAlgo,
    initialize: function(mapa)
    {
        this.parent(mapa);
    },
    calcula: function(__x,__y,__raio,__paredes)
    {
        var baseX=__x;
        var baseY=__y;
        var raio=__raio;
        
        for(var i=0;i<this.mapa.MAP_WIDTH;i++)
        {
            for(var j=0;j<this.mapa.MAP_HEIGHT;j++)
            {
                this.mapa.setVisivel(i,j,false);
                var x=i-baseX;
                var y=j-baseY;
                var l=Math.sqrt((x*x)+(y*y));
                if(l<raio)
                {
                    var vx = x;
                    var vy = y;
                    var ox = i+0.5;
                    var oy = j+0.5;
                    l=Math.sqrt((vx*vx)+(vy*vy));
                    vx/=l;
                    vy/=l;
                    var tmpvis=true;
                    for(var k=0;k<Math.floor(l);k++)
                    {
                        if(this.mapa.isBloqueado(Math.floor(ox),Math.floor(oy)))
                        {
                            tmpvis=false;
                            break;
                        }
                        ox+=vx;
                        oy+=vy;                    
                    }
                    this.mapa.setVisivel(i,j,tmpvis);
                }                        
            }
        }        
    }    
});
