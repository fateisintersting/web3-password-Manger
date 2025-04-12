// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PasswordManager {
    struct PasswordEntry {
        string ipfsHash;      // CID of the encrypted password
        uint256 timestamp;
    }

    mapping(address => mapping(string => PasswordEntry)) private userPasswords;
    mapping(address => string[]) private userServicesList;

    event PasswordStored(address indexed user, string service, string ipfsHash);
    event PasswordDeleted(address indexed user, string service);

    function storePassword(string memory service, string memory ipfsHash) public {
        bool isNew = bytes(userPasswords[msg.sender][service].ipfsHash).length == 0;

        userPasswords[msg.sender][service] = PasswordEntry({
            ipfsHash: ipfsHash,
            timestamp: block.timestamp
        });

        if (isNew) {
            userServicesList[msg.sender].push(service);
        }

        emit PasswordStored(msg.sender, service, ipfsHash);
    }

    function getPassword(string memory service) public view returns (string memory, uint256) {
        PasswordEntry memory entry = userPasswords[msg.sender][service];
        require(bytes(entry.ipfsHash).length > 0, "Password not found");
        return (entry.ipfsHash, entry.timestamp);
    }

    function getServicesList() public view returns (string[] memory) {
        return userServicesList[msg.sender];
    }

    function deletePassword(string memory service) public {
        require(bytes(userPasswords[msg.sender][service].ipfsHash).length > 0, "Password not found");

        string[] storage services = userServicesList[msg.sender];
        for (uint i = 0; i < services.length; i++) {
            if (keccak256(bytes(services[i])) == keccak256(bytes(service))) {
                services[i] = services[services.length - 1];
                services.pop();
                break;
            }
        }

        delete userPasswords[msg.sender][service];
        emit PasswordDeleted(msg.sender, service);
    }
}
