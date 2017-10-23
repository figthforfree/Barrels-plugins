let Barrels = (function () {
  function _Barrels($ct) {
    this.$ct = $ct;
    this.rowList = [];
    this.baseHeight = 200;
    this.init();
    //this.LoadImg()
  }

  _Barrels.prototype = {
    init: function(){
      var _this = this
      this.$ct.parent().find('a').click(function(e){
        e.preventDefault()
        _this.LoadImg()
      })
    },
    LoadImg: function () {
      var _this = this
      var imgs = this.getImgUrls(30)
      for (var i = 0; i < imgs.length; i++) {
        var img = new Image()
        img.src = imgs[i]
        img.onload = function () {
          var imgInfo = {
            target: this,
            width: _this.baseHeight * this.width / this.height,
            height: _this.baseHeight
          }
          _this.render(imgInfo);
        }
      }
    },
    render: function (imgInfo) {
      var ctWidth = this.$ct.width();
      var rowWidth = 0;
      var newRowHeigth = 0;
      this.rowList.push(imgInfo)
      for (var i = 0; i < this.rowList.length; i++) {
        rowWidth += this.rowList[i].width;
      }
      if (rowWidth > ctWidth) {
        this.rowList.pop()
        rowWidth -= imgInfo.width
        newRowHeigth = this.baseHeight * (ctWidth - (this.rowList.length * 5) + 5) / rowWidth
        this.layout(newRowHeigth)
        this.rowList = [imgInfo]
      }
    },
    layout: function (height) {
      var $rowCt = $('<div class="item-ct clearfix"></div>')
      for (var i = 0; i < this.rowList.length; i++) {
        var $imgCt = $('<div class="item"></div>')
        $img = $(this.rowList[i].target);
        $img.height(height);
        $imgCt.append($img);
        $rowCt.append($imgCt)
      }
      this.$ct.append($rowCt)
    },
    getImgUrls: function (num) {
      var src = [];
      for (var i = 0; i < num; i++) {
        var randWidth = Math.floor(Math.random() * (500 - 150 + 1)) + 150;
        var randHeight = Math.floor(Math.random() * (500 - 150 + 1)) + 150;
        var _src = 'http://unsplash.it/' + randWidth + '/' + randHeight + '/';
        src.push(_src)
      }
      return src;
    }
  }
  return {
    init: function ($ct) {
      new _Barrels($ct)
    }
  }
})()
Barrels.init($('.wrap'))  