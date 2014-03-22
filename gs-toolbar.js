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

  var domain = 'http://192.241.231.60:';
  var urlCreate = domain + '3000/docker/containers/create/';

  GsToolbarProto.addEvents = function(){
    this.$el.on('click', function(event){
      var $target = $(event.target);
      var that = this;
      if($target.hasClass('vm')){
        var gitTag = $target.closest('.toolbar').data('tag');
        var gitRepo = $target.closest('.toolbar').data('repo');
        var cmd = $target.closest('.toolbar').data('cmd');

        $.post(urlCreate, {
            tag: gitTag,
            repo: gitRepo,
            cmd: cmd
          })
          .then(function(data){
            console.log('then', data);
            data = JSON.parse(data);

            var activeButtons = function(){
              $(that).find('.editor').attr('href', domain + data.port);
              $(that).find('.editor').css('color', 'green').css("font-weight","bold");
              $(that).find('.browser').attr('href', domain + (parseInt(data.port,10)+1) + '/app/index.html' );
              $(that).find('.browser').css('color', 'green').css("font-weight","bold");
              //super hacky right now
              $(that).find('.browser-dir').attr('href', domain + (parseInt(data.port,10)+1) );
              $(that).find('.browser-dir').css('color', 'green').css("font-weight","bold");
              $(that).find('.tty').attr('href', domain + (parseInt(data.port,10)+2) );
              $(that).find('.tty').css('color', 'green').css("font-weight","bold");
            };

            var barContainerWidth = $(that).find('.progress').width();

            var progress = setInterval(function() {
              var $bar = $(that).find('.progress-bar');

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
        }

    });
  };

  GsToolbarProto.removeEvents = function(){
    this.$el.off('click');
  };


  document.registerElement('gs-toolbar', {
    prototype: GsToolbarProto
  });

})(document, $);