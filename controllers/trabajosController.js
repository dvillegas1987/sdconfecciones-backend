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
class TrabajosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const trabajos = yield database_1.default.query('select * from trabajos');
            res.json(trabajos);
        });
    }
    listPorPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const trabajos = yield database_1.default.query('select * from trabajos where pedido = ?', [id]);
            res.json(trabajos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const trabajo = yield database_1.default.query('select * from trabajos where codigo = ?', [id]);
            if (trabajo.length > 0) {
                return res.json(trabajo[0]);
            }
            res.status(404).json({ text: 'El trabajo no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('insert into trabajos set ?', [req.body]);
            res.json({ mensaje: 'Trabajo guardado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM trabajos where codigo = ?', [id]);
            res.json({ mensaje: 'El trabajo fue eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE trabajos set ? where codigo = ?', [req.body, id]);
            res.json({ mensaje: 'Trabajo Actualizado' });
        });
    }
}
const trabajosController = new TrabajosController();
exports.default = trabajosController;
