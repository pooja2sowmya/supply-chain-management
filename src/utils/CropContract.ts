
import { ethers } from 'ethers';

// The ABI (Application Binary Interface) of the smart contract
const contractABI = [
  "function addCrop(string memory _cropName, uint256 _quantity, string memory _farmerName) public",
  "function getCrop(uint256 _index) public view returns (string memory, uint256, string memory, address)",
  "function getCropCount() public view returns (uint256)"
];

// This will be the address of your deployed contract
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed contract address

export const cropContractConfig = {
  address: contractAddress,
  abi: contractABI
};

// Function to check if MetaMask is installed and accessible
export const isMetaMaskAvailable = () => {
  return window.ethereum !== undefined;
};

// Function to get a contract instance
export const getCropContract = () => {
  if (!isMetaMaskAvailable()) {
    throw new Error("MetaMask is not installed or not accessible");
  }
  
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } catch (error) {
    console.error("Error getting contract instance:", error);
    throw new Error("Could not connect to blockchain. Please make sure MetaMask is connected.");
  }
};

// Function to add a crop to the blockchain
export const addCropToBlockchain = async (cropName: string, quantity: number, farmerName: string) => {
  try {
    if (!isMetaMaskAvailable()) {
      return { success: false, error: "MetaMask not installed or not accessible" };
    }

    // Request account access if needed
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    const contract = getCropContract();
    const tx = await contract.addCrop(cropName, quantity, farmerName);
    await tx.wait();
    return { success: true, hash: tx.hash };
  } catch (error: any) {
    console.error("Error adding crop to blockchain:", error);
    return { success: false, error: error.message };
  }
};

// Function to get all crops from the blockchain
export const getAllCropsFromBlockchain = async () => {
  try {
    if (!isMetaMaskAvailable()) {
      return { success: false, error: "MetaMask not installed or not accessible" };
    }

    // Request account access if needed
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    const contract = getCropContract();
    const cropCount = await contract.getCropCount();
    
    const crops = [];
    for (let i = 0; i < cropCount.toNumber(); i++) {
      const crop = await contract.getCrop(i);
      crops.push({
        cropName: crop[0],
        quantity: crop[1].toNumber(),
        farmerName: crop[2],
        farmerAddress: crop[3]
      });
    }
    
    return { success: true, data: crops };
  } catch (error: any) {
    console.error("Error getting crops from blockchain:", error);
    return { success: false, error: error.message };
  }
};

// Function to ensure MetaMask is connected
export const connectToMetaMask = async () => {
  try {
    if (!isMetaMaskAvailable()) {
      throw new Error("MetaMask not installed or not accessible");
    }
    
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return { success: true, account: accounts[0] };
  } catch (error: any) {
    console.error("Error connecting to MetaMask:", error);
    return { success: false, error: error.message };
  }
};
