export class UrlAccess {
  id :  string = "";
  fullName: string = "";
  username: string = "";
  role : string = "";

  constructor(urlAccessInfo:any){
    this.id = urlAccessInfo.id;
    this.fullName = urlAccessInfo.fullName;
    this.username = urlAccessInfo.username;
    this.role = urlAccessInfo.role;
  }
}
