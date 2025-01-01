import React from 'react'
import { View } from 'react-native'
import { twMerge } from 'tailwind-merge'

interface IListContainerProps{
    className?:string
    children:React.ReactNode
}

interface IListItemProps{
    className?:string
    children:React.ReactNode
}

export function ListContainer({className="",children}:IListContainerProps){
    return (
        <View className={twMerge('flex gap-y-2 w-full',className)}>
            {children}
        </View>
        )
}
 
function ListItem({className="",children}:IListItemProps) {
  return (
    <View className='flex flex-row items-center justify-center gap-x-3'>
        <View className='bg-black w-[5px] h-[5px] rounded-full'/>
        {children}
    </View>
  )
}

export default ListItem