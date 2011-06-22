function BaseMonstro()
{
    this.dono = undefined;
}

BaseMonstro.prototype.turno=function()
{
	var monstro = this.dono;
	if(monstro.mapa.visivel(monstro.x,monstro.y))
	{
		if(monstro.distance_to(monstro.mapa.player)>=2)		
		{
			monstro.move_para(monstro.mapa.player.x,monstro.mapa.player.y);
		}
		else if(monstro.mapa.player.combate.hp>0)
		{
			monstro.combate.ataca(monstro.mapa.player);
		}
	}    
};