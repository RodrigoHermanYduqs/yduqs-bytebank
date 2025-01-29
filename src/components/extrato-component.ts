import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/transacao/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderizarExtrato();

function renderizarExtrato(){
    elementoRegistroTransacoesExtrato.innerHTML = "";

    const grupoTransacoes : GrupoTransacao[] = Conta.getGruposTransacoes();

    let htmlExtrato = "";

    for (let grupoTransacao of grupoTransacoes)
    {
        let htmlTransacao = "";

        for (let transacao of grupoTransacao.transacoes)
        {
            htmlTransacao += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipoTransacao}</span>
                        <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatarData(transacao.data,FormatoData.DIA_MES)}</time>
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

export default ExtratoComponent;