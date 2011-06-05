function FOVMap(__l,__a)
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
}

FOVMap.prototype.setBloqueio=function(__x,__y,__b)
{
    if(__x>=0&&__x<this.MAP_WIDTH&&__y>=0&&__y<this.MAP_HEIGHT)
    {
        this.t[__x][__y].bloqueia=__b;
    }

};

FOVMap.prototype.setVisivel=function(__x,__y,__v)
{
    if(__x>=0&&__x<this.MAP_WIDTH&&__y>=0&&__y<this.MAP_HEIGHT)
    {
        this.t[__x][__y].visivel= __v !== undefined?__v:true;
    }

};

FOVMap.prototype.isVisible=function(__x,__y)
{
    if(__x>=0&&__x<this.MAP_WIDTH&&__y>=0&&__y<this.MAP_HEIGHT)
    {
    	return this.t[__x][__y].visivel;
	}
    return false;	    
};

FOVMap.prototype.isBloqueado=function(__x,__y)
{
    return __x<0||__x>=this.MAP_WIDTH||__y<0||__y>=this.MAP_HEIGHT||this.t[__x][__y].bloqueia;    
};


FOVMap.prototype.compute=function(__x,__y,__raio,__paredes,__algo)
{
    var algo = __algo!==undefined?__algo:this.ALGOS.FOV_BASIC;
    
    switch(algo)
    {
        case this.ALGOS.FOV_BASIC:
            this.fovbasic(__x,__y,__raio,__paredes);
            break;
        case this.ALGOS.FOV_RAYCASTING:
            this.fovray(__x,__y,__raio,__paredes);
            break;
        case this.ALGOS.FOV_RECURSIVE_SHADOW:
            this.recShadow(__x,__y,__raio,__paredes);
            break;            
    }
    
};


FOVMap.prototype.ALGOS={
    FOV_BASIC:0,
    FOV_RAYCASTING:1,
    FOV_RECURSIVE_SHADOW:2
};

FOVMap.prototype.limpaVisivel=function()
{
    for(var x=0;x<this.MAP_WIDTH;x++)
    {
        for(var y=0;y<this.MAP_HEIGHT;y++)
        {
            this.t[x][y].visivel=false;
        }
    }    
};


/*****************************************************************************************************
 * Algoritmos
 *****************************************************************************************************/
  
/*****************************************************************
* Basico
*/
FOVMap.prototype.fovbasic=function(__x,__y,__raio,__paredes)
{
    var baseX=__x;
    var baseY=__y;
    var raio=__raio;
    var paredes = __paredes!==undefined?__paredes:true;
    
    for(var i=0;i<this.MAP_WIDTH;i++)
    {
        for(var j=0;j<this.MAP_HEIGHT;j++)
        {
            this.t[i][j].visivel=false;
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
                    if(this.isBloqueado(Math.floor(ox),Math.floor(oy)))
                    {
                        tmpvis=false;
                        break;
                    }
                    ox+=vx;
                    oy+=vy;                    
                }
                this.setVisivel(i,j,tmpvis);
                //this.t[i][j].visivel=tmpvis;
            }                        
        }
    }    
};

/*****************************************************************
* raycasting
*/
FOVMap.prototype.fovray=function(__x,__y,__raio,__paredes)
{
    var baseX=__x;
    var baseY=__y;
    var raio=__raio;
    var paredes = __paredes!==undefined?__paredes:true;
    this.limpaVisivel();
    for(var i=0;i<360;i++)
    {
        var x=Math.cos(i*0.01745);
        var y=Math.sin(i*0.01745);
        var ox= baseX+0.5;
        var oy= baseY+0.5;
        for(var j=0;j<raio;j++)
        {
            this.setVisivel(Math.floor(ox),Math.floor(oy));
            if(this.isBloqueado(Math.floor(ox),Math.floor(oy)))
            {
                break;
            }
            ox+=x;
            oy+=y;
        }
    }
};
  
  
/*****************************************************************
* recursive shadow casting
*/  
FOVMap.prototype.recShadow=function(__x,__y,__raio,__paredes)
{
    // Multipliers for transforming coordinates to other octants:
    mult = [
                [1,  0,  0, -1, -1,  0,  0,  1],
                [0,  1, -1,  0,  0, -1,  1,  0],
                [0,  1,  1,  0,  0, -1, -1,  0],
                [1,  0,  0,  1, -1,  0,  0, -1]
            ];
            
    this.limpaVisivel();            
    for(var oct=0;oct<8;oct++)
    {
        this._rS_cast_light(__x, __y, 1, 1.0, 0.0, __raio,
                         mult[0][oct], mult[1][oct],
                         mult[2][oct], mult[3][oct], 0);
    }
};

FOVMap.prototype._rS_cast_light=function(cx, cy, row, start, end, radius, xx, xy, yx, yy, id)
{
        //"Recursive lightcasting function"
        if (start < end)
            return;
        
        radius_squared = radius*radius;
        
        for(var j=row;j<=radius;j++)
        {
            dx=-j-1;
            dy = -j;
            blocked = false;
            while (dx <= 0)
            {
                dx += 1;
                // Translate the dx, dy coordinates into map coordinates:
                X = cx + dx * xx + dy * xy;
                Y = cy + dx * yx + dy * yy;
                // l_slope and r_slope store the slopes of the left and right
                // extremities of the square we're considering:
                l_slope = (dx-0.5)/(dy+0.5);
                r_slope = (dx+0.5)/(dy-0.5);
                if (start < r_slope)
                    continue;
                else if (end > l_slope)
                    break;
                else
                {
                    // Our light beam is touching this square; light it:
                    if (dx*dx + dy*dy < radius_squared)
                        this.setVisivel(X, Y);
                    if (blocked)
                    {
                        //# we're scanning a row of blocked squares:
                        if (this.isBloqueado(X, Y))
                        {
                            new_start = r_slope;
                            continue;
                        }
                        else
                        {
                            blocked = false;
                            start = new_start;
                        }
                    }
                    else
                    {
                        if (this.isBloqueado(X, Y) && j < radius)
                            // This is a blocking square, start a child scan:
                            blocked = true;
                            this._rS_cast_light(cx, cy, j+1, start, l_slope,radius, xx, xy, yx, yy, id+1);
                            new_start = r_slope;
                    }
                }
            }
            // Row is scanned; do next row unless last square was blocked:
            if (blocked)
                break;
        }
};