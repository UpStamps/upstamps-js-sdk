import fetch from "node-fetch";
//Utils
import { emitterHandler, queryBuilder } from "./functions";
//Constants
const apiUrl = "https://services.upstamps.com/api";

interface Params {
  clientId: string;
  projectKey: string;
  envKey: string;
}

class UpStamps {
  readonly clientId: string;
  readonly projectKey: string;
  readonly envKey: string;

  constructor({ clientId, projectKey, envKey }: Params) {
    this.clientId = clientId;
    this.projectKey = projectKey;
    this.envKey = envKey;
  }

  async scopes(params: { name?: string; email: string }) {
    try {
      const url = `${apiUrl}/${this.clientId}/${this.projectKey}/scopes/add`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: JSON.stringify({
          name: params.name,
          email: params.email,
        }),
      });

      const data = await response.json();

      if (data.response !== undefined && data.response.errors.length > 0) {
        return {
          error: true,
          message:
            "Uniqueness violation. duplicate email value violates unique constraint",
        };
      } else {
        return {
          error: false,
          success: true,
          message: "Scope created",
        };
      }
    } catch (e) {
      throw e;
    }
  }

  async flag(name: string) {
    try {
      const url = `${apiUrl}/${this.clientId}/${this.projectKey}/${this.envKey}/flags`;

      const response = await fetch(url);
      const { flags } = await response.json();
      const data = flags.map((item: { name: string }) => item.name);

      return {
        show: data.indexOf(name) !== -1,
      };
    } catch (e) {
      throw e;
    }
  }

  async remote(name: string) {
    try {
      const url = `${apiUrl}/${this.clientId}/${this.projectKey}/${this.envKey}/remotes`;

      //Response with the all the remotes flags
      const response = await fetch(url);
      const { remotes } = await response.json();
      const remote = remotes.filter(
        (item: { name: string }) => item.name === name
      );
      const verifyRemote = remote.length > 0;

      return verifyRemote
        ? { show: true, data: remote[0].data }
        : { show: false };
    } catch (e) {
      throw e;
    }
  }

  async test(name: string) {
    try {
      const variantTypes = ["A", "B"];

      const url = `${apiUrl}/${this.clientId}/${this.projectKey}/${this.envKey}/testing`;
      const response = await fetch(url);
      const { ABTesting } = await response.json();

      const result = ABTesting.filter(
        (item: { name: string }) => item.name === name
      );
      const show = result.length > 0;
      const randomVariant = Math.floor(Math.random() * variantTypes.length);

      const onEmitter = async () => {
        try {
          return await emitterHandler(variantTypes[randomVariant], name, url);
        } catch (e) {
          return e;
        }
      };

      return {
        show,
        variant: variantTypes[randomVariant],
        emitter: onEmitter,
      };
    } catch (e) {
      throw e;
    }
  }

  async segment(
    name: string,
    params: { country?: string; client?: string; clientType?: string }
  ) {
    try {
      const url = `${apiUrl}/${this.clientId}/${this.projectKey}/${this.envKey}/segment`;

      const query = queryBuilder({
        name: name,
        country: params.country,
        client: params.client,
        clientType: params.clientType,
      });

      const response = await fetch(`${url}?${query}`, {
        method: "GET",
      });

      const { segment } = await response.json();

      return {
        show: segment.length > 0,
      };
    } catch (e) {
      throw e;
    }
  }
}

export default UpStamps;
