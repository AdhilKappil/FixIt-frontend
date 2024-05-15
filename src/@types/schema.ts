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
    workerId: string;
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


  export interface IMessage {
    _id:string;
    conversationId : string;
    senderId : string;
    text: string;
    createdAt: string;
}


// export interface IConversation {
//   _id: string;
//   members: string[];
// }

export interface IConversation {
  _id: string;
  members: string[];
  user:string,
  userEmail:string,
  user_profile:string,
  worker:string,
  worker_profile:string
}