import crypto from 'crypto-js';

class Block {
    constructor(id, timetamps, data, previousHash = '') {
        this.id = id;
        this.timetamps = timetamps;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.hashBlock();
        this.nonce = 0;
    }

    hashBlock() {
        return crypto.SHA256(this.id + this.timetamps + JSON.stringify(this.data)
            + this.previousHash + this.nonce).toString();
    }

    getDataBlock() {
        return this.data;
    }
}

class BlockChain {
    constructor(name) {
        this.name = name;
        this.chain = [this.createGenesisBlock()];
    }

    resetChain() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2023', 'Data of the first block in the blockchain');
    }

    getFirstBlock() {
        return this.chain[1];
    }

    getLatesBlock() {
        return this.chain[this.chain.length - 1];
    }

    getIndexBlock(index) {
        return index < this.chain.length ? this.chain[index] : null;
    }

    getDataBlockChain() {
        let data = [];
        for (let i = 1; i < this.chain.length; i++) {
            data.push(this.chain[i].data);
        }
        return data;
    }

    addBlock(newBlock) {
        try {
            newBlock.previousHash = this.getLatesBlock().hash;
            newBlock.hash = newBlock.hashBlock();

            while (newBlock.hash.startsWith('000') == false) {
                newBlock.nonce = newBlock.nonce + 1;
                newBlock.hash = newBlock.hashBlock();
            }
            this.chain.push(newBlock);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }


    checkIntegrityBlockChain() {
        for (let i = 1; i < this.chain.length; i++) {
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.hashBlock()) {
                console.log('TH1 ' + i);
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log('TH2 ' + i);
                return false;
            }

            if (currentBlock.hash.startsWith('000') == false) {
                console.log('TH3 ' + i);
                return false;
            }
        }
        return true;
    }

    printBlockChain() {
        console.log('Name BlockChain: ' + this.name);
        for (let i = 0; i < this.chain.length; i++) {
            this.chain[i].printBlock();
            console.log(' ');
        }
    }
}

export {
    Block, BlockChain
}
