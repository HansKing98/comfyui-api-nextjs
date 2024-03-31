

function noop() {

}
const store = {
    preId: 'y-',
    timeSign: '|-door-|',
    status: {
        SUCCESS: 0,
        FAILURE: 1,
        OVERFLOW: 2,
        TIMEOUT: 3,
    },
    storage: typeof window !== "undefined" ? window.localStorage : {
        setItem: noop,
        getItem: noop,
        removeItem: noop,
    },
    getKey: function (key) {
        return this.preId + key
    },
    set: function (
        key,
        value,
        time,
        cb = (status, key, value) => { }
    ) {
        let _status = this.status.SUCCESS,
            _key = this.getKey(key),
            _time
        //设置失效时间，未设置时间默认为一个月
        try {
            _time = time
                ? new Date(time).getTime()
                : new Date().getTime() + 1000 * 60 * 60 * 24 * 31
        } catch (e) {
            _time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31
        }
        try {
            if(typeof value === 'object'){
                value = JSON.stringify(value)
            }
            this.storage.setItem(_key, _time + this.timeSign + value)
        } catch (e) {
            _status = this.status.OVERFLOW
        }
        cb && cb.call(this, _status, _key, value)
    },
    getRt: function (
        key,
        cb = (status, value) => { }
    ) {
        let status = this.status.SUCCESS,
            _key = this.getKey(key),
            value = null,
            timeSignLen = this.timeSign.length,
            that = this,
            index,
            time,
            result
        try {
            value = that.storage.getItem(_key)
        } catch (e) {
            result = {
                status: that.status.FAILURE,
                value: null,
            }
            cb && cb.call(this, result.status, result.value)
            return result
        }
        if (value) {
            index = value.indexOf(that.timeSign)
            time = +value.slice(0, index)
            if (time > new Date().getTime() || time == 0) {
                value = value.slice(index + timeSignLen)
            } else {
                (value = null), (status = that.status.TIMEOUT)
                that.storage.removeItem(_key)
            }
        } else {
            status = that.status.FAILURE
        }
        result = {
            status: status,
            value: value,
        }
        cb && cb.call(this, result.status, result.value)
        return result
    },
    get: function (
        key,
        isJson = false,
        cb = (status, value) => { },
    ) {
        const rt = this.getRt(key, cb)
        if(isJson){
            if(rt.value){
                return JSON.parse(rt.value)
            }
        }
        return rt.value
    }
}

export { store }
