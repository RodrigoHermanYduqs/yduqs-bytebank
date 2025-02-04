import { TipoTransacao } from "../types/transacao/TipoTransacao.js";

export class Transacao {
    tipoTransacao: TipoTransacao;
    data: Date;
    valor: number;
    titularOrigem : string;
    titularDestino : string;

    constructor (tipoTransacao: TipoTransacao, valor : number, data: Date)
    {
        this.tipoTransacao = tipoTransacao;
        this.valor = valor;
        this.data = data;
    }

    public getTipoTransacao() : TipoTransacao
    {
        return this.tipoTransacao;
    }

    public getData() : Date
    {
        return this.data;
    }

    public setValor(valor : number)
    {
        this.valor = valor;
    }

    public getValor() : number
    {
        return this.valor;
    }

    public setTitularOrigem(titularOrigem : string ) : void
    {
        this.titularOrigem = titularOrigem;
    }

    public getTitularOrigem() : string
    {
        return this.titularOrigem;
    }

    public setTitularDestino(titularDestino : string ) : void
    {
        this.titularDestino = titularDestino;
    }

    public getTitularDestino() : string
    {
        return this.titularDestino;
    }

    public static clone(obj: any): Transacao {
        var ts = new Transacao(obj.tipoTransacao, obj.valor, obj.data);
        return ts;
    }
}

export default Transacao;