import mongoose from "mongoose";

mongoose.Schema.Types.String.set('validate', {
    validator: (valor) => valor !== '',
    message: 'Não é permitido espaços em branco'
})