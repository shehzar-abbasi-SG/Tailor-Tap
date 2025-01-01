
import { View, TouchableOpacity } from 'react-native';
import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';
import AntDesignIcon from "@expo/vector-icons/AntDesign"
import { Image } from '../ui/image';

interface IHeader{
    onBackPress:()=>void
    onVideoPress?:()=>void
    displayMode?:"Measurements"|"ClientDetails"|"Upgrade"
}
const Header = ({ onBackPress, onVideoPress=()=>{},displayMode }:IHeader) => {
  return (
    <View className='flex flex-row justify-between px-10 items-center'>
      {displayMode==="Measurements"?
      <>
        <TouchableOpacity onPress={onBackPress} className='bg-[#36BC54] rounded-full w-[22px] h-[22px] flex items-center justify-center'>
         <AntDesignIcon name="back" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onBackPress} className='bg-[#36BC54] rounded-full w-[22px] h-[22px] flex items-center justify-center'>
         <AntDesignIcon name="close" size={16} color="#000" />
        </TouchableOpacity>
      </>
      
      :displayMode==="Upgrade"?
       <TouchableOpacity onPress={onBackPress} className='bg-[#36BC54] rounded-full w-[30px] h-[30px] flex items-center justify-center'>
          <AntDesignIcon name="close" size={20} color="#000" />
        </TouchableOpacity>
      :
      <>
          <TouchableOpacity onPress={onBackPress}>
              <FontAwesomeIcons name="chevron-left" size={22} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onVideoPress}>
              <Image
                  source={require('@/assets/images/video_icon.png')}
                  alt="Video Icon"
                  className="h-[41px] w-[41px]"
                  resizeMode="contain" 
                />
          </TouchableOpacity>
      </>
      }
    </View>
  
  );
};

export default Header