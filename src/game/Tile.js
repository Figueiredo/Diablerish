var Tile = new Class({
    initialize: function(__tipo){
        this.char = __tipo.char !== undefined?__tipo.char:'?';
        this.blocked= __tipo.blocked !== undefined?__tipo.blocked:false;
        this.block_sight = __tipo.block_sight !== undefined?__tipo.block_sight:this.blocked;
        this.explorado = false;
    },
    setBB:function(__blocked, __block_sight)
    {
        this.blocked=__blocked;
        this.block_sight=__block_sight !== undefined?__block_sight:__blocked;    
    }  
});

var tileParede = new Class({
    Extends: Tile,
    initialize: function(){
        this.parent({char: '#',blocked: true,block_sight: true}); 
    }
});

var tileChao = new Class({
    Extends: Tile,
    initialize: function(){
        this.parent({char: '.',blocked: false,block_sight: false}); 
    }
});