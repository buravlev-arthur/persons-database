#!/usr/bin/env node

import startServer from '../src/api/index.js';
import { port } from '../src/const/server.js';

const app = startServer();

app.listen(port, () => {
  console.log(`Server is listening port: ${port}`);
});
