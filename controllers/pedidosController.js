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
class PedidosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pedidos = yield database_1.default.query("SELECT p.codigo, CONCAT(c.nombre,', ',c.apellido) as cliente,c.codigo as codigo_cliente,date_format(p.fecha_pedido,'%d/%m/%Y') as fecha_pedido,date_format(p.fecha_entrega,'%d/%m/%Y') as fecha_entrega,p.estado,(select sum(precio) as precio from trabajos where pedido = p.codigo ) as precio_total,p.forma_pago FROM pedidos p, clientes c where p.cliente = c.codigo and p.estado = ? ", [id]);
            res.json(pedidos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pedidos = yield database_1.default.query('select * from pedidos where codigo = ?', [id]);
            if (pedidos.length > 0) {
                return res.json(pedidos[0]);
            }
            res.status(404).json({ text: 'El pedido no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('insert into pedidos set fecha_pedido = now(), ?', [req.body]);
            res.json({ codigo_pedido: result.insertId });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM pedidos where codigo = ?', [id]);
            res.json({ mensaje: 'El pedido fue eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE pedidos set ? where codigo = ?', [req.body, id]);
            res.json({ mensaje: 'Pedido Actualizado' });
        });
    }
    updateState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, estado } = req.params;
            var fe;
            if (req.params.estado === '1') {
                fe = new Date();
            }
            yield database_1.default.query('UPDATE pedidos set estado = ?,fecha_entrega = ? where codigo = ?', [estado, fe, id]);
            res.json({ mensaje: 'Pedido Actualizado' });
        });
    }
}
const pedidosController = new PedidosController();
exports.default = pedidosController;
