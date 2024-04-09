
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



const drawBar = (canvas, ratio, value, max) => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width-1;
  const height = canvas.height;

  //空のバーを描画
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = `#000`;
  ctx.fillStyle = `#dfdfdf`;
  ctx.roundRect(width-width*0.98, height-height*0.96, width*0.98, height*0.86, height/2-1);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

  if (ratio == 0) { return; }

  //現在値を示すバーの描画
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = `#000`;
  ctx.fillStyle = `#00ab60`;
  ctx.roundRect(width-width*0.98, height-height*0.96, (width*ratio-1)*0.98, height*0.86, height/2-1);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

  //最大値と現在値を示す数値の描画
  ctx.lineWidth = 1;
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${height*0.7}px sans-serif`;
  ctx.textBaseline = "top";
  ctx.strokeStyle = "#000"
  ctx.strokeText(`${value}/${max}`, width-width*0.96, height*0.2, width*0.8);
  ctx.fillText(`${value}/${max}`, width-width*0.96, height*0.2, width*0.8);

};


const canvasCorrection = (canvas, w, h) => {
  //参考： https://developer.mozilla.org/ja/docs/Web/API/Window/devicePixelRatio
  const ctx = canvas.getContext("2d");
  //表示サイズを設定
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  // メモリ上における実際のサイズを設定
  const scale = window.devicePixelRatio;
  canvas.width = Math.floor(w*scale);
  canvas.height = Math.floor(h*scale);

  // css上のピクセル数を前提としているシステムに合わせる
  //ctx.scale(scale, scale);

};

const resize = (canvas, w, h) => {
  canvasCorrection(canvas, w, h);
};

const allGaugesDraw = () => {
  gauges.filter((el) => el !== undefined).forEach((el, i) => {
    const min = 0;
    const max = el.dataset.max;
    const value = el.dataset.value;
    const ratio = ((max-min) != 0) ? value / (max - min) : 0;
    // div.gaugeにcanvas要素を挿入
    const barCanvas = document.createElement("canvas");
    const barContent = document.createTextNode(`${value} / ${max}`);
    barCanvas.classList.add('bar');
    barCanvas.appendChild(barContent);
    el.append(barCanvas);
    const bar = el.querySelector("canvas.bar");

    //canvasのサイズを親要素と同じにする
    resize(bar, el.offsetWidth, el.offsetHeight);
    drawBar(bar, ratio, value, max);

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
