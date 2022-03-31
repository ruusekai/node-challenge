const exactFilterSet = new Set(['merchant_name', 'currency', 'user_id', 'status']);

export function camelToSnackCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

// only allow valid filtering fields to parse to db query
export function inputSecureTrim(query) {
  const secureExactQuery = {};

  Object.keys(query).forEach((key) => {
    const snackKey = camelToSnackCase(key);
    if (exactFilterSet.has(snackKey)) {
      secureExactQuery[snackKey] = query[key];
    }
  });
  return secureExactQuery;
}
