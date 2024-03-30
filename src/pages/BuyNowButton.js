
// export const handleGenerateQR = () => {

//   // Get the values from first name and last name inputs
//   const firstName = document.getElementById('firstNameInput').value;
//   const lastName = document.getElementById('lastNameInput').value;
  
//   // Construct the buyerName from first name and last name
//   const buyerName = `${firstName} ${lastName}`;

  
//   // Generate an object with all the required data for the QR code
//   const qrData = {
//       cartItems,
//       buyerName,
//       totalPrice,
//       validity: calculateExpiryDate() // Assuming calculateExpiryDate returns the validity date
//   };
    
//   return qrData; // Convert the object to a JSON string
// };
// // Function to generate a sequential transaction ID
// export const generateTransactionId = async () => {
//   try {
//       // Increment the last used transaction ID
//       const newTransactionId = lastTransactionId + 1;
//       // Update the last used transaction ID state variable
//       setLastTransactionId(newTransactionId);
//       // Store the new transaction ID in Firebase
//       await firebase.database().ref('lastTransactionId').set(newTransactionId);
//       // Return the new transaction ID
//       return newTransactionId;
//   } catch (error) {
//       console.error('Error generating transaction ID:', error);
//       return null;
//   }
// };

// export const handleBuyNowClick = async () => {
// if (!isConnected) {
//   setShowConnectWalletPopup(true);
// } else if (!isAccountCreated) {
//   alert('Please create an account before proceeding to buy.');
// } else if (cartItems.length === 0) {
//   alert('Please add items to your cart before proceeding to buy.');
// } else {
//   setShowQR(true);

//   // Generate the QR code data
//   const qrData = handleGenerateQR();

//   // Generate a sequential transaction ID
//   const transactionId = await generateTransactionId();

//   // Store the transaction details
//   const transactionDetails = {
//       transactionId: transactionId,
//       buyDate: new Date().toISOString(), // Date of the purchase
//       // Other transaction details you want to include
//   };

//   // Create an array to hold the items with their total price
//   const itemsWithTotalPrice = cartItems.map(item => ({
//       ...item,
//       totalPrice: item.price * item.quantity
//   }));

//   // Store the QR code data, items with total price, and transaction details in Firebase
//   const qrCodeDetailsRef = firebase.database().ref('qrCodeDetails');
//   qrCodeDetailsRef.push({
//       qrData: qrData,
//       items: itemsWithTotalPrice, // Store the items with total price
//       transactionDetails: transactionDetails
//   });

//   // Proceed with your buy functionality using qrData
// }
// };