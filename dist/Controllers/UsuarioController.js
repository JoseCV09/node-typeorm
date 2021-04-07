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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuariosV2 = exports.updateUsuariosV2 = exports.getUsuariosByIdV2 = exports.createUsuariosV2 = exports.getUsuariosV2 = exports.deleteUsuarios = exports.updateUsuarios = exports.createUsuarios = exports.getUsuariosById = exports.getUsuarios = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("../Models/Usuario");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield typeorm_1.getRepository(Usuario_1.Usuario).find();
    return res.status(200).json({
        ok: true,
        data: usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuariosById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield typeorm_1.getRepository(Usuario_1.Usuario).findOne(req.params.id);
        if (!usuarios) {
            return res.status(404).json({
                ok: false,
                msg: 'Data not found..'
            });
        }
        return res.status(200).json({
            ok: true,
            data: usuarios
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error del Servidor - getUsuariosById'
        });
    }
});
exports.getUsuariosById = getUsuariosById;
const createUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield typeorm_1.getRepository(Usuario_1.Usuario).create(req.body);
    const results = yield typeorm_1.getRepository(Usuario_1.Usuario).save(newUser);
    return res.status(200).json({
        ok: true,
        data: results
    });
});
exports.createUsuarios = createUsuarios;
const updateUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield typeorm_1.getRepository(Usuario_1.Usuario).findOne(req.params.id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe este usuario'
            });
        }
        typeorm_1.getRepository(Usuario_1.Usuario).merge(usuario, req.body);
        const results = yield typeorm_1.getRepository(Usuario_1.Usuario).save(usuario);
        return res.status(200).json({
            ok: true,
            data: results
        });
    }
    catch (error) {
    }
});
exports.updateUsuarios = updateUsuarios;
const deleteUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield typeorm_1.getRepository(Usuario_1.Usuario).delete(req.params.id);
        return res.status(200).json({
            ok: true,
            data: usuario
        });
    }
    catch (error) {
    }
});
exports.deleteUsuarios = deleteUsuarios;
const getUsuariosV2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield typeorm_1.getRepository(Usuario_1.Usuario)
        .createQueryBuilder("user")
        .select("id_usuario", "id").addSelect("nombre_usuario", "nombre").addSelect("apellido_usuario", "apellido")
        .getRawMany();
    return res.status(200).json({
        ok: true,
        data: usuarios
    });
});
exports.getUsuariosV2 = getUsuariosV2;
const createUsuariosV2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_usuario, apellido_usuario } = req.body;
    try {
        const results = yield typeorm_1.getConnection().createQueryBuilder()
            .insert().into(Usuario_1.Usuario)
            .values([{
                nombre_usuario: nombre_usuario,
                apellido_usuario: apellido_usuario
            }]).returning(['id_usuario', 'nombre_usuario', 'apellido_usuario'])
            .execute();
        return res.status(200).json({
            ok: true,
            data: results
        });
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del Servidor'
        });
    }
});
exports.createUsuariosV2 = createUsuariosV2;
const getUsuariosByIdV2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield typeorm_1.getRepository(Usuario_1.Usuario).createQueryBuilder()
            .select("user.id_usuario").addSelect("user.nombre_usuario")
            .from(Usuario_1.Usuario, "user")
            .where("user.id_usuario = :id", { id: req.params.id }).getOne();
        return res.status(200).json({
            ok: true,
            data: usuario
        });
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del Servidor'
        });
    }
});
exports.getUsuariosByIdV2 = getUsuariosByIdV2;
const updateUsuariosV2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield typeorm_1.getRepository(Usuario_1.Usuario).findOne(req.params.id);
        const { nombre_usuario, apellido_usuario } = req.body;
        const { id } = req.params;
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe este usuario'
            });
        }
        const results = yield typeorm_1.getConnection().createQueryBuilder()
            .update(Usuario_1.Usuario)
            .set({
            nombre_usuario: nombre_usuario,
            apellido_usuario: apellido_usuario
        })
            .where("id_usuario = :id", { id: id }).returning(['id_usuario', 'nombre_usuario', 'apellido_usuario'])
            .execute();
        // console.log(results);
        return res.status(200).json({
            ok: true,
            msg: 'Dato Modificado',
            results
        });
    }
    catch (error) {
    }
});
exports.updateUsuariosV2 = updateUsuariosV2;
const deleteUsuariosV2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const results = yield typeorm_1.getConnection().createQueryBuilder()
            .delete()
            .from(Usuario_1.Usuario)
            .where("id_usuario = :id", { id: id })
            .execute();
        return res.status(200).json({
            ok: true,
            data: results
        });
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del Servidor'
        });
    }
});
exports.deleteUsuariosV2 = deleteUsuariosV2;
