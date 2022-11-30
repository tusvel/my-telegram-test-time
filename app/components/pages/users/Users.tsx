import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import CreateUsers from '@/pages/users/CreateUsers';
import UserEdit from '@/pages/users/UserEdit';

import RoleField from '@/components/shared/fields/RoleField/RoleField';

import EditModal from '@/ui/Modal/EditModal/EditModal';
import Button from '@/ui/form-elements/Button';

import { useActions } from '@/hooks/useActions';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IUserResponse } from '@/shared/types/user/user-response.interface';

import { UserService } from '@/services/user/user.service';

import Meta from '@/utils/meta/Meta';

import { updateUser } from '@/store/client/client.slice';

const Users: FC = () => {
  const { clients } = useTypedSelector((state) => state.client);
  const { removeClient } = useActions();
  const dispatch = useAppDispatch();
  const removeItem = (item: IUserResponse) => {
    removeClient(item);
  };

  //edit
  const { setValue, register, handleSubmit, control } = useForm<
    IUserResponse & { password: string }
  >({
    mode: 'onChange'
  });
  const [editItem, setEditItem] = useState<IUserResponse>();
  const [openEdit, setOpenEdit] = useState(false);
  const editAction = (item: IUserResponse) => {
    setOpenEdit(true);
    setEditItem(item);
  };
  const onSubmit: SubmitHandler<IUserResponse & { password?: string }> = async (
    data
  ) => {
    data.role = data.role.toUpperCase() as 'user' | 'admin' | 'superadmin';
    await UserService.update({
      id: data.id,
      role: data.role,
      password: data.password || data.login
    });
    delete data.password;
    dispatch(updateUser(data));
  };

  //filter
  const superAdmins =
    clients?.filter((item) => item.role === 'superadmin') || [];
  const admins = clients?.filter((item) => item.role === 'admin') || [];
  const users = clients?.filter((item) => item.role === 'user') || [];

  return (
    <Meta title="Users" description="Users in telegram">
      <CreateUsers />
      <div className="flex">
        <ul role="list" className="space-y-3 mt-5 mr-10 w-52">
          {Array.isArray(superAdmins) &&
            superAdmins.map((item) => (
              <div key={item.id}>
                <UserEdit item={item} remove={removeItem} edit={editAction} />
              </div>
            ))}
        </ul>
        <ul role="list" className="space-y-3 mt-5 mr-10 w-52">
          {Array.isArray(admins) &&
            admins.map((item) => (
              <div key={item.id}>
                <UserEdit item={item} remove={removeItem} edit={editAction} />
              </div>
            ))}
        </ul>
        <ul role="list" className="space-y-3 mt-5 w-52">
          {Array.isArray(users) &&
            users.map((item) => (
              <div key={item.id}>
                <UserEdit item={item} remove={removeItem} edit={editAction} />
              </div>
            ))}
        </ul>
      </div>
      <EditModal
        setValue={setValue}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        item={editItem}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-7 flex">
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
          <Button>Обновить</Button>
        </form>
      </EditModal>
    </Meta>
  );
};

export default Users;
