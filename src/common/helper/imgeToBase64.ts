/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-31 03:34:40
 * @LastEditTime: 2021-01-31 03:48:09
 * @LastEditors: 侯兴章
 * @Description:  图片转为base64
 */


const getBase64Image = (img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0, img.width, img.height);
    const ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    const dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}

export const imgeToBase64 = async (type: string | HTMLImageElement): Promise<String> => {
    let image: HTMLImageElement
    if (typeof type === 'string') {
        image = new Image();
        image.src = type;
    } else {
        image = type
    }

    image.crossOrigin = '';
    return new Promise((resolve, reject) => {
        /* 
        image.onload = function () {
            const base64 = getBase64Image(image);
            console.log(base64);
            resolve(base64)
        }
        image.onerror = function () {
            reject('')
        } */

        let longtime = 0;
        // 轮循查询图片加载状态
        const timer = setInterval(function () {
            if (image.complete) {
                const base64 = getBase64Image(image);
                resolve(base64)
                clearInterval(timer)
            } else if (longtime < 1000 * 20) {
                longtime += 50
            } else {
                clearInterval(timer)
                reject('图片载超时了');// 
            }
        }, 50)
    })

}