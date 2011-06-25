var GMTipo1 = new Class({
    Extends:GMTipo0,
    initialize:function(l,a)
    {
       this.parent(3,2,l,a);
    },
/**
 * Função para escavar salas
 */    
    createRoom:function(__room)
    {
        for(var x=__room.x1+1;x<__room.x2;x++)
        {
            for(var y=__room.y1+1;y<__room.y2;y++)
            {
                this.mapa.setTile(x,y,new tileChao(),false);
            }        
        }
    },
/**
 * Função para gerar o mapa
 */    
    gera:function(__maxT,__minT,__numR)
    {
        var ROOM_MAX_SIZE=__maxT;
        var ROOM_MIN_SIZE=__minT;
        var MAX_ROOMS=__numR;
        
        var salas = [];
        var nSalas = 0;
        
        for(var r=0; r<MAX_ROOMS;r++)
        {
            //gerar largura e altura da sala aleatorieamente
            var w = Random.genInt(ROOM_MIN_SIZE,ROOM_MAX_SIZE);
            var h = Random.genInt(ROOM_MIN_SIZE,ROOM_MAX_SIZE);
            //posição aleatória sem sair do mapa
            var x = Random.genInt(0,this.MAP_WIDTH-w-1);
            var y = Random.genInt(0,this.MAP_HEIGHT-h-1);
            //cria a sala
            var nova_sala=new Rect(x,y,w,h);
            //verifica se intercepta com outra sala
            var falhou=false;
            for(var i=0;i<salas.length;i++)
            {
                if(nova_sala.intersects(salas[i]))
                {
                    falhou=true;
                    break;
                }
            }        
            //cria adiciona nova sala se não falhou
            if(!falhou)
            {
                //escava a sala
                this.createRoom(nova_sala);
                //coloca monstros
                this.colocaObjs(nova_sala);
                //obtem o centro da sala
                var centro=nova_sala.center();
                
                //caso seja a primeira sala coloca o jogador no seu centro
                if(nSalas===0)
                {
                    this.mapa.setEntrada(centro.cx,centro.cy);
                }
                else
                {
                    //liga à sala anterior (vai precisar de tunel horizontal e vertical)
                    //centro da sala anterior
                    var prev_centro=salas[nSalas-1].center();
                    
                    this.tunnelConnect(centro.cx,centro.cy,prev_centro.cx,prev_centro.cy);        
                }
                salas.push(nova_sala);
                nSalas++;            
            }
        }
        return this.mapa;
    },
/**
 * Função para popular salas
 */
    colocaObjs:function(__room)
    {
        var num_monsters = Random.genInt(0,this.MAX_ROOM_MONSTERS);
        var num_items = Random.genInt(0,this.MAX_ROOM_ITEMS);
        var x=0,y=0;
        for(var i=0;i<num_monsters;i++)
        {
            x = Random.genInt(__room.x1+1,__room.x2-1);
            y = Random.genInt(__room.y1+1,__room.y2-1);
            
            if(!this.mapa.bloqueado(x,y))
            {
                if(Random.genInt(0,100)<80)
                {
                    this.mapa.addActor(new Orc(x,y,this.mapa));
                }
                else
                {
                    this.mapa.addActor(new Troll(x,y,this.mapa));             
                }
            }
        }
        
        for(i=0;i<num_items;i++)
        {
            x = Random.genInt(__room.x1+1,__room.x2-1);
            y = Random.genInt(__room.y1+1,__room.y2-1);
            
            if(!this.mapa.bloqueado(x,y))
            {
                this.mapa.addItem(new PocaoVida(x,y));
            }
        }
    }    
});