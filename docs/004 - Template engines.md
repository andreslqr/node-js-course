# Template engines 

The architecture of Express.js offers a plug-in feature for template engines, allowing use any template engine such as 
- [Pug](https://pugjs.org/)
- [Handlebars](https://handlebarsjs.com/)
- [Embedded JavaScript(EJS)](https://ejs.co/)

These engines has features but also has philosophies and limits


## Pug

Pug is a minimal template engine base on indentation an some kind of tags

```bash
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title #{metaTitle}
        script(src="https://cdn.tailwindcss.com")
        link(rel="stylesheet", href="/css/app.css")
        block styles
    body 
        header.shadow.bg-indigo-600.text-white
            nav.h-16.mx-auto.px-5.flex.items-center.justify-center
                ul.flex.items-center.gap-5
                    li 
                        a(href="/" class="hover:text-cyan-500 transition-colors", class=(path == "/" ? 'text-cyan-600' : "")) Shop
                    li 
                        a(href="/admin/add-product" class="hover:text-cyan-500 transition-colors", class=(path == "/admin/add-product" ? 'text-cyan-600' : "")) Add Product
        main 
            .container.mx-auto
                block content

```

allows make js condition support

### Express configuration
```js
const express = require('express')

const app = express()

app.set('view engine', 'pug')
```

## Handlebars 

Is a simple templating language, doesn't support js expressions

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        {{ metaTitle }}
    </title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/css/app.css">
</head>
<body>
    <header class="shadow bg-indigo-600 text-white">
        <nav class="h-16 mx-auto px-5 flex items-center justify-center">
            <ul class="flex items-center gap-5">
                <li>
                    <a href="/" class="hover:text-cyan-500 transition-colors">Shop</a>
                </li>
                <li>
                    <a href="/admin/add-product" class="hover:text-cyan-500 transition-colors">Add Product</a>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <div class="container mx-auto">
            {{{body}}}

        </div>
    </main>
</body>
</html>
```

### Express configuration

Handlebars doesn't has an easy config for Express.js.

```js
const express = require('express')
const { create } = require('express-handlebars')

const app = express()

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'app'
})

app.engine('.hbs', hbs.engine)

app.set('view engine', '.hbs')
```

## Embeedded Javascript (EJS)

EJS is a simple templating language that lets you generate HTML markup with plain JavaScript, doesn't support layouts, includes instead.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <%- include('includes/head'); -%>
</head>
<body>
    <%- include('includes/header'); -%>
    <main>
        <div class="container mx-auto">
            <div>
                <% if(products.length > 0) { %>
                    <ul class="border border-gray-200 rounded overflow-hidden shadow-md">
                        <% for(let product of products) { %>
                            <li class="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                                <%= product.title %>
                            </li>
                        <% } %>
                    </ul>
                <% } else {%>
                    <h1>
                        No products
                    </h1>
                <% } %>
            </div>
            

        </div>
    </main>
     <%- include('includes/footer'); -%>
</body>
</html>
```

### Express configuration
```js
const express = require('express')

const app = express()

app.set('view engine', 'ejs')
```