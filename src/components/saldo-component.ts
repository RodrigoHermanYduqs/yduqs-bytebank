import Conta from "../model/Conta.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;

if (elementoDataAcesso != null)
{
    elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}

RenderizarSaldo();

function RenderizarSaldo() : void
{
    if (elementoSaldo != null)
    {
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    }
}

const SaldoComponent = {
    atualizar() {
        RenderizarSaldo();
    }
}

export default SaldoComponent;