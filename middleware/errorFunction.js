// ERROR FUNCTION POINTS TO NEXT IN PIPELINE
module.exports = {
  errorFunction : function (handler) {
    return async (req, res, next) => {
      try {
        await handler(req, res);
      } catch (ex) {
        next(ex);
      }
    };
  }
}