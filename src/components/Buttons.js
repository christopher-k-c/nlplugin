const Button = ({ children, onClick }) => {
  return (
    <sp-action-button onClick={onClick}>
      {children}
    </sp-action-button>
  );
};

export default Button;
