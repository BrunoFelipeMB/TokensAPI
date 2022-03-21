"use strict";

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _routes = require("./routes");

var _cors = _interopRequireDefault(require("cors"));

var _AppError = require("./errors/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use(_routes.router);
app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Invalid server error - ${err.message}`
  });
});
app.listen(3330, () => 'Server running');