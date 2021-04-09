import React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
};

type FormData = {
  command: string;
};

const Input: React.FC<Props> = (_ : Props) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="command" ref={register}/>
      <input type="submit" />
    </form>
  );
};

export default Input;
