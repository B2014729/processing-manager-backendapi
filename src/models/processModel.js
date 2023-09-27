import { BlockChain, Block } from "./blockChain.js";

let processBlockChain = [
    {
        name: 'default',
        data: new BlockChain('default'),
    }
]

let listBlock = [
    new Block('09/11/2023', {
        dateUpdate: '09/11/2023',
        title: 'Tiếp nhận nguyên liệu',
        contents: 'Nguyên liệu được nhập từ kho cung cấp tại Đà Nẵng, được kiểm duyệt nghiêm ngặt.',
    }),

    new Block('09/12/2023', {
        dateUpdate: '09/12/2023',
        title: 'Chế biến (Cắt tỉa)',
        contents: 'Nguyên liệu được rửa sạch, và chuyển sang giai đoạn cắt tỉa gọn ràng',
    }),

    new Block('09/14/2023', {
        dateUpdate: '09/14/2023',
        title: 'Chế biến (Thái mỏng)',
        contents: 'Nguyên liệu được thái mỏng pille từng miếng.',
    }),

    new Block('09/15/2023', {
        dateUpdate: '09/15/2023',
        title: 'Đóng gói',
        contents: 'Sản phẩm được đóng gói và kiểm định trực tiếp tại xưởng chế biến.',
    }),

    new Block('09/18/2023', {
        dateUpdate: '09/18/2023',
        title: 'Vận chuyển',
        contents: 'Sản phẩm phân thành từng lô hàng để tiến hành giao cho đơn vị vận chuyển tới các nhà cung cấp, siêu thị bán lẻ.',
    }),
];

listBlock.forEach(block => {
    processBlockChain[0].data.addBlock(block);
});

let getAllProcess = async () => {
    return processBlockChain;
}

let getProcess = async (name) => {
    for (let i = 0; i < processBlockChain.length; i++) {
        if (processBlockChain[i].name == name) {
            return processBlockChain[i].data.getDataBlockChain();
        }
    }
    return [];
}

let createProcess = async (name) => {
    const processNew = {
        name: name,
        data: new BlockChain(name)
    };
    processBlockChain.push(processNew);
    return true;
}

let addActiveOnProcess = async (name, dateUpdate, user, contents) => {
    let newBlock = new Block(dateUpdate, {
        dateUpdate: dateUpdate,
        user: user,
        contents: contents
    }, '');

    for (let i = 0; i < processBlockChain.length; i++) {
        if (processBlockChain[i].name === name) {
            return processBlockChain[i].data.addBlock(newBlock);
        }
    }
    return false;
}

export {
    getProcess,
    createProcess,
    addActiveOnProcess,
    getAllProcess
}