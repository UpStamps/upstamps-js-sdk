import fetch from "node-fetch";
//Utils
import { emitterHandler, queryBuilder } from "./functions";
//Constants
const apiUrl: string = "https://services.upstamps.com/api";

interface Params {
  clientId: string;
  projectKey: string;
  envKey: string;
}

class UpStamps {
  clientId: string;
  projectKey: string;
  envKey: string;

  constructor({ clientId, projectKey, envKey }: Params) {
    this.clientId = clientId;
    this.projectKey = projectKey;
    this.envKey = envKey;
  }

  async flag(name: string) {
    const url = `${apiUrl}/${this.clientId}/${this.projectKey}/${this.envKey}/flags`;

    const response = await fetch(url);
    const { flags } = await response.json();
    const data = flags.map((item: { name: string }) => item.name);

    return data.indexOf(name) !== -1;
  }

  async remote(name: string) {
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
  }

  async test(name: string) {
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
  }

  async segment(
    name: string,
    params: { country?: string; client?: string; clientType?: string }
  ) {
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
  }
}

export default UpStamps;
