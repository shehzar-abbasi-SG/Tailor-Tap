import { StackNavigationProp } from "@react-navigation/stack";

export type AuthStackParamList = {
    Login: undefined; 
    Signup: undefined; 
    ForgetPassword:undefined;
    ResetPassword:undefined
    VerifyOtp:undefined

};
export type AuthNavigation = StackNavigationProp<AuthStackParamList>;


export type HomeStackParamList = {
  HomeMain: undefined;
  ClientForm: undefined;
  Measurements: undefined;
  Congratulations:undefined
};
export type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList>;


export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
};
export type SearchStackParamList = {
  SearchMain: undefined;
  EditDetail: undefined;
  EditPhotos: undefined;
};

export type SearchScreenNavigationProp = StackNavigationProp<SearchStackParamList>;


export type UpgradeStackParamList = {
  Plan:undefined;
  Account:undefined;
  AccountInfo:undefined;
  Congratulations:undefined
}
export type MeasurementStackParamList = {
  Length: undefined;
  Shoulder: undefined;
  Arms: undefined;
  Cuffs: undefined;
  Collar: undefined;
  Chest: undefined;
  Fitting: undefined;
  Lap: undefined;
  Pant: undefined;
  Paincha: undefined;
  AdditionalDetail: undefined;

};