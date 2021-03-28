import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getProdukte, getProdukt, addProdukt, updateProdukt, deleteProdukt } from './controllers/products.ts';

const router = new Router();

router.get('/api/v1/products', getProdukte);
router.get('/api/v1/products/:id', getProdukt);
router.post('/api/v1/products', addProdukt);
router.put('/api/v1/products/:id', updateProdukt);
router.delete('/api/v1/products/:id', deleteProdukt);

export default router;