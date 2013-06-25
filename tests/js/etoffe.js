(function() {
  var Etoffe, EtoffeButton, EtoffeSeparator, classes, global;

  global = this;

  if (global.textile == null) {
    global.textile = {};
  }

  classes = global.textile;

  EtoffeButton = (function() {
    function EtoffeButton(id, display, tagStart, tagEnd, access, title, sve, open) {}

    return EtoffeButton;

  })();

  EtoffeSeparator = (function() {
    function EtoffeSeparator() {}

    return EtoffeSeparator;

  })();

  Etoffe = (function() {
    Etoffe.buttons = [];

    function Etoffe(canvas, view) {
      var el, toolbar;
      if (!canvas) {
        return;
      }
      toolbar = document.createElement("div");
      toolbar.id = "etoffe-toolbar-" + canvas;
      toolbar.className = 'etoffe-toolbar';
      el = document.getElementById(canvas);
      el.parentNode.insertBefore(toolbar, el);
    }

    return Etoffe;

  })();

  classes.EtoffeButton = EtoffeButton;

  classes.EtoffeSeparator = EtoffeSeparator;

  classes.Etoffe = Etoffe;

}).call(this);
