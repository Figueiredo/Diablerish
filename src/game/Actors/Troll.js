var Troll = new Class({
   Extends:Obj,
   initialize:function(x,y,mapa)
   {
       this.parent({x:x,y:y,char:'T',nome:"Troll",cor:Cores.verde_escuro,mapa:mapa,bloqueia:true,combate:new Combatente(16,1,4,morte_monstro_base),ia:new BaseMonstro()});
   }
});