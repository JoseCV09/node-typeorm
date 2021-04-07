import { Router } from 'express';
import { getUsuarios, createUsuarios, getUsuariosById, updateUsuarios, deleteUsuarios, getUsuariosV2, getUsuariosByIdV2, updateUsuariosV2, createUsuariosV2, deleteUsuariosV2 } from '../Controllers/UsuarioController';


const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuariosById);
router.post('/', createUsuarios);
router.put('/:id', updateUsuarios);
router.delete('/:id', deleteUsuarios);


router.get('/query/all', getUsuariosV2);
router.get('/query/:id', getUsuariosByIdV2);
router.post('/query', createUsuariosV2);
router.put('/query/:id', updateUsuariosV2);
router.delete('/query/:id', deleteUsuariosV2);




export default router;