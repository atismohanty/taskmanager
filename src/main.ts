import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { getConfig } from './dbconnection/dbconfig/dbconfig';
import * as pg from 'pg';
import * as connectPgSimple from 'connect-pg-simple'
import * as config from 'config';

const pgSession =  connectPgSimple(session);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: '*'});
  // app.use(
  //   session({
  //     store: new pgSession({
  //       pool: new pg.Pool(getConfig()),
  //       tableName: 'user_session'
  //     }),
  //     secret: config.get('sessionSecret'),
  //     saveUninitialized: true,
  //     resave: true,
  //     cookie : {
  //       path: '/',
  //       maxAge: 60 * 60 * 1000,
  //       secure: false,
  //       httpOnly: false
  //     },
  //     name: 'x-session-token',
  //   })
  // );
  await app.listen(3000);
}
bootstrap();
