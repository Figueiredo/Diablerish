function Obj(__data)
{
    this.x = __data.x!==undefined?__data.x:0;
    this.y = __data.y!==undefined?__data.y:0;
    this.char = __data.char!==undefined?__data.char:'?';
    this.nome = __data.nome!==undefined?__data.nome:'sem nome';
    this.cor = __data.cor!==undefined?__data.cor:Cores.defaultTexto;
    this.mapa = __data.mapa;//pode ser undefined
    this.bloqueia = __data.bloqueia!==undefined?__data.bloqueia:false;
    this.combate = __data.combate;
    this.ia = __data.ia;
    if(this.combate!==undefined) this.combate.dono=this;
    if(this.ia!==undefined) this.ia.dono=this;
}

Obj.prototype.move=function(__dx,__dy)
{
    if(this.mapa!==undefined&&!this.mapa.bloqueado(this.x+__dx,this.y+__dy))
    {
        this.x+=__dx;
        this.y+=__dy;
        return true;
    }
    return false;
};

Obj.prototype.draw=function(__con)
{
    __con.setCorTexto(this.cor);
    __con.escreveChar(this.x,this.y,this.char);
};

Obj.prototype.setMapa=function(__mapa)
{
    this.mapa=__mapa;
};

Obj.prototype.distance_to=function(__outro)
{
	var dx=__outro.x-this.x;
	var dy=__outro.y-this.y;
	return Math.sqrt((dx*dx)+(dy*dy));
};

Obj.prototype.move_para=function(__x,__y)
{
	var dx=__x-this.x;
	var dy=__y-this.y;
	var distancia = Math.sqrt((dx*dx)+(dy*dy));
	
	//normalizar
	dx = Math.round(dx/distancia);
	dy = Math.round(dy/distancia);
	this.move(dx,dy);	
};
