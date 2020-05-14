"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trabajosController_1 = __importDefault(require("../controllers/trabajosController"));
class TrabajosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', trabajosController_1.default.list);
        this.router.get('/:id', trabajosController_1.default.getOne);
        this.router.get('/:id/:pedido', trabajosController_1.default.listPorPedidos);
        this.router.post('/', trabajosController_1.default.create);
        this.router.delete('/:id', trabajosController_1.default.delete);
        this.router.put('/:id', trabajosController_1.default.update);
    }
}
const trabajosRoutes = new TrabajosRoutes();
exports.default = trabajosRoutes.router;
