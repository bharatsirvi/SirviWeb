export const throwError = (next, err) => {
    err.statusCode = err.statusCode || 500;
    next(err);
}