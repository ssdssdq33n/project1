const menu=document.querySelector('.list')
setInterval(()=>{
    menu.classList.toggle('list2')
},500)
const tym=document.querySelector('.tym')
setInterval(()=>{
    tym.classList.toggle('tymbe')
},500)
const x=document.querySelector('.chon')
function showanh(){
   x.classList.add('turn')
}
const off=document.querySelector('.donglai')
function hideanh(){
    x.classList.add('turn2')
    setTimeout(()=>{
        x.classList.remove('turn')
        x.classList.remove('turn2')
    },600)
}
off.addEventListener('click',hideanh)
tym.addEventListener('click',showanh)
const playlist=document.querySelector('.playlist')
const xoa=document.querySelector('.xoabo')
function showmenu(){
    playlist.classList.add('momenu')
}
function hidemenu(){
    playlist.classList.add('turn2')
    setTimeout(()=>{
        playlist.classList.remove('momenu')
        playlist.classList.remove('turn2')
    },600)
}
menu.addEventListener('click',showmenu)
xoa.addEventListener('click',hidemenu)
const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)

const played=$('.tamgiac')
const paused=$('.nut2')
const progress=$('#progress')
// function showdung(){
//     paused.classList.add('active')
// }
// function hidedung(){
//     paused.classList.remove('active')
// }
// played.addEventListener('click',showdung)
// paused.addEventListener('click',hidedung)
const cd=$('.dia')
const tenbai=$('.chu')
const audio=$('#audio')
const nextbtn=$('.len')
const prevbtn=$('.xuong')
const randombtn=$('.random')
const repeat=$('.quay')
const anhnen=$('.chonanhnen')
console.log(anhnen)
const list=$('.lists')
const app={
    currentIndex:3,
    isRandom:false,
    isReapeat:false,
    songs:[
        {
            name:'Một người vì em',
            singger:'WEAN',
            img:'./assets/img/1nguoiviem.jpg',
            path:'./assets/audio/mot-nguoi-vi-em-midnight.mp3'
        },
        {
            name:'Badbye',
            singger:'WEAN',
            img:'./assets/img/badbye.jpg',
            path:'./assets/audio/badbye-official-lyrics-video.mp3'
        },
        {
            name:'Lavie',
            singger:'WEAN',
            img:'./assets/img/lavie.jpg',
            path:'./assets/audio/lavie-official-mv.mp3'
        },
        {
            name:'Cuz I love U',
            singger:'Da Lab',
            img:'./assets/img/cuziloveyou.jpg',
            path:'./assets/audio/jgkid-da-lab-x-mpakk-da-lab-official-mv.mp3'
        },
        {
            name:'Anh đã ổn hơn',
            singger:'MCK',
            img:'./assets/img/anhdaonhon.jpg',
            path:'./assets/audio/rpt-mck-99-the-album.mp3'
        },
        {
            name:'Love U So',
            singger:'WEAN',
            img:'./assets/img/love u so.jpg',
            path:'./assets/audio/love-u-so-ft-tung-official-mv.mp3'
        },
        {
            name:'I dont know',
            singger:'WEAN',
            img:'./assets/img/i dont know.jpg',
            path:'./assets/audio/i-dont-know-ft-naomi-taylorrighthere-youngwolf-official-mv.mp3'
        },
    ],
     
    render:function(){
        const hmtl=app.songs.map(function(song,index){
            return `
            <div class="box ${index=== app.currentIndex ? 'mau':''}" data-index="${index}">
                        <div class="anh" style="background-image: url('${song.img}');"></div>
                        <div class="nav">
                            <p class="tenbaihat">${song.name}</p>
                            <h2 class="ten">${song.singger}</h2>
                        </div>
                    </div>
            `
        })
        list.innerHTML=hmtl.join('')
    },
    handleEvent:function(){
       played.onclick= function(){
        cd_thumb.play()
        audio.play()
        paused.classList.add('active')
       }
       paused.onclick=function(){
        cd_thumb.pause()
        audio.pause()
        paused.classList.remove('active')
       }
       audio.ontimeupdate=function(){
        if(audio.duration){
            const progressPercent=Math.floor((audio.currentTime/audio.duration)*100)
            progress.value=progressPercent
        }
       }
       progress.onchange=function(e){
        const seek=(audio.duration/100)*e.target.value
        audio.currentTime=seek
       }
       const cd_thumb=cd.animate([
         {transform:'rotate(360deg)'}
       ],{
        duration:10000,
        iterations:Infinity
       })
       cd_thumb.pause()
       nextbtn.onclick=function(){
        if(app.isRandom){
            app.playRandom()
            paused.classList.add('active')
            cd_thumb.play()
          }
          else{
            app.nextsong()
            paused.classList.add('active')
            cd_thumb.play()
          }
            audio.play()
            app.render()
            app.scrollSong()
       }
       prevbtn.onclick=function(){
      if(app.isRandom){
        app.playRandom()
        paused.classList.add('active')
        cd_thumb.play()
      }
      else{
        app.prevSong()
        paused.classList.add('active')
        cd_thumb.play()
      }
        audio.play()
        app.render()
        app.scrollSong()
       }
       randombtn.onclick=function(){
       app.isRandom=!app.isRandom
       randombtn.classList.toggle('red',app.isRandom)
       }
       audio.onended=function(){
       if(app.isReapeat){
        audio.play()
       }
       else{
        if(app.isRandom){
            app.playRandom()
            paused.classList.add('active')
            cd_thumb.play()
          }
          else{
            app.nextsong()
            paused.classList.add('active')
            cd_thumb.play()
          }
            audio.play()
       }
       }
       repeat.onclick=function(){
        app.isReapeat=!app.isReapeat
        repeat.classList.toggle('red',app.isReapeat)
       }
       list.onclick=function(e){
        const songnode=e.target.closest('.box:not(.mau)')
        if(e.target.closest('.box:not(.mau)')){
             app.currentIndex=Number(songnode.dataset.index)
             app.loadSong()
             audio.play()
        paused.classList.add('active')
        app.render()
        // $('.box').classList.add('mau')
        cd_thumb.play()
        playlist.classList.add('turn2')
        setTimeout(()=>{
            playlist.classList.remove('momenu')
            playlist.classList.remove('turn2')
        },600)
        }
       }
    },
    defineProperties: function(){
      Object.defineProperty(this,'currentSong',{
        get: function(){
            return this.songs[this.currentIndex]
        }
      })
    },
    loadSong:function(){
    //    const cd=$('.dia')
    //    const tenbai=$('.chu')
    //    const audio=$('#audio')

       cd.style.backgroundImage=`url('${this.currentSong.img}')`
       tenbai.textContent=this.currentSong.name
       audio.src=this.currentSong.path
       console.log(audio)
    },
    nextsong:function(){
         this.currentIndex++
         if(this.currentIndex >= this.songs.length){
            this.currentIndex=0
         }
         this.loadSong()
    },
    prevSong:function(){
        this.currentIndex--
        if(this.currentIndex < 0){
           this.currentIndex=this.songs.length-1
        }
        this.loadSong()
    },
    playRandom:function(){
      let newIndex
      do{
        newIndex=Math.floor(Math.random()*this.songs.length)
      }while(newIndex===this.currentIndex)
      this.currentIndex=newIndex
      this.loadSong()
    },
    scrollSong:function(){
      setTimeout(()=>{
        $('.box.mau').scrollIntoView({
            behavior:'smooth',
            block:'nearest',
        })
      },500)
    },
     start: function(){
      app.defineProperties()
      app.render()
      app.loadSong()
      app.handleEvent()
     }
}

app.start()

const main={
    currentIndexs:0,
    imgs:[
        {
            neo:'./assets/nen/thaoleo.jpg'
        },
        {
            neo:'./assets/nen/leo2.jpg'
        },
        {
            neo:'./assets/nen/leo6.jpg'
        },
        {
            neo:'./assets/nen/leo4.jpg'
        },
        {
            neo:'./assets/nen/leo1.jpg'
        }
    ],
    renders:function(){
       const html1= main.imgs.map(function(imgss,index){
        return `
        <img class="leo" data-index="${index}" src="${imgss.neo}">
        `
       })
       anhnen.innerHTML=html1.join('')
    },
    definePropertiess: function(){
        Object.defineProperty(main,'currentImg',{
          get: function(){
              return main.imgs[main.currentIndexs]
          }
        })
      },
      loadImg:function(){
         const nens=$('.nen1')
         nens.src=main.currentImg.neo
      },
      handle:function(){
        anhnen.onclick=function(e){
            const y=e.target.closest('.leo')
            if(y){
                main.currentIndexs=y.dataset.index
                main.renders()
                main.loadImg()
                x.classList.add('turn2')
    setTimeout(()=>{
        x.classList.remove('turn')
        x.classList.remove('turn2')
    },600)
            }
        }
      },
    starts:function(){
       main.renders()
       main.definePropertiess()
       main.loadImg()
       main.handle()
    }
}
main.starts()