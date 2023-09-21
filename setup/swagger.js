import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load the Swagger YAML file
const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, '../swagger.yml'), 'utf8'));

const loadSwagger = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

export default loadSwagger;
