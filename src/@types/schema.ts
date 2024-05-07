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

  export interface IBooking {
    _id: string;
    userId: string;
    workerId?: string;
    service : string;
    serviceImg:string;
    // description: string;
    date: string;
    startTime: string;
    endTime: string;
    status?: string;
    price?:number;
    payment?:boolean;
    latitude:number;
    longitude:number;
    location? : string
  }

