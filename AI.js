load(...toObj(`  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous" id="custom_js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js" crossorigin="anonymous" id="custom_js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossorigin="anonymous" id="custom_js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js" crossorigin="anonymous" id="custom_js"></script>

  <style>
    video {
      display: none;
    }

    #mouse123 {
      --bg: green;
      --x: 0;
      --y: 0;
      position: absolute;
      z-index: 9999;
      top: var(--y);
      right: var(--x);
      width: 30px;
      height: 30px;
      border-radius: 100%;
      background-color: var(--bg);
      font-family: Arial;
      font-size: 20px;
    }
  </style>
  <video class="input_video"></video>
  <crusor id="mouse123"></crusor>
  <script type="module" id="custom_js">
let temp1 = document.querySelector("chess-board#board-vs-personalities")
let temp6 = {
  "altKey": false,
  "altitudeAngle": 1.5707963267948966,
  "azimuthAngle": 0,
  "bubbles": true,
  "button": 0,
  "buttons": 1,
  "cancelBubble": false,
  "cancelable": true,
  "clientX": 43.333335876464844,
  "clientY": 105.55555725097656,
  "composed": true,
  "ctrlKey": false,
  "defaultPrevented": false,
  "detail": 0,
  "eventPhase": 0,
  "height": 1,
  "isPrimary": true,
  "layerX": 1,
  "layerY": -1,
  "metaKey": false,
  "movementX": 0,
  "movementY": 0,
  "offsetX": 1.5625001192092896,
  "offsetY": -0.4340277910232544,
  "pageX": 43.333335876464844,
  "pageY": 105.55555725097656,
  "pointerId": 1,
  "pointerType": "mouse",
  "pressure": 0.5,
  "returnValue": true,
  "screenX": 39,
  "screenY": 198,
  "shiftKey": false,
  "tangentialPressure": 0,
  "tiltX": 0,
  "tiltY": 0,
  "timeStamp": 255727.39999997616,
  "twist": 0,
  "type": "pointerdown",
  "which": 1,
  "width": 1,
  "x": 43.333335876464844,
  "y": 105.55555725097656,
  "isTrusted": true
}
let temp2 = [
  "altKey",
  "altitudeAngle",
  "azimuthAngle",
  "bubbles",
  "button",
  "buttons",
  "cancelBubble",
  "cancelable",
  "clientX",
  "clientY",
  "composed",
  "ctrlKey",
  "currentTarget",
  "defaultPrevented",
  "detail",
  "eventPhase",
  "fromElement",
  "height",
  "isPrimary",
  "layerX",
  "layerY",
  "metaKey",
  "movementX",
  "movementY",
  "offsetX",
  "offsetY",
  "pageX",
  "pageY",
  "pointerId",
  "pointerType",
  "pressure",
  "relatedTarget",
  "returnValue",
  "screenX",
  "screenY",
  "shiftKey",
  "sourceCapabilities",
  "srcElement",
  "tangentialPressure",
  "target",
  "tiltX",
  "tiltY",
  "timeStamp",
  "toElement",
  "twist",
  "type",
  "view",
  "which",
  "width",
  "x",
  "y",
  "isTrusted"
]

function copyEvent(object) {
  let newObj = {}

  for(let key of temp2)
      newObj[key] = object[key]

  return newObj
}

function move(from_p, to_p) {
  let ev1 = copyEvent(temp6)
  let ev2 = copyEvent(temp6)

  ev1.pageY += (from_p.y * 64) + 32
  ev1.clientY += (from_p.y * 64) + 32
  ev1.offsetY += (from_p.y * 64) + 32
  ev1.layerY += (from_p.y * 64) + 32
  ev1.y += (from_p.y * 64) + 32
  ev1.pageX += (from_p.x * 64) + 32
  ev1.clientX += (from_p.x * 64) + 32
  ev1.offsetX += (from_p.x * 64) + 32
  ev1.layerX += (from_p.x * 64) + 32
  ev1.x += (from_p.x * 64) + 32

  ev2.pageY += (to_p.y * 64) + 32
  ev2.clientY += (to_p.y * 64) + 32
  ev2.offsetY += (to_p.y * 64) + 32
  ev2.layerY += (to_p.y * 64) + 32
  ev2.y += (to_p.y * 64) + 32
  ev2.pageX += (to_p.x * 64) + 32
  ev2.clientX += (to_p.x * 64) + 32
  ev2.offsetX += (to_p.x * 64) + 32
  ev2.layerX += (to_p.x * 64) + 32
  ev2.x += (to_p.x * 64) + 32

  temp1.dispatchEvent(new PointerEvent("pointerdown" ,ev1))
  temp1.dispatchEvent(new PointerEvent("pointerdown" ,ev2))
  temp1.dispatchEvent(new PointerEvent("pointerup" ,ev2))
}

function UCItoMOVE(uci) {
  let fileToX = e => +e
  .replaceAll("a", "0")
  .replaceAll("b", "1")
  .replaceAll("c", "2")
  .replaceAll("d", "3")
  .replaceAll("e", "4")
  .replaceAll("f", "5")
  .replaceAll("g", "6")
  .replaceAll("h", "7")

  let res = [ {
      x: fileToX(uci[0]),
      y: 8 - (+uci[1])
  } , {
      x: fileToX(uci[2]),
      y: 8 - (+uci[3])
  }]

  return res
}

function play(m) {
  move(...UCItoMOVE(m))
}


    let mouse = {x:innerWidth, y:0}

    const crusor = document.querySelector("#mouse123")
    const videoElement = document.getElementsByClassName('input_video')[0];

    function calcMouthArea(a ,b) {
      let lines = []

      for(let join of b)
      lines.push([
        [a[join[0]]?.x ,a[join[0]]?.y],
        [a[join[1]]?.x ,a[join[1]]?.y]
      ])

      let Ypoints = lines.reduce((x,y) => [...x, y[0][1], y[1][1]] ,[])

      return Math.max(0, Math.max(...Ypoints) - Math.min(...Ypoints))
    }

    function getMouthCenter(a, b) {
      let lines = []

      for(let join of b)
      lines.push([
        [a[join[0]]?.x ,a[join[0]]?.y],
        [a[join[1]]?.x ,a[join[1]]?.y]
      ])

      let Ypoints = lines.reduce((x,y) => [...x, y[0][1], y[1][1]] ,[])
      let Xpoints = lines.reduce((x,y) => [...x, y[0][0], y[1][0]] ,[])

      let center = [
        (( Math.max(...Xpoints) - Math.min(...Xpoints) ) / 2) + Math.min(...Xpoints),
        (( Math.max(...Ypoints) - Math.min(...Ypoints) ) / 2) + Math.min(...Ypoints)
      ]

      return center
    }

    let first = true
    FACEMESH_LIPS = [
    [
        78,
        95
    ],
    [
        95,
        88
    ],
    [
        88,
        178
    ],
    [
        178,
        87
    ],
    [
        87,
        14
    ],
    [
        14,
        317
    ],
    [
        317,
        402
    ],
    [
        402,
        318
    ],
    [
        318,
        324
    ],
    [
        324,
        308
    ],
    [
        78,
        191
    ],
    [
        191,
        80
    ],
    [
        80,
        81
    ],
    [
        81,
        82
    ],
    [
        82,
        13
    ],
    [
        13,
        312
    ],
    [
        312,
        311
    ],
    [
        311,
        310
    ],
    [
        310,
        415
    ],
    [
        415,
        308
    ]
]

    let uci = ""
    function onResults(results) {
      if(!results.multiFaceLandmarks)
      return ;

      let face = results.multiFaceLandmarks[0]

      if(!face) return

      let MousePos = getMouthCenter(face, FACEMESH_LIPS)
      let area = calcMouthArea(face, FACEMESH_LIPS)

      crusor.style.setProperty("--x", \`\${MousePos[0] * innerWidth}px\`)
      crusor.style.setProperty("--y", \`\${MousePos[1] * innerHeight}px\`)
      crusor.style.setProperty("--bg", area * 100 > 4.5 ? "blue" : "red")

      mouse.x = innerWidth - (MousePos[0] * innerWidth)
      mouse.y = MousePos[1] * innerHeight

      let file = ["a", "b", "c", "d", "e", "f", "g", "h"]
      [Math.min(Math.floor((Math.max((mouse.x - 32) - temp6.x, 0)) / 64.4444), 7)]

      let rank = Math.min(8, Math.max(9 - (Math.floor(Math.max(mouse.y - temp6.y, 0) / 64.4444) + 1), 1))

      if(area * 100 > 4.5 && uci == "")
      uci += file + rank

      if(area * 100 < 4.5 && uci.length == 2)
      uci += file + rank

      if(uci.length == 4) {
        play(uci)
        console.log(uci)

        uci = ""
      }
    }

    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return \`https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/\${file}\`;
      }
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    faceMesh.onResults(onResults);

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await faceMesh.send({ image: videoElement });
      },
      width: innerWidth,
      height: innerHeight
    });
    camera.start();
  </script>`))

function load(...elements) {
    for(let el of elements) {
        let node = document.createElement(el.tag)

        for(let [property, value] of Object.entries(el.attr))
            node[property] = value;

        (el.parent || document.body).append(node)
    }
}

function toObj(html) {
    let parentNode = document.createElement("div")

    parentNode.innerHTML = html

    let res = []

    parentNode.childNodes.forEach(node => {
        let {id, style, innerHTML, src} = node
        let attr = {}

        if(id) attr.id = id
        if(src) attr.src = src
        if(node.classList?.length) attr.classList = node.classList
        if(innerHTML) attr.innerHTML = innerHTML

        res.push({ attr, tag: node.tagName })
    })

    return res
}



async function run() {
    let code = ""
    for(let node of document.querySelectorAll("#custom_js")) {
        if(node.src) {
            let xml = await fetch(node.src)
            let text = await xml.text()
    
            code += text
        } else {
            code += node.innerHTML
        }
    }

    eval(code)
}
