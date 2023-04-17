// const passport = require('passport');
//
// app.use(passport.initialize()   );
// app.use(passport.session());
//
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });
//
// passport.deserializeUser(async (id, done) => {
//     const user = await User.findById(id);
//     done(null, user);
// });