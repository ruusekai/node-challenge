import { Router } from 'express';

export const router = Router();

router.get('/get-user-expenses', async (req, res, next) => {
  return res.json(JSON.stringify({ test: 'test' }));
});
