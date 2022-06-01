import React, { FunctionComponent } from 'react';
import { VStack, HStack, Stack, Flex, Text, Input, Link, Center, Divider, Button, useBoolean } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from "react";
import { floorNormalize } from '../../../Util';
import { useUSTDeposited, useLUNADeposited, COINTYPE, useStore, ActionKind } from '../../../store'

interface Props {
  amount: string,
  setAmount: Dispatch<SetStateAction<string>>,
}
const InputPanel: FunctionComponent<Props> = (props) => {
  const { state, dispatch } = useStore();
  const qd = state.qualified;
  console.log(qd);
  const depositTime_max = Math.max(state.userInfoUst.deposit_time, state.userInfoLuna.deposit_time);
  const depositTime_min = Math.min(state.userInfoUst.deposit_time, state.userInfoLuna.deposit_time);
  const depositTime = depositTime_min === 0 ? depositTime_max : depositTime_min;
  console.log("UST Deposit time: ", depositTime);
  const period = depositTime > 0 ? Date.now() - depositTime * 1000 : 0;
  const minutes = Math.floor((period > 0 ? period : 0) / 1000 / 60);
  console.log("Past time: ", minutes);
  let ustDeposited = useUSTDeposited();
  let lunaDeposited = useLUNADeposited();
  if (qd === false) {
    ustDeposited = ustDeposited + floorNormalize(state.userInfoUst.reward_amount);
    lunaDeposited = lunaDeposited + floorNormalize(state.userInfoLuna.reward_amount);
  } else {
    if (minutes < 60){
      ustDeposited = ustDeposited + floorNormalize(state.userInfoUst.reward_amount - ((state.potInfo.qualified_ust_amount * state.qualifiedWhen * 0.03) / 10));
      lunaDeposited = lunaDeposited + floorNormalize(state.userInfoLuna.reward_amount - ((state.potInfo.qualified_luna_amount * state.qualifiedWhen * 0.03) / 10));
    } else {
      ustDeposited = ustDeposited + floorNormalize(state.userInfoUst.reward_amount);
      lunaDeposited = lunaDeposited + floorNormalize(state.userInfoLuna.reward_amount);
    }
  }

  // const ustDeposited = useUSTDeposited() + floorNormalize(state.userInfoUst.reward_amount);
  // const lunaDeposited = useLUNADeposited() + floorNormalize(state.userInfoLuna.reward_amount);
  const maxBalance = () => {
    if (state.coinType === 'ust')
      props.setAmount(ustDeposited.toString());
    else
      props.setAmount(lunaDeposited.toString());
  }
  return (
    <VStack w={'100%'} spacing={'6px'}>
      <Flex
        background={'#493C3C'}
        rounded={'10px'}
        w={'100%'}
        h={'45px'}
        px={'20px'}
        mt={'27px'}
        align={'center'}
        justify={'space-between'}
      >
        <Text
          fontSize={'13px'}
          fontWeight={'860'}
          lineHeight={'15px'}
          color={'#CEC0C0'}
        >
          AMOUNT
        </Text>
        <Input
          width={'100%'}
          textAlign={'right'}
          color={'white'}
          border={'none'}
          value={props.amount}
          onChange={(e) => props.setAmount(e.target.value)}
          _focus={{ border: 'none' }}
        />
        <Text
          fontSize={'13px'}
          fontWeight={'860'}
          lineHeight={'15px'}
          color={'white'}
        >
          {state.coinType.toUpperCase()}
        </Text>
      </Flex>
      <Flex
        justify={'flex-end'}
        w={'100%'}
      >
        <Text
          fontSize={'9px'}
          fontWeight={'400'}
          lineHeight={'11px'}
          color={'#CEC0C0'}
          cursor={'pointer'}
          onClick={() => maxBalance()}
        >
          {state.coinType == 'ust' ? `MAX balance  ${ustDeposited} UST` : `MAX balance  ${lunaDeposited} LUNA`}
        </Text>
      </Flex>
    </VStack>
  );
}
export default InputPanel;