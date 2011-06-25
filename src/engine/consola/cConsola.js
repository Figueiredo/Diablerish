/**
 * Class de consola
 * __l - largura da consola
 * __a - altura da consola
 */
var cConsola = new Class({
    initialize: function (__l,__a)
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
    }, 
/**
 * escreve texto na coluna, linha anunciada
 */
    escreveTexto:function(__coluna,__linha,__texto)
    {
        if(__linha<0||__linha>=this.HEIGHT||__coluna<0||__coluna>=this.WIDTH) return;
        
        var index = 0;
        for(var i=__coluna;i<this.WIDTH&&index<__texto.length;i++)
        {
            this.escreveChar(i,__linha,__texto.charAt(index),Cores.defaultFundo);
            index++;
        }
    },
/**
 * escreve caracter na coluna, linha anunciada com cor de fundo
 */
    escreveChar:function(__coluna,__linha,__char,__corfundo)
    {
        if(__linha<0||__linha>=this.HEIGHT||__coluna<0||__coluna>=this.WIDTH) return;
    
        this.buffer[__linha][__coluna]=(__char.charAt(0)==' '?'&nbsp;':__char.charAt(0));
        this.bufferCores[__linha][__coluna].texto=this.corTexto;
        this.bufferCores[__linha][__coluna].fundo=__corfundo !== undefined?__corfundo:Cores.defaultFundo;
    },
/**
 * define a cor do texto a escrever
 */
    setCorTexto:function(__cor)
    {
        this.corTexto=__cor;
    },
/**
 * Função para limpar o ecrã
 */
    limpaEcran:function()
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
    },
/**
 * copia conteudo de uma consola
 */
    blit:function(__con,__orX,__orY,__l,__a,__destX,__destY)
    {
        if(__destY<0||__destY>=this.HEIGHT||__destX<0||__destX>=this.WIDTH||__orX<0||__orX>=__con.WIDTH||__orY<0||__orY>=__con.HEIGHT) return;
    
        var orX=__orX;
        var orY=__orY-1;
        for(var i=__destX;i<this.WIDTH&&i<__destX+__l;i++)
        {
            for(var j=__destY;j<this.HEIGHT&&j<__destY+__a;j++)
            {
                orY++;
                if(orX>=__con.WIDTH||orY>=__con.HEIGHT)
                {
                    continue;
                }
                
                this.buffer[j][i]=__con.buffer[orY][orX];    
                this.bufferCores[j][i].texto=__con.bufferCores[orY][orX].texto;
                this.bufferCores[j][i].fundo=__con.bufferCores[orY][orX].fundo;
            }
            orY=__orY-1;
            orX++;        
        }
    }    
});