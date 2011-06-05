/**
 * @author Ricardo Figueiredo
 */

function morte_monstro_base(monstro)
{
	Log.log("O "+monstro.nome+" morreu.");
	monstro.char='%';
	monstro.bloqueia = false;
	monstro.ia=undefined;
	monstro.combate=undefined;
	monstro.cor=Cores.vermelho_escuro;
	monstro.nome = "Cadáver de "+monstro.nome;
	monstro.mapa.baixaPrioridade(monstro);
}
