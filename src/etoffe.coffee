global = this

global.etoffe ?= {}
classes = global.etoffe

class Button
  constructor: (id, display, tagStart, tagEnd, access, title, sve, open) ->
    if typeof id is "string"
      @id = id                # used to name the toolbar button
      @display = display      # label on button
      @tagStart = tagStart    # open tag
      @tagEnd = tagEnd        # close tag
      @access = access        # set to -1 if tag does not need to be closed
      @title = title          # sets the title attribute of the button to give 'tool tips'
      @sve = sve              # sve = simple vs. extended. add an 's' to make it show up in the simple toolbar
      @open = open            # set to -1 if tag does not need to be closed
      @standard = true        # this is a standard button
    if typeof id is "object"
      o = id
      @id = o.id 
      @display = o.display 
      @tagStart = o.tagStart 
      @tagEnd = o.tagEnd 
      @access = o.access
      @title = o.title 
      @sve = o.sve 
      @open = o.open 
      @standard = true

class Separator
  constructor: () ->

class Editor
  constructor: (canvas, view, buttons) ->
    return if !canvas
    buttons = etoffe.defaultButtons if !buttons
    toolbar = document.createElement("div")
    toolbar.id = "etoffe-toolbar-" + canvas
    toolbar.className = 'etoffe-toolbar'
    el = document.getElementById(canvas)
    el.parentNode.insertBefore(toolbar, el)
    
    # attach buttons
    edButtons       = []
    edButtons       = buttons
    standardButtons = []
    i = 0
    while i < edButtons.length
      button = @prepareButton(edButtons[i])
      if view is "s"
        if edButtons[i].sve is "s"
          toolbar.appendChild button
          standardButtons.push button
      else
        if typeof button is "string"
          toolbar.innerHTML += button
        else
          toolbar.appendChild button
          standardButtons.push button
      i++
    # add buttons actions
    buttons = toolbar.getElementsByTagName("button")
    i = 0
    while i < buttons.length
      unless buttons[i].onclick
        buttons[i].onclick = ->
          alert "click"
      buttons[i].tagStart = buttons[i].getAttribute("tagStart")
      buttons[i].tagEnd   = buttons[i].getAttribute("tagEnd")
      buttons[i].open     = buttons[i].getAttribute("open")
      buttons[i].textile_editor = this
      buttons[i].canvas = canvas
      i++  

  prepareButton: (button) ->
    if button.separator
      el = document.createElement("span")
      el.className = "ed_sep"
      el
    if button.standard
      el = document.createElement("button")
      el.id = button.id
      el.setAttribute "class", "standard"
      el.setAttribute "tagStart", button.tagStart
      el.setAttribute "tagEnd", button.tagEnd
      el.setAttribute "open", button.open
      img = document.createElement("img")
      img.src = "assets/editor/" + button.display
      el.appendChild img
    else
      button
    if el
      el.accessKey = button.access
      el.title = button.title
    el

########

buttons = []
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
    },
    {
      "id": "ed_emphasis",
      "display": "italic.png",
      "tagStart": "_",
      "tagEnd": "_",
      "access": "i",
      "title": "Italicize",
      "sve": "s"
    },
    {
      "id": "ed_underline",
      "display": "underline.png",
      "tagStart": "+",
      "tagEnd": "+",
      "access": "u",
      "title": "Underline",
      "sve": "s"
    },
    {
      "id": "ed_strike",
      "display": "strikethrough.png",
      "tagStart": "-",
      "tagEnd": "-",
      "access": "s",
      "title": "Strikethrough",
      "sve": "s"
    },
    {
      "id": "ed_ol",
      "display": "list_numbers.png",
      "tagStart": " # ",
      "tagEnd": "\n",
      "access": ",",
      "title": "Numbered List"
    },
    {
      "id": "ed_ul",
      "display": "list_bullets.png",
      "tagStart": " * ",
      "tagEnd": "\n",
      "access": ".",
      "title": "Bulleted List"
    },
    {
      "id": "ed_p",
      "display": "paragraph.png",
      "tagStart": "p",
      "tagEnd": "\n",
      "access": "p",
      "title": "Paragraph"
    },
    {
      "id": "ed_h1",
      "display": "h1.png",
      "tagStart": "h1",
      "tagEnd": "\n",
      "access": "1",
      "title": "Header 1"
    },
    {
      "id": "ed_h2",
      "display": "h2.png",
      "tagStart": "h2",
      "tagEnd": "\n",
      "access": "2",
      "title": "Header 2"
    },
    {
      "id": "ed_h3",
      "display": "h3.png",
      "tagStart": "h3",
      "tagEnd": "\n",
      "access": "3",
      "title": "Header 3"
    },
    {
      "id": "ed_h4",
      "display": "h4.png",
      "tagStart": "h4",
      "tagEnd": "\n",
      "access": "4",
      "title": "Header 4"
    }
  ]
}

_.each conf.buttons, (b) ->
  buttons.push new Button(b)

#########

classes.defaultButtons  = buttons
classes.Button    = Button
classes.Separator = Separator
classes.Editor    = Editor