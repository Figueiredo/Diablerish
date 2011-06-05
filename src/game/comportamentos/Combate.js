function Combatente(__hp,__defesa,__poder,__lida_morte)
{
    this.max_hp = this.hp = __hp;
    this.defesa = __defesa;
    this.poder = __poder;
    this.dono = undefined;
    this.morre = __lida_morte;
}

Combatente.prototype.take_damage=function(__danos)
{
	if(__danos>0)
		this.hp-=__danos;
		
	if(this.hp<=0&&this.morre!==undefined)
	{
		this.morre(this.dono);
	}
};

Combatente.prototype.ataca=function(__outro)
{
	var danos = this.poder-__outro.combate.defesa;
	
	if(danos>0)
	{
		Log.log(this.dono.nome+" ataca "+__outro.nome+" e causa "+danos+" de dano!");
		__outro.combate.take_damage(danos);
	}
	else
	{
		Log.log(this.dono.nome+" ataca "+__outro.nome+" mas não tem efeito!");
	}
};
