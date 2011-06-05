function includeJS(__js)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    
    script.setAttribute('type','text/javascript');
    script.setAttribute('src',__js);
    head.appendChild(script);
}

function includeCSS(__css)
{
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    
    link.setAttribute('rel','stylesheet');
    link.setAttribute('href',__css);
    head.appendChild(link);
}

// ordem é importante, devido a dependências
function loadEngine()
{
    includeCSS("src/engine/consola/Consola.css");
    includeJS("src/engine/consola/Cores.js");
    includeJS("src/engine/consola/CorCelula.js");    
    includeJS("src/engine/consola/Consola.js");
    includeJS("src/engine/consola/VConsola.js");
    includeJS("src/engine/Util/Rectangle.js");    
    includeJS("src/engine/Util/Random.js");
    includeJS("src/engine/Util/Log.js");
    includeJS("src/engine/Util/Misc.js");
    includeJS("src/engine/FOV/FOVMap.js");
}

function loadGame()
{
    includeJS("src/game/Objects.js");
    includeJS("src/game/comportamentos/Combate.js");
    includeJS("src/game/comportamentos/IA.js");
    includeJS("src/game/comportamentos/Mortes.js");
    includeJS("src/game/Tile.js");
    includeJS("src/game/Mapa.js");    
}



loadEngine();
loadGame();