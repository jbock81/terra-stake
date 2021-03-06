import React, { FunctionComponent } from 'react';
import { VStack, Stack, Text, Divider, HStack, Image, Flex, Button, Tooltip } from '@chakra-ui/react'

import Warning from "./../../../assets/Warning.svg"
import { 
  OpenDepositModal, 
  OpenWithdrawModal, 
  useStore, 
  useUSTDeposited, 
  useLUNADeposited,
  useExchangeRate
} from '../../../store';
import AnimationNumber from '../../Components/AnimationNumber';
import { floorNormalize } from '../../../Util';

const Total: FunctionComponent = (props) => {
  const {state, dispatch} = useStore();
  const rate = useExchangeRate();

  const ustDeposited = useUSTDeposited() + floorNormalize(state.userInfoUst.reward_amount);
  const lunaDeposited = useLUNADeposited() * rate + floorNormalize(state.userInfoLuna.reward_amount * rate);
  const total = ustDeposited + lunaDeposited;

  return (
    <VStack 
      w={'100%'}
      rounded={'25px'} 
      background={'#212121'} 
      align={'center'}
      spacing={'64px'}
      px={{sm:'10px', md:'20px', lg:'50px'}}
      py={{sm:'10px', md:'20px', lg:'56px'}}
    >
      <VStack w={'100%'} align={'baseline'}>
        <HStack spacing={'10px'}>
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'24px'}
          >
            TOTAL BALANCE
          </Text>
          <Tooltip 
            label="Total value of your UST/Luna deposits including earnings calculated in UST" 
            background={'#C4C4C4'} hasArrow 
            placement='top-start' 
            color={'black'}
          > 
            <Image src={Warning} w={'13px'}/>
          </Tooltip>
        </HStack>
        <HStack align={'baseline'}>
          <Text
            fontSize={'35px'}
            fontWeight={'860'}
            lineHeight={'36px'}
          >
            <AnimationNumber value={total} />
          </Text>
          <Text
            fontSize={'20px'}
            fontWeight={'860'}
            lineHeight={'36px'}
          >
            UST
          </Text>
        </HStack>
      </VStack>
      <HStack
        w={'100%'}
        spacing={'24px'}
        justify={'end'}
      >
        <Button w={'200px'} h={'45px'} background={'#493C3C'} rounded={'25px'}>
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}
            onClick = {() => OpenDepositModal(state, dispatch, "ust")}      
          >
            Deposit
          </Text>
        </Button>
        <Button 
          w={'200px'} 
          h={'45px'} 
          background={'#212121'} 
          border={'solid 1px'}
          borderColor={'#CEBFBF'} 
          rounded={'25px'}
          onClick = {() => OpenWithdrawModal(state, dispatch, "ust")}
        >
          <Text
            fontSize={'13px'}
            fontWeight={'860'}
            lineHeight={'15px'}              
          >
            Withdraw
          </Text>
        </Button>
      </HStack>
    </VStack>

  );
}
export default Total;