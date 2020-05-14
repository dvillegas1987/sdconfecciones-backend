"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidosController_1 = __importDefault(require("../controllers/pedidosController"));
class PedidosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id/:estado/:filtro', pedidosController_1.default.list);
        this.router.get('/:id', pedidosController_1.default.getOne);
        this.router.post('/', pedidosController_1.default.create);
        this.router.delete('/:id', pedidosController_1.default.delete);
        this.router.put('/:id', pedidosController_1.default.update);
        this.router.get('/:id/:estado', pedidosController_1.default.updateState);
    }
}
const pedidosRoutes = new PedidosRoutes();
exports.default = pedidosRoutes.router;
