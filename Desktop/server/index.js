const express = require("express");
const cors = require("cors");
const ytdl = require("@distube/ytdl-core");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/info", async (req, res) => {

  const url = req.query.url;

  try {

    const info = await ytdl.getInfo(url);

    res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails.pop().url,
    });

  } catch (err) {

    res.status(500).json({
      error: "Failed",
    });

  }

});

app.get("/download", async (req, res) => {

  const url = req.query.url;

  res.header("Content-Disposition", 'attachment; filename="video.mp4"');

  ytdl(url, {
    filter: "audioandvideo",
  }).pipe(res);

});

app.listen(5000, () => {
  console.log("Server running");
});