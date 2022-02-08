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
    const authData = await aha.auth('ado', { useCachedRetry: false });
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

  private parseURL = (url: string): AzureDevops.PRGetOptions => {
    if (!this.validatePRURL(url)) {
      throw new Error('Please enter a valid pull request URL');
    }
    const parsedURL = new URL(url).pathname.split('/');
    return {
      organization: parsedURL[1],
      project: parsedURL[2],
      repositoryId: parsedURL[4],
      pullRequestId: parsedURL[6]
    };
  };

  /**
   * Validate PR URL
   *
   * @param urlString
   * @returns
   */
  validatePRURL = (urlString: string) => {
    const url = new URL(urlString);
    return (
      url.origin === 'https://dev.azure.com' && url.pathname.match(/\/[^\/]+\/[^\/]+\/_git\/[^\/]+\/pullrequest\/\d+/)
    );
  };
}

export default ADClient.create();
