(function() {
  var Etoffe, EtoffeButton, EtoffeSeparator, classes, global;

  global = this;

  if (global.textile == null) {
    global.textile = {};
  }

  classes = global.textile;

  EtoffeButton = (function() {
    function EtoffeButton(id, display, tagStart, tagEnd, access, title, sve, open) {
      var o;
      if (typeof id === "string") {
        this.id = id;
        this.display = display;
        this.tagStart = tagStart;
        this.tagEnd = tagEnd;
        this.access = access;
        this.title = title;
        this.sve = sve;
        this.open = open;
        this.standard = true;
      }
      if (typeof id === "object") {
        o = id;
        this.id = o.id;
        this.display = o.display;
        this.tagStart = o.tagStart;
        this.tagEnd = o.tagEnd;
        this.access = o.access;
        this.title = o.title;
        this.sve = o.sve;
        this.open = o.open;
        this.standard = true;
      }
    }

    return EtoffeButton;

  })();

  EtoffeSeparator = (function() {
    function EtoffeSeparator() {}

    return EtoffeSeparator;

  })();

  Etoffe = (function() {
    function Etoffe(canvas, view, buttons) {
      var button, edButtons, el, i, standardButtons, toolbar;
      if (!canvas) {
        return;
      }
      if (!buttons) {
        buttons = textile.defaultButtons;
      }
      toolbar = document.createElement("div");
      toolbar.id = "etoffe-toolbar-" + canvas;
      toolbar.className = 'etoffe-toolbar';
      el = document.getElementById(canvas);
      el.parentNode.insertBefore(toolbar, el);
      edButtons = [];
      edButtons = buttons;
      standardButtons = [];
      i = 0;
      while (i < edButtons.length) {
        button = this.prepareButton(edButtons[i]);
        if (view === "s") {
          if (edButtons[i].sve === "s") {
            toolbar.appendChild(button);
            standardButtons.push(button);
          }
        } else {
          if (typeof button === "string") {
            toolbar.innerHTML += button;
          } else {
            toolbar.appendChild(button);
            standardButtons.push(button);
          }
        }
        i++;
      }
      buttons = toolbar.getElementsByTagName("button");
      i = 0;
      while (i < buttons.length) {
        if (!buttons[i].onclick) {
          buttons[i].onclick = function() {
            return alert("click");
          };
        }
        buttons[i].tagStart = buttons[i].getAttribute("tagStart");
        buttons[i].tagEnd = buttons[i].getAttribute("tagEnd");
        buttons[i].open = buttons[i].getAttribute("open");
        buttons[i].textile_editor = this;
        buttons[i].canvas = canvas;
        i++;
      }
    }

    Etoffe.prototype.prepareButton = function(button) {
      var el, img;
      if (button.separator) {
        el = document.createElement("span");
        el.className = "ed_sep";
        el;
      }
      if (button.standard) {
        el = document.createElement("button");
        el.id = button.id;
        el.setAttribute("class", "standard");
        el.setAttribute("tagStart", button.tagStart);
        el.setAttribute("tagEnd", button.tagEnd);
        el.setAttribute("open", button.open);
        img = document.createElement("img");
        img.src = "assets/editor/" + button.display;
        el.appendChild(img);
      } else {
        button;
      }
      if (el) {
        el.accessKey = button.access;
        el.title = button.title;
      }
      return el;
    };

    return Etoffe;

  })();

  include("default");

  classes.EtoffeButton = EtoffeButton;

  classes.EtoffeSeparator = EtoffeSeparator;

  classes.Etoffe = Etoffe;

}).call(this);
