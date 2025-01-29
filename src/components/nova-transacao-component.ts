import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import { Transacao } from "../types/transacao/Transacao.js";
import SaldoComponent from "./saldo-component.js";
import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";

const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;

elementoFormulario.addEventListener("submit", function(event) {
    event.preventDefault();
    
    try {

        if (!elementoFormulario.checkValidity())
        {
            alert("Preencha os campos para incluir a transação!");
        }

        const inputTransacao : HTMLSelectElement = elementoFormulario.querySelector("#tipoTransacao");
        const inputValor : HTMLInputElement = elementoFormulario.querySelector("#valor");
        const inputData: HTMLInputElement = elementoFormulario.querySelector("#data");

        //console.log(inputTransacao.value);

        if (inputTransacao == null || inputValor == null || inputData == null)
        {
            throw Error("Formulário inválido.");
        }

        //let dataTransacao : Date = new Date(inputData.valueAsDate); 
        //let dataTransacao : Date = new Date(inputData.value + " 00:00:00");         

        //console.log(dataTransacao);

        const novaTransacao : Transacao = {
            tipoTransacao : inputTransacao.value as TipoTransacao,
            valor : inputValor.valueAsNumber,
            data : new Date(inputData.value + " 00:00:00")
        };

        console.log(novaTransacao);

        Conta.registrarTransacao(novaTransacao);

        elementoFormulario.reset();

        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();

    } catch (erro) {
        alert(erro.message);
    }
        
});