var FOVMap = new Class({
    initialize:function(__l,__a, __algo)
    {
        this.MAP_WIDTH=__l;
        this.MAP_HEIGHT=__a;
        this.t=[];
        
        for(var x=0;x<this.MAP_WIDTH;x++)
        {
            this.t[x]=[];
            for(var y=0;y<this.MAP_HEIGHT;y++)
            {
                this.t[x].push({bloqueia:false,visivel:false});
            }
        } 
        switch(__algo)
        {            
            case FOVAlgo.FOV_BASIC:
                this.FOVA = new FOVA_basico(this);
                break;
            case undefined:
            case FOVAlgo.FOV_RAYCASTING:
                this.FOVA = new FOVA_raycasting(this);
                break;
            case FOVAlgo.FOV_RECURSIVE_SHADOW:
                this.FOVA = new FOVA_rs(this);
                break;            
        }    
    },
    setBloqueio:function(__x,__y,__b)
    {
        if(__x>=0&&__x<this.MAP_WIDTH&&__y>=0&&__y<this.MAP_HEIGHT)
        {
            this.t[__x][__y].bloqueia=__b;
        }    
    },
    setVisivel:function(__x,__y,__v)
    {
        if(__x>=0&&__x<this.MAP_WIDTH&&__y>=0&&__y<this.MAP_HEIGHT)
        {
            this.t[__x][__y].visivel= __v !== undefined?__v:true;
        }    
    },
    isVisible:function(__x,__y)
    {
        if(__x>=0&&__x<this.MAP_WIDTH&&__y>=0&&__y<this.MAP_HEIGHT)
        {
            return this.t[__x][__y].visivel;
        }
        return false;	    
    },
    isBloqueado:function(__x,__y)
    {
        return __x<0||__x>=this.MAP_WIDTH||__y<0||__y>=this.MAP_HEIGHT||this.t[__x][__y].bloqueia;    
    },
    compute:function(__x,__y,__raio,__paredes)
    {
        this.FOVA.calcula(__x,__y,__raio,__paredes);
    },
    limpaVisivel:function()
    {
        for(var x=0;x<this.MAP_WIDTH;x++)
        {
            for(var y=0;y<this.MAP_HEIGHT;y++)
            {
                this.t[x][y].visivel=false;
            }
        }    
    }
});
