import { getFilterPreparedStatement } from '../data/db-expense';

describe('[Packages | Expense-domain | Db-expenses] getFilterPreparedStatement', () => {
  test('getFilterPreparedStatement should prepare a WHERE-clause when the query filter key list is NOT empty', () => {
    return expect(getFilterPreparedStatement(
      ['merchant_name', 'currency', 'status']
    ))
      .toEqual('WHERE merchant_name = $1 AND currency = $2 AND status = $3 ');
  });

  test('getFilterPreparedStatement should return empty string when the query filter key list is empty', () => {
    return expect(getFilterPreparedStatement(
      []
    ))
      .toEqual('');
  });

  test('getFilterPreparedStatement should prepare a WHERE-clause with >= / <= operators if it is a range filter', () => {
    return expect(getFilterPreparedStatement(
      ['merchant_name', 'amount_in_cents-max', 'amount_in_cents-min']
    ))
      .toEqual('WHERE merchant_name = $1 AND amount_in_cents <= $2 AND amount_in_cents >= $3 ');
  });
});
