import React from 'react';
import { Toast, ToastTitle, useToast } from '@/app/components/ui/toast';
import {Divider} from "@/app/components/ui/divider"
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomToastProps {
  id: string;
  message: string;
  type: 'success' | 'error';
}

const CustomToast = ({ id, message, type }: CustomToastProps) => {
  const toastId = `toast-${id}`;
  
  return (
    <Toast
      nativeID={toastId}
      // action="muted"
      variant="solid"
      className="px-4 py-3 gap-3 shadow-soft-1 items-center flex-row bg-[#f0f0f0]"
    >
        {type==='success'?
        <AntDesign name='checkcircle' size={20} color='#22c55e'/> 
        :
        <Ionicons name="alert-circle" size={24} color="#ef4444" />
        }
   
      <Divider
        orientation="vertical"
        className="h-[30px] bg-outline-200"
      />
      <ToastTitle size="sm" className="text-gray-800">
        {message}
      </ToastTitle>
    </Toast>
  );
}


type ToastType = 'success' | 'error';

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({message,type="success"}:{message:string,type:ToastType}) => {
    toast.show({
      placement: "top",
      render: ({ id }) => (
        <CustomToast
          id={id}
          message={message}
          type={type}
        />
      ),
    });
  };

  return { showToast };
}