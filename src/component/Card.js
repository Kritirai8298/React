import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { removeitem, incrementCount, decrementCount } from './card_slice';

const Card = () => {
    const products = useSelector(state => state.card);
    const dispatch = useDispatch();

    const totalAmount = products.reduce((acc, product) => acc + product.price * product.count, 0);

    return (
        <div>
            <div className='row'>
                {products.length > 0 && products.map(product => (
                    <div className="card" style={{ marginTop: "10px" }} key={product.Id}>
                        <div className="text-left" style={{ marginTop: "10px", marginLeft: "10px" }}>
                            <img
                                src={product.documentBase64}
                                className="card-img-top"
                                alt={product.documentName}
                                style={{ width: "100px", height: "130px" }}
                            />
                        </div>
                        <div className="card-body">
                            <h4>{product.documentName}</h4>
                            <p className="card-text">
                                <span style={{ color: "#198754" }}>INR {product.price}</span><br />
                                {product.title}<br />
                                Quantity: {product.count}
                            </p>
                            <div>
                                <button className="btn btn-danger" style={{ backgroundColor: "#ff3e6c", marginRight: "5px" }}
                                    onClick={() => dispatch(incrementCount(product.Id))}> +
                                </button>
                                <button className="btn btn-danger" style={{ backgroundColor: "#ff3e6c" }}
                                    onClick={product.count > 1 ? () => dispatch(decrementCount(product.Id)) : () => dispatch(removeitem(product.Id))}>-</button>
                            </div>
                            <div>
                                <button
                                    className="btn btn-danger"
                                    style={{ backgroundColor: "#ff3e6c", marginTop: "10px" }}
                                    onClick={() => dispatch(removeitem(product.Id))}>
                                    Remove Item
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row">
                <div className="card" style={{ marginTop: "20px" }}>
                    <div className="card-body">
                        <h5 className="card-title">Total Bill Amount:</h5>
                        <p className="card-text">INR {totalAmount}</p>
                        <a href="#" className="btn btn-white" style={{ backgroundColor: "black", color: "white" }}>
                            Place Order
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;