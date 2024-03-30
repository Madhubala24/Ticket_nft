import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TransactionHistory = ({ connectedAccount }) => {
  const [connectedWalletAddress, setConnectedWalletAddress] = useState('');
  const [qrCodeDetails, setQRCodeDetails] = useState([]);
  const [buyerName, setBuyerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the buyer name and wallet address from Firebase based on the connected wallet address
        const accountSnapshot = await firebase
          .database()
          .ref(`accounts/${connectedAccount}`)
          .once('value');
        const accountData = accountSnapshot.val();
        const accountBuyerName = accountData ? accountData.name : '';
        const accountWalletAddress = accountData ? accountData.walletAddress : '';
        setBuyerName(accountBuyerName);
        setConnectedWalletAddress(accountWalletAddress);
  
        // Fetch QR code details from Firebase
        const qrCodeSnapshot = await firebase.database().ref('qrCodeDetails').once('value');
        const qrCodeData = qrCodeSnapshot.val();
        console.log('qrCodeData:', qrCodeData); 
        // Check if qrCodeData exists and is an object
        if (qrCodeData && typeof qrCodeData === 'object') {
          const qrCodeDetailsArray = Object.entries(qrCodeData).map(([key, details]) => {
            console.log('details',details);
             // Parse the buyDate string to get only the date part
        const buyDate = details.transactionDetails?.buyDate ? new Date(details.transactionDetails.buyDate).toLocaleDateString() : 'N/A';
         return {
            id: key,
            buyerName: details.buyerName || '',
            cartItems: details.items || [],
            totalPrice: (details.items || []).reduce((total, item) => total + item.totalPrice, 0),
            validity: details.qrData?.validity || 'N/A',
            walletaddress: details.qrData?.connectedAccount || 'N/A',
            transactionId: details.transactionDetails?.transactionId || 'N/A',
            transactionHash: details.transactionHash || '',
            buyDate: buyDate,
          };
        });
          setQRCodeDetails(qrCodeDetailsArray);
        } else {
          setQRCodeDetails([]);
        }
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, [connectedAccount]);

  useEffect(() => {
    const fetchConnectedWalletAddress = async () => {
      try {
        // Fetch connected wallet addresses from Firebase
        const snapshot = await firebase.database().ref('connectedWallets').once('value');
        const walletData = snapshot.val();

        // Get the keys (addresses) and sort them
        const addresses = Object.keys(walletData || {}).sort();

        // Get the latest connected wallet address
        const latestAddress = addresses.pop();

        // Check if the latest address is true
        const isConnected = walletData[latestAddress] === true;

        // Set the latest connected wallet address in state
        setConnectedWalletAddress(isConnected ? latestAddress : 'No connected wallet');
      } catch (error) {
        console.error('Error fetching connected wallet address:', error);
        setConnectedWalletAddress('Error fetching address');
      }
    };

    fetchConnectedWalletAddress();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredQRCodeDetails = qrCodeDetails.filter(details =>
    details.buyerName.trim().toLowerCase().includes(searchTerm.toLowerCase()) ||
    details.cartItems.some(item =>
      item.passType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.quantity.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.totalPrice.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    details.validity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    details.transactionId.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const getTransactionLink = (transactionHash) => {
    console.log(transactionHash);
    return `https://sepolia.etherscan.io/tx/${transactionHash}`;
  };

  return (
    <div>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h5" component="h2">
          Transaction History
        </Typography>
        <TextField
          label="Search by Buyer or Cart Items"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
        />
      </Box>
     <Typography variant="subtitle1" gutterBottom>
  Connected Wallet Address: {connectedWalletAddress}
</Typography>
<Typography variant="subtitle1" gutterBottom>
  Buyer Name: {buyerName}
</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="transaction history table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Buy Date</StyledTableCell>
              <StyledTableCell>Pass Type</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Total Price</StyledTableCell>
              <StyledTableCell>Validity</StyledTableCell>
              <StyledTableCell>Transaction ID</StyledTableCell>
              <StyledTableCell>Transaction</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQRCodeDetails.length > 0 ? (
              filteredQRCodeDetails.map((details) => (
                details.cartItems.map((item, itemIndex) => (
                  <StyledTableRow key={`${details.id}-${itemIndex}`}>
                    <StyledTableCell>{details.buyDate}</StyledTableCell>
                    <StyledTableCell>{item.passType}</StyledTableCell>
                    <StyledTableCell>{item.quantity}</StyledTableCell>
                    <StyledTableCell>{item.totalPrice}</StyledTableCell>
                    <StyledTableCell>{details.validity}</StyledTableCell>
                    <StyledTableCell>{details.transactionId}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        href={getTransactionLink(details.transactionHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={7}>No transactions found.</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionHistory;