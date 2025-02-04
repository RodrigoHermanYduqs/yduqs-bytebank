import Conta from "../model/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/transacao/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");
const conta : Conta = new Conta("Rodrigo Herman", new Date("2025/02/04"));

renderizarExtrato();

function renderizarExtrato(){
    elementoRegistroTransacoesExtrato.innerHTML = "";

    const grupoTransacoes : GrupoTransacao[] = conta.getGruposTransacoes();

    let htmlExtrato = "";

    for (let grupoTransacao of grupoTransacoes)
    {
        let htmlTransacao = "";

        for (let transacao of grupoTransacao.transacoes)
        {
            htmlTransacao += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.getTipoTransacao()}</span>
                        <strong class="valor">${formatarMoeda(transacao.getValor())}</strong>
                    </div>
                    <time class="data">${formatarData(transacao.getData(),FormatoData.DIA_MES)}</time>
                </div>
                `;
            
        }

        htmlExtrato += `
            <div class="transacoes-group">
            <strong class="mes-group">${grupoTransacao.label}</strong>
                ${htmlTransacao}
            </div>
        ` ;

    }

    if (htmlExtrato == "")
    {
        htmlExtrato = `<div class="transacoes-group">Sem transações</div>`;
    }

    elementoRegistroTransacoesExtrato.innerHTML = htmlExtrato;
}


const ExtratoComponent = {
    atualizar(): void {
        //console.log("ExtratoComponent: atualizar!")
        renderizarExtrato();
    }
}

//export default ExtratoComponent;
export { ExtratoComponent , conta };