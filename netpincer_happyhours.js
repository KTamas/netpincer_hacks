function loadScript(url, callback) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.src = url;
  var done = false;
  script.onload = script.onreadystatechange = function() {
    if( !done && (!this.readyState || 
                  this.readyState == "loaded" || 
                  this.readyState == "complete") ) {
      done = true;
      callback();
      // Handle memory leak in IE
      script.onload = script.onreadystatechange = null;
      head.removeChild( script );
    }
  };
  head.appendChild(script);
}

loadScript("http://code.jquery.com/jquery-latest.js", function() {
  xpath = 'form:has(table) > table';
  jQuery(xpath).each(function(i) {
    if (jQuery(this).
        find('div[class="cat-logo"] > img').
        attr('src') != '/template/_content/happy_logo.gif') {
      jQuery(this).hide();
    }
  });
});
