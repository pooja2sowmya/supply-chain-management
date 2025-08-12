
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CropManagement {
    struct Crop {
        string cropName;
        uint256 quantity;
        string farmerName;
        address farmerAddress;
        uint256 timestamp;
    }
    
    Crop[] public crops;
    
    event CropAdded(address indexed farmerAddress, string cropName, uint256 quantity, uint256 timestamp);
    
    function addCrop(string memory _cropName, uint256 _quantity, string memory _farmerName) public {
        crops.push(Crop({
            cropName: _cropName,
            quantity: _quantity,
            farmerName: _farmerName,
            farmerAddress: msg.sender,
            timestamp: block.timestamp
        }));
        
        emit CropAdded(msg.sender, _cropName, _quantity, block.timestamp);
    }
    
    function getCrop(uint256 _index) public view returns (string memory, uint256, string memory, address) {
        require(_index < crops.length, "Crop index out of bounds");
        Crop storage crop = crops[_index];
        return (crop.cropName, crop.quantity, crop.farmerName, crop.farmerAddress);
    }
    
    function getCropCount() public view returns (uint256) {
        return crops.length;
    }
}
