/* eslint-disable no-console */
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`server running ⚡⚡⚡ on port => ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
