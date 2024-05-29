
export interface Open {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Selected {
  setSelectedLink: React.Dispatch<React.SetStateAction<string>>;
  link: string;
} 

export interface AddNewServicesProps {
  setAddService: (newValue: boolean) => void;
}  


 