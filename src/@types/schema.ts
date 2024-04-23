export interface IWorker {
    _id?: string;
    name: string;
    mobile : string
    email: string;
    password: string;
    district : string;
    service : string;
    experience : number;
    idCard_img: string;
    profile_img?: string;
    status? : string;
    isBlocked?: boolean;
    createdAt?:Date
  }


 export interface IUser {
    _id: string;
    name: string;
    email: string;
    mobile : number;
    profile_img: string;
    isBlocked: boolean;
    createdAt: string;
  }