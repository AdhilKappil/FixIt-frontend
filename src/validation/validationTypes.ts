export interface FormValues {
    name: string;
    mobile: string;
    password: string;
    cpassword: string;
    email: string;
  }


  export interface FormLogin {
    email: string;
    password: string
  }


  export interface MyError {
    data?: {
      message?: string;
    };
    error?: string;
  }


  // this for service form validarion 
  export interface ServiceForm {
    serviceName: string;
    description: string;
    firstHourCharge : number | string;
    laterHourCharge : number | string;
    imageFile: File | null;
  }


  // for validating fetching service data
  export interface IService{
    _id?: string;
    serviceName: string;
    firstHourCharge : number;
    laterHourCharge : number;
    description: string;
    service_img: string;
    isBlocked: boolean;
    createdAt: string;
  }
  

 // Interface for worker join
  export interface IWorkerJoin extends FormValues{
    district : string,
    service: string;
    profile_img: string;
    idCard_img: string;
    experience : number | string
  }

// interface for forgot password
 export interface forgetValues {
    password: string;
    cpassword: string;
  }
  

  // For updating user
  export interface UpdateUser {
    name:string | undefined
    mobile : string | undefined
  }


  // For add booking details
  export interface AddBookService {
    date: string;
    startTime: string;
    endTime: string,
    description:string
  }