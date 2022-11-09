let selectImg = document.querySelector(".select-img")
let inpfile = document.getElementById("inp-file")
let imgSlot = document.getElementById('img')
let filtersName = document.querySelectorAll('.fill')
let whichfilter = document.getElementById("which")
let range = document.getElementById('range')
let brightness = 100, contrast = 100, saturation = 100, hue = 0, opacity = 100
let parcent = document.getElementById('parcent')
let image = document.getElementById('img')
let selected = document.querySelector('.selected')
let rotationBtn = document.querySelectorAll('.btn')
let rotate = 0;
// let adjustCheck = document.getElementById('check')
let downloadbtn = document.querySelector('#download')
let sidescale = 1
let updownscale = 1
let previewImg = document.querySelector('.image-side img')

selectImg.addEventListener('click', () => {
  inpfile.click()

})






inpfile.addEventListener("change", (e) => {
  imgSlot.src = URL.createObjectURL(inpfile.files[0])
  selectImg.classList.add('selected')
})



Array.from(filtersName).forEach(e => {
  e.addEventListener('click', () => {
    Array.from(filtersName).forEach(a => {
      a.classList.remove("activeFilter")
    })
    e.classList.add("activeFilter")
    whichfilter.innerText = e.innerText
    let activeFilter = document.querySelector('.activeFilter')
    if (activeFilter.id == 'bright') {
      range.value = brightness
      parcent.innerText = `${brightness}%`
    }
    else if (activeFilter.id == 'contrast') {
      range.value = contrast
      parcent.innerText = `${contrast}%`
    }
    else if (activeFilter.id == 'saturation') {
      range.value = saturation
      parcent.innerText = `${saturation}%`
    }
    else if (activeFilter.id == 'opacity') {
      range.value = opacity
      parcent.innerText = `${opacity}%`
    }
    else if (activeFilter.id == 'hue') {
      range.value = hue
      parcent.innerText = `${hue}%`
    }
    else if (activeFilter.id == 'none') {
      range.value = 100
      brightness = 100, saturation = 100, opacity = 100, hue = 100,contrast = 100
      image.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) opacity(${opacity}%)`
      whichfilter.innerText = "None"

    }



  })


})

range.addEventListener('input', () => {
  let activeFilter = document.querySelector('.activeFilter')
  if (activeFilter) {
    if (activeFilter.id == 'bright') {
      brightness = range.value
      parcent.innerText = `${brightness}%`


    }
    else if (activeFilter.id == 'contrast') {
      contrast = range.value
      parcent.innerText = `${contrast}%`
    }
    else if (activeFilter.id == 'saturation') {
      saturation = range.value
      parcent.innerText = `${saturation}%`
    }
    else if (activeFilter.id == 'opacity') {
      opacity = range.value
      parcent.innerText = `${opacity}%`
    }
    else if (activeFilter.id == 'hue') {
      hue = range.value
      parcent.innerText = `${hue}%`
    
    }
    else if (activeFilter.id == 'none') {

    }
  }


  image.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) opacity(${opacity}%) hue-rotate(${hue}deg)`
})





Array.from(rotationBtn).forEach(e => {
  e.addEventListener('click', () => {
    Array.from(rotationBtn).forEach(a => {
      a.classList.remove('activeRotation')
    })

    e.classList.add('activeRotation')

    if (e.id == 'up') {
      rotate = rotate - 90
      image.style.transform = `rotate(${rotate}deg)`
    }
    else if (e.id == 'down') {
      rotate = rotate + 90
      image.style.transform = `rotate(${rotate}deg)`
    }
    else if (e.id == 'right') {
      if(sidescale ==1){
        sidescale = -1
      }else{
        sidescale = 1
      }
      image.style.scale = `${sidescale} ${updownscale}`
    }
    else if (e.id == 'left') {
      if(updownscale == 1){
        updownscale = -1
      }else{
        updownscale = 1
      }
      image.style.scale = `${sidescale} ${updownscale}`
    }
  })
  // let activeRotation = document.querySelector('.activeRotation')



})


downloadbtn.addEventListener('click',()=>{
let canvas = document.createElement('canvas')
let context = canvas.getContext('2d')
canvas.width = previewImg.naturalWidth
canvas.height = previewImg.naturalHeight
context.translate(canvas.width/2,canvas.height/2)
if(rotate!==0){

  context.rotate(rotate*Math.PI/180)
}
context.filter = image.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) opacity(${opacity}%) hue-rotate(${hue}deg)`
context.scale(sidescale, updownscale)
context.drawImage(previewImg,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height)
  document.body.appendChild(canvas)
  canvas.style.display = 'none'
  let link = document.createElement('a')
  link.href = canvas.toDataURL()
  link.download = "image.jpg"
  link.click()
})
