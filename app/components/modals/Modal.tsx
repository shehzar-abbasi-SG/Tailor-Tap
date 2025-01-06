import React from 'react'
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '../ui/modal'
import Button from '../common/Button'
import { Box } from '../ui/box'
import { Text, TouchableOpacity, View } from 'react-native'
import AntDesignIcon from "@expo/vector-icons/AntDesign"

interface IUpgradeModals{
  showModal:boolean
  onClose:()=>void
  children:React.ReactNode
  className?:string
}
function ModalWrapper({showModal,onClose,children,className=''}:IUpgradeModals) {

  return (
    <Modal isOpen={showModal} onClose={onClose} size="md" className={className} >
      <ModalBackdrop className="bg-[#000]" opacity={0.76}/>
      <ModalContent className='rounded-[7px] px-3 py-3'>
        <ModalHeader>
          <View className='w-full'>
            <ModalCloseButton className='self-end'>
                <TouchableOpacity onPress={onClose} className='bg-[#36BC54] rounded-full w-[30px] h-[30px] flex items-center justify-center float-right'>
                    <AntDesignIcon name="close" size={18} color="#fff" />
                </TouchableOpacity>
            </ModalCloseButton>
          </View>
        </ModalHeader>
        <ModalBody>
         {children}
        </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default ModalWrapper