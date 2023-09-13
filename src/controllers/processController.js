import { BlockChain, Block } from "../models/block.js"

let getBlockChain = async (req, res) => {
    let myBlockChain = new BlockChain('firstBlockChain');

    let blockOne = new Block('09/11/2023', {
        name: 'Duong Hai Bang',
        old: 21,
        address: 'Xuan Khanh, Ninh Kieu, Can Tho'
    });

    let blockSecond = new Block('09/12/2023', {
        name: 'Trinh Thang Binh',
        old: 24,
        address: '30/4, Ninh Kieu, Can Tho'
    });

    let blockFinal = new Block('07/09/2023', {
        name: 'Trinh Dinh Ben',
        old: 34,
        address: 'An Hoa, Ninh Kieu, Can Tho'
    });

    let listBlock = [
        new Block('09/11/2023', {
            name: 'Duong Hai Bang',
            old: 21,
            address: 'Xuan Khanh, Ninh Kieu, Can Tho'
        }),

        new Block('09/12/2023', {
            name: 'Trinh Thang Binh',
            old: 24,
            address: '30/4, Ninh Kieu, Can Tho'
        }),

        new Block('07/09/2023', {
            name: 'Trinh Dinh Ben',
            old: 34,
            address: 'An Hoa, Ninh Kieu, Can Tho'
        }),
    ];

    listBlock.forEach(block => {
        myBlockChain.addBlock(block);
    });

    myBlockChain.printBlockChain();
    console.log('Is valid: ' + myBlockChain.checkIntegrityBlockChain());//true

    myBlockChain.chain[1].data = { name: 'Ngueybn VAn a' };
    console.log('Is valid when change data of Block 1: ' + myBlockChain.checkIntegrityBlockChain());//false

    return res.status(200).json({
        status: 'Ok',
        data: myBlockChain
    });
}

export {
    getBlockChain
}