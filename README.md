# Redactor Speech API

This is a plugin for [RedactorJS WYSIWYG editor](http://redactorjs.com/), which allows the use of Webkit Speech API for writing texts.

## How to Use?

```
Add this to your HTML file after include of RedactorJS WYSIWYG editor:
<script type="text/javascript" src="{{ path to RedactorSpeechPlugin location in your project }}"></script>

Add this to your main Javascript file:
$('#content').redactor({
    plugins: ['speech']
});
```

## TODO

* [ ] Selection update
* [ ] Settings
* [ ] Translations
* [ ] Error handling
* [ ] Support other browsers (when the time comes)