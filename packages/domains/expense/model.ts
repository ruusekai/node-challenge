import { readExpenses } from './data/db-expense';
import { to } from '@nc/utils/async';
import { GetUserExpensesRspDto } from './types';
import { InternalError } from '@nc/utils/errors';

export async function getExpenses(filters, sortBy, sortDirection, page, limit): Promise<GetUserExpensesRspDto> {
  const [dbError, expensesWithPagination] = await to(readExpenses(filters, sortBy, sortDirection, page, limit));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  return expensesWithPagination;
}
