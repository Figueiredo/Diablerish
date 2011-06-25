var Orc = new Class({
   Extends:Obj,
   initialize:function(x,y,mapa)
   {
       this.parent({x:x,y:y,char:'o',nome:"Orc",cor:Cores.verde_dessaturado,mapa:mapa,bloqueia:true,combate:new Combatente(10,0,3,morte_monstro_base),ia:new BaseMonstro()});
   }
});