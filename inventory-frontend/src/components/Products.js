import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import Wrapper from './Wrapper'

const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        (async () => {
            let req = await fetch('http://localhost:8000/products');
            let data = await req.json()
            setProducts(data)
        })()
    }, []);

    const del = async (id) => {
        if (window.confirm('Are you sure to delete this product?')) {
            await fetch(`http://localhost:8000/products/${id}`, {
                method: 'DELETE'
            });
        };
        setProducts(products.filter((p) => p.id !== id));
    }

  return (
    <Wrapper>
        <div className='pt-3 pb-2 mb-3 border-bottom'>
            <Link to={'/create'} className='btn btn-sm btn-outline-secondary'>Add</Link>
        </div>
        <div className="table-responsive">
            <table className="table table-striped table-sm">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => {
                    return (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <a href="#" className='btn btn-sm btn-outline-secondary' onClick={e => del(product.id)}>Delete</a>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
    </Wrapper>
  )
}

export default Products