import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InjectBulkCreatedBy = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    req.body.kategori = req.body.kategori.map((kategori) => ({
      ...kategori,
      created_by: { id: req.user.id },
    }));
    return req.body;
  },
);
