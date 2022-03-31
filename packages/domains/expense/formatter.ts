import { RangeAttribute } from './enums';

const exactFilterSet = new Set(['merchant_name', 'currency', 'user_id', 'status']);
const rangeFilterSet = new Set(['amount_in_cents']);

export function camelToSnackCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

// only allow valid filtering fields to parse to db query
export function inputSecureTrim(query) {
  const secureQuery = {};

  Object.keys(query).forEach((key) => {
    const snackKey = camelToSnackCase(key);
    if (exactFilterSet.has(snackKey)) {
      secureQuery[snackKey] = query[key];
    } else if (snackKey.includes('-')) {
      const keySplit = snackKey.split('-');
      if (rangeFilterSet.has(keySplit[0])
        && Object.values(RangeAttribute).includes(keySplit[1] as RangeAttribute)) {
        secureQuery[snackKey] = query[key];
      }
    }
  });
  return secureQuery;
}
