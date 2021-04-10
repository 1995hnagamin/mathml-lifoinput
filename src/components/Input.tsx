import React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  commandAdded: (cmd: string) => void;
};

type FormData = {
  command: string;
};

const Input: React.FC<Props> = ({ commandAdded } : Props) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    commandAdded(data.command);
    reset();
  };

  return (
    <form id="command-input" onSubmit={handleSubmit(onSubmit)}>
      <input id="command-input-text" name="command" ref={register}/>
      <input id="command-input-button" type="submit" />
    </form>
  );
};

export default Input;
