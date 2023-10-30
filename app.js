import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
import methodOverride from "method-override";
import User from "./models/users.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const dbUrl = process.env.DB_URL;
const secret1 = process.env.SECRET;
const BASE_URL_BE = process.env.BASE_URL_BE;

import session from "express-session";
import MongoStore from "connect-mongo";

// app.enable('trust proxy')
// app.set("trust proxy", 1);

const store = new MongoStore({
  mongoUrl: dbUrl,
  secret: secret1,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("Session Store Error", e);
});


const sessionOptions = {
  store,
  secret: secret1,
  resave: false,
  saveUninitialized: false,
  // proxy: true,
  cookies: {
    httpOnly: false,
    sameSite: 'none',
    secure: true,
    path: '/',
    domain: 'ideatex.onrender.com',
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionOptions));
// app.use(cookieParser(secret1));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [BASE_URL_BE],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(methodOverride("_method"));

app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      $and: [{ email: email }, { password: password }],
    });
    if (user) {
      req.session.user = email;
      req.session.s1 = user.s1;
      req.session.s2 = user.s2;
      // res.cookie('user',email,{ maxAge: 1000 * 60 * 60 * 24, httpOnly: false, secure: true,path: '/',domain: 'ideatex.onrender.com',sameSite: 'None'});
      // res.cookie('s1',user.s1,{ maxAge: 1000 * 60 * 60 * 24, httpOnly: false, secure: true,path: '/',domain: 'ideatex.onrender.com',sameSite: 'None'});
      // res.cookie('s2',user.s2,{ maxAge: 1000 * 60 * 60 * 24, httpOnly: false, secure: true,path: '/',domain: 'ideatex.onrender.com',sameSite: 'None' });
      res.json({ exists: "exists", s1: user.s1, s2: user.s2 });
    } else {
      res.json("notExists");
    }
  } catch (error) {
    res.json("notExists");
  }
});

app.post("/", async (req, res) => {
  // const {user,s1,s2}=req.cookies;
  if (req.session.user) {
    const user = await User.findOne({ email: req.session.user  });
    return res.json({
      valid: true,
      user: req.session.user,
      s1: user.s1,
      s2: user.s2,
    });
  } else {
    return res.json({ valid: false });
  }
});

app.post("/update", async (req, res) => {
  const { s1, s222 } = req.body;
  try {
    const user = await User.findOne({ email: req.cookies.user });
    if (user) {
      user.s1 = s1;
      user.s2 = s222;
      await user.save();
      res.json("done");
    }
  } catch (e) {
    console.log(e);
  }
});
app.post("/updatee", async (req, res) => {
  const { s111, s2 } = req.body;
  try {
    const user = await User.findOne({ email: req.cookies.user });
    if (user) {
      user.s1 = s111;
      user.s2 = s2;
      await user.save();
      res.json("done");
    }
  } catch (e) {
    console.log(e);
  }
});


app.post("/logout", (req, res) => {
  req.session.destroy();
  // res.cookie('user','', { expires: new Date(0),  secure: true,path: '/',domain: 'ideatex.onrender.com',sameSite: 'None' });
  // res.cookie('s1','', { expires: new Date(0) , secure: true,path: '/',domain: 'ideatex.onrender.com',sameSite: 'None'});
  // res.cookie('s2','', { expires: new Date(0),  secure: true,path: '/',domain: 'ideatex.onrender.com',sameSite: 'None' });
  res.json("logedOut");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App Is Listening On Port ${port}!`);
});
