var Diablerish = new Class({
    initialize:function()
	{
        this.buffer = new cConsola(80,20);
        this.con = new cConsolaEcran('alvo');
        this.player = new Obj({char:"@",nome:"Heroi",cor:Cores.branco,bloqueia:true,combate:new Combatente(30,2,5,this.acabaJogo.bind(this))});     
        this.estado = 1;
        
//Mudar para fábrica de objectos
// this.mapa= GeradorMapa.Tipo1(dados,dados,dados); //cada tipo é uma classe em si com os métodos necessários?        
        //this.mapa = new Mapa(80,20,this.player);
        //this.mapa.geradorTipo1(10,6,30);
        this.mapa = new GM.gera(GM.Basico1,80,20);        
        this.mapa.setPlayer(this.player);
    
        Log.log('Benvindo ao mundo do Diablerish',Cores.laranja_escuro);
        
        document.addEvent('keydown',this.keyHandler.bind(this));
        
        this.desenha();
	},
    keyHandler:function(evt)
    {        
        if(this.estado==1)
        {
            switch(evt.key)
            {
                case 'left':
                    this.mapa.player_move_attack(-1,0);
                    this.ciclo();
                    return false;                    
                    
                case 'up':
                    this.mapa.player_move_attack(0,-1);
                    this.ciclo();
                    return false;
                    
                case 'right':
                    this.mapa.player_move_attack(1,0);
                    this.ciclo();
                    return false;                
                    
                case 'down':
                    this.mapa.player_move_attack(0,1);
                    this.ciclo();
                    return false;
            }       
        }
        else
        {
            return false;
        }        
    },
    ciclo:function()
    {       
        this.update();
        this.desenha();
    },
    update:function()
    {
        this.mapa.update();
    },
    desenha:function()
    {
        this.mapa.draw(this.buffer);        
        this.con.setCorTexto(Cores.vermelho);
        this.con.escreveTexto(1,23,"HP:"+this.player.combate.hp+"/"+this.player.combate.max_hp);                    
        this.con.blit(this.buffer,0,0,80,20,0,0);
        Log.escreveBuffer();        
        this.con.blit(Log.painel,0,0,70,5,10,20);        
        this.con.escreveBuffer();
    },
    acabaJogo:function()
    {
        this.estado=0;
        this.player.cor = Cores.vermelho_escuro;
        this.player.char = '%';
        Log.log('Morreste...',Cores.vermelho);
    }
});
