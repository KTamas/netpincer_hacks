function loadScript(url, callback)
{
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.src = url;

        // Attach handlers for all browsers
        var done = false;
        script.onload = script.onreadystatechange = function()
        {
                if( !done && ( !this.readyState 
                                        || this.readyState == "loaded" 
                                        || this.readyState == "complete") )
                {
                        done = true;

                        // Continue your code
                        callback();

                        // Handle memory leak in IE
                        script.onload = script.onreadystatechange = null;
                        head.removeChild( script );
                }
        };

        head.appendChild(script);
}


// Usage: 
// This code loads jQuery and executes some code when jQuery is loaded
loadScript("http://code.jquery.com/jquery-latest.js", function()
{
// a <table>-ok, es a szallitasi idok, meg az id-k hogy menjenek a szurok
var tables=[], d_times=[], ids=[];

// alap xpath a szallitokhoz
base = 'form:has(table) > table';
// kiszedjuk a szallitasi idoket, es a table-oket
jQuery(base).each(function(i) {
  // fucking seriously, beagyazott <script>-ekkel kiirni a domba kepeket, 2009ben vagyunk basszameg
  tables[i] = jQuery(this).html().replace(/\<script\>[\s\S]+?\<\/script\>/g, '');
  d_times[i] = parseInt(jQuery(this).find('tbody > tr > td > table > tbody > tr > td > a > b').html().replace(/.*?\(([\d]+) perc\)/,'$1'));
  ids[i] = jQuery(this).attr('id');
  jQuery(this).html('abcdef');
});

// rendezes
for (i = 0;i < (tables.length-1); i++) {
  for (j = i+1; j < tables.length; j++) {
    if (d_times[j] < d_times[i]) {
      tmp = tables[i]; tables[i] = tables[j]; tables[j] = tmp;
      tmp2 = d_times[i]; d_times[i] = d_times[j]; d_times[j] = tmp2;
      tmp3 = ids[i]; ids[i] = ids[j]; ids[j] = tmp3;
    }
  }
}

// visszarak!
jQuery(base).each(function(i){
  jQuery(this).replaceWith('<table id="' + ids[i] + '" class="cat-table" cellspacing="0">' + tables[i] + '</table>');
});

});
