import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import RoleField from '@/components/shared/fields/RoleField/RoleField';

import Modal from '@/ui/Modal/Modal';
import Button from '@/ui/form-elements/Button';

import { useActions } from '@/hooks/useActions';

import { IUserCreate } from '@/shared/types/user/user-create.interface';

const CreateUsers: FC = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<IUserCreate>({
    mode: 'onChange'
  });
  const { addClient } = useActions();

  const onSubmit: SubmitHandler<IUserCreate> = async (data) => {
    addClient(data);
    reset();
  };

  return (
    <Modal title="Добавить пользователя">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-7 flex">
          <input
            {...register('login', { required: 'Логин' })}
            type="text"
            placeholder="Логин"
            className="mr-5"
          />
          <input
            {...register('password', { required: 'Пароль' })}
            type="text"
            placeholder="Пароль"
          />
        </div>
        <RoleField className="mb-5" control={control} name="role" isRequired />
        <Button>Создать пользователя</Button>
      </form>
    </Modal>
  );
};

export default CreateUsers;
