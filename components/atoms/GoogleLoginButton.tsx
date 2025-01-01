import { Button } from '@yamada-ui/react';
import React, { ReactElement } from 'react';

type Props = {
  readonly text: string;
  readonly mt: number;
  readonly size: string | undefined;
};

export const GoogleLoginButton = ({ text, mt, size }: Props): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const form = document.createElement('form');
    form.method = 'GET';
    form.action = `${process.env.BACKEND_DOMAIN}/auth/google_oauth2`;
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Button colorScheme="teal" mt={mt} onClick={handleGoogleLogin} size={size}>
      {text}
    </Button>
  );
};
