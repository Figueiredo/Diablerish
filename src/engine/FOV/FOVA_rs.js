var FOVA_rs = new Class({
    Extends: FOVAlgo,
    initialize: function(mapa)
    {
        this.parent(mapa);
    },
    calcula: function(__x,__y,__raio,__paredes)
    {
        // Multipliers for transforming coordinates to other octants:
        this.mult = [
                        [1,  0,  0, -1, -1,  0,  0,  1],
                        [0,  1, -1,  0,  0, -1,  1,  0],
                        [0,  1,  1,  0,  0, -1, -1,  0],
                        [1,  0,  0,  1, -1,  0,  0, -1]
                    ];
                
        this.mapa.limpaVisivel();            
        for(var oct=0;oct<8;oct++)
        {
            this.cast_light(__x, __y, 1, 1.0, 0.0, __raio,
                             mult[0][oct], mult[1][oct],
                             mult[2][oct], mult[3][oct], 0);
        }        
    },
    cast_light:function(cx, cy, row, start, end, radius, xx, xy, yx, yy, id)
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
                        this.mapa.setVisivel(X, Y);
                    if (blocked)
                    {
                        //# we're scanning a row of blocked squares:
                        if (this.mapa.isBloqueado(X, Y))
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
                        if (this.mapa.isBloqueado(X, Y) && j < radius)
                            // This is a blocking square, start a child scan:
                            blocked = true;
                            this.cast_light(cx, cy, j+1, start, l_slope,radius, xx, xy, yx, yy, id+1);
                            new_start = r_slope;
                    }
                }
            }
            // Row is scanned; do next row unless last square was blocked:
            if (blocked)
                break;
        }
    }        
});        