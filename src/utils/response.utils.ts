import { ResponsePagination, ResponseSuccess } from 'src/Interpace';

class BaseResponse {
  _succes(message: string, data?: any): ResponseSuccess {
    return {
      status: 'Success',

      message: message,
      data: data || {},
    };
  }

  _pagination(
    message: string,
    data: any,
    total: number,
    page: number,
    PageSize: number,
  ): ResponsePagination {
    const total_page = Math.ceil(total / PageSize);
    const next_page = page < total_page ? page + 1 : 0;
    const previousPage = page > 1 ? page - 1 : 1;
    return {
      status: 'Success',
      message: message,
      data: data || {},
      pagination: {
        total_page: total_page,
        page: page,
        total: total,
        next_page: next_page,
        pageSize: PageSize,
        previousPage: previousPage,
      },
    };
  }
}

export default BaseResponse;
