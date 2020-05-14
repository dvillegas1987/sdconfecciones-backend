"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ClientesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientes = yield database_1.default.query('select * from clientes');
            res.json(clientes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const clientes = yield database_1.default.query('select * from clientes where codigo = ?', [id]);
            if (clientes.length > 0) {
                return res.json(clientes[0]);
            }
            res.status(404).json({ text: 'El cliente no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('insert into clientes set ?', [req.body]);
            res.json({ mensaje: 'Cliente guardado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM clientes where codigo = ?', [id]);
            res.json({ mensaje: 'El cliente fue eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE clientes set ? where codigo = ?', [req.body, id]);
            res.json({ mensaje: 'Cliente Actualizado' });
        });
    }
}
const clientesController = new ClientesController();
exports.default = clientesController;
