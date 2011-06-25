var GMTipo0 = new Class({
    initialize:function(m,i,l,a)
    {
        this.MAX_ROOM_MONSTERS=m;
        this.MAX_ROOM_ITEMS=i;
        this.MAP_WIDTH = l;
        this.MAP_HEIGHT = a;
        this.mapa = new Mapa(l,a);
    },
/**
 * Função para escavar salas
 */    
    createRoom:function(__room)
    {
    },
/**
 * Função para escavar tuneis horizontais
 */
    create_H_tunnel:function(__x1,__x2,__y)
    {
        for(var x=Math.min(__x1,__x2);x<=Math.max(__x1,__x2);x++)
        {
            this.mapa.setTile(x,__y,new tileChao(),false);            
        }    
    },
/**
 * Função para escavar tuneis vertivais
 */
    create_V_tunnel:function(__y1,__y2,__x)
    {
        for(var y=Math.min(__y1,__y2);y<=Math.max(__y1,__y2);y++)
        {
            this.mapa.setTile(__x,y,new tileChao(),false);
        }    
    },
/**
 * Função para ligar dois pontos com tuneis
 */    
    tunnelConnect:function(x1,y1,x2,y2)
    {
        if(Random.genBool())
        {
            //primeiro horizontal e depois vertical
            this.create_H_tunnel(x2,x1,y2);
            this.create_V_tunnel(y2,y1,x1);
        }
        else
        {
            //primeiro vertical e depois horizontal
            this.create_V_tunnel(y2,y1,x2);
            this.create_H_tunnel(x2,x1,y1);                    
        }        
    },
/**
 * Função para gerar o mapa
 */    
    gera:function(__maxT,__minT,__numR)
    {
        return undefined;
    },
/**
 * Função para popular salas
 */    
    colocaObjs:function(__room)
    {
    }
});