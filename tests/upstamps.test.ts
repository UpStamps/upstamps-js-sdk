import UpStamps from "../src";

let up = new UpStamps({
  clientId: "5d3843d9-fd51-4f95-a49d-81e3833935c7",
  projectKey: "strict-lime",
  envKey: "thoughtful-copper",
});

describe("UpStamps features", () => {
  it("Check the constructor config object", () => {
    expect(up).toEqual({
      clientId: "5d3843d9-fd51-4f95-a49d-81e3833935c7",
      projectKey: "strict-lime",
      envKey: "thoughtful-copper",
    });
  });

  describe("Flags", () => {
    it("Get Feature Flag by Id", async () => {
      const flag = await up.flag("instagram_icon");

      expect(flag).toEqual({ show: true });
    });

    it("The flag 'content_description' must return the 'show' property to false to be disabled", async () => {
      const flag = await up.flag("content_description");

      expect(flag.show).toEqual(false);
    });

    it("Should return the default values if a flag does not exist", async () => {
      const flag = await up.flag("does_not_exist");

      expect(flag).toEqual({ show: false });
    });
  });

  describe("Remotes", () => {
    it("Get Remote Flag by Id", async () => {
      const remote = await up.remote("call_action");

      expect(remote).toEqual({
        show: true,
        data: {
          color: "red",
        },
      });
    });

    it("The color of the remote flag data must be red", async () => {
      const remote = await up.remote("call_action");

      expect(remote.data.color).toEqual("red");
    });

    it("The remote flag must return the 'show' property to true", async () => {
      const remote = await up.remote("call_action");

      expect(remote.show).toEqual(true);
    });

    it("The remote 'enable_chat' must return the 'show' property to false to be disabled", async () => {
      const remote = await up.remote("enable_chat");

      expect(remote.show).toEqual(false);
    });
  });

  describe("AB Testing", () => {
    it.skip("Get AB Test by Id", async () => {
      const test = await up.test("contact_action");

      expect(test).toEqual({
        show: true,
        variant: "A",
        emitter: jest.mock,
      });
    });

    it("The AB Test must return the 'show' property to true", async () => {
      const test = await up.test("contact_action");

      expect(test.show).toEqual(true);
    });

    it("The remote 'contact_action_chat' must return the 'show' property to false to be disabled", async () => {
      const test = await up.test("contact_action_chat");

      expect(test.show).toEqual(false);
    });
  });

  describe("Segments", () => {
    it("Get Segment by Id", async () => {
      const segment = await up.segment("sitemap_edge", {
        country: "Portugal",
        client: "Microsoft Edge",
        clientType: "browser",
      });
      expect(segment).toEqual({ show: true });
    });

    it("The Segment must return the 'show' property to false", async () => {
      const segment = await up.segment("sitemap_edge", {
        country: "Portugal",
        client: "Microsoft Edge",
        clientType: "browser",
      });

      expect(segment.show).toEqual(true);
    });

    it("The remote 'sitemap_chrome' must return the 'show' property to false", async () => {
      const segment = await up.segment("sitemap_chrome", {
        country: "USA",
        client: "Chrome Mobile",
        clientType: "browser",
      });

      expect(segment.show).toEqual(false);
    });
  });

  describe("Scopes", () => {
    it("Get scopes error by using an existing email", async () => {
      const scopes = await up.scopes({
        name: "john",
        email: "john222234@hotmail.com",
      });

      expect(scopes).toEqual({
        error: true,
        message:
          "Uniqueness violation. duplicate email value violates unique constraint",
      });
    });
  });
});
