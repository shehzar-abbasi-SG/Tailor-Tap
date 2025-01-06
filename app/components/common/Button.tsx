import React from 'react'
import { Button, ButtonText } from "@/app/components/ui/button";
import { InterfaceButtonProps } from '@gluestack-ui/button/lib/types';
import { twMerge } from 'tailwind-merge';
import { Spinner } from '@/app/components/ui/spinner';

interface IButtonProps extends InterfaceButtonProps{
    title:string
    buttonTextStyles?:string
    isLoading?:boolean
}
function CustomButton({onPress,className,title,buttonTextStyles="",isDisabled,isLoading=false}:IButtonProps) {
  return (
    <Button isDisabled={isDisabled||isLoading} onPress={onPress} className={twMerge("mt-[10px] bg-[#38D55B] h-[65px] rounded-[4px] disabled:bg-[#38D55B]",className)} variant="solid" action="primary">
        {isLoading && <Spinner size="small" color={'white'} />}
        <ButtonText className={twMerge("text-white font-[PoppinsBold] font-bold text-[22px] leading-[33px] uppercase text-center py-4",buttonTextStyles)}>{title}</ButtonText>
    </Button>
  )
}

export default CustomButton