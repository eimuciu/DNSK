interface Props {
  text: string;
  clickHandler?: () => void;
}

function Button({ text, clickHandler }: Props) {
  return <button onClick={clickHandler}>{text}</button>;
}

export default Button;
