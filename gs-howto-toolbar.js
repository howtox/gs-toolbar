/*global document, HTMLElement */
(function(document, $){

  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var template = doc.querySelector('template').innerHTML;

  var GsHowtoToolbarProto = Object.create(HTMLElement.prototype);

  GsHowtoToolbarProto.createdCallback = function(){
    // console.log('createdCallback');
    this.innerHTML = template;
    this.$el = $(this);
  };

  GsHowtoToolbarProto.attachedCallback = function(){
    this.addEvents();
  };

  GsHowtoToolbarProto.attributeChangedCallback = function(){
    // console.log('attributeChangedCallback');
  };

  GsHowtoToolbarProto.detachedCallback = function(){
    this.removeEvents();
  };

  GsHowtoToolbarProto.addEvents = function(){
  };

  GsHowtoToolbarProto.removeEvents = function(){
  };


  document.registerElement('gs-howto-toolbar', {
    prototype: GsHowtoToolbarProto
  });

})(document, $);