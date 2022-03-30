import { inputSecureTrim } from '@nc/domain-expense/formatter';
import { to } from '@nc/utils/async';
import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { getExpenses } from '../model';

export const router = Router();

router.get('/get-user-expenses', async (req, res, next) => {
  const page = req.query?.page ?? 1;
  const limit = req.query?.limit ?? 10;
  const sortBy = req.query?.sortBy ?? 'date_created';
  const sortDirection = req.query?.sortDirection ?? 'DESC';
  const filters = inputSecureTrim(req.query);

  const [expenseError, userExpenses] = await to(getExpenses(filters, sortBy, sortDirection, page, limit));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user expenses: ${expenseError}`, expenseError.title, req));
  }

  return res.json(userExpenses);
});
