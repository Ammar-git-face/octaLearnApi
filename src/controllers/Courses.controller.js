exports.fetchCourse = (res, req) => {
  try {
    fetch("")
      .then((response) => response.json())
      .then((data) => {
        const topics = data.query.search;
        topics.forEach((topic) => {
          res.status(200).json({
            title: topic.title,
            description: topic.description,
          });
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          error: err,
        });
      });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
