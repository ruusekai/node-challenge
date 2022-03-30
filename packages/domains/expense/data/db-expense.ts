import { query } from '@nc/utils/db';
import { GetUserExpensesRspDto, PaginateDto } from '../types';

export async function readExpenses(filters, sortBy, sortDirection, page, limit): Promise<GetUserExpensesRspDto> {
  const offset = (limit * page) - limit;

  // map all filter as prepared statements
  const filterKeyList = Object.keys(filters);
  let filterQuery = filterKeyList.length === 0 ? '' : 'WHERE ';
  let counter = 1;
  filterKeyList.forEach(function(key) {
    filterQuery += `${key} = $${counter} `;
    if (counter < filterKeyList.length) {
      filterQuery += 'AND ';
    }
    counter = counter + 1;
  });
  // console.log('exactFilterQuery: ', filterQuery);

  // select and count query for pagination
  const [selectResult, countResult] = await Promise.all([
    query(
      `SELECT * FROM expenses ${filterQuery}
    ORDER BY ${sortBy} ${sortDirection}
    LIMIT $${counter} OFFSET $${counter + 1}`,
      Object.values(filters).concat([limit, offset])
    ),
    query(
      `SELECT count(*) FROM expenses ${filterQuery}`, Object.values(filters)
    )]);

  const totalItems: number = countResult.rows?.[0].count;
  const paginateDto: PaginateDto = {
    totalItems,
    limit,
    totalPages: totalItems ? Math.ceil(totalItems / limit) : 0,
    currentPage: page,
  };

  return {
    expenses: selectResult.rows,
    paginate: paginateDto,
  };
}
