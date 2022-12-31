import axios from "axios";
import archiver from "archiver";

const handler = async (req: any, res: any) => {
  const query = req.query;
  const { path } = query;

  const response = await axios.get("https://cdn.bereal.network/Photos/" + path,  {responseType: "arraybuffer" });

  res.setHeader("Content-Type", response.headers["content-type"]);

  res.send(response.data);
};

export default handler;
