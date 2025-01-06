export interface CustomerDetails {
    _id: string; 
    userId: string;
    fullName: string;
    cast: string;
    phoneNumber: string; 
    address?: string;
    length?: string;
    shoulder?: string; 
    arms?: string; 
    cuffs?: string; 
    collar?: string; 
    chest?: string; 
    fitting?: string; 
    lap?: string; 
    pant?: string; 
    paincha?: string; 
    additionalInformation?: string;
    images?: string[];
    createdAt?: Date; 
    updatedAt?: Date; 
  }

  export interface CustomerSummary {
    _id: string;      
    fullName: string;  
    phoneNumber: string;
  }