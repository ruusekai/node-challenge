import { secureTrim } from '@nc/domain-user/formatter';
import { to } from '@nc/utils/async';
import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { getExpensesByUserId } from '../model';

export const router = Router();

router.get('/get-user-expenses', async (req, res, next) => {
  const [expenseError, userExpenses] = await to(getExpensesByUserId(req.query?.userId));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user details: ${expenseError}`, expenseError.title, req));
  }

  if (!userExpenses) {
    return res.json({});
  }

  return res.json(userExpenses);
});
