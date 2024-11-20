/**
 * Model for the sign in response.
 */
export class SignInResponse {
  public id: number;
  public username: string;
  public token: string;
  public roles: any;

  /**
   * Constructor.
   * @param id The user id.
   * @param username The username.
   * @param token The generated token.
   * @param roles The roles.
   */

  constructor(id: number, username: string, token: string, roles: any) {
    this.token = token;
    this.username = username;
    this.id = id;
    this.roles = roles;
  }
}
