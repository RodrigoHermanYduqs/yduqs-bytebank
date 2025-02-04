import { conta } from "./extrato-component.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
//var conta : Conta = new Conta("Rodrigo Herman", new Date("2025/02/04"));
if (elementoDataAcesso != null) {
    elementoDataAcesso.textContent = formatarData(conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
    //elementoDataAcesso.textContent = formatarData(new Date(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}
RenderizarSaldo();
function RenderizarSaldo() {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(conta.getSaldo());
    }
}
const SaldoComponent = {
    atualizar() {
        RenderizarSaldo();
    }
};
export default SaldoComponent;
