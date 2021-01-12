/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-05 00:44:19
 * @LastEditTime: 2020-11-18 23:57:40
 * @LastEditors: 侯兴章
 * @Description: 
 */

class LocalStorageAPI {
    set(key: string, value: string): void {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                throw new Error('Out of Memory Limit Localstorage');
            } else {
                throw new Error(e.name);
            }
        }
    }

    get(key: string): string {
        return localStorage.getItem(key) || '';
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

    setExpire(key: string, value: string, expire: number): void {
        const currTime = new Date().getTime();
        return this.set(key, JSON.stringify({ val: value, time: currTime + expire }));
    }

    getExpire(key: string): string {
        const val: string = this.get(key);
        const dataObj = JSON.parse(val);
        if (new Date().getTime() - dataObj.time > 0) {
            return dataObj.val;
        } else {
            return '';
        }
    }
}

export { LocalStorageAPI };
