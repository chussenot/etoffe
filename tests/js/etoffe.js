(function() {
  var Etoffe, EtoffeButton, EtoffeSeparator, buttons, classes, global;

  global = this;

  if (global.textile == null) {
    global.textile = {};
  }

  classes = global.textile;

  EtoffeButton = (function() {
    function EtoffeButton(id, display, tagStart, tagEnd, access, title, sve, open) {
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
    }

    Etoffe.prototype.prepareButton = function(button) {
      var el, img;
      if (button.separator) {
        el = document.createElement("span");
        el.className = "ed_sep";
        return el;
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
        return button;
      }
      el.accessKey = button.access;
      el.title = button.title;
      return el;
    };

    return Etoffe;

  })();

  buttons = [];

  buttons.push(new EtoffeButton("ed_strong", "bold.png", "*", "*", "b", "Bold", "s"));

  buttons.push(new EtoffeButton("ed_emphasis", "italic.png", "_", "_", "i", "Italicize", "s"));

  buttons.push(new EtoffeButton("ed_underline", "underline.png", "+", "+", "u", "Underline", "s"));

  buttons.push(new EtoffeButton("ed_strike", "strikethrough.png", "-", "-", "s", "Strikethrough", "s"));

  buttons.push(new EtoffeButton("ed_ol", "list_numbers.png", " # ", "\n", ",", "Numbered List"));

  buttons.push(new EtoffeButton("ed_ul", "list_bullets.png", " * ", "\n", ".", "Bulleted List"));

  buttons.push(new EtoffeButton("ed_p", "paragraph.png", "p", "\n", "p", "Paragraph"));

  buttons.push(new EtoffeButton("ed_h1", "h1.png", "h1", "\n", "1", "Header 1"));

  buttons.push(new EtoffeButton("ed_h2", "h2.png", "h2", "\n", "2", "Header 2"));

  buttons.push(new EtoffeButton("ed_h3", "h3.png", "h3", "\n", "3", "Header 3"));

  buttons.push(new EtoffeButton("ed_h4", "h4.png", "h4", "\n", "4", "Header 4"));

  classes.defaultButtons = buttons;

  classes.EtoffeButton = EtoffeButton;

  classes.EtoffeSeparator = EtoffeSeparator;

  classes.Etoffe = Etoffe;

}).call(this);
