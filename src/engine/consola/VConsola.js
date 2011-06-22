/**
 * Class de consola virtual
 * __l - largura da consola
 * __a - altura da consola
 */
function vConsola(__l,__a)
{
    this.buffer = [];
    this.bufferCores = [];
    this.corDefeito = new cCorCelula(Cores.defaultTexto,Cores.defaultFundo);
    this.corTexto = Cores.defaultTexto;
    
    this.WIDTH=__l;
    this.HEIGHT=__a;
            
    for(i=0;i<this.HEIGHT;i++)
    {
        this.buffer[i]=[];
        this.bufferCores[i]=[];
        for(var j=0;j<this.WIDTH;j++)
        {
            this.buffer[i][j]="&nbsp;";
            this.bufferCores[i][j]=new cCorCelula(Cores.defaultTexto,Cores.defaultFundo);
        }
    }    
} 

/**
 * escreve texto na coluna, linha anunciada
 */
vConsola.prototype.escreveTexto=function(__coluna,__linha,__texto)
{
    if(__linha<0||__linha>=this.HEIGHT||__coluna<0||__coluna>=this.WIDTH) return;
    
    var index = 0;
    for(var i=__coluna;i<this.WIDTH&&index<__texto.length;i++)
    {
        this.escreveChar(i,__linha,__texto.charAt(index),Cores.defaultFundo);
        index++;
    }
};

/**
 * escreve caracter na coluna, linha anunciada com cor de fundo
 */
vConsola.prototype.escreveChar=function(__coluna,__linha,__char,__corfundo)
{
    if(__linha<0||__linha>=this.HEIGHT||__coluna<0||__coluna>=this.WIDTH) return;

    this.buffer[__linha][__coluna]=(__char.charAt(0)==' '?'&nbsp;':__char.charAt(0));
    this.bufferCores[__linha][__coluna].texto=this.corTexto;
    this.bufferCores[__linha][__coluna].fundo=__corfundo !== undefined?__corfundo:Cores.defaultFundo;
};

vConsola.prototype.setCorTexto=function(__cor)
{
    this.corTexto=__cor;
};

/**
 * Função para limpar o ecrã
 */
vConsola.prototype.limpaEcran=function()
{
    for(i=0;i<this.HEIGHT;i++)
    {
        for(var j=0;j<this.WIDTH;j++)
        {
            this.buffer[i][j]="&nbsp;";
            this.bufferCores[i][j].texto=Cores.defaultTexto;
            this.bufferCores[i][j].fundo=Cores.defaultFundo;
        }
    }    
	
};