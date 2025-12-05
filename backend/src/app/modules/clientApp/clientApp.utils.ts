import { createHash, randomBytes } from "crypto";
import { v4 } from "uuid";

function generateAppApiKey() {
  const first = randomBytes(5).toString("hex");
  const second = v4().slice(0, 5);
  const third = v4().slice(0, 5);
  const key = `${first}_${second}_${third}`;
  const hashKey = createHash("sha1").update(key).digest("hex");

  return hashKey;
}

const clientAppUtils = {
  generateAppApiKey,
};

export default clientAppUtils;
