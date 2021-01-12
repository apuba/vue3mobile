/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2020-11-05 00:44:19
 * @LastEditTime: 2020-11-18 23:57:30
 * @LastEditors: 侯兴章
 * @Description: 
 */

class SessionStorageAPI {
    set(key: string, value: string): void {
        return sessionStorage.setItem(key, value);
    }

    get(key: string): string | null {
        return sessionStorage.getItem(key);
    }
    clear(): void {
        sessionStorage.clear();
    }

    remove(key: string): void {
        return sessionStorage.removeItem(key);
    }

}
export { SessionStorageAPI };
