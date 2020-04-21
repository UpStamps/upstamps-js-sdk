import UpStamps from "../src";

describe("UpStamps", () => {
  it("Flags", async () => {
    let up = new UpStamps({
      clientId: "40ad6937-f4fb-48be-9403-8f9f71744ed4",
      projectKey: "multiple-brown",
      envKey: "smooth-lavender",
    });

    const flag = await up.flag("instagram_icon");
    console.log("flag = ", flag);

    const remote = await up.remote("call_action");
    console.log("remote = ", remote);

    const test = await up.test("contact_action");
    console.log("test = ", test);

    const segment = await up.segment("sitemap_edge", {
      country: "Portugal",
      client: "Microsoft Edge",
      clientType: "browser",
    });

    console.log("segment = ", segment);

    const scopes = await up.scopes({
      name: "john",
      email: "john222234@hotmail.com",
    });
    console.log("scopes = ", scopes);

    expect(1 + 1).toEqual(2);
  });
});
