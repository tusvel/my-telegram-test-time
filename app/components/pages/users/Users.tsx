import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import CreateUsers from '@/pages/users/CreateUsers';

import RoleField from '@/components/shared/fields/RoleField/RoleField';

import ListItem from '@/ui/List/ListItem/ListItem';
import EditModal from '@/ui/Modal/EditModal/EditModal';
import Button from '@/ui/form-elements/Button';

import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { IUserPatch } from '@/shared/types/user/user-patch.interface';
import { IUserResponse } from '@/shared/types/user/user-response.interface';

import { UserService } from '@/services/user/user.service';

import Meta from '@/utils/meta/Meta';

const Users: FC = () => {
  const { clients } = useTypedSelector((state) => state.client);
  const { removeClient } = useActions();

  const removeItem = (item: IUserResponse) => {
    removeClient(item);
  };

  //edit
  const { setValue, register, handleSubmit, control } = useForm<IUserPatch>({
    mode: 'onChange'
  });
  const [editItem, setEditItem] = useState<IUserResponse>();
  const [openEdit, setOpenEdit] = useState(false);
  const editAction = (item: IUserResponse) => {
    setOpenEdit(true);
    setEditItem(item);
  };
  const onSubmit: SubmitHandler<IUserPatch & { text?: string }> = async (
    data
  ) => {
    delete data.text;
    data.role = data.role.toUpperCase();
    await UserService.update(data);
  };

  return (
    <Meta title="Users" description="Users in telegram">
      <CreateUsers />
      <ul role="list" className="mt-5 flex flex-wrap w-1/2">
        {Array.isArray(clients) &&
          clients.map((item) => (
            <div key={item.id}>
              <ListItem
                style={{ width: 200, marginRight: 15, marginBottom: 15 }}
                remove={removeItem}
                edit={editAction}
                item={{
                  id: item.id,
                  text: item.login,
                  role: item.role
                }}
              />
            </div>
          ))}
      </ul>
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
