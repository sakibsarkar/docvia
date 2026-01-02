import config from "../config";

const getFileContent = (filePath: string) => {
  console.log(filePath);

  // let file = readFileSync(filePath, "utf-8");
  let file = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Success</h1>
    <a href="{{link}}"></a>
  </body>
</html>
`;
  file = file.replace("{{link}}", config.frontend_base_url!);
  return file;
};

const getPassThroughRedirectUrl = (params: Record<string, string | number>) => {
  const query = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return `${config.frontend_base_url}/pass-through?${query}`;
};

export { getFileContent, getPassThroughRedirectUrl };
