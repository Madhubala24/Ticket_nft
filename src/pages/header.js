import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "bootstrap/dist/css/bootstrap.min.css";
import { connectWallet, disconnectWallet,fetchUserDetails } from "../utils/Web3Utils"; // Import connectWallet and disconnectWallet functions
import { FaUser } from 'react-icons/fa';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const NavbarMain = ({ handleBuyNow }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState('');


  useEffect(() => {
    setIsConnected(!!connectedWalletAddress);
    if (connectedWalletAddress) {
      fetchUserData(); // Call fetchUserData function if connectedWalletAddress changes
    }
  }, [connectedWalletAddress]);

  const fetchUserData = async () => {
    try {
      const userSnapshot = await firebase.database().ref(`accounts/${connectedWalletAddress}`).once('value');
      const userData = userSnapshot.val();
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const fetchConnectedWalletAddress = async () => {
      try {
        const snapshot = await firebase.database().ref('connectedWallets').once('value');
        const walletData = snapshot.val();
        const addresses = Object.keys(walletData || {}).sort();
        const latestAddress = addresses.pop();
        const isConnected = walletData[latestAddress] === true;
        setIsConnected(isConnected);
        setConnectedWalletAddress(isConnected ? latestAddress : '');
      } catch (error) {
        console.error('Error fetching connected wallet address:', error);
      }
    };

    fetchConnectedWalletAddress();
  }, []);
  useEffect(() => {
    if (connectedWalletAddress) {
      fetchUserData();
    }
  }, [connectedWalletAddress]);

  // Function to handle connecting the wallet
  const handleConnectWallet = async () => {
    try {
      await connectWallet(); // Call connectWallet function
      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      // Handle error if wallet connection fails
    }
  };


  // Function to handle disconnecting the wallet
  const handleDisconnectWallet = async () => {
    try {
      await disconnectWallet(); // Call disconnectWallet function
      setIsConnected(false);
      setUserData(null);
      setConnectedWalletAddress('');
    } catch (error) {
      console.error("Error disconnecting from MetaMask:", error);
      // Handle error if wallet disconnection fails
    }
  };
  

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-white">
        <div className="container-fluid d-flex justify-content-end">
          {/* Your existing navbar content */}
              {/* Profile dropdown */}
       
         
          <div className="nav-item dropdown " style={{paddingRight: "10px"}}>
            <button
              className="btn btn-secondary dropdown-toggle"
              onClick={() => setShowDropdown(!showDropdown)}
            >
            <FaUser/>
             
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-end ${
                showDropdown ? "show" : ""
              }`}
              style={{ minWidth: "150px" }}
            >
              <li>
               
              </li>
              <li>
                {isConnected ? (
                  <button
                    className="dropdown-item"
                    onClick={handleDisconnectWallet}
                    style={{ fontSize: "14px" }}
                  >
                    Disconnect Wallet
                  </button>
                ) : (
                  <button
                    className="dropdown-item"
                    onClick={handleConnectWallet}
                    style={{ fontSize: "14px" }}
                  >
                    Connect Wallet
                  </button>
                )}
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to="/transaction-history"
                  style={{ fontSize: "14px" }}
                >
                  Transaction History
                </Link>
              </li>
            </ul>
          </div>
          <span
                  className={`dropdown-item ${
                    isConnected ? "text-success" : "text-danger"
                  }`}
                  style={{width: '100px', fontSize: "14px" }}
                >
                  {isConnected
                    ? `Connected`
                    : "Disconnected"}
                </span>
        </div>
      </nav>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "rgb(252, 182, 53)", height: "60px" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="assets/MiralLog.svg"
              alt="Logo"
              style={{ maxWidth: "100%" }}
            />
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/"
                  style={{
                    fontWeight: "600",
                    lineHeight: "30px",
                    fontFamily: '"Norwester", "Open Sans", Arial, sans-serif',
                    hovercolor: "white",
                  }}
                >
                  TICKETS
                </Link>
              </li>
              <li className="nav-item mx-5">
                <Link
                  className="nav-link active"
                  to="/payment"
                  style={{
                    fontWeight: "600",
                    lineHeight: "30px",
                    fontFamily: '"Norwester", "Open Sans", Arial, sans-serif',
                    hovercolor: "white",
                  }}
                >
                  PAYMENTS
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavbarMain;
