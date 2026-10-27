import { Router } from 'express';
import { getConciergeStats } from '../controllers/statsController';

const router = Router();

router.get('/', getConciergeStats);

export default router;

