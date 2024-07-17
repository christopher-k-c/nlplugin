

const Dropdown = ({children, onClick}) => {
return(
    <>
    <sp-menu-item onClick={onClick}> {children} </sp-menu-item> 
    </>
)

}

export default Dropdown;

