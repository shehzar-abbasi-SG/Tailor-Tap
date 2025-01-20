import React from 'react'
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '../ui/modal'
import Button from '../common/Button'
import { Box } from '../ui/box'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from '../ui/image'
import AntDesignIcon from "@expo/vector-icons/AntDesign"
import { rtlLanguages, useAppContext } from '@/app/context/AppProvider'

interface IUpgradeModals{
  showModal:boolean
  setShowModal:React.Dispatch<React.SetStateAction<boolean>>
  onClickUpgrade:()=>void
}
function UpgradeModal({showModal,setShowModal,onClickUpgrade}:IUpgradeModals) {
  const {i18n} = useAppContext()
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md" >
      <ModalBackdrop className="bg-[#000]" opacity={0.76}/>
      <ModalContent className='rounded-[7px] px-3 py-3 h-fit'>
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
              <Text 
              style={{
                 lineHeight: rtlLanguages.includes(i18n.locale) ? 55 : 32,
                  writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                  // textAlign:rtlLanguages.includes(i18n.locale) ? 'right' : 'left', 
              }}
              className='font-bold font-[PoppinsBold] text-[21px] leading-[32px] w-full text-center uppercase text-black'>{i18n.t('upgrade_your_plan')}</Text>
              <Text 
                style={{
                lineHeight: rtlLanguages.includes(i18n.locale) ? 40 : 21,
                writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr', 
                  // textAlign:rtlLanguages.includes(i18n.locale) ? 'right' : 'left', 
              }}
              className='mt-[5px] font-medium text-[14px] leading-[21px] text-center font-[PoppinsMedium]'>
                {i18n.t('free_trial_message')}
              </Text>
            </View>
            <Button onPress={onClickUpgrade} title={i18n.t('upgrade_now')} 
            className="mt-0 h-[45px] rounded-[4px] w-[180px]" 
            buttonTextStyles="text-[16px] leading-[24px] uppercase p-0"
            buttonTextStylesObject={{
              lineHeight: rtlLanguages.includes(i18n.locale) ? 40 : 24,
              writingDirection: rtlLanguages.includes(i18n.locale) ? 'rtl' : 'ltr',
            }}
            />
          </Box>
        </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default UpgradeModal