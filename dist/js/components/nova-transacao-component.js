import SaldoComponent from "./saldo-component.js";
import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";
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
        //let dataTransacao : Date = new Date(inputData.valueAsDate); 
        //let dataTransacao : Date = new Date(inputData.value + " 00:00:00");         
        //console.log(dataTransacao);
        const novaTransacao = {
            tipoTransacao: inputTransacao.value,
            valor: inputValor.valueAsNumber,
            data: new Date(inputData.value + " 00:00:00")
        };
        console.log(novaTransacao);
        Conta.registrarTransacao(novaTransacao);
        elementoFormulario.reset();
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
    }
    catch (erro) {
        alert(erro.message);
    }
});
