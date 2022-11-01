"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const PORT = process.env.PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: true,
            credentials: true,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.use(cookieParser());
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map