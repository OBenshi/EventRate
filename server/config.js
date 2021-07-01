module.exports = {
  mongoURI: `mongodb+srv://OBenshi:${process.env.MONGO_KEY}@cab-mern.j0bnu.mongodb.net/myDB?retryWrites=true&w=majority`,
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  secretOrKey: process.env.SALSA,
};
