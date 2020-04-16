import UpStamps from "../src";

describe("UpStamps", () => {
  it("Flags", async () => {
    let up = new UpStamps({
      clientId: "40ad6937-f4fb-48be-9403-8f9f71744ed4",
      projectKey: "rural-abuse",
      envKey: "guilty-professional",
    });



    const flag = await up.flag("private_msg_2");
    console.log("flag = ", flag);

    const remote = await up.remote("new_one");
    console.log("remote = ", remote);

    const test = await up.test("chat_color");
    console.log("test = ", test);

    const segment = await up.segment("goo", {
      country: "Portugal",
      client: "Microsoft Edge",
      clientType: "mobile",
    });

    console.log("segment = ", segment);

    const scopes = await up.scopes({ name: "john", email: "john222234@hotmail.com" });
    console.log("scopes = ", scopes);

    expect(1 + 1).toEqual(2);
  });
});
