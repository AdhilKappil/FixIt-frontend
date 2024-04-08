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
    firstHourPrice: number;
    laterHourPrice: number;
    description: string;
    imageFile: File | null;
  }
  