requirejs.config({
    baseUrl: '../components/',
    paths: {
        jquery: 'jquery/jquery',
        underscore: 'underscore/underscore',
        markdown: 'markdown/lib/markdown',
        etoffe: '../tests/js/etoffe'
    }
});

requirejs(['jquery','underscore','markdown','etoffe'],
function () {
  var etf = new etoffe.Editor('editor1');
});

