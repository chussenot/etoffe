(function() {
  var Button, Editor, Separator, buttons, classes, conf, global;

  global = this;

  if (global.etoffe == null) {
    global.etoffe = {};
  }

  classes = global.etoffe;

  Button = (function() {
    function Button(id, display, tagStart, tagEnd, access, title, sve, open) {
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

    return Button;

  })();

  Separator = (function() {
    function Separator() {}

    return Separator;

  })();

  Editor = (function() {
    function Editor(canvas, view, buttons) {
      var button, edButtons, el, i, standardButtons, toolbar;
      if (!canvas) {
        return;
      }
      if (!buttons) {
        buttons = etoffe.defaultButtons;
      }
      toolbar = document.createElement("div");
      toolbar.id = "etoffe-toolbar-" + canvas;
      toolbar.className = 'etoffe-toolbar';
      el = document.getElementById(canvas);
      el.className = 'etoffe-editor';
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

    Editor.prototype.prepareButton = function(button) {
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

    return Editor;

  })();

  buttons = [];

  conf = {
    "buttons": [
      {
        "id": "ed_strong",
        "display": "bold.png",
        "tagStart": "*",
        "tagEnd": "*",
        "access": "b",
        "title": "Bold",
        "sve": "s"
      }, {
        "id": "ed_emphasis",
        "display": "italic.png",
        "tagStart": "_",
        "tagEnd": "_",
        "access": "i",
        "title": "Italicize",
        "sve": "s"
      }, {
        "id": "ed_underline",
        "display": "underline.png",
        "tagStart": "+",
        "tagEnd": "+",
        "access": "u",
        "title": "Underline",
        "sve": "s"
      }, {
        "id": "ed_strike",
        "display": "strikethrough.png",
        "tagStart": "-",
        "tagEnd": "-",
        "access": "s",
        "title": "Strikethrough",
        "sve": "s"
      }, {
        "id": "ed_ol",
        "display": "list_numbers.png",
        "tagStart": " # ",
        "tagEnd": "\n",
        "access": ",",
        "title": "Numbered List"
      }, {
        "id": "ed_ul",
        "display": "list_bullets.png",
        "tagStart": " * ",
        "tagEnd": "\n",
        "access": ".",
        "title": "Bulleted List"
      }, {
        "id": "ed_p",
        "display": "paragraph.png",
        "tagStart": "p",
        "tagEnd": "\n",
        "access": "p",
        "title": "Paragraph"
      }, {
        "id": "ed_h1",
        "display": "h1.png",
        "tagStart": "h1",
        "tagEnd": "\n",
        "access": "1",
        "title": "Header 1"
      }, {
        "id": "ed_h2",
        "display": "h2.png",
        "tagStart": "h2",
        "tagEnd": "\n",
        "access": "2",
        "title": "Header 2"
      }, {
        "id": "ed_h3",
        "display": "h3.png",
        "tagStart": "h3",
        "tagEnd": "\n",
        "access": "3",
        "title": "Header 3"
      }, {
        "id": "ed_h4",
        "display": "h4.png",
        "tagStart": "h4",
        "tagEnd": "\n",
        "access": "4",
        "title": "Header 4"
      }
    ]
  };

  _.each(conf.buttons, function(b) {
    return buttons.push(new Button(b));
  });

  classes.defaultButtons = buttons;

  classes.Button = Button;

  classes.Separator = Separator;

  classes.Editor = Editor;

}).call(this);
