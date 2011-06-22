function RandomGenerator()
{
}

RandomGenerator.prototype.genInt = function(__min,__max)
{
    if(__max===undefined)
        return Math.floor(Math.random()*__min);
    
    return Math.floor( __min+(Math.random()*(__max-__min)) );
};

RandomGenerator.prototype.genFloat=function()
{
    return Math.random();
};

RandomGenerator.prototype.genBool = function()
{
    return (Math.random()<0.5);   
};

var Random=new RandomGenerator();