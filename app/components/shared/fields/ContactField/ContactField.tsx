import { FC, forwardRef, useState } from 'react';

const ContactField: FC<any> = forwardRef(({ default_value, ...rest }, ref) => {
  const [contact, setContact] = useState(default_value || '');

  return (
    <>
      <span>Контакт</span>
      <input
        {...rest}
        ref={ref}
        type="text"
        placeholder="Контакты"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
    </>
  );
});

export default ContactField;
