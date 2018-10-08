const images = require('images')
const fs = require('fs')

const path = 'images'   // 引入图片路径
const output = 'reduce'  // 输出压缩后的图片路径

function explorer(path) {
  fs.readdir(path , function(err , files){  //读取目录
      if(err){
        return console.error(err)
      } 
      for (let i = 0; i < files.length; i++) {    // 需要判断path 文件下 是否有 .DS_Store文件。 有则删掉
        if(files[i] == '.DS_Store')files.splice(0,1)
        fs.stat(`${path}/${files[i]}`,function(err , stats){
          if(err)return console.error(err)
          if(stats.isDirectory()){ //判断path文件下是否是文件夹，如果是则继续调用explorer()
            explorer(`${path}/${files[i]}`)
          }else{
            console.log(`文件名${path}/${files[i]}`);  //读出所有文件
            const name = `${path}/${files[i]}`;
            const outName = `${output}/${files[i]}`     // 输出图片地址和名字

            images(name)
              .save(outName , {
                   quality : 10       //输出图片质量
              })
          }
       })
      }
  })
}
explorer(path)