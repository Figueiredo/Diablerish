function Diablerish()
{
        this.acabaJogo=function(__jog)
        {
        	that.estado=0;
        	player.cor = Cores.vermelho_escuro;
        	player.char = '%';
        	Log.log('Morreste...');        	
        }	
		
		var that=this;
        /**
         * DEFINIÇÕES
         */
        var buffer = new vConsola(80,20);
        var con=new cConsola('alvo');               
        var player = new Obj({char:"@",nome:"Heroi",cor:Cores.branco,bloqueia:true,combate:new Combatente(30,2,5,this.acabaJogo)});     
        this.estado = 1;   

        /**
         * CONTROI MAPA
         */
        var mapa=new Mapa(80,20,player);
        mapa.geradorTipo1(10,6,30);
                
        /**
         * DESENHAR
         */
        var desenha=function()
        {              
        	//actualiza jogo
            mapa.update();
            //desenha mapa
            mapa.draw(buffer);      
            //desenha GUI   
            con.setCorTexto(Cores.vermelho);
            con.escreveTexto(1,23,"HP:"+player.combate.hp+"/"+player.combate.max_hp)
            if(player.combate.hp<0) alert(layer.combate.hp);
            //faz blit do buffer para o ecran   
            con.blit(buffer,0,0,80,20,0,2);
            //actualiza o ecran
            con.escreveBuffer();
            //actualiza o log
            Log.escreveBuffer();
        };       
        desenha();
        

        /**
         * loop de jogo com base em turnos
         */
        document.onkeydown=function(evt)        
        {
        	if(that.estado==1)
        	{
	            switch(evt.keyCode)
	            {
	                case 37: //esquerda
	                    mapa.player_move_attack(-1,0);
	                    desenha();
	                    return false;                    
	                    
	                case 38: //cima
	                    mapa.player_move_attack(0,-1);
	                    desenha();
	                    return false;
	                    
	                case 39: //direita
	                    mapa.player_move_attack(1,0);
	                    desenha();
	                    return false;                
	                    
	                case 40: //baixo                
	                    mapa.player_move_attack(0,1);
	                    desenha();
	                    return false;
	            }       
            }
            else
            {
            	return false;
            }        
        };       
}