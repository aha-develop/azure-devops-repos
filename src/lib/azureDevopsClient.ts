import { AxiosInstance } from 'axios';
import axios from './axios';

/**
 * @class Azure API Manager
 */
class ADClient {
  static _instance: ADClient;

  /**
   * Create ADClient Instance
   *
   * @param token
   * @returns
   */
  static create = (): ADClient => {
    if (!ADClient._instance) {
      ADClient._instance = new ADClient();
    }
    return ADClient._instance;
  };

  /**
   * Create Axios Instance
   *
   * @param token
   */
  setToken = (token: string) => {
    this.axiosIns = axios(token);
  };

  axiosIns: AxiosInstance;
  constructor() {}

  /**
   * When authentication failed
   *
   * @param callBack
   * @returns
   */
  auth = async (callBack: (token: string) => any = (token) => {}) => {
    const authData = await aha.auth('ado', { useCachedRetry: true });
    this.setToken(authData.token);
    return await callBack(authData.token);
  };

  /**
   * Get Pull Request from AzureDevops Git by PR URL
   *
   * @param url - PR URL
   * @returns
   */
  getPRByURL = async (url: string): Promise<AzureDevops.PR> => {
    return this.getPRById(this.parseURL(url));
  };

  /**
   * Get Pull Request from AzureDevops Git by PR ID
   *
   * @param options
   * @returns
   */
  getPRById = async ({
    organization,
    project,
    pullRequestId,
    repositoryId
  }: AzureDevops.PRGetOptions): Promise<AzureDevops.PR> => {
    const axiosIns = this.axiosIns;
    const { data } = await axiosIns.get(
      `${organization}/${project}/_apis/git/repositories/${repositoryId}/pullrequests/${pullRequestId}?api-version=4.1`
    );

    return data;
  };

  /**
   * Error Log
   *
   * @param msg
   * @param error
   */
  log = (msg, error) => {
    console.log(`[Error in AzureDevops API Call] => `, msg, error);
  };

  private parseURL(urlString: string): AzureDevops.PRGetOptions {
    if (!this.validatePRURL(urlString)) {
      throw new Error('Please enter a valid pull request URL');
    }
    const url = new URL(urlString);
    const parts = url.pathname.split('/');
    if (url.hostname.endsWith('.visualstudio.com')) {
      return {
        organization: url.hostname.split('.')[0],
        project: parts[1],
        repositoryId: parts[3],
        pullRequestId: parts[5]
      };
    } else {
      return {
        organization: parts[1],
        project: parts[2],
        repositoryId: parts[4],
        pullRequestId: parts[6]
      };
    }
  }

  /**
   * Validate PR URL
   *
   * @param urlString
   * @returns
   */
  validatePRURL(urlString: string): boolean {
    const url = new URL(urlString);
    if (!url.protocol.startsWith('https')) return false;
    if (url.hostname !== 'dev.azure.com' && !url.hostname.endsWith('.visualstudio.com')) return false;
    return /\/[^\/]+\/_git\/[^\/]+\/pullrequest\/\d+/.test(url.pathname);
  }
}

export default ADClient.create();
