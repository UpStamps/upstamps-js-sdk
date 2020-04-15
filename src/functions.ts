import fetch from "node-fetch";

//Emitter for A/B Testing
export const emitterHandler = async (
  variant: string,
  name: string,
  url: string
) => {
  try {
    const post_body = {
      name,
      varA: variant === "A" ? 1 : 0,
      varB: variant === "B" ? 1 : 0,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(post_body),
    });

    return await response.json();
  } catch (e) {
    return e;
  }
};

export const queryBuilder = (params: {}) => {
  const esc = encodeURIComponent;

  return Object.keys(params)
    .filter(
      key => params[key] !== undefined && params[key] && params[key] !== null
    )
    .map(key => esc(key) + "=" + esc(params[key]))
    .join("&");
};
