import { useRouter } from 'next/router';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/ui/form-elements/Button';

import { useActions } from '@/hooks/useActions';

import Meta from '@/utils/meta/Meta';

import { login } from '@/store/user/user.actions';
import { IEmailPassword } from '@/store/user/user.interface';

const Login: FC = () => {
  const { control, handleSubmit, reset } = useForm<IEmailPassword>({
    mode: 'onChange'
  });
  const { replace } = useRouter();
  const { login } = useActions();

  const onsubmit = async (data: IEmailPassword) => {
    await login(data);
    reset();
    await replace('/');
  };

  return (
    <Meta title="Login" description="Login in telegram">
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="inline-flex flex-col">
          <Controller
            control={control}
            name="username"
            rules={{
              required: 'Логин'
            }}
            render={({ field: { onChange, value } }) => (
              <input
                className="mb-5"
                type="text"
                onChange={onChange}
                placeholder="Логин"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Пароль'
            }}
            render={({ field: { onChange, value } }) => (
              <input
                className="mb-5"
                type="password"
                onChange={onChange}
                placeholder="Пароль "
              />
            )}
          />
          <Button>Войти</Button>
        </div>
      </form>
    </Meta>
  );
};

export default Login;
