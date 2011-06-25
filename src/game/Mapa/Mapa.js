/**
 * Classe que gere o mapa e objectos de uma área
 * __w -> largura
 * __h -> altura
 * __player -> jogador
 */
var Mapa = new Class({
    initialize: function(__w,__h)
    {
        this.MAP_WIDTH=__w;
        this.MAP_HEIGHT=__h;
        this.t=[];
        this.startX=0;
        this.startY=0;
        this.fov=new FOVMap(__w,__h);
        this.player=undefined;
        this.objs = [];
        this.FOVchanged=true;
        
        for(var x=0;x<this.MAP_WIDTH;x++)
        {
            this.t[x]=[];
            for(var y=0;y<this.MAP_HEIGHT;y++)
            {
                this.t[x].push(new tileParede());
                this.fov.setBloqueio(x,y,true);
            }
        }    
    },
/**
 * Função para calcular o FOV com base na posição do jogador
 */
    computeFOV:function()
    {
        this.fov.compute(this.player.x,this.player.y,10,true);    
    },
/**
 * Função para mudar o modo como o mapa calcula o FOV
 */
    setFOValgo:function(__algo)
    {
        this.algo=(__algo!==undefined?__algo:this.algo);
    },
/**
 * Função para verificar se uma certa posição está bloqueada a nível de movimento
 */
    bloqueado:function(__x, __y)
    {
        if (__x < 0 || __x >= this.MAP_WIDTH || __y < 0 || __y >= this.MAP_HEIGHT)
        {
            return true;
        }
    
        if (this.t[__x][__y].blocked)
        {
            return true;
        }
    
        for (var i = 0; i < this.objs.length; i++)
        {
            if (this.objs[i].bloqueia && this.objs[i].x == __x && this.objs[i].y == __y)
            {
                return true;
            }
        }
    
        return false;
    },
/**
 * Função para efectuar movimento atacando do jogador neste mapa
 */
    player_move_attack:function(__dx,__dy)
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
    },
/**
 * Função para actualizar o mapa, quer seja tiles ou objectos
 */
    update:function()
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
    },
    visivel:function(__x,__y)
    {
        if(__x<0||__x>=this.MAP_WIDTH||__y<0||__y>=this.MAP_HEIGHT)
        {
            return false;
        }	
        
        return this.fov.isVisible(__x,__y);
    },
/**
 * Função para desenhar o mapa e seus objectos
 */
    draw:function(__con,__debug)
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
    },
/**
 * Função para baixar a prioridade de um objecto
 */ 
    baixaPrioridade:function(__obj)
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
    },
/**
 * Função para definir a entrada do mapa
 */
    setEntrada:function(x,y)
    {
        this.startX=x;
        this.startY=y;
    },
/**
 * Função para adicionar objectos ativos
 */
    addActor:function(actor)
    {
        this.objs.push(actor);
    },
/**
 * Função para adicionar items
 */
    addItem:function(item)
    {
        this.objs.unshift(item);
    },
/**
 * Função para definir um tile do mapa
 */
    setTile:function(x,y,tile,bloqueia)
    {
        if(x<0||x>=this.MAP_WIDTH||y<0||y>=this.MAP_HEIGHT)
        {
            return false;
        }
        this.t[x][y]= tile;
        this.fov.setBloqueio(x,y,bloqueia);        
    },
/**
 * Função para definir o jogador
 */ 
    setPlayer:function(player)
    {
        this.player=player;
        this.player.x=this.startX;
        this.player.y=this.startY;
        this.player.setMapa(this);        
    }
});