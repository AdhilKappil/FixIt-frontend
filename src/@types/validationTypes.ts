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
    // firstHourCharge: number;
    // laterHourCharge: number;
    description: string;
    imageFile: File | null;
  }

  // for validating fetching service data
  export interface IService {
    _id?: string;
    serviceName: string;
    firstHourCharge : number;
    laterHourCharge : number;
    description: string;
    service_img: string;
    isBlocked: boolean;
    createdAt: string;
  }
  