import fetch from "node-fetch";
import { apiUrl } from "./constants";

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

  async flags(name: string) {
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
    const remote = remotes.filter((item: any) => item.name === name);
    const verifyRemote = remote.length > 0;

    return verifyRemote
      ? { show: true, data: remote[0].data }
      : { show: false };
  }
}

export default UpStamps;
