import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles.css';

function TicketsBook() {
    const [goldPassTotalPrice, setGoldPassTotalPrice] = useState(0); // New state variable for Gold Pass total price
    const [isGoldPassClicked, setIsGoldPassClicked] = useState(false);
    const [isSilverPassClicked, setIsSilverPassClicked] = useState(false);
    const [isDiamondPassClicked, setIsDiamondPassClicked] = useState(false);
    const [isGoldPassChecked, setIsGoldPassChecked] = useState(false);
    const [isSilverPassChecked, setIsSilverPassChecked] = useState(false);
    const [isDiamondPassChecked, setIsDiamondPassChecked] = useState(false);
    const [goldPassQuantity, setGoldPassQuantity] = useState(1);
    const [silverPassQuantity, setSilverPassQuantity] = useState(1);
    const [diamondPassQuantity, setDiamondPassQuantity] = useState(1);
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        return savedCartItems;
      });

        // Separate state for total price in the cart
    const [cartTotalPrice, setCartTotalPrice] = useState(() => {
        const savedTotalPrice = parseFloat(localStorage.getItem('cartTotalPrice')) || 0;
        return savedTotalPrice;
    });
      
      const [totalPrice, setTotalPrice] = useState(() => {
        
        const savedTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
        console.log("hi",savedTotalPrice);
     
        return savedTotalPrice;
      });
    const navigate = useNavigate();
    // const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const [cartEmpty, setCartEmpty] = useState(true);
       // Save cart items and total price to localStorage whenever they change
       useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartTotalPrice', cartTotalPrice.toString());
    }, [cartItems, cartTotalPrice]);

        // Calculate the total price of all items in the cart
        useEffect(() => {
            const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
            setCartTotalPrice(totalPrice);
        }, [cartItems]);

    
    const handleCheckout = () => {
        if (cartItems.length > 0) {
            navigate('/payment');
        } 
    };
    const handleGoldPassCheckboxChange = () => {
        setIsGoldPassChecked(!isGoldPassChecked);
    };
        // Function to calculate total price for Gold Pass
        useEffect(() => {
            setGoldPassTotalPrice(goldPassQuantity * 1495); // Calculate Gold Pass total price
        }, [goldPassQuantity]);

    const handleSilverPassCheckboxChange = () => {
        setIsSilverPassChecked(!isSilverPassChecked);
    };

    const handleDiamondPassCheckboxChange = () => {
        setIsDiamondPassChecked(!isDiamondPassChecked);
    };

    const addToCart = (passType, quantity, price) => {
        const existingItemIndex = cartItems.findIndex(item => item.passType === passType);
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            // Update the quantity of the existing item to the new quantity
            updatedCartItems[existingItemIndex].quantity = quantity;
            setCartItems(updatedCartItems);
        } else {
            const newItem = {
                passType: passType,
                quantity: quantity,
                price: price
            };
            setCartItems([...cartItems, newItem]); // Add a new item to the cart
        }
        setTotalPrice(prevTotalPrice => prevTotalPrice + (quantity * price));
    };

    const removeFromCart = (passType, quantity, price) => {
        const updatedCartItems = cartItems.filter(item => item.passType !== passType);
        setCartItems(updatedCartItems);
        setTotalPrice(prevTotalPrice => prevTotalPrice - (quantity * price));
    };

    const calculateExpiryDate = () => {
        // Calculate the expiry date based on the current date
        const currentDate = new Date();
        const expiryDate = new Date(currentDate);
        expiryDate.setFullYear(currentDate.getFullYear() + 1); // Add one year to the current year
        return expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    
    useEffect(() => {
        const collapseOne = document.getElementById('flush-collapseOne');

        const showCollapseOne = () => {
            collapseOne.classList.add('show');
            setIsGoldPassClicked(true);
        };

        const hideCollapseOne = () => {
            collapseOne.classList.remove('show');
            setIsGoldPassClicked(false);
        };

        const accordionButton = document.getElementById('accordionButton');

        const handleAccordionClick = () => {
            if (collapseOne.classList.contains('show')) {
                hideCollapseOne();
            } else {
                showCollapseOne();
            }
        };

        if (accordionButton) {
            accordionButton.addEventListener('click', handleAccordionClick);
        }

        return () => {
            if (accordionButton) {
                accordionButton.removeEventListener('click', handleAccordionClick);
            }
        };
    }, []);

    const handleGoldPassClick = () => {
        setIsGoldPassClicked(!isGoldPassClicked); // Toggle the state
    };
    const handleSilverPassClick = () => {
        setIsSilverPassClicked(!isSilverPassClicked); // Toggle the state
    };

    const handleDiamondPassClick = () => {
        setIsDiamondPassClicked(!isDiamondPassClicked); // Toggle the state
    };

    const handleGoldPassIncrement = () => {
        setGoldPassQuantity(prevQuantity => prevQuantity + 1);
        setTotalPrice(prevTotalPrice => prevTotalPrice + 1495);
    };
    
    const handleGoldPassDecrement = () => {
        if (goldPassQuantity > 1) {
            setGoldPassQuantity(prevQuantity => prevQuantity - 1);
            setTotalPrice(prevTotalPrice => prevTotalPrice - 1495);
        }
    };
    
    const handleSilverPassIncrement = () => {
        setSilverPassQuantity(prevQuantity => prevQuantity + 1);
        setTotalPrice(prevTotalPrice => prevTotalPrice + 1295);
    };
    
    const handleSilverPassDecrement = () => {
        if (silverPassQuantity > 1) {
            setSilverPassQuantity(prevQuantity => prevQuantity - 1);
            setTotalPrice(prevTotalPrice => prevTotalPrice - 1295);
        }
    };
    
    const handleDiamondPassIncrement = () => {
        setDiamondPassQuantity(prevQuantity => prevQuantity + 1);
        setTotalPrice(prevTotalPrice => prevTotalPrice + 3195);
    };
    
    const handleDiamondPassDecrement = () => {
        if (diamondPassQuantity > 1) {
            setDiamondPassQuantity(prevQuantity => prevQuantity - 1);
            setTotalPrice(prevTotalPrice => prevTotalPrice - 3195);
        }
    };

    return (
        <Fragment>
            {/* main section */}
            <div className="container-fluid mt-3" style={{ color: '#333', fontFamily: 'Open Sans, Arial, sans-serif', textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased', fontSize: '12px'}}>
                <div className="row" >
                    <div className="col-8">
                        <h5 style={{ borderBottom: '1px solid lightgray' ,  }}>  <span style={{ fontWeight: 'bold',fontSize: '16px' }}>ANNUAL PASSES</span></h5>
                        {/* gold pass section */}
                        <div className="card mb-2" onClick={handleGoldPassClick}  style={{ width: '95%', backgroundColor: 'rgb(243, 243, 243)' }}>
                            <div className="row">
                                <div className="col-7" >
                                    <div className="card-body">
                                        <div className="card-title fs-5">Gold Yas Annual Pass</div>
                                        <div className="card-title">Four Parks Access: Including SeaWorld</div>
                                        <div className="card-title">Unlimited year-round access to MiralWorld Abu Dhabi, Yas
                                            Waterworld, Warner Bros. World, and SeaWorld Abu Dhabi.</div>
                                        <p className="mt-3">Price <strong>AED 1495</strong></p>
                                    </div>
                                </div>

                                <div className="col-5" >
                                    <div className="d-flex justify-content-end m-2">
                                        <i className="bi bi-info-circle"></i>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <img src="assets/yas1.jpg" alt="" height="120px" width="250px" style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className="d-flex justify-content-end mt-3 mx-3 mb-3">
                                        <input type="checkbox" name="checked" id="checked" style={{ height: '23px', width: '23px' }}   checked={isGoldPassChecked}
                            onChange={handleGoldPassCheckboxChange} />
                                    </div>
                                </div>
                                <div className={`row allprice ${isGoldPassChecked ? 'visible' : 'hidden'}`}>
    {goldPassTotalPrice !== 0 && (
        <div className="col-7">
            <div className="card-body">
                <p style={{ fontSize: '20px', fontWeight: '500', marginLeft: '15px' }}>Select the number of annual passes</p>
            </div>
        </div>
    )}
    {goldPassTotalPrice !== 0 && (
                                    <div className="col-5">
                                        <div className="card-body">
                                            <div className="card-text" style={{ fontSize: '16px', fontWeight: '500', marginLeft: '45px' }}>Passes</div>
                                            <section className="d-inline-flex justify-content-end align-items-center">
                                                <button className="ms-1 fs-5" style={{ border: 'none'}}>
                                                <span style={{ border: 'none', fontWeight: '800'  }} className="bi bi-dash-circle" onClick={handleGoldPassDecrement}> </span>
                                                </button>
                                                <input type="text" style={{ width: '50px', border: '1px solid gold', height: '30px', marginLeft: '10px' }} className="form-control" value={goldPassQuantity} readOnly />
                                                <button className="mx-2 fs-5"  style={{ border: 'none'}}>
                                                <span style={{ border: 'none', fontWeight: '800' }} className="bi bi-plus-circle" onClick={handleGoldPassIncrement}> </span>
                                                </button>
                                            </section>
                                           
                                           
                                           
                                            {/* <div>Total: AED {goldPassTotalPrice.toFixed(2)}</div>                     */}
                                            <div className="card-text mt-3" style={{ fontSize: '12px' }}>Children 3 years old and below                                                <span style={{ fontWeight: '500' }}>can enter for free</span>.
                                            </div>
                                        </div>
                                      
                                    </div>
                                      )}
                                </div>
                               
                            </div>
                        </div>
                        <div  className={`price  justify-content-between mb-2 ${isGoldPassChecked ? 'visible' : 'hidden'}`} style={{ borderBottom: '1px solid black', marginRight: '40px',display: 'none' }}>
                                    <span>All prices inclusive VAT</span>
                                    <span className="mb-3">TotalAED {goldPassTotalPrice.toFixed(2)}</span>
                                </div>
                                
                                <div className={`addcart  justify-content-center ${isGoldPassChecked ? 'visible' : 'hidden'}`}>
                                    <button className="CartBtn" onClick={() => addToCart('Gold Yas Annual Pass', goldPassQuantity, 1495)}>
                                        <span className="IconContainer">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"
                                                fill="rgb(17, 17, 17)" className="cart">
                                                <path
                                                    d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z">
                                                </path>
                                            </svg>
                                        </span>
                                        <p className="text mt-3">Add to Cart</p>
                                    </button>
                                </div>
                                
                        {/* end gold Pass section */}
                        {/* <!--Silver pass section --> */}
                        <div className="card mb-2" onClick={handleSilverPassClick} style={{ width: '95%', backgroundColor: 'rgb(243, 243, 243)',}}>

                      
                            <div className="row">
                                <div className="col-7">
                                    <div className="card-body">
                                        <div className="card-title fs-5">Silver Yas Annual Pass</div>
                                        <div className="card-title">Four Parks Access: Including SeaWorld</div>
                                        <div className="card-title">Unlimited year-round access to MiralWorld Abu Dhabi, Yas
                                            Waterworld, Warner Bros. World, and SeaWorld Abu Dhabi.</div>
                                        <p className="mt-3">Price <strong>AED 1295</strong></p>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="d-flex justify-content-end m-2">
                                        <i className="bi bi-info-circle"></i>
                                    </div>
                                    <div className="d-flex justify-content-end ">
                                        <img src="assets/yas1.jpg" alt="" height="120px" width="250px" style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className="d-flex justify-content-end mt-3 mx-3 mb-3">
                                        <input type="checkbox" name="checked" id="checked" style={{ height: '23px', width: '23px' }}    checked={isSilverPassChecked}
                            onChange={handleSilverPassCheckboxChange} />
                                    </div>
                                </div>
                            <div className={`row allprice ${isSilverPassChecked ? 'visible' : 'hidden'}`}>
                                    <div className="col-7">
                                        <div className="card-body">
                                            <p style={{ fontSize: '20px', fontWeight: '500', marginLeft: '15px' }}>Select the number
                                                of annual passes</p>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className="card-body">
                                            <div className="card-text" style={{ fontSize: '16px', fontWeight: '500', marginLeft: '35px' }}>Passes</div>
                                            <section className="d-inline-flex justify-content-end align-items-center">
                                                <button className="ms-1 fs-5" style={{ border: 'none'}}>
                                                <span style={{ border: 'none', fontWeight: '800'  }} className="bi bi-dash-circle" onClick={handleSilverPassDecrement}> </span>
                                                </button>
                                                <input type="text" style={{ width: '50px', border: '1px solid gold', height: '30px', marginLeft: '10px' }} className="form-control" value={silverPassQuantity} readOnly />
                                                <button className="mx-2 fs-5"  style={{ border: 'none'}}>
                                                <span style={{ border: 'none', fontWeight: '800' }} className="bi bi-plus-circle" onClick={handleSilverPassIncrement}> </span>
                                                </button>
                                            </section>
                                {/* <div>Total: AED {(silverPassQuantity * 1295).toFixed(2)}</div> */}


                                            <div className="card-text mt-3" style={{ fontSize: '12px' }}>Children 3 years old and below
                                                <span style={{ fontWeight: '500' }}>can enter for free</span>.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={`price d-flex justify-content-between mb-2 ${isSilverPassChecked ? 'visible' : 'hidden'}`} style={{ borderBottom: '1px solid black', marginRight: '40px' }}>
                            <span>All prices inclusive VAT</span>
                            <span className="mb-3">TotalAED {(silverPassQuantity * 1295).toFixed(2)}</span>
                        </div>
                        <div className={`addcart d-flex justify-content-center ${isSilverPassChecked ? 'visible' : 'hidden'}`}>
                            <button className="CartBtn" onClick={() => addToCart('Silver Yas Annual Pass', silverPassQuantity, 1295)}>
                                <span className="IconContainer">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"
                                        fill="rgb(17, 17, 17)" className="cart">
                                        <path
                                            d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z">
                                        </path>
                                    </svg>
                                </span>
                                <p className="text mt-3">Add to Cart</p>
                            </button>
                        </div>

                        {/* <!--end Silver Pass section --> */} 
                        {/*<!--Daimond pass section --> */}
                        <div className="card mb-2" onClick={handleDiamondPassClick} style={{ width: '95%', backgroundColor: 'rgb(243, 243, 243)' }}>
                            <div className="row">
                                <div className="col-7">
                                    <div className="card-body">
                                        <div className="card-title fs-5">Diamond Yas Annual Pass</div>
                                        <div className="card-title">Four Parks Access: Including SeaWorld</div>
                                        <div className="card-title">Unlimited year-round access to MiralWorld Abu Dhabi, Yas
                                            Waterworld, Warner Bros. World, and SeaWorld Abu Dhabi.</div>
                                        <p className="mt-3">Price <strong>AED 3195</strong></p>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="d-flex justify-content-end m-2">
                                        <i className="bi bi-info-circle"></i>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <img src="assets/yas1.jpg" alt="" height="120px" width="250px" style={{ objectFit: 'contain' }} />
                                    </div>
                                    <div className="d-flex justify-content-end mt-3 mx-3 mb-3">
                                        <input type="checkbox" name="checked" id="checked" style={{ height: '23px', width: '23px' }} checked={isDiamondPassChecked}
                            onChange={handleDiamondPassCheckboxChange} />
                                    </div>
                                </div>
                                <div className={`row allprice ${isDiamondPassChecked ? 'visible' : 'hidden'}`}>
                                    <div className="col-7">
                                        <div className="card-body">
                                            <p style={{ fontSize: '20px', fontWeight: '500', marginLeft: '15px' }}>Select the number
                                                of annual passes</p>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className="card-body">
                                            <div className="card-text" style={{ fontSize: '16px', fontWeight: '500', marginLeft: '35px' }}>Passes</div>
                                            <section className="d-inline-flex justify-content-end align-items-center">
                                                <button className="ms-1 fs-5" style={{ border: 'none'}}>
                                                <span style={{ border: 'none', fontWeight: '800'  }} className="bi bi-dash-circle" onClick={handleDiamondPassDecrement}> </span>
                                                </button>
                                                <input type="text" style={{ width: '50px', border: '1px solid gold', height: '30px', marginLeft: '10px' }} className="form-control" value={diamondPassQuantity} readOnly />
                                                <button className="mx-2 fs-5"  style={{ border: 'none'}}>
                                                <span style={{ border: 'none', fontWeight: '800' }} className="bi bi-plus-circle" onClick={handleDiamondPassIncrement}> </span>
                                                </button>
                                            </section>
                            {/* <div>Total: AED {(diamondPassQuantity * 3195).toFixed(2)}</div> */}

                                            <div className="card-text mt-3" style={{ fontSize: '12px' }}>Children 3 years old and below
                                                <span style={{ fontWeight: '500' }}>can enter for free</span>.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={`price d-flex justify-content-between mb-2 ${isDiamondPassChecked ? 'visible' : 'hidden'}`} style={{ borderBottom: '1px solid black', marginRight: '40px' }}>
                           <span>All prices inclusive VAT</span>
                            <span className="mb-3">TotalAED {(diamondPassQuantity * 3195).toFixed(2)}</span>
                        </div>
                        <div className={`addcart d-flex justify-content-center ${isDiamondPassChecked ? 'visible' : 'hidden'}`}>
                            <button className="CartBtn" onClick={() => addToCart('Diamond Yas Annual Pass', diamondPassQuantity, 3195)}>
                                <span className="IconContainer">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"
                                        fill="rgb(17, 17, 17)" className="cart">
                                        <path
                                            d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z">
                                        </path>
                                    </svg>
                                </span>
                                <p className="text mt-3">Add to Cart</p>
                            </button>
                        </div>
                        {/* <!-- end daimond Pass section --> */}
                    </div>
                    {/* <!-- cart section --> */}
                    {/* <div className="col-1"></div> */}
                    <div className="col-4">
                    
                        <div className="card" style={{ height: 'auto', width: '95%' }}>
                            <div className="card-body">
                                <div className="accordion" id="accordionFlushExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="flush-headingOne">
                                            <button
                                                id="accordionButton"
                                                className="accordion-button "
                                                type="button"
                                                aria-expanded="true"
                                                aria-controls="flush-collapseOne"
                                                data-bs-toggle="collapse" 
                                                data-bs-target="#flush-collapseOne"
                                                style={{backgroundColor: 'white'}}
                                            >
                                                My Cart
                                            </button>
                                        </h2>
                                        {/* Add your accordion content here */}
                                        <div id="flush-collapseOne" className="accordion-collapse " aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                                   
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
                                                            <i className="bi bi-trash" style={{ fontSize: 20, fontWeight: 800, marginLeft: 15 }}onClick={() => removeFromCart(item.passType, 1, item.price)}></i>
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
                                {cartItems.length > 0 && (
                                <div className="container bg-dark d-flex justify-content-between pt-2 pb-2">
  
        <>
            <span className="fs-6 text-light">Total</span>
            <strong className="fs-6 text-light">AED {cartTotalPrice.toFixed(2)}</strong>
        </>
   
</div>
)}
<div className="container d-flex justify-content-center pt-2 pb-2 mt-4">
    {cartItems.length > 0 && ( // Check if cart is not empty
        <button type="button" className="btn-warning" style={{ width: '100px', height: '30px' , background: 'rgb(252, 182, 53)', fontWeight: 'bold'}} onClick={handleCheckout}> 
        CHECKOUT
        </button>
    )}
    {cartItems.length === 0 && ( // Render message if cart is empty
        <div className="text-center">There are no tickets in your cart!</div>
    )}
</div>

                            </div>
                        </div>
                        {/* <!-- end of cart section --> */}
                    </div>
                   
                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default TicketsBook;