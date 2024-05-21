import app from "./app";
import config from "./config";

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Radioactive final assignment is running on ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
