import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {

      let { pagina = 1, limite = 5, ordenacao = "_id:-1" } = req.query
      let [campoOrdenacao, ordem] = ordenacao.split(":")

      pagina = parseInt(pagina)
      limite = parseInt(limite)

      if (pagina > 0 && limite > 0) {

        const autoresResultado = await autores
          .find()
          .sort({ [campoOrdenacao]: ordem })
          .skip((pagina - 1) * limite)
          .limit(limite)

        res.status(200).json(autoresResultado);
      } else {
        next(new RequisicaoIncorreta())
      }
    } catch (erro) {
      next(erro)
    }
  }

  static listarAutorPorId = async (req, res, next) => {

    try {
      const id = req.params.id;

      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new NaoEncontrado('Id do autor não localizado'))
      }
    } catch (erro) {
      next(erro)
    }
  }


  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro)
    }
  }


  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (erro) {
      next(erro)
    }
  }

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndDelete(id);

      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (erro) {
      next(erro)
    }
  }

  static buscarPorFiltro = async (req, res, next) => {
    try {
      const { nome, nacionalidade } = req.query

      const busca = {}

      const regex = new RegExp(nome, "i")

      if (nome) busca.nome = regex
      if (nacionalidade) busca.nacionalidade = nacionalidade

      res.status(200).send(await autores.find(busca))
    } catch (erro) {
      next(erro)
    }
  }


}

export default AutorController