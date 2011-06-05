/**
 * Classe que gere o mapa e objectos de uma área
 * __w -> largura
 * __h -> altura
 * __player -> jogador
 */
function Mapa(__w,__h,__player)
{
    this.MAP_WIDTH=__w;
    this.MAP_HEIGHT=__h;
    this.MAX_ROOM_MONSTERS=3;
    this.t=[];
    this.startX=0;
    this.startY=0;
    this.fov=new FOVMap(__w,__h);
    this.algo=this.fov.ALGOS.FOV_RAYCASTING;
    this.player=__player;
    this.player.setMapa(this);
    this.objs = [this.player];
    this.FOVchanged=true;
    
    for(var x=0;x<this.MAP_WIDTH;x++)
    {
        this.t[x]=[];
        for(var y=0;y<this.MAP_HEIGHT;y++)
        {
            this.t[x].push(new Tile(Tiles.Parede));
            this.fov.setBloqueio(x,y,true);
        }
    }    
}

/**
 * Função para calcular o FOV com base na posição do jogador
 */
Mapa.prototype.computeFOV=function()
{
    this.fov.compute(this.player.x,this.player.y,10,true,this.algo);    
};

/**
 * Função para mudar o modo como o mapa calcula o FOV
 */
Mapa.prototype.setFOValgo=function(__algo)
{
    this.algo=(__algo!==undefined?__algo:this.algo);
};

/**
 * Função para verificar se uma certa posição está bloqueada a nível de movimento
 */
Mapa.prototype.bloqueado=function(__x,__y)
{
    if(__x<0||__x>=this.MAP_WIDTH||__y<0||__y>=this.MAP_HEIGHT)
    {
        return true;
    }
    
    if(this.t[__x][__y].blocked)
    {
        return true;
    }
    
    for(var i=0;i<this.objs.length;i++)
    {
        if(this.objs[i].bloqueia&&this.objs[i].x==__x&&this.objs[i].y==__y)
        {
            return true;
        }
    }
    
    return false;    
};

/**
 * Função para efectuar movimento atacando do jogador neste mapa
 */
Mapa.prototype.player_move_attack=function(__dx,__dy)
{
    if(!this.player.move(__dx,__dy))
    {
        var x = this.player.x+__dx;      
        var y = this.player.y+__dy;
        for(var i=0;i<this.objs.length;i++)
        {
            if(this.objs[i].bloqueia&&this.objs[i].x==x&&this.objs[i].y==y&&this.objs[i].combate!==undefined)
            {
                this.player.combate.ataca(this.objs[i]);
                return;
            }            
        }
    }
    else
    {
        this.FOVchanged=true;
    }    
};

/**
 * Função para actualizar o mapa, quer seja tiles ou objectos
 */
Mapa.prototype.update=function()
{
    if(this.FOVchanged)
    {
        this.computeFOV();
        this.FOVchanged=false;
    }
    
    for(var i=0;i<this.objs.length;i++)
    {
		if(this.objs[i]!=this.player&&this.objs[i].ia!==undefined)this.objs[i].ia.turno();
    }
};

Mapa.prototype.visivel=function(__x,__y)
{
    if(__x<0||__x>=this.MAP_WIDTH||__y<0||__y>=this.MAP_HEIGHT)
    {
        return false;
    }	
    
    return this.fov.isVisible(__x,__y);
};

/**
 * Função para desenhar o mapa e seus objectos
 */
Mapa.prototype.draw=function(__con,__debug)
{
    if(this.FOVchanged)
    {
        this.computeFOV();
        this.FOVchanged=false;
    }

    for(var x=0;x<this.MAP_WIDTH;x++)
    {
        for(var y=0;y<this.MAP_HEIGHT;y++)
        {
            if(this.fov.isVisible(x,y))
            {
                __con.setCorTexto(Cores.branco);
                __con.escreveChar(x,y,this.t[x][y].char);
                this.t[x][y].explorado=true;
            }
            else if(this.t[x][y].explorado)
            {
                __con.setCorTexto(Cores.cinza_escuro);
                __con.escreveChar(x,y,this.t[x][y].char);
            }
            else if(__debug!==undefined)
            {
                __con.setCorTexto(Cores.vermelho);
                __con.escreveChar(x,y,this.t[x][y].char);
            }                          
        }
    }    
    
    for(var i=0;i<this.objs.length;i++)
    {
        if(this.objs[i]!=this.player&&this.fov.isVisible(this.objs[i].x,this.objs[i].y))
            this.objs[i].draw(__con);                            
    }        
    this.player.draw(__con);
};

Mapa.prototype.baixaPrioridade=function(__obj)
{
    for(var i=0;i<this.objs.length;i++)
    {
        if(this.objs[i]==__obj)
        {     
        	this.objs.splice(i,1);
        	this.objs.unshift(__obj);   	
            return;
        }                            
    }     		
};

/**
 * Função para popular salas
 */
Mapa.prototype.colocaObjs=function(__room)
{
    var num_monsters = Random.genInt(0,this.MAX_ROOM_MONSTERS);
    
    for(var i=0;i<num_monsters;i++)
    {
        var x = Random.genInt(__room.x1,__room.x2);
        var y = Random.genInt(__room.y1,__room.y2);
        
        if(!this.bloqueado(x,y))
        {
            var monstro;
            if(Random.genInt(0,100)<80)
            {
                monstro = new Obj({x:x,y:y,char:'o',nome:"Orc",cor:Cores.verde_dessaturado,mapa:this,bloqueia:true,combate:new Combatente(10,0,3,morte_monstro_base),ia:new BaseMonstro()});
            }
            else
            {
                monstro = new Obj({x:x,y:y,char:'T',nome:"Troll",cor:Cores.verde_escuro,mapa:this,bloqueia:true,combate:new Combatente(16,1,4,morte_monstro_base),ia:new BaseMonstro()});                
            }
            this.objs.push(monstro);
        }
    }
};

/**
 * Função para escavar salas
 */
Mapa.prototype.createRoom=function(__room)
{
    for(var x=__room.x1;x<=__room.x2;x++)
    {
        for(var y=__room.y1;y<=__room.y2;y++)
        {            
            this.t[x][y].mudaTipo(Tiles.Chao);
            this.fov.setBloqueio(x,y,false);
        }        
    }
};

/**
 * Função para escavar tuneis horizontais
 */
Mapa.prototype.create_H_tunnel=function(__x1,__x2,__y)
{
    for(var x=Math.min(__x1,__x2);x<=Math.max(__x1,__x2);x++)
    {
        this.t[x][__y].mudaTipo(Tiles.Chao);
        this.fov.setBloqueio(x,__y,false);
    }    
};

/**
 * Função para escavar tuneis vertivais
 */
Mapa.prototype.create_V_tunnel=function(__y1,__y2,__x)
{
    for(var y=Math.min(__y1,__y2);y<=Math.max(__y1,__y2);y++)
    {
        this.t[__x][y].mudaTipo(Tiles.Chao);
        this.fov.setBloqueio(__x,y,false);
    }    
};

/**
 * Função para gerar mapa do tipo 1
 */
Mapa.prototype.geradorTipo1=function(__maxT,__minT,__numR)
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
        var x = Random.genInt(1,this.MAP_WIDTH-w-1);
        var y = Random.genInt(1,this.MAP_HEIGHT-h-1);
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
                this.startX=centro.cx;
                this.startY=centro.cy;
                this.player.x=centro.cx;
                this.player.y=centro.cy;
            }
            else
            {
                //liga à sala anterior (vai precisar de tunel horizontal e vertical)
                //centro da sala anterior
                var prev_centro=salas[nSalas-1].center();
                
                if(Random.genBool())
                {
                    //primeiro horizontal e depois vertical
                    this.create_H_tunnel(prev_centro.cx,centro.cx,prev_centro.cy);
                    this.create_V_tunnel(prev_centro.cy,centro.cy,centro.cx);
                }
                else
                {
                    //primeiro vertical e depois horizontal
                    this.create_V_tunnel(prev_centro.cy,centro.cy,prev_centro.cx);
                    this.create_H_tunnel(prev_centro.cx,centro.cx,centro.cy);                    
                }                
            }
            salas.push(nova_sala);
            nSalas++;            
        }
    }    
};