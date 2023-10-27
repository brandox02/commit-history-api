import { options } from "../database/datasource";

export const configs = () => ({
  dataSourceConfig: { ...options },
});
