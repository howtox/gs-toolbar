/*global document, HTMLElement */
(function(document, $){

  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var template = doc.querySelector('template').innerHTML;

  var GsToolbarProto = Object.create(HTMLElement.prototype);

  GsToolbarProto.createdCallback = function(){
    console.log('createdCallback');
    this.innerHTML = template;
    this.$el = $(this);
  };

  GsToolbarProto.attachedCallback = function(){
    this.addEvents();
  };

  GsToolbarProto.attributeChangedCallback = function(){
    console.log('attributeChangedCallback');
  };

  GsToolbarProto.detachedCallback = function(){
    this.removeEvents();
  };

  var domain = 'http://da.howtox.com:';
  var urlCreate = domain + '3000/docker/containers/create/';

  GsToolbarProto.addEvents = function(){
    var that = this;

    this.$el.on('click', '.vm', function(){
      console.log('click .vm');
      var gitTag = that.$el.data('tag') && that.$el.data('tag').toLowerCase();
      var gitRepo = that.$el.data('repo') && that.$el.data('repo').toLowerCase();
      var cmd = that.$el.data('cmd') && that.$el.data('cmd').toLowerCase();

      $.post(urlCreate, {
          tag: gitTag,
          repo: gitRepo,
          cmd: cmd
        })
        .then(function(data){
          console.log('then', data);
          data = JSON.parse(data);

          var activeButtons = function(){
            that.$el.find('.editor').attr('href', domain + data.port);
            that.$el.find('.editor').css('color', 'green').css("font-weight","bold");
            that.$el.find('.browser').attr('href', domain + (parseInt(data.port,10)+1) );
            that.$el.find('.browser').css('color', 'green').css("font-weight","bold");
            that.$el.find('.tty').attr('href', domain + (parseInt(data.port,10)+2) );
            that.$el.find('.tty').css('color', 'green').css("font-weight","bold");
          };

          var barContainerWidth = that.$el.find('.progress').width();

          var progress = setInterval(function() {
            var $bar = that.$el.find('.progress-bar');

            if ($bar.width() >= barContainerWidth) {
                clearInterval(progress);
                $('.progress').removeClass('active');
                activeButtons();
            } else {
                $bar.width($bar.width() + barContainerWidth/10);
            }
          }, 300);

        })
        .fail(function(data){
          console.log('fail', data);
        });
    });
  };

  GsToolbarProto.removeEvents = function(){
    this.$el.off('click');
  };


  document.registerElement('gs-toolbar', {
    prototype: GsToolbarProto
  });

})(document, $);