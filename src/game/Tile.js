function Tile(__tipo)
{
    this.char = __tipo.char !== undefined?__tipo.char:'?';
    this.blocked= __tipo.blocked !== undefined?__tipo.blocked:false;
    this.block_sight = __tipo.block_sight !== undefined?__tipo.block_sight:this.blocked;
    this.explorado = false;
}

Tile.prototype.setBB=function(__blocked, __block_sight)
{
    this.blocked=__blocked;
    this.block_sight=__block_sight !== undefined?__block_sight:__blocked;    
};

Tile.prototype.mudaTipo=function(__tipo)
{
    this.char = __tipo.char;
    this.blocked= __tipo.blocked;
    this.block_sight = __tipo.block_sight !== undefined?__tipo.block_sight:__tipo.blocked;    
};

/**
 * Tipos de Tiles Básicos
 */
Tile.prototype.Parede=
{
    char: '#',
    blocked: true,
    block_sight: true
};

Tile.prototype.Chao=
{
    char: '.',
    blocked: false,
    block_sight: false
};

//encurtar acesso estático
var Tiles=Tile.prototype;