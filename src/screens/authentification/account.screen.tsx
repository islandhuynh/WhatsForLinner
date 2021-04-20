import React, { useState } from 'react';

import { LoginScreen } from './login.screen';
import { RegisterScreen } from './register.screen';
import { AccScreen } from './utilities';

export const AccountScreen = (): JSX.Element => {
  const [screen, setScreen] = useState(AccScreen.LOGIN);

  return (
    <>
      {screen === AccScreen.LOGIN ?
        <LoginScreen setScreen={setScreen} />
        :
        <RegisterScreen setScreen={setScreen} />
      }
    </>
  )
}