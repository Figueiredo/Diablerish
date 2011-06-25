var GMTipo2 = new Class({
    Extends:GMTipo0,    
    initialize:function(l,a)
    {
       this.parent(3,2,l,a);
    },
/**
 * Função para escavar salas sem paredes (permite salas contiguas)
 */
    createRoom:function(__room)
    {
        for(var x=__room.x1;x<=__room.x2;x++)
        {
            for(var y=__room.y1;y<=__room.y2;y++)
            {            
                this.t[x][y]= new tileChao();
                this.fov.setBloqueio(x,y,false);
            }        
        }
    }   
});