const getErrorMessage = (err, req, res, next) => {
  if (err.name === "Unauthorized") {
    return res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    return res.status(400).json({ error: err.name + ": " + err.message });
  }
};

export default { getErrorMessage };
