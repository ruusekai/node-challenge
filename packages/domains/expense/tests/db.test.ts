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
});
