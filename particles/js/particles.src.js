"use strict";
// 未整理完成。
var canvas = {},
  image = {},
  requestId = 0,
  startTime = 0;

function Particles(config) {
  var a = this;
  var ease = config.ease || "easeInOutExpo";
  if (typeof window[ease] !== "function") {
    console.log("the function is not existed, it will use easeInOutExpo instead");
    ease = "easeInOutExpo"
  }
  this.init = (function () {
    if (!config.canvasId || !document.getElementById(config.canvasId)) {
      console.log("pls use the correct canvas id");
      return
    }
    if (!config.imgUrl) {
      console.log("pls use the correct img url");
      return
    }
    canvas.self = document.getElementById(config.canvasId);
    if (canvas.self.getContext) {
      canvas.w = canvas.self.width;
      canvas.h = canvas.self.height;
      canvas.ctx = canvas.self.getContext("2d");
      var img = new Image();
      image.isLoaded = false;
      img.onload = function () {
        image.self = d;
        image.w = img.width;
        image.h = img.height;
        image.x = config.imgX || parseInt(canvas.w / 2 - image.w / 2);
        image.y = config.imgY || 0;
        canvas.ctx.drawImage(image.self, image.x, image.y, image.w, image.h);
        image.imgData = canvas.ctx.getImageData(image.x, image.y, image.w, image.h);
        canvas.ctx.clearRect(0, 0, canvas.w, canvas.h);
        Particles.prototype._calculate({
          color: config.fillStyle || "rgba(26,145,211,1)",
          pOffset: config.particleOffset || 2,
          startX: config.startX || (image.x + image.w / 2),
          startY: config.startY || 0,
          duration: config.duration || 3000,
          interval: config.interval || 3,
          ease: ease,
          ratioX: config.ratioX || 1,
          ratioY: config.ratioY || 1,
          cols: config.cols || 100,
          rows: config.rows || 100
        });
        image.isLoaded = true;
        startTime = new Date().getTime()
      };
      img.crossOrigin = "anonymous";
      img.src = config.imgUrl
    }
  })();
  this.draw = function () {
    if (image.isLoaded) {
      Particles.prototype._draw()
    } else {
      setTimeout(a.draw)
    }
  };
  this.animate = function () {
    if (image.isLoaded) {
      Particles.prototype._animate(config.delay)
    } else {
      setTimeout(a.animate)
    }
  }
}
Particles.prototype = {
  array: [],
  _calculate: function (option) {
    var k = image.imgData.length;
    var f = image.imgData.data;
    var m = option.cols,
      o = option.rows;
    var n = parseInt(image.w / m),
      c = parseInt(image.h / o);
    var g, e;
    var l = 0;
    var h = {};
    for (var d = 0; d < m; d++) {
      for (var b = 0; b < o; b++) {
        l = (b * c * image.w + d * n) * 4;
        if (f[l + 3] > 100) {
          h = {
            x0: option.startX,
            y0: option.startY,
            x1: image.x + d * n + (Math.random() - 0.5) * 10 * option.pOffset,
            y1: image.y + b * c + (Math.random() - 0.5) * 10 * option.pOffset,
            fillStyle: option.color,
            delay: b / 20,
            currTime: 0,
            count: 0,
            duration: parseInt(option.duration / 16.66) + 1,
            interval: parseInt(Math.random() * 10 * option.interval),
            ease: option.ease,
            ratioX: option.ratioX,
            ratioY: option.ratioY
          };
          if (f[l + 1] < 175 && f[l + 2] < 10) {
            h.fillStyle = "#ffa900"
          } else {
            if (f[l + 1] < 75 && f[l + 1] > 50) {
              h.fillStyle = "#ff4085"
            } else {
              if (f[l + 1] < 220 && f[l + 1] > 190) {
                h.fillStyle = "#00cfff"
              } else {
                if (f[l + 1] < 195 && f[l + 1] > 175) {
                  h.fillStyle = "#9abc1c"
                }
              }
            }
          }
          this.array.push(h)
        }
      }
    }
  },
  _draw: function () {
    canvas.ctx.clearRect(0, 0, canvas.w, canvas.h);
    var len = this.particles.length;
    var cur_particle = null;
    for (var i = 0; i < len; i++) {
      cur_particle = this.particles[i];
      canvas.ctx.fillStyle = cur_particle.fillStyle;
      canvas.ctx.fillRect(cur_particle.x1, cur_particle.y1, 1, 1)
    }
  },
  _render: function () {
    //清空画布					
		canvas.ctx.clearRect(0,0,canvas.w,canvas.h);

		var len = this.particles.length;
    var curr_particle = null;
    var cur_x,cur_y;
    var cur_time = 0, duration = 0, cur_delay = 0, j = 1, g = 1;

		for(var i = 0; i < len; i++) {
      curr_particle = this.particles[i];
      // 如果单位时间超过delay,开始
      if(curr_particle.count++ > curr_particle.delay){
        //设置填充颜色
        canvas.ctx.fillStyle = curr_particle.fillStyle;
        
        //获取当前的time和持续时间和延时
        cur_time = curr_particle.currTime;
        duration = curr_particle.duration;
        cur_delay = curr_particle.interval;
        // cur_delay = 0
        // 如果最后一个粒子动画也执行完了则停止动画并return
        if(this.particles[len-1].duration < this.particles[len-1].cur_time){
          // 停止动画
          cancelAnimationFrame(requestId)
          draw();
          return ;
        }else{
          if (cur_time < duration + cur_delay) {
            if (cur_time >= cur_delay) {
              // cur_x = window.easeInOutQuad(cur_time, curr_particle.x0, curr_particle.x1 - curr_particle.x0, duration)
              // cur_y = window.easeInOutQuad(cur_time, curr_particle.y0, curr_particle.y1 - curr_particle.y0, duration)
              cur_x = window.Easing.easeInOutQuad((cur_time - cur_delay) * j, curr_particle.x0, (curr_particle.x1 - curr_particle.x0) * j, duration);
              cur_y = window.Easing.easeInOutQuad((cur_time - cur_delay) * g, curr_particle.y0, (curr_particle.y1 - curr_particle.y0) * g, duration);

              canvas.ctx.fillRect(cur_x, cur_y, 1, 1)
            }
          } else {
            //绘粒子到画布上
            canvas.ctx.fillRect(curr_particle.x1, curr_particle.y1, 1, 1)
          }
        }
        curr_particle.currTime += Math.random() + 0.5
      }
    }

    //重复绘制
	  requestId = requestAnimationFrame(render);
  },
  _animate: function (a) {
    if (startTime + a < new Date().getTime()) {
      requestId = requestAnimationFrame(Particles.prototype._render)
    } else {
      setTimeout(function () {
        Particles.prototype._animate(a)
      })
    }
  }
};

/*
 * easing.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * you can visit 'http://easings.net/zh-cn' to get effect
*/
var Easing = {
  linear(t, b, c, d) {
    return c * t / d + b;
  },
  easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t + b;
    } else {
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
  },
  easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t + b;
    } else {
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
  },
  easeInQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t + b;
    } else {
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
  },
  easeInQuint(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t * t + b;
    } else {
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
  },
  easeInSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo(t, b, c, d) {
    var _ref;
    return (_ref = t === 0) !== null ? _ref : {
      b: c * Math.pow(2, 10 * (t / d - 1)) + b
    };
  },
  easeOutExpo(t, b, c, d) {
    var _ref;
    return (_ref = t === d) !== null ? _ref : b + {
      c: c * (-Math.pow(2, -10 * t / d) + 1) + b
    };
  },
  easeInOutExpo(t, b, c, d) {
    if (t === 0) {
      b;
    }
    if (t === d) {
      b + c;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    } else {
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  },
  easeInCirc(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    } else {
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
  },
  easeInElastic(t, b, c, d) {
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      b;
    } else if ((t /= d) === 1) {
      b + c;
    }
    if (!p) {
      p = d * 0.3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  easeOutElastic(t, b, c, d) {
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      b;
    } else if ((t /= d) === 1) {
      b + c;
    }
    if (!p) {
      p = d * 0.3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  easeInOutElastic(t, b, c, d) {
    var a, p, s;
    s = 1.70158;
    p = 0;
    a = c;
    if (t === 0) {
      b;
    } else if ((t /= d / 2) === 2) {
      b + c;
    }
    if (!p) {
      p = d * (0.3 * 1.5);
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    if (t < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    } else {
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    }
  },
  easeInBack(t, b, c, d, s) {
    if (s === void 0) {
      s = 1.70158;
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack(t, b, c, d, s) {
    if (s === void 0) {
      s = 1.70158;
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack(t, b, c, d, s) {
    if (s === void 0) {
      s = 1.70158;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    } else {
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    }
  },
  easeInBounce(t, b, c, d) {
    var v;
    v = Easing.easeOutBounce(d - t, 0, c, d);
    return c - v + b;
  },
  easeOutBounce(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  },
  easeInOutBounce(t, b, c, d) {
    var v;
    if (t < d / 2) {
      v = Easing.easeInBounce(t * 2, 0, c, d);
      return v * 0.5 + b;
    } else {
      v = Easing.easeOutBounce(t * 2 - d, 0, c, d);
      return v * 0.5 + c * 0.5 + b;
    }
  }
};