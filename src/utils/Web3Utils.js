import { ethers } from 'ethers';
import database from '../pages/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Web3Provider } from '@ethersproject/providers';

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not detected. Please install MetaMask.');
  }

  try {
    const provider = new Web3Provider(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    const connectedAccount = await signer.getAddress();
     // Store connected wallet address in Firebase database
     await firebase.database().ref(`connectedWallets/${connectedAccount}`).set(true);

    return connectedAccount;
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    throw new Error('Failed to connect to MetaMask. Please try again.');
  }
};
  
export const disconnectWallet = async () => {
  try {
    if (window.ethereum && window.ethereum.selectedAddress) {
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{
          eth_accounts: {},
        }],
      });

      // After requesting permissions, disconnect the wallet
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{
          eth_accounts: {},
        }],
      });

      return 'Wallet disconnected successfully';
    } else {
      throw new Error('No wallet connected');
    }
  } catch (error) {
    console.error('Error disconnecting from MetaMask:', error);
    throw new Error('Failed to disconnect wallet. Please try again.');
  }
};

// Helper function to create a new account
export const createAccount = async (account, email, password) => {
    try {
      // Create a new account in the Firebase Realtime Database
      await database.ref('accounts').child(account).set({
        email,
        password,
        createdAt: new Date().toISOString(),
      });
      return 'Account created successfully';
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  };
  
  // Helper function to check if the account is already created
  export const checkAccountCreated = async (account) => {
    try {
      // Check if the account exists in the Firebase Realtime Database
      const snapshot = await database.ref('accounts').child(account).once('value');
      return snapshot.exists();
    } catch (error) {
      console.error('Error checking account:', error);
      throw error;
    }
  };
// Function to fetch user details based on wallet address
export const fetchUserDetails = async (walletAddress) => {
  try {
    const snapshot = await firebase.database().ref('accounts').orderByChild('walletAddress').equalTo(walletAddress).once('value');
    const userData = snapshot.val();
    // Assuming that there is only one user with the given wallet address
    const userDetails = userData ? Object.values(userData)[0] : null;
    return userDetails;
  } catch (error) {
    throw new Error('Error fetching user details:', error);
  }
};