export class Transacao {
    tipoTransacao;
    data;
    valor;
    titularOrigem;
    titularDestino;
    constructor(tipoTransacao, valor, data) {
        this.tipoTransacao = tipoTransacao;
        this.valor = valor;
        this.data = data;
    }
    getTipoTransacao() {
        return this.tipoTransacao;
    }
    getData() {
        return this.data;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getValor() {
        return this.valor;
    }
    setTitularOrigem(titularOrigem) {
        this.titularOrigem = titularOrigem;
    }
    getTitularOrigem() {
        return this.titularOrigem;
    }
    setTitularDestino(titularDestino) {
        this.titularDestino = titularDestino;
    }
    getTitularDestino() {
        return this.titularDestino;
    }
    static clone(obj) {
        var ts = new Transacao(obj.tipoTransacao, obj.valor, obj.data);
        return ts;
    }
}
export default Transacao;
