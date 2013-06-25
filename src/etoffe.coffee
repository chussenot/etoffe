global = this

global.textile ?= {}
classes = global.textile

class EtoffeButton
  constructor: (id, display, tagStart, tagEnd, access, title, sve, open) ->
    @id = id                # used to name the toolbar button
    @display = display      # label on button
    @tagStart = tagStart    # open tag
    @tagEnd = tagEnd        # close tag
    @access = access        # set to -1 if tag does not need to be closed
    @title = title          # sets the title attribute of the button to give 'tool tips'
    @sve = sve              # sve = simple vs. extended. add an 's' to make it show up in the simple toolbar
    @open = open            # set to -1 if tag does not need to be closed
    @standard = true        # this is a standard button

class EtoffeSeparator
  constructor: () ->

class Etoffe
  constructor: (canvas, view, buttons) ->
    return if !canvas
    buttons = textile.defaultButtons if !buttons
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
      return el
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
      return button
    # end if !custom
    el.accessKey = button.access
    el.title = button.title
    el

buttons = []
buttons.push new EtoffeButton("ed_strong", "bold.png", "*", "*", "b", "Bold", "s")
buttons.push new EtoffeButton("ed_emphasis", "italic.png", "_", "_", "i", "Italicize", "s")
buttons.push new EtoffeButton("ed_underline", "underline.png", "+", "+", "u", "Underline", "s")
buttons.push new EtoffeButton("ed_strike", "strikethrough.png", "-", "-", "s", "Strikethrough", "s")
buttons.push new EtoffeButton("ed_ol", "list_numbers.png", " # ", "\n", ",", "Numbered List")
buttons.push new EtoffeButton("ed_ul", "list_bullets.png", " * ", "\n", ".", "Bulleted List")
buttons.push new EtoffeButton("ed_p", "paragraph.png", "p", "\n", "p", "Paragraph")
buttons.push new EtoffeButton("ed_h1", "h1.png", "h1", "\n", "1", "Header 1")
buttons.push new EtoffeButton("ed_h2", "h2.png", "h2", "\n", "2", "Header 2")
buttons.push new EtoffeButton("ed_h3", "h3.png", "h3", "\n", "3", "Header 3")
buttons.push new EtoffeButton("ed_h4", "h4.png", "h4", "\n", "4", "Header 4") 
buttons.push '<button id="ed_strong" class="standard" tagstart="*" tagend="*" open="undefined" accesskey="b" title="Bold"><img src="assets/editor/bold.png"></button>'

classes.defaultButtons  = buttons
classes.EtoffeButton    = EtoffeButton
classes.EtoffeSeparator = EtoffeSeparator
classes.Etoffe          = Etoffe