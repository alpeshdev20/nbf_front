//* for POST Request
export const post = async (
  url: any,
  data = {},
  contentType = "application/json"
) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: <any>{
      Accept: "application/json",
      "Content-Type": contentType,
      "X-API-Key": process.env.API_KEY,
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.AUTH_USER + ":" + process.env.AUTH_PASSWORD
        ).toString("base64"),
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

//* for GET Request
export const get = async (url: any) => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: <any>{
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-Key": process.env.API_KEY,
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.AUTH_USER + ":" + process.env.AUTH_PASSWORD
        ).toString("base64"),
    },
  });
  return response.json();
};

export const postFormData = async (url: any, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: <any>{
      "X-API-Key": process.env.API_KEY,
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.AUTH_USER + ":" + process.env.AUTH_PASSWORD
        ).toString("base64"),
    },
    body: data,
  });
  return response.json();
};
