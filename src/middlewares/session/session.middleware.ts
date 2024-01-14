import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(req.session)
    next();
  }
}
