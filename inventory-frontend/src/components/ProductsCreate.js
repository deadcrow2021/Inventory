import React, {useState} from 'react'
import Wrapper from './Wrapper'
import {useNavigate} from 'react-router-dom'


const ProductsCreate = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({name, price, quantity}))

        await fetch('http://localhost:8000/products', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, price, quantity})
        })

        // go to previous page 
        await navigate(-1);
    }
    
  return (
    <Wrapper>
    <form className='mt-3' onSubmit={submit}>
        <div className='form-floating pb-3'>
            <input onChange={e => setName(e.target.value)} className='form-control' placeholder='Name'/>
            <label>Name</label>
        </div>
        
        <div className='form-floating pb-3'>
            <input onChange={e => setPrice(e.target.value)} type="number" step="0.01" className='form-control' placeholder='Price'/>
            <label>Price</label>
        </div>
        <div className='form-floating pb-3'>
            <input onChange={e => setQuantity(e.target.value)} type='number' className='form-control' placeholder='Quantity'/>
            <label>Quantity</label>
        </div>

        <button className='w-100 btn btn-lg btn-primary' type="submit">Submit</button>
    </form>
    </Wrapper>
  )
}

export default ProductsCreate