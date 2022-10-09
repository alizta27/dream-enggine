const Button = (props) => {
  const { isActive, onBtnClick, children } = props;
  const styled = {
    default:
      'bg-primary-600 rounded-md border-2 p-2.5 border-primary-800 w-3/6 h-10 hover:cursor-pointer hover:border-primary-100 flex justify-center items-center',
    active:
      'bg-primary-600 rounded-md border-2 p-2.5 border-primary-100 w-3/6 h-10 hover:cursor-pointer hover:border-primary-100 flex justify-center items-center',
  };

  return (
    <div
      className={isActive ? styled.active : styled.default}
      onClick={onBtnClick}
    >
      <span className="text-primary-100">{children}</span>
    </div>
  );
};

export default Button;
