(function() {
  fabric.Object.prototype.transparentCorners = false;
  var $ = function(id){return document.getElementById(id)};

  function applyFilter(index, filter) {
    var obj = canvas.getActiveObject();
    obj.filters[index] = filter;
    obj.applyFilters(canvas.renderAll.bind(canvas));
  }

  function applyFilterValue(index, prop, value) {
    var obj = canvas.getActiveObject();
    if (obj.filters[index]) {
      obj.filters[index][prop] = value;
      obj.applyFilters(canvas.renderAll.bind(canvas));
    }
  }

  fabric.Object.prototype.padding = 5;
  fabric.Object.prototype.transparentCorners = false;

  var canvas = this.__canvas = new fabric.Canvas('c'),
      f = fabric.Image.filters;

  fabric.Image.fromURL('bg.jpg', function(img) {
    canvas.backgroundImage = img;
    canvas.backgroundImage.width = 600;
    canvas.backgroundImage.height = 600;
    canvas.renderAll.bind(canvas)  
  });


  canvas.on({
    'object:selected': function() {
      fabric.util.toArray(document.getElementsByTagName('input'))
                          .forEach(function(el){ el.disabled = false; })

      var filters = ['grayscale', 'invert', 'remove-white', 'sepia', 'sepia2',
                      'brightness', 'noise', 'gradient-transparency', 'pixelate',
                      'blur', 'sharpen', 'emboss', 'tint', 'multiply', 'blend'];

      for (var i = 0; i < filters.length; i++) {
        $(filters[i]).checked = !!canvas.getActiveObject().filters[i];
      }
    },
    'selection:cleared': function() {
      fabric.util.toArray(document.getElementsByTagName('input'))
                          .forEach(function(el){ el.disabled = true; })
    }
  });

  fabric.Image.fromURL('logo.jpg', function(img) {
    var oImg = img.set({ left: 50, top: 100, angle: -15 }).scale(0.9);
    canvas.add(oImg).renderAll();
    canvas.setActiveObject(oImg);
  });

  $('grayscale').onclick = function() {
    applyFilter(0, this.checked && new f.Grayscale());
  };
  $('invert').onclick = function() {
    applyFilter(1, this.checked && new f.Invert());
  };
  $('remove-white').onclick = function () {
    applyFilter(2, this.checked && new f.RemoveWhite({
      threshold: $('remove-white-threshold').value,
      distance: $('remove-white-distance').value
    }));
  };
  $('remove-white-threshold').onchange = function() {
    applyFilterValue(2, 'threshold', this.value);
  };
  $('remove-white-distance').onchange = function() {
    applyFilterValue(2, 'distance', this.value);
  };
  $('sepia').onclick = function() {
    applyFilter(3, this.checked && new f.Sepia());
  };
  $('sepia2').onclick = function() {
    applyFilter(4, this.checked && new f.Sepia2());
  };
  $('brightness').onclick = function () {
    applyFilter(5, this.checked && new f.Brightness({
      brightness: parseInt($('brightness-value').value, 10)
    }));
  };
  $('brightness-value').onchange = function() {
    applyFilterValue(5, 'brightness', parseInt(this.value, 10));
  };
  $('noise').onclick = function () {
    applyFilter(6, this.checked && new f.Noise({
      noise: parseInt($('noise-value').value, 10)
    }));
  };
  $('noise-value').onchange = function() {
    applyFilterValue(6, 'noise', parseInt(this.value, 10));
  };
  $('gradient-transparency').onclick = function () {
    applyFilter(7, this.checked && new f.GradientTransparency({
      threshold: parseInt($('gradient-transparency-value').value, 10)
    }));
  };
  $('gradient-transparency-value').onchange = function() {
    applyFilterValue(7, 'threshold', parseInt(this.value, 10));
  };
  $('pixelate').onclick = function() {
    applyFilter(8, this.checked && new f.Pixelate({
      blocksize: parseInt($('pixelate-value').value, 10)
    }));
  };
  $('pixelate-value').onchange = function() {
    applyFilterValue(8, 'blocksize', parseInt(this.value, 10));
  };
  $('blur').onclick = function() {
    applyFilter(9, this.checked && new f.Convolute({
      matrix: [ 1/9, 1/9, 1/9,
                1/9, 1/9, 1/9,
                1/9, 1/9, 1/9 ]
    }));
  };
  $('sharpen').onclick = function() {
    applyFilter(10, this.checked && new f.Convolute({
      matrix: [  0, -1,  0,
                -1,  5, -1,
                 0, -1,  0 ]
    }));
  };
  $('emboss').onclick = function() {
    applyFilter(11, this.checked && new f.Convolute({
      matrix: [ 1,   1,  1,
                1, 0.7, -1,
               -1,  -1, -1 ]
    }));
  };
  $('tint').onclick = function() {
    applyFilter(12, this.checked && new f.Tint({
      color: document.getElementById('tint-color').value,
      opacity: parseFloat(document.getElementById('tint-opacity').value)
    }));
  };
  $('tint-color').onchange = function() {
    applyFilterValue(12, 'color', this.value);
  };
  $('tint-opacity').onchange = function() {
    applyFilterValue(12, 'opacity', parseFloat(this.value));
  };
  $('multiply').onclick = function() {
    applyFilter(13, this.checked && new f.Multiply({
      color: document.getElementById('multiply-color').value
    }));
  };
  $('multiply-color').onchange = function() {
    applyFilterValue(13, 'color', this.value);
  };
  
  $('blend').onclick= function() { 
    applyFilter(14, this.checked && new f.Blend({
      color: document.getElementById('blend-color').value,
      mode: document.getElementById('blend-mode').value
    }));
  };
 
  $('blend-mode').onchange = function() {
    applyFilterValue(14, 'mode', this.value);
  };
 
  $('blend-color').onchange = function() {
    applyFilterValue(14, 'color', this.value);
  };
})();