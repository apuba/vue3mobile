/*
 * @Author: 侯兴章 3603317@qq.com
 * @Date: 2021-01-30 03:03:11
 * @LastEditTime: 2021-01-31 16:14:01
 * @LastEditors: 侯兴章
 * @Description: 
 */
/**
     * 根据window.devicePixelRatio获取像素比
     */
// import html2canvas from 'html2canvas'

// import html2canvas from './html2canvas.js'

const html2canvas = require('./html2canvas');


function DPR() {
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        return window.devicePixelRatio;
    }
    return 1;
}
/**
 *  将传入值转为整数
 */
function parseValue(value: string) {
    return parseInt(value, 10);
}

/**
 * 图片转base64格式
 */
function convertCanvasToImage(canvas: HTMLCanvasElement, imgContainer: string, x: number, y: number) {
    const newImage = new Image();

    newImage.width = x;
    newImage.height = y;
    newImage.src = canvas.toDataURL("image/png");
    /*   image.style.position = 'absolute';
      image.style.zIndex = '10';
      image.style.top = '0'; */

    let _container = document.querySelector(imgContainer);
    _container && (_container.innerHTML = '');


    console.log('img    ----', newImage)

    if (_container) {
        _container.appendChild(newImage);
    } else {
        document.body.appendChild(newImage);
    }
    return newImage;
}

/**
 * 绘制canvas 
 * // saveToImage('.container')
 * 
 * selector 绘制图片的区域
 *  imgContent 生成图片后存储的区域
 */
export const saveToImage = async (selector: string, imgContainer: string) => {
    // 获取想要转换的 DOM 节点
    const dom = document.querySelector(selector) as HTMLElement;
    if (!dom) return null;
    const box = window.getComputedStyle(dom);
    // DOM 节点计算后宽高
    const width = parseValue(box.width);
    const height = parseValue(box.height);
    // 获取像素比
    const scaleBy = DPR();
    // 创建自定义 canvas 元素
    const canvas = document.createElement('canvas');
    // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
    canvas.width = width * scaleBy;
    canvas.height = height * scaleBy;
    // 设定 canvas css宽高为 DOM 节点宽高
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // 获取画笔
    // const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    // 将所有绘制内容放大像素比倍
    // context.scale(scaleBy, scaleBy);

    /* return await html2canvas(dom, { canvas }).then(function () {
        convertCanvasToImage(canvas, x, y)
    }) */

    await html2canvas(dom, { canvas, scale: scaleBy, useCORS: true, allowTaint: false });



    const image = convertCanvasToImage(canvas, imgContainer, width, height) // 返回业务逻辑，自行处理。

    return {
        image,
        canvas,
        width,
        height,
    }

}


