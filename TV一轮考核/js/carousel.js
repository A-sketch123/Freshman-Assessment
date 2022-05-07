window.addEventListener('load', function () {
  var prev = document.querySelector('.prev');
  var next = document.querySelector('.next');
  var carousel = document.querySelector('.swiper');
  var carouselWidth = carousel.offsetWidth;
  // 鼠标经过左右箭头出现
  carousel.addEventListener('mouseenter', function () {
    prev.style.display = 'block';
    next.style.display = 'block';
    clearInterval(timer);
    timer = null;
  });
  carousel.addEventListener('mouseleave', function () {
    prev.style.display = 'none';
    next.style.display = 'none';
    timer = setInterval(function () {
      // 手动调用点击事件
      next.click();
    }, 2200);
  });
  //动态生成小圆圈，使图片数等于圆圈数
  var ul = carousel.querySelector('#ulSwiper');
  var ol = carousel.querySelector('.point');
  console.log(carousel);
   console.log(ul);
  for (var i = 0; i < ul.children.length; i++) {
    console.log(i);
    var li = document.createElement('li');
    // 记录小圆圈索引号
    li.setAttribute('index', i);
    // 把创建的li插入ol
    ol.appendChild(li);
    // 点哪个小圆圈哪个小圆圈变色
    li.addEventListener('click', function () {
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
      }
      this.className = 'current';
      // 点击小圆圈移动图片(ul),ul移动距离=小圆圈索引号乘图片宽度
      //此方法可能会导致图片错位
      var index = this.getAttribute('index');
      circle = index;
      num = index;
      console.log(carouselWidth);
      animate(ul, -index * carouselWidth);
    });
  }
  //    把ol的第一个li设置成current
  ol.children[0].className = 'current';
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  // 右箭头控制图片
  var num = 0;
  // 控制小圆圈播放circle
  var circle = 0;
  var flag = true; //使用节流防止点击切换过快
  next.addEventListener('click', function () {
    if (flag) {
      flag = false;
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * carouselWidth, function () {
        flag = true;
      });
      // 先清除其他小圆圈的current类名，再加到当前的
      circle++;
      // 当circle到了3，还原
      console.log(ol.children.length);
      if (circle == ol.children.length) {
        circle = 0;
      }
      for (var i = 0; i < ol.children.length; ++i) {
        ol.children[i].className = '';
      }
      ol.children[circle].className = 'current';
    }
  });
  // 左箭头控制图片
  prev.addEventListener('click', function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * carouselWidth + 'px';
      }
      num--;
      animate(ul, -num * carouselWidth, function () {
        flag = true;
      });
      // 先清除其他小圆圈的current类名，再加到当前的
      circle--;
      // 当circle到了3，还原
      circle = circle < 0 ? ol.children.length - 1 : circle;
      for (var i = 0; i < ol.children.length; ++i) {
        ol.children[i].className = '';
      }
      ol.children[circle].className = 'current';
    }
  });
  // 自动播放
  var timer = setInterval(function () {
    // 手动调用点击事件
    next.click();
  }, 2200);
});
