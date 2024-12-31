import React from 'react'
import { Button, ButtonText } from "@/app/components/ui/button";
import { InterfaceButtonProps } from '@gluestack-ui/button/lib/types';
import { twMerge } from 'tailwind-merge';

interface IButtonProps extends InterfaceButtonProps{
    title:string
    buttonTextStyles?:string
}
function CustomButton({onPress,className,title,buttonTextStyles=""}:IButtonProps) {
  return (
    <Button onPress={onPress} className={twMerge("mt-[10px] bg-[#38D55B] h-[65px] rounded-[4px]",className)} variant="solid" action="primary">
        <ButtonText className={twMerge("text-white font-[PoppinsBold] font-bold text-[22px] leading-[33px] uppercase text-center py-4",buttonTextStyles)}>{title}</ButtonText>
    </Button>
  )
}

export default CustomButton