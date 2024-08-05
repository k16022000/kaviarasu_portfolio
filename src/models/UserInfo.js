class UserInfo {
  constructor() {
    this.ses_username = '';
    this.ses_name = '';
    this.ses_role = '';
    this.ses_userid = '';
    this.ses_auth = false;
    this.ses_org_id = '';
    this.ses_org_name = '';
  }

  static getName = () => this.ses_name;

  static getUsername = () => this.ses_username;

  static getRole = () => this.ses_role;

  static getUserid = () => this.ses_userid;

  static isAuth = () => this.ses_auth;

  static getOrgId = () => this.ses_org_id;

  static getOrgName = () => this.ses_org_name;

  static setUserDetail = (inp) => {
    this.ses_username = inp.email;
    this.ses_name = inp.first_name;
    this.ses_userid = inp.id;
    this.ses_role = inp.role_name;
    this.ses_org_id = inp.org_id;
    this.ses_org_name = inp.org_name;

    // below were already present
    // this.ses_username = inp.username;
    // this.ses_name = inp.extradata.name;
    // this.ses_role = inp.extradata.role;
    // this.ses_userid = inp.extradata.userid;
    // this.ses_auth = true;
    // console.log('inp name', this.ses_username, this.ses_name, this.ses_role, this.ses_userid);
  }

  static printInfo = () => `${this.ses_username},${this.ses_name},${this.ses_role},${this.ses_userid},${this.ses_org_id},${this.ses_org_name}`;

  static clear = () => {
    this.ses_username = '';
    this.ses_name = '';
    this.ses_role = '';
    this.ses_userid = '';
    this.ses_auth = false;
    this.ses_org_id = '';
    this.ses_org_name = '';
  }
}
export default UserInfo;
