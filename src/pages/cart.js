import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.css';

function CartSection({ cartItems, totalPrice, cartTotalPrice,showConnectWalletPopup,calculateExpiryDate,removeFromCart,addToCart}) {
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
    };

    return (
        <div className="col-5">
            {showConnectWalletPopup ? null : (
            <div className="card" style={{ height: 'auto', width: '75%',marginLeft:'15%' }}>
                <div className="card-body">
                    <div className="accordion" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button
                                    id="accordionButton"
                                    className="accordion-button collapsed"
                                    type="button"
                                    aria-expanded="true"
                                    aria-controls="flush-collapseOne"
                                    data-bs-toggle="collapse" 
                                    data-bs-target="#flush-collapseOne"
                                    style={{backgroundColor:'white'}}
                                >
                                    My Cart
                                </button>
                            </h2>
                            {/* Add your accordion content here */}
                            <div id="flush-collapseOne" className="accordion-collapse" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    {/* Display cart items */}
                                    {cartItems.map((item, index) => (
                                        <div key={index}>
                                            <strong className="fs-6">{item.passType}</strong>
                                            <div className="fw-lighter mb-4">Valid Until {calculateExpiryDate()}</div>
                                            <div className="count">
                                                {/* <span className="fw-lighter">Adult</span> */}
                                                <div className="cart d-flex justify-content-between">
                                                    <strong>AED {item.price}</strong>
                                                    <div className="">
                                                    <section className="d-inline-flex justify-content-end align-items-center"> 
										  <button className="ms-1 fs-5" style={{ border: 'none' , background: 'white'}}>
										  <span style={{ border: 'none', fontWeight: '800'  }} className="bi bi-dash-circle" onClick={() => removeFromCart(item.passType, 1, item.price)}></span>
										  </button>
                                          <input type="text" style={{ width: '50px', border: '1px solid gold', height: '30px', marginLeft: '10px' }} className="form-control" value={item.quantity} readOnly />
										  <button className="mx-2 fs-5"  style={{ border: 'none' ,  background: 'white'}}>
                                          <span style={{ border: 'none', fontWeight: '800' }} className="bi bi-plus-circle" onClick={() => addToCart(item.passType, 1, item.price)}> </span>   
										</button>
										</section>
                                                        <i className="bi bi-trash" style={{ fontSize: 20, fontWeight: 800, marginLeft: 15 }} onClick={() => removeFromCart(item.passType, 1, item.price)}></i>
                                                        {/* <span>Press here to delete product {item.passType}</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {index !== cartItems.length - 1 && <hr className="my-3" />}
                                        </div>
                                    ))}     
                                </div>
                                {/* End of accordion content */}
                            </div>
                        </div>
                    </div>

                    <div className="container bg-dark d-flex justify-content-between pt-2 pb-2">
                        <span className="fs-6 text-light" style={{ fontFamily: 'Open Sans, Arial, sans-serif', fontWeight: '200' }}>Total</span>
                        <strong className="fs-6 text-light" style={{ fontFamily: 'Open Sans, Arial, sans-serif', fontWeight: '52' }}>AED {getTotalPrice().toFixed(2)}</strong>
                    </div>
                    {/* <div className="container d-flex justify-content-center pt-2 pb-2 mt-4"> */}
                        {/* <button className="CartBtn" onClick={handleBuyNowClick}>
                            <span className="IconContainer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                    className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                                </svg>
                            </span>
                            <p className="text mt-3">Buy Now</p>
                        </button> */}
                        {/* {showQR && (
                <div className="mt-4">
                
                    <QRCode value={handleGenerateQR()} size={256} />
                </div>
            )} */}
                    {/* </div> */}
                </div>
                {cartItems.length === 0 && ( // Render message if cart is empty
        <div className="text-center">There are no tickets in your cart!</div>
    )}
            </div>
            
            )}
            
        </div>
            
    );
}

export default CartSection;
