
// NodeListではfilterが使えないのでArrayに変換
const gauges = [].map.call(document.querySelectorAll(".status-view .gauge"), (el) => {
  return el
});

let initial_width = window.innerWidth;

const roundBar = (ctx, x, y, w, h, r, stroke_color, fill_color) => {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = `${stroke_color}`;
  ctx.fillStyle = `${fill_color}`;
  ctx.beginPath();
  ctx.roundRect(x+(w-w*0.98), y+2, w*0.98, h*0.86, r);
  ctx.stroke();
  ctx.fill();
};

const drawBackground = (canvas) => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width-1;
  const height = canvas.height;
  //roundBar(ctx, 0, 0, width, canvas.height, canvas.height/2-1, "#000", "#efefef");
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = `#000`;
  ctx.fillStyle = `#dfdfdf`;
  ctx.roundRect(width-width*0.98, height-height*0.96, width*0.98, height*0.86, height/2-1);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

};

const drawBar = (canvas, ratio) => {
  if (ratio == 0) { return; }
  const ctx = canvas.getContext("2d");
  const width = canvas.width-1;
  const height = canvas.height;
  //roundBar(ctx, 0, 0, (width-1)*ratio, canvas.height, canvas.height/2-1, "#000", "#00ab60");
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = `#000`;
  ctx.fillStyle = `#00ab60`;
  ctx.roundRect(width-width*0.98, height-height*0.96, (width*ratio-1)*0.98, height*0.86, height/2-1);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};

const drawStatus = (canvas, value, max) => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width-1;
  const height = canvas.height;
  ctx.lineWidth = 1;
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${height*0.7}px sans-serif`;
  ctx.textBaseline = "alphabetic";
  ctx.strokeStyle = "#000"
  ctx.fillText(`${value}/${max}`, width-width*0.96, height*0.72, width*0.8);
};

const resize = (canvas, w, h) => {
  canvas.width = w;
  canvas.height = h;
};

const allGaugesDraw = () => {
  gauges.filter((el) => el !== undefined).forEach((el, i) => {
    const min = 0;
    const max = el.dataset.max;
    const value = el.dataset.value;
    const ratio = ((max-min) != 0) ? value / (max - min) : 0;
    // div.gaugeにcanvas要素を挿入
    const backgroundCanvas = document.createElement("canvas");
    backgroundCanvas.classList.add('background');
    el.append(backgroundCanvas);
    const background = el.querySelector("canvas.background");

    const barCanvas = document.createElement("canvas");
    barCanvas.classList.add('bar');
    el.append(barCanvas);
    const bar = el.querySelector("canvas.bar");


    const statusCanvas = document.createElement("canvas");
    const statusContent = document.createTextNode(`${value} / ${max}`);
    statusCanvas.classList.add('status');
    statusCanvas.appendChild(statusContent);
    el.append(statusCanvas);
    const status = el.querySelector("canvas.status");

    //canvasのサイズを親要素と同じにする
    resize(background, el.offsetWidth, el.offsetHeight);
    drawBackground(background);
    resize(bar, el.offsetWidth, el.offsetHeight);
    drawBar(bar, ratio);
    resize(status, el.offsetWidth, el.offsetHeight);
    drawStatus(status, value, max);
  });
};

window.addEventListener('load', () => {
  allGaugesDraw();
});

window.addEventListener('resize', () => {
  if (initial_width === window.innerWidth) return;
  initial_width = window.innerWidth;
  allGaugesDraw();
});
