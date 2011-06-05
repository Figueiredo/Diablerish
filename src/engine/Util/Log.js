function errorlog(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

function logger()
{
    this.alvo = document.getElementById("log");
    this.lista = [];
    
}

logger.prototype.log=function(_msg)
{
    this.lista.unshift(_msg);
    if(this.lista.length>5)
        this.lista.pop();
};

logger.prototype.escreveBuffer=function()
{
	//if(this.alvo==undefined) this.alvo = document.getElementById("log");
    this.alvo.innerHTML="";
    
    for(var i=0;i<this.lista.length;i++)
        this.alvo.innerHTML+=this.lista[i]+"<br/>";
};

var Log = new logger();