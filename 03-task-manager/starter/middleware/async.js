const asyncWrapper = (callbackFn) => {
  return async (req, res, next) => {
    try {
      await callbackFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncWrapper;
