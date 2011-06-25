var FOVAlgo = new Class({
    initialize: function(__mapa)
    {
        this.mapa = __mapa;
    },
    calcula: function(__x,__y,__raio,__paredes)
    {
    }
});

FOVAlgo.FOV_BASIC=0;
FOVAlgo.FOV_RAYCASTING=1;
FOVAlgo.FOV_RECURSIVE_SHADOW=2;