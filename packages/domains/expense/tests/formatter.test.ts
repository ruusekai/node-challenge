import { camelToSnackCase, inputSecureTrim } from '@nc/domain-expense/formatter';

describe('[Packages | Expense-domain | Formatter] camelToSnackCase', () => {
  test('camelToSnackCase should make a camel case field name to snack case', () => {
    return expect(camelToSnackCase('merchantName'))
      .toEqual('merchant_name');
  });

  test('camelToSnackCase should do nothing on snack case field name', () => {
    return expect(camelToSnackCase('merchant_name'))
      .toEqual('merchant_name');
  });

  test('camelToSnackCase should do nothing on non-camel-case field name', () => {
    return expect(camelToSnackCase('currency'))
      .toEqual('currency');
  });
});

describe('[Packages | Expense-domain | Formatter] inputSecureTrim', () => {
  test('inputSecureTrim should filter out invalid query params, and return query params with snack case key', () => {
    return expect(inputSecureTrim({ merchantName: 'Sliders', currency: 'DKK', invalidField: 'testing', invalid_field_two: 2 }))
      .toEqual({ merchant_name: 'Sliders', currency: 'DKK' });
  });
});
