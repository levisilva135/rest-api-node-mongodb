import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },

    titulo: {
      type: String,
      required: [true, 'O titulo é obrigatório para a criação de um livro']
    },

    autor: {
      type: mongoose.Schema.Types.ObjectId, ref: 'autores',
      required: [true, 'O autor e obrigatório para a criação e um livro']
    },

    editora: {
      type: String,
      required: [true, 'A editora é obrigatória para a criação de um livro'],
      enum: {
        values: ['Alura', 'Saraiva'],
        message: 'A editora está incorreta'
      },
    },

    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => { return valor >= 10 && valor <= 5000 },
        message: 'O número de páginas precisa estar entre 10 e 5000'
      }
    }
  }
);

const livros = mongoose.model('livros', livroSchema);

export default livros;