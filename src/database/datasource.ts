import { ConfigModule } from "@nestjs/config";
import { DataSource } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { DataSourceOptions } from "typeorm/data-source";
import { join } from "path";

ConfigModule.forRoot({
  envFilePath: ".env",
});

export const options = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
  entities: [
    join(
      __dirname,
      "..",
      "..",
      "{dist,src}",
      "modules",
      "**",
      "entities",
      "*.entity{.ts,.js}"
    )
  ],
  migrationsTableName: "migrations",
  migrations: [join(__dirname, "migrations", "*.ts")],
};

export const dataSource = new DataSource(
  options as DataSourceOptions & SeederOptions
);
