// import { format } from './formatter';
import { readExpensesByUserId } from './data/db-expense';
import { to } from '@nc/utils/async';
import { Expense } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getExpensesByUserId(userId): Promise<Expense> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpenses] = await to(readExpensesByUserId(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  // remarks: I commented this error case as it is normal to have no expenses for a user for most use case
  // if (!rawExpenses) {
  //   throw NotFound(`Could not find expenses with user_id ${userId}`);
  // }

  return rawExpenses;
  // return format(rawExpenses);
}
