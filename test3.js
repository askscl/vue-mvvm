class Event {
    constructor(){}
    handlers = {};

    addEventListener(type, handler){
        if(!(type in this.handlers)){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    }

    dispatchEvent(type, ...params){
        if(!(type in this.handlers)){
            return new Error('未注册该事件');
        }

        this.handlers[type].forEach(handler =>{
            handler(...params)
        })
    }

    removeEventListener(type, handler){
        if(!(type in this.handlers)){
            return new Error('无效事件')
        }
        if(!hanndler){
            delete this.handlers[type];
        }else {
            const idx = this.handlers[type].findIndex(ele =>ele === handler);
            if(idx === undefined){
                return new Error('无该绑定事件');
            }
            this.handlers[type].splice(idx, 1);
            if(this.handlers[type].length === 0){
                delete this.handlers[type];
            }
        }
    }
}

var  event = new Event();
function load(params) {
    console.log('load',params);
}
event.addEventListener('load', load);

function load2(params){
    console.log('load2', params);
}
event.addEventListener('load', load2);

event.dispatchEvent('load','load事件触发');
event.removeEventListener('load',load2);
event.removeEventListener('load');
