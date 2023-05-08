const db = require('./models');
const app = require('./app');
const PORT = process.env.PORT || 5000;

require('dotenv').config();

db.mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, console.log('Server started on port 5000'));
  })
  .catch((err) => {
    console.log(err);
  });
