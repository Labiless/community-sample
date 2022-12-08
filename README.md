# Webpack and Express Builder

Directory system:

<pre>
dist
|_pageName
    |_index.html
    |_pageName.bundle.js
    |_pageName.bundle.css
src
|_shared (file used in more than one page)
    |_js
    |_css
|_pageName (single page)
    |_index.js
    |_style.css
server
</pre>

## JS
You can improt js from any directory

## CSs 
you can import css from ay directory, but to use it you need to import it even inside index.js

## -test ignore
Every file that ends with -test. is ignored by git