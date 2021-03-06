import { Application } from 'https://deno.land/x/oak/mod.ts';
import router from './routes.ts';

const app = new Application();

app.use(async (ctx, next) => {
    console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
    await next();
  });


app.use(router.routes());
app.use(router.allowedMethods());


console.log('Server is running');

await app.listen({port:8000});

