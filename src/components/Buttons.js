const Button = ({ children, onClick }) => {
  return (
    <sp-action-button onClick={onClick}>
      {children}
    </sp-action-button>
  );
};

export default Button;




/*

Aim: Produce dropdown that renders all features with the batch option, to run batch selected an 
option from the drop down and click the run button. 

First render all batch options to dropdown



*/