import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropdownModal({product}) {
  const [value, setValue] = useState('')
  function valueSelected(param){
    setValue(param)
  }
  console.log(product)
  return (
    <DropdownButton onClick={(e)=>{e.preventDefault()}} className='' id="dropdown-basic-button" title="Cantidad">
      <Dropdown.Item value={product.quantity1} onClick={valueSelected(value)}> {product.quantity1}</Dropdown.Item>
      <Dropdown.Item value={product.quantity2} onClick={valueSelected(value)}>{product.quantity2}</Dropdown.Item>
      <Dropdown.Item value={product.quantity3} onClick={valueSelected(value)}>{product.quantity3}</Dropdown.Item>
      <Dropdown.Item value={product.quantity4} onClick={valueSelected(value)}>{product.quantity4}</Dropdown.Item>
      <Dropdown.Item value={product.quantity5} onClick={valueSelected(value)}>{product.quantity5}</Dropdown.Item>
    </DropdownButton>
  );
}

export default DropdownModal;