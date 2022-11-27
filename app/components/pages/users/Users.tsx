import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import RoleField from '@/components/shared/fields/RoleField/RoleField';

import ListItem from '@/ui/List/ListItem/ListItem';
import Modal from '@/ui/Modal/Modal';
import Button from '@/ui/form-elements/Button';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IUserCreate } from '@/shared/types/user/user-create.interface';

import { UserService } from '@/services/user/user.service';

import Meta from '@/utils/meta/Meta';

const Users: FC = () => {
  const { clients } = useTypedSelector((state) => state.client);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<IUserCreate>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<IUserCreate> = async (data) => {
    await UserService.create(data);
  };

  return (
    <Meta title="Users" description="Users in telegram">
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
          <RoleField
            className="mb-5"
            control={control}
            name="role"
            isRequired
          />
          <Button>Создать пользователя</Button>
        </form>
      </Modal>
      <ul role="list" className="space-y-3 mt-5">
        {Array.isArray(clients) &&
          clients.map((item) => (
            <div key={item.id}>
              <ListItem
                item={{
                  text: item.login,
                  vertical: item.role
                }}
              />
            </div>
          ))}
      </ul>
    </Meta>
  );
};

export default Users;
