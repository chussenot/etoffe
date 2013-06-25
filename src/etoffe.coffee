global = this

global.textile ?= {}
classes = global.textile

class EtoffeButton
  constructor: (id, display, tagStart, tagEnd, access, title, sve, open) ->

class EtoffeSeparator
  constructor: () ->

class Etoffe
  @buttons: []
  constructor: (canvas, view) ->
    return if !canvas
    toolbar = document.createElement("div")
    toolbar.id = "etoffe-toolbar-" + canvas
    toolbar.className = 'etoffe-toolbar'
    el = document.getElementById(canvas)
    el.parentNode.insertBefore(toolbar, el)
    

classes.EtoffeButton = EtoffeButton
classes.EtoffeSeparator = EtoffeSeparator
classes.Etoffe = Etoffe