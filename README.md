# This is posterDesign

JavaScript and JSON scripts to automate the process of designing on PhotoShop, potentially removing the need for a designer to manually design and export writeups.

[What writeup designs are we talking about?](https://www.instagram.com/worded.official)

## How does it work?

### The JSON Script
The JSON file contains details, such as, author name, title of the writeup, type, et cetera, about the writeups that need to be turned into posters.

```markdown
{
        "id": 1,
        "type": 1,
        "title": "This is a shortie title",
        "writer": "John Doe",
        "content": "Lorem ipsum dolor sit amet, \n\rconsectetur adipiscing elit."
}
```

### The JSX Script
The JSX script, id est, scriptPS.jsx, does 3 main things:

#### Reads the JSON File
Please note: This is done using [json2.js](https://github.com/douglascrockford/JSON-js), and a few hacks in the function processWriteup.

#### Plugs in data from the JSON file to the selected layers
Done in the function processWriteup where, using a bunch of if-else statements, the proper layers and layer groups are selected, edited, and made visible.

#### Centers the content text, and saves the file as JPEG
The function centerTextLayer centers the content layer of the selected layer group, relative to the background of the canvas. After that's done, it proceeds on to save the entire thing to a JPEG image file, quality's a 10, just like my crush, and is done in the function saveJPEG.

## Know More 

Who are we, and why are you reading this? We have the answer to the former, and it's [write here.](http://www.worded.xyz/)
