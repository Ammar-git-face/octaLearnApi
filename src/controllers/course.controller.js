exports.fetchCourse = async (req, res) => {
  const { subject } = req.body;

  if (!subject) {
    return res.status(400).json({
      success: false,
      message: "Subject is required",
    });
  }

  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        subject
      )}&format=json`
    );

    const data = await response.json();

    const topics = data?.query?.search || [];

    const results = topics.map((topic) => ({
      title: topic.title,
      description: topic.snippet,
      subject,
    }));

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};
