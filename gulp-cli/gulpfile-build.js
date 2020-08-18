// 加载模块
const {task,src,dest,watch,series,parallel} = require('gulp');
// 用于加载其他gulp插件
const load = require('gulp-load-plugins')();
// nodejs的del模块用于删除文件
const del = require('del');

// 删除dist目录
task('delDist',async ()=>{
  await del('./dist');
})

// 处理图片
task('image', async ()=>{
  src('./image/*.*')
  .pipe(dest('./dist/image'))
})

// 处理css
task('sass', async ()=>{
  src('./sass/*.scss')
  .pipe(load.sassChina())
  .pipe(load.rev())
  .pipe(load.minifyCss())
  .pipe(dest('./dist/css'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/css'))
})
//处理json
task('json', async ()=>{
  src('./data/*.json')
  .pipe(load.rev())
  .pipe(dest('./dist/data'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/data'))
})
//处理php
task('php', async ()=>{
  src('./PHP/*.php')
  .pipe(load.rev())
  .pipe(dest('./dist/PHP'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/PHP'))
})
// 处理js
task('script', async ()=>{
  src('./script/*.js')
  .pipe(load.rev())
  .pipe(load.babel({presets: ['@babel/env']}))
  .pipe(load.uglify())
  .pipe(dest('./dist/script'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/js'))
})

// 处理html
task('html', async ()=>{
  src(['./rev/**/*.json','./pages/*.html'])//获取
  .pipe(load.revCollector({replaceReved:true}))//替换
  .pipe(load.minifyHtml())
  .pipe(dest('./dist/pages'))
})

// 监听文件变化
// task('watch',async ()=>{
//   watch('./image/*.*',series('image'));
//   watch('./style/*.css',series('style'));
//   watch('./script/*.js',series('script'));
//   watch('./pages/*.html',series('html'));
// })

// 启动服务，自动刷新
task('connect',async ()=>{
  load.connect.server({
    root: './dist',
    livereload: true,
    port: 3001
  });
})

// 构建生产包
task('build',series('delDist','image','sass','json','php','script','html','connect'))
