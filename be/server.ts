import config from './utils/config';
import { connectMongoDB } from './models';
import app from './app';

const PORT = config.serverPort;

connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
