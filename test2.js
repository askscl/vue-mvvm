//发布订阅者模式
let event = {
    clientList: {},
    listen(key, fn){
        if(!this.clientList[key]){
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger(type, money) {
        let fns = this.clientList[type];
        if(!fns || fns.length === 0){
            return false;
        }
        fns.forEach(fn => {
            fn.apply(this,[money]);
        })
    }
};

let installEvent = obj => {
    for (let i in event) {
        obj[i] = event[i];
    }
};
let salesOffices = {};
installEvent(salesOffices);
//订阅消息
salesOffices.listen('squareMeter88', price => {
    console.log('小明，你看中的88平方的房子，价格=' + price)
});
salesOffices.listen('squareMeter88', price => {
    console.log('小光，你看中的88平方的房子，价格=' + price)
});
salesOffices.listen('squareMeter100', price => {
    console.log('小红，你看中的100平方的房子，价格=' +price);
});
//发布消息
salesOffices.trigger('squareMeter88', 2000000);
salesOffices.trigger('squareMeter100', 2500000);


