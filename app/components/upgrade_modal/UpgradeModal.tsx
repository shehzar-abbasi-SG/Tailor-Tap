import React from 'react'
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '../ui/modal'
import Button from '../common/Button'
import { Box } from '../ui/box'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from '../ui/image'
import AntDesignIcon from "@expo/vector-icons/AntDesign"

interface IUpgradeModals{
  showModal:boolean
  setShowModal:React.Dispatch<React.SetStateAction<boolean>>
  onClickUpgrade:()=>void
}
function UpgradeModal({showModal,setShowModal,onClickUpgrade}:IUpgradeModals) {

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md" >
      <ModalBackdrop className="bg-[#000]" opacity={0.76}/>
      <ModalContent className='rounded-[7px] px-3 py-3 h-[307px]'>
        <ModalHeader>
          <View className='w-full'>
            <ModalCloseButton className='self-end'>
                <TouchableOpacity onPress={()=>{setShowModal(false)}} className='bg-[#36BC54] rounded-full w-[30px] h-[30px] flex items-center justify-center float-right'>
                    <AntDesignIcon name="close" size={18} color="#fff" />
                </TouchableOpacity>
            </ModalCloseButton>
          </View>
        </ModalHeader>
        <ModalBody>
          <Box className='flex gap-y-[23px] items-center justify-center'>
            <Image
              source={require('@/assets/images/file-upload.png')}
              alt="File Upload"
              className="w-full h-auto"
              resizeMode="contain" 
            />
            <View className='w-full'>
              <Text className='font-bold font-[PoppinsBold] text-[21px] leading-[32px] w-full text-center uppercase text-black'>UPGRADE YOUR PLAN!</Text>
              <Text className='mt-[5px] font-medium text-[14px] leading-[21px] text-center font-[PoppinsMedium]'>
                You're in your 7 days free trial
              </Text>
            </View>
            <Button onPress={onClickUpgrade} title="Upgrade Now" 
            className="mt-0 h-[45px] rounded-[4px] w-[180px]" 
            buttonTextStyles="text-[16px] leading-[24px] uppercase p-0" />
          </Box>
        </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default UpgradeModal