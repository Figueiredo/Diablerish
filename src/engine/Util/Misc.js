Array.prototype.moveInicio=function(index)
{
	this.unshift(this.splice(index,1));
};
