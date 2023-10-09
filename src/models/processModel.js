import { BlockChain, Block } from "./blockChain.js";

let processBlockChain = new BlockChain('process-blockchain');

class ProcessModel {
    constructor(client) {
        this.Process = client.db().collection("process");
    }

    async find(filter) {
        return await this.Process.find(filter).toArray();
    }

    async getProcess(id) {
        processBlockChain.resetChain();
        let process = await this.find({
            id: Number(id)
        })
        process.forEach(element => {
            let newBlock = new Block(Number(id), element.timetamps, element.data);
            processBlockChain.addBlock(newBlock);
        });
        return processBlockChain;
    }

    async addBlock(id, timetamps, data) {
        await this.getProcess(Number(id));

        let newBlock = new Block(Number(id), timetamps, data);
        processBlockChain.addBlock(newBlock);

        if (processBlockChain.checkIntegrityBlockChain()) {
            await this.Process.insertOne(processBlockChain.getLatesBlock());
        }
    }

    async checkProcessTrue(id) {
        await this.getProcess(Number(id));

        let process = await this.find({
            id: Number(id)
        });
        let isValid = [];
        for (let i = 0; i < process.length; i++) {
            if (processBlockChain.getIndexBlock(i + 1).hash !== process[i].hash) {
                isValid.push(i)
            }
        }
        return isValid;
    }
}

export default ProcessModel;

