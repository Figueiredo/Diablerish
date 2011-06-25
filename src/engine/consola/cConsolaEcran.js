/**
 * Class Responsável pela gestão da consola de ecrã
 * __alvo -> elemento alvo onde será inserida a consola
 */
var cConsolaEcran = new Class({
    Extends: cConsola,
    initialize:function(__alvo)
    {
        this.parent(80,25);
                
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
    }, 
/**
 * função para escrever o conteudo do buffer total na consola
 */
    escreveBuffer:function()
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
    }
});


