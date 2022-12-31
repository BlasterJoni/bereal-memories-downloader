import axios from "axios";
import archiver from "archiver";

const handler = async (req: any, res: any) => {
  const query = req.query;
  const { token } = query;

  const response = await axios.request({
    method: "GET",
    url: "https://mobile.bereal.com/api/feeds/memories",
    headers: { Authorization: "Bearer " + token },
  });
  const memories = response.data;

  // zip the image and send it
  const archive = archiver("zip");

  archive.on("end", () => {
    console.log(archive.pointer() + " total bytes");
    console.log("archiver finalized");
  });

  archive.on("error", (err:any) => {
    return res.status(500).send({
      message: err,
    });
  });

  // name the output file
  //res.attachment("memories.zip");
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=memories.zip");

  // pipe the zip to response
  archive.pipe(res);

  //add the image from stream to archive
  for (const memory of memories.data) {
    archive.append(
      (await axios.get(memory.primary.url, { responseType: "arraybuffer" }))
        .data,
      { name: memory.memoryDay + "/primary.webp" }
    );
    archive.append(
      (await axios.get(memory.secondary.url, { responseType: "arraybuffer" }))
        .data,
      { name: memory.memoryDay + "/secondary.webp" }
    );
  }

  archive.finalize();
};

export default handler;
