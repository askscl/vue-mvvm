function Mvvm(options = {}){
    this.$options = options;
    let data = this._data = this.$options.data;
    observe(data);

    //数据代理，this代理了 this._data
    for(let key in data){
        Object.defineProperty(this, key, {
            configurable: true,
            get(){
                return this._data[key];
            },
            set(newVal){
                this._data[key] = newVal;
            }
        });
    }

    //数据编译
    new Compile(options.el, this);
}

function Compile(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();//这个函数没见过

    while(child = vm.$el.firstChild){
        fragment.appendChild(child);
    }

    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            let reg = /\{\{(.*?)\}\}/g;

            if (node.nodeType === 3 && reg.test(txt)) {
                console.log(RegExp.$1);
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach(key => {
                    val = val[key];
                });
                node.textContent = txt.replace(reg, val).trim();

            }
            if (node.childNodes && node.childNodes.length) {
                replace(node);
            }
        });
    }

    replace(fragment);

    vm.$el.appendChild(fragment);
}


function Observe(data) {
    for(let key in data){
        let val = data[key];
        observe(val);
        Object.defineProperty(data, key, {
            configurable: true,
            get(){
                return val;
            },
            set(newVal){
                if (val === newVal){
                    return;
                }
                val = newVal;
                observe(newVal);
            }
        });
    }
}

function observe(data) {
    if (!data || typeof data !== 'object') return;
    return new Observe(data);
}

//发布订阅模式 订阅和发布 如[fn1, fn2, fn3]
function Dep(){
    this.subs = [];
}

Dep.prototype = {
    addSub(sub){
        this.subs.push(sub);
    },
    notify() {
        this.subs.forEach(sub => sub.update());
    }
};
//监听函数
function Watcher(fn) {
    this.fn = fn;
}
Watcher.prototype.update = function() {
    this.fn();
};

let watcher = new Watcher(() => console.log(111));
let dep = new Dep();
dep.addSub(watcher);
dep.addSub(watcher);
dep.notify();

//数据更新视图--未理解
function replace(frag) {
    node.textContent = txt.replace(reg, val).trim();

    new Watcher(vm, RegExp.$1, newVal => {
        node.textContent = txt.replace(reg, newVal).trim();
    });
}

function Watcher(vm, exp, fn) {
    this.fn = fn;
    this.vm = vm;
    this.exp = exp;

    Dep.target = this;
    let arr = exp.split('.');
    let val = vm;
    arr.forEach(key => {
        val = val[key];
    });
    Dep.target = null;
}


