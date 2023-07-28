import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import MainRouter from "../client/MainRouter";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core";
import theme from "../client/theme";
import devBundle from "./devBundle";
import template from "../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import errorHandler from "./controllers/error.controller";
import App from "../client/App";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(compress());
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        // Add other directives as per your needs
        // For development only, allow 'unsafe-eval' for HMR
        "script-src": ["'self'", "'unsafe-eval'"]
      }
    })
  );
}

app.use(cors());

if (process.env.NODE_ENV === "development") {
  devBundle.compile(app);
}

app.use("/", userRoutes);
app.use("/", authRoutes);

app.get("*", (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};

  const html = renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  );

  if (context.url) {
    return res.redirect(303, context.url);
  }

  const css = sheets.toString();
  res.status(200).send(
    template({
      markup: html,
      css: css
    })
  );
});

app.use(errorHandler.getErrorMessage);

export default app;
