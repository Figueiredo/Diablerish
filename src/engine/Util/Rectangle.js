var Rect = new Class({
    initialize: function(__x,__y,__w,__h)
    {
        this.x1=__x;
        this.y1=__y;
        this.x2=this.x1+__w;
        this.y2=this.y1+__h;
    },
    center:function()
    {
        var _cx = Math.floor( (this.x1+this.x2) /2);
        var _cy = Math.floor( (this.y1+this.y2) /2);
        
        return {cx:_cx,cy:_cy};
    },
    intersects:function(__outro)
    {
        return ( this.x1 <= __outro.x2 && this.x2 >= __outro.x1 && this.y1 <= __outro.y2 && this.y2 >= __outro.y1);
    }
});