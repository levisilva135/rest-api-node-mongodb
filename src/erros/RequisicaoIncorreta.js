import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase{
    constructor(mensagem = 'Um ou mais dados inseridos estão incorretos'){
        super(mensagem, 400)
    }
}
export default RequisicaoIncorreta