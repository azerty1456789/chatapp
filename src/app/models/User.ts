export class User {

    /**
     * Password
     */
    public password: string | null;
  
    /**
     * Username
     */
    public username: string | null;
  
    /**
     * Id
     */
    public _id: string | null;
  
  
    public constructor(username: string | null, password: string | null, _id: string) {
      this.username = username;
      this.password = password;
      this._id = _id;
    }

    /**
     * returns true if fields not filled
     */
    public static checkFieldsIsEmpty(user: User): boolean {
      if (!user.username || !user.password || !user.username.trim() || !user.password.trim()) {
        return true;
      } else {
        return false;
      }
    }
  }