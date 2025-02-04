import { Transacao } from "../model/Transacao.js";
import SaldoComponent from "./saldo-component.js";
import { ExtratoComponent, conta } from "./extrato-component.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
        if (!elementoFormulario.checkValidity()) {
            alert("Preencha os campos para incluir a transação!");
        }
        const inputTransacao = elementoFormulario.querySelector("#tipoTransacao");
        const inputValor = elementoFormulario.querySelector("#valor");
        const inputData = elementoFormulario.querySelector("#data");
        //console.log(inputTransacao.value);
        if (inputTransacao == null || inputValor == null || inputData == null) {
            throw Error("Formulário inválido.");
        }
        /*const novaTransacao : Transacao = {
            tipoTransacao : inputTransacao.value as TipoTransacao,
            valor : inputValor.valueAsNumber,
            data : new Date(inputData.value + " 00:00:00")
        };*/
        console.log(new Date(inputData.value + " 00:00:00"));
        const novaTransacao = new Transacao(inputTransacao.value, inputValor.valueAsNumber, new Date(inputData.value + " 00:00:00"));
        console.log(novaTransacao);
        conta.registrarTransacao(novaTransacao);
        elementoFormulario.reset();
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
    }
    catch (erro) {
        alert(erro.message);
    }
});
