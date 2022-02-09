// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.8.0;


interface IAccountDeployer {
    
    function parameters()
        external
        view
        returns (
            address admin,
            address owner,
            address vault
        );
         
    function deploy(
            address admin,
            address owner,
            address vault
    ) external returns (address account);
}