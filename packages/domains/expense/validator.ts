import { BadRequest } from '@nc/utils/errors';
import { ExpenseStatus, SortDirection } from './enums';
import validator from 'validator';

const sortableSet =
  new Set(['merchant_name', 'amount_in_cents', 'currency', 'date_created', 'status']);

export function validateQuery() {
  return (req, res, next) => {
    try {
      if (!req.query?.userId) {
        throw BadRequest('userId property is missing.');
      }
      if (req.query?.userId && !validator.isUUID(req.query?.userId)) {
        throw BadRequest('userId property should be UUID.');
      }
      if (req.query?.status && !enumCheck(req.query?.status, ExpenseStatus)) {
        throw BadRequest('status property is with invalid input.');
      }
      if (req.query?.currency && !validator.isISO4217(req.query?.currency)) {
        throw BadRequest('currency property is with invalid currency code.');
      }
      if (req.query?.sortBy && !sortableSet.has(req.query?.sortBy)) {
        throw BadRequest('sortBy property is with invalid input.');
      }
      if (req.query?.sortDirection && !enumCheck(req.query?.sortDirection, SortDirection)) {
        throw BadRequest('sortDirection property is with invalid input.');
      }
      if (req.query?.limit && isNaN(req.query?.limit)) {
        throw BadRequest('limit property should be number.');
      }
      if (req.query?.page && isNaN(req.query?.page)) {
        throw BadRequest('page property should be number.');
      }
      if (req.query?.['amount_in_cents-min'] && isNaN(req.query?.['amount_in_cents-min'])) {
        throw BadRequest('amount_in_cents-min property should be number.');
      }
      if (req.query?.['amount_in_cents-max'] && isNaN(req.query?.['amount_in_cents-max'])) {
        throw BadRequest('amount_in_cents-max property should be number.');
      }
    } catch (e) {
      next(BadRequest(`validation error: ${e.message}`, req));
    }

    next(); // All fields are present, proceed
  };
}

// return true if it is enum of correct type
export function enumCheck(str, enumType) {
  if (!Object.values(enumType).includes(str)) {
    return false;
  }
  return true;
}
