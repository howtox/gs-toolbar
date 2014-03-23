/*global document, HTMLElement */
(function(document, $){

  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var template = doc.querySelector('template').innerHTML;

  var GsMailchimpProto = Object.create(HTMLElement.prototype);

  GsMailchimpProto.createdCallback = function(){
    console.log('createdCallback');
    this.innerHTML = template;
    this.$el = $(this);
  };

  GsMailchimpProto.attachedCallback = function(){
    this.addEvents();
  };

  GsMailchimpProto.attributeChangedCallback = function(){
    console.log('attributeChangedCallback');
  };

  GsMailchimpProto.detachedCallback = function(){
    this.removeEvents();
  };

  GsMailchimpProto.addEvents = function(){
  };

  GsMailchimpProto.removeEvents = function(){
  };


  document.registerElement('gs-mailchimp', {
    prototype: GsMailchimpProto
  });

})(document, $);