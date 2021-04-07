import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Usuario } from '../Models/Usuario';


export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await getRepository(Usuario).find();
    return res.status(200).json({
        ok: true,
        data: usuarios
    })
}

export const getUsuariosById = async (req: Request, res: Response) => {

    try {

        const usuarios = await getRepository(Usuario).findOne(req.params.id);

        if (!usuarios) {
            return res.status(404).json({
                ok: false,
                msg: 'Data not found..'
            })
        }

        return res.status(200).json({
            ok: true,
            data: usuarios
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error del Servidor - getUsuariosById'
        })
    }

}


export const createUsuarios = async (req: Request, res: Response) => {

    const newUser = await getRepository(Usuario).create(req.body);
    const results = await getRepository(Usuario).save(newUser);


    return res.status(200).json({
        ok: true,
        data: results
    })
}

export const updateUsuarios = async (req: Request, res: Response) => {

    try {
        const usuario = await getRepository(Usuario).findOne(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe este usuario'
            })
        }

        getRepository(Usuario).merge(usuario, req.body)

        const results = await getRepository(Usuario).save(usuario);


        return res.status(200).json({
            ok: true,
            data: results
        })
    } catch (error) {

    }

}

export const deleteUsuarios = async (req: Request, res: Response) => {

    try {
        const usuario = await getRepository(Usuario).delete(req.params.id);

        return res.status(200).json({
            ok: true,
            data: usuario
        })
    } catch (error) {

    }

}




export const getUsuariosV2 = async (req: Request, res: Response) => {

    const usuarios = await getRepository(Usuario)
        .createQueryBuilder("user")
        .select("id_usuario", "id").addSelect("nombre_usuario", "nombre").addSelect("apellido_usuario", "apellido")
        .getRawMany();

    return res.status(200).json({
        ok: true,
        data: usuarios
    })
}

export const createUsuariosV2 = async (req: Request, res: Response) => {

    const { nombre_usuario, apellido_usuario } = req.body;

    try {
        const results = await getConnection().createQueryBuilder()
        .insert().into(Usuario)
        .values([{ 
            nombre_usuario: nombre_usuario, 
            apellido_usuario: apellido_usuario 
        }]).returning(['id_usuario', 'nombre_usuario', 'apellido_usuario'])
        .execute();

        return res.status(200).json({
            ok: true,
            data: results
        })
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del Servidor'
        });
    }
}


export const getUsuariosByIdV2 = async (req: Request, res: Response) => {

    try {
        const usuario = await getRepository(Usuario).createQueryBuilder()
            .select("user.id_usuario").addSelect("user.nombre_usuario")
            .from(Usuario, "user")
            .where("user.id_usuario = :id", { id: req.params.id }).getOne();

        return res.status(200).json({
            ok: true,
            data: usuario
        })
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del Servidor'
        });
    }
}


export const updateUsuariosV2 = async (req: Request, res: Response) => {

    try {
        const usuario = await getRepository(Usuario).findOne(req.params.id);

        const { nombre_usuario, apellido_usuario } = req.body;
        const { id } = req.params;

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe este usuario'
            })
        }

        const results = await getConnection().createQueryBuilder()
        .update(Usuario)
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
        })
    } catch (error) {

    }

}


export const deleteUsuariosV2 = async (req: Request, res: Response) => {

    const { id } = req.params; 

    try {
        const results = await getConnection().createQueryBuilder()
        .delete()
        .from(Usuario)
        .where("id_usuario = :id", { id: id })
        .execute();

        return res.status(200).json({
            ok: true,
            data: results
        })
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del Servidor'
        });
    }
}
