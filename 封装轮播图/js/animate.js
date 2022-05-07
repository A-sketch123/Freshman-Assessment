// 缓动动画
function animate(obj, target, callback) {
    // 保留一个定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止定时器
            clearInterval(obj.timer);
            // 回调函数
            if (callback) {
                callback();
            }
        }
        // 步长公式
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}