import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InjectUpdatedByParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return { id: req.user.id };
  },
);
