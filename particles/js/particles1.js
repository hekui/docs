"use strict";
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
    var b = this.array.length;
    var a = null;
    for (var c = 0; c < b; c++) {
      a = this.array[c];
      canvas.ctx.fillStyle = a.fillStyle;
      canvas.ctx.fillRect(a.x1, a.y1, 1, 1)
    }
  },
  _render: function () {
    canvas.ctx.clearRect(0, 0, canvas.w, canvas.h);
    var l = Particles.prototype.array;
    var len = l.length;
    var curr_particle = null;
    var cur_x, cur_y;
    var cur_time = 0,
      duration = 0,
      cur_delay = 0,
      j = 1,
      g = 1;
    for (var e = 0; e < len; e++) {
      curr_particle = l[e];
      if (curr_particle.count++ > curr_particle.delay) {
        canvas.ctx.fillStyle = curr_particle.fillStyle;
        cur_time = curr_particle.currTime;
        duration = curr_particle.duration;
        cur_delay = curr_particle.interval;
        curr_particle.ratioX !== 1 ? j = curr_particle.ratioX + Math.random() * 2 : 1;
        curr_particle.ratioY !== 1 ? g = curr_particle.ratioY + Math.random() * 2 : 1;
        if (l[len - 1].duration + l[len - 1].interval < l[len - 1].currTime / 2) {
          cancelAnimationFrame(requestId);
          Particles.prototype._draw();
          return
        } else {
          if (cur_time < duration + cur_delay) {
            if (cur_time >= cur_delay) {
              cur_x = window[curr_particle.ease]((cur_time - cur_delay) * j, curr_particle.x0, (curr_particle.x1 - curr_particle.x0) * j, duration);
              cur_y = window[curr_particle.ease]((cur_time - cur_delay) * g, curr_particle.y0, (curr_particle.y1 - curr_particle.y0) * g, duration);
              canvas.ctx.fillRect(cur_x, cur_y, 1, 1)
            }
          } else {
            canvas.ctx.fillRect(curr_particle.x1, curr_particle.y1, 1, 1)
          }
        }
        curr_particle.currTime += Math.random() + 0.5
      }
    }
    requestId = requestAnimationFrame(Particles.prototype._render)
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
var linear = function (e, a, g, f) {
    return g * e / f + a
  },
  easeInOutQuad = function (e, a, g, f) {
    e /= f / 2;
    if (e < 1) {
      return g / 2 * e * e + a
    }
    e--;
    return -g / 2 * (e * (e - 2) - 1) + a
  },
  easeOutQuad = function (e, a, g, f) {
    e /= f;
    return -g * e * (e - 2) + a
  },
  easeOutQuad = function (e, a, g, f) {
    e /= f;
    return -g * e * (e - 2) + a
  },
  easeInCubic = function (e, a, g, f) {
    e /= f;
    return g * e * e * e + a
  },
  easeOutCubic = function (e, a, g, f) {
    e /= f;
    e--;
    return g * (e * e * e + 1) + a
  },
  easeInOutCubic = function (e, a, g, f) {
    e /= f / 2;
    if (e < 1) {
      return g / 2 * e * e * e + a
    }
    e -= 2;
    return g / 2 * (e * e * e + 2) + a
  },
  easeInQuart = function (e, a, g, f) {
    e /= f;
    return g * e * e * e * e + a
  },
  easeOutQuart = function (e, a, g, f) {
    e /= f;
    e--;
    return -g * (e * e * e * e - 1) + a
  },
  easeInOutQuart = function (e, a, g, f) {
    e /= f / 2;
    if (e < 1) {
      return g / 2 * e * e * e * e + a
    }
    e -= 2;
    return -g / 2 * (e * e * e * e - 2) + a
  },
  easeInQuint = function (e, a, g, f) {
    e /= f;
    return g * e * e * e * e * e + a
  },
  easeOutQuint = function (e, a, g, f) {
    e /= f;
    e--;
    return g * (e * e * e * e * e + 1) + a
  },
  easeInOutQuint = function (e, a, g, f) {
    e /= f / 2;
    if (e < 1) {
      return g / 2 * e * e * e * e * e + a
    }
    e -= 2;
    return g / 2 * (e * e * e * e * e + 2) + a
  },
  easeInSine = function (e, a, g, f) {
    return -g * Math.cos(e / f * (Math.PI / 2)) + g + a
  },
  easeOutSine = function (e, a, g, f) {
    return g * Math.sin(e / f * (Math.PI / 2)) + a
  },
  easeInOutSine = function (e, a, g, f) {
    return -g / 2 * (Math.cos(Math.PI * e / f) - 1) + a
  },
  easeInExpo = function (e, a, g, f) {
    return g * Math.pow(2, 10 * (e / f - 1)) + a
  },
  easeOutExpo = function (e, a, g, f) {
    return g * (-Math.pow(2, -10 * e / f) + 1) + a
  },
  easeInOutExpo = function (e, a, g, f) {
    return g * (-Math.pow(2, -10 * e / f) + 1) + a
  },
  easeInCirc = function (e, a, g, f) {
    e /= f;
    return -g * (Math.sqrt(1 - e * e) - 1) + a
  },
  easeOutCirc = function (e, a, g, f) {
    e /= f;
    e--;
    return g * Math.sqrt(1 - e * e) + a
  },
  easeInOutCirc = function (e, a, g, f) {
    e /= f / 2;
    if (e < 1) {
      return -g / 2 * (Math.sqrt(1 - e * e) - 1) + a
    }
    e -= 2;
    return g / 2 * (Math.sqrt(1 - e * e) + 1) + a
  },
  easeInOutElastic = function (g, e, k, j, f, i) {
    if (g == 0) {
      return e
    }
    if ((g /= j / 2) == 2) {
      return e + k
    }
    if (!i) {
      i = j * (0.3 * 1.5)
    }
    if (!f || f < Math.abs(k)) {
      f = k;
      var h = i / 4
    } else {
      var h = i / (2 * Math.PI) * Math.asin(k / f)
    }
    if (g < 1) {
      return -0.5 * (f * Math.pow(2, 10 * (g -= 1)) * Math.sin((g * j - h) * (2 * Math.PI) / i)) + e
    }
    return f * Math.pow(2, -10 * (g -= 1)) * Math.sin((g * j - h) * (2 * Math.PI) / i) * 0.5 + k + e
  },
  easeInElastic = function (g, e, k, j, f, i) {
    if (g == 0) {
      return e
    }
    if ((g /= j) == 1) {
      return e + k
    }
    if (!i) {
      i = j * 0.3
    }
    if (!f || f < Math.abs(k)) {
      f = k;
      var h = i / 4
    } else {
      var h = i / (2 * Math.PI) * Math.asin(k / f)
    }
    return -(f * Math.pow(2, 10 * (g -= 1)) * Math.sin((g * j - h) * (2 * Math.PI) / i)) + e
  },
  easeOutElastic = function (g, e, k, j, f, i) {
    if (g == 0) {
      return e
    }
    if ((g /= j) == 1) {
      return e + k
    }
    if (!i) {
      i = j * 0.3
    }
    if (!f || f < Math.abs(k)) {
      f = k;
      var h = i / 4
    } else {
      var h = i / (2 * Math.PI) * Math.asin(k / f)
    }
    return (f * Math.pow(2, -10 * g) * Math.sin((g * j - h) * (2 * Math.PI) / i) + k + e)
  },
  easeInOutBack = function (e, a, h, g, f) {
    if (f == undefined) {
      f = 1.70158
    }
    if ((e /= g / 2) < 1) {
      return h / 2 * (e * e * (((f *= (1.525)) + 1) * e - f)) + a
    }
    return h / 2 * ((e -= 2) * e * (((f *= (1.525)) + 1) * e + f) + 2) + a
  },
  easeInBack = function (e, a, h, g, f) {
    if (f == undefined) {
      f = 1.70158
    }
    return h * (e /= g) * e * ((f + 1) * e - f) + a
  },
  easeOutBack = function (e, a, h, g, f) {
    if (f == undefined) {
      f = 1.70158
    }
    return h * ((e = e / g - 1) * e * ((f + 1) * e + f) + 1) + a
  };