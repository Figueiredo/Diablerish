/**
 * Class Responsável pela gestão da consola
 * __alvo -> elemento alvo onde será inserida a consola
 */
function cConsola(__alvo)
{
    this.buffer = [];
    this.bufferCores = [];
    this.corDefeito = new cCorCelula(Cores.defaultTexto,Cores.defaultFundo);
    this.corTexto = Cores.defaultTexto;
    
    this.WIDTH=80;
    this.HEIGHT=25;
    
    var alvo=document.getElementById(__alvo);
    
    var tabela = document.createElement("table");
    tabela.className="cssConsola";
    
    for(var i=0;i<this.HEIGHT;i++)
    {
        var tr = document.createElement("tr");
        
        var td = document.createElement("td");
        td.id="linha"+i;
        tr.appendChild(td);
        tabela.appendChild(tr);
    }
    
    alvo.appendChild(tabela);
        
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
    
    this.escreveBuffer();
} 

/**
 * Função para limpar o ecrã
 */
cConsola.prototype.limpaEcran=function()
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

/**
 * função para escrever o conteudo do buffer total na consola
 */
cConsola.prototype.escreveBuffer=function()
{
    for(var i=0;i<this.HEIGHT;i++)
    {
        var linha=document.getElementById("linha"+i);        
        var bfLinha = "";
        for(var j=0;j<this.WIDTH;j++)
        {
            if(!this.bufferCores[i][j].equals(this.corDefeito))
            {
                var celula ="";
                if(j>0&&this.bufferCores[i][j].equals(this.bufferCores[i][j-1]))
                {
                    celula=this.buffer[i][j];
                }
                else
                {
                    celula = "<span style='";
                    
                    if(this.bufferCores[i][j].texto!=Cores.defaultTexto)
                    {
                        celula+="color:"+this.bufferCores[i][j].texto+";";
                    }
                    if(this.bufferCores[i][j].fundo!=Cores.defaultFundo)
                    {
                        celula+="background-color:"+this.bufferCores[i][j].fundo+";";
                    }           
                    celula+="'>"+this.buffer[i][j];                    
                }
                
                if(j<this.WIDTH-1&&!this.bufferCores[i][j].equals(this.bufferCores[i][j+1]))
                {                    
                    celula+="</span>";   
                }                
                                
                bfLinha+=celula;
            }
            else
            {
                bfLinha+=this.buffer[i][j];
            }
        }
        linha.innerHTML=bfLinha;
    }    
    this.limpaEcran();
};

/**
 * escreve texto na coluna, linha anunciada
 */
cConsola.prototype.escreveTexto=function(__coluna,__linha,__texto)
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
cConsola.prototype.escreveChar=function(__coluna,__linha,__char,__corfundo)
{
    if(__linha<0||__linha>=this.HEIGHT||__coluna<0||__coluna>=this.WIDTH) return;
    
    this.buffer[__linha][__coluna]=(__char.charAt(0)==' '?'&nbsp;':__char.charAt(0));
    this.bufferCores[__linha][__coluna].texto=this.corTexto;
    this.bufferCores[__linha][__coluna].fundo=__corfundo !== undefined?__corfundo:Cores.defaultFundo;
};

/**
 * define a cor com que se vai escrever as letras
 */ 
cConsola.prototype.setCorTexto=function(__cor)
{
    this.corTexto=__cor;
};

/**
 * copia conteudo de uma consola
 */
cConsola.prototype.blit=function(__con,__orX,__orY,__l,__a,__destX,__destY)
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
};
