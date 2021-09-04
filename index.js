const { Telegraf, TelegramError, Markup } = require('telegraf')
const axios = require('axios')
const updateLogger = require('telegraf-update-logger');
const chalk = require('chalk');
                                                                                          
const bot = new Telegraf(process.env.token)

let zhirr = 'zahirgans'

bot.use(
    updateLogger({
      colors: {
        id: chalk.red,
        chat: chalk.yellow,
        user: chalk.green,
        type: chalk.bold,
      },
    }),
  );

bot.command('start', (ctx) => {
  return ctx.reply('<b>Halo</b><i>'+ctx.from.first_name+'</i> Saya Adalah Bot LK21 Untuk Mempermudah Anda Mencari Film , Saya Dibuat Oleh @Riio00 ,Untuk menu klik tombol menu ya!', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      Markup.button.url('Channel Bot', 't.me/RioBotsupport'),
      Markup.button.callback('Menu', 'Pepsi')
    ])
  })
})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
bot.action('Pepsi', (ctx) => ctx.editMessageText('/film -> untuk mencari film\n/soon -> melihat film yang akan datang\n/terbaru -> melihat film terbaru di lk21'))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
bot.command('film', (ctx) => {
    ctx.reply('Searching.....')
    let input = ctx.message.text;
    let inputArray = input.split("film ");
    inputArray.shift();
              pesan = inputArray.join(" ");                                                                                                                                                                 
    axios.get('https://zahirr-web.herokuapp.com/api/lk21/search?film='+pesan+'&apikey='+zhirr)
    .then(res => {
    	const me = res.data.result.result
    const hai = me[Math.floor(Math.random() * (me.length))]    
         //console.log(res);
         ctx.replyWithPhoto({ url: hai.thumbnail }, { caption: 'Judul: '+hai.title+'\nGenre: '+hai.genre+'\nRate: '+hai.rating+'\nDurasi: '+hai.duration+'\nKualitas: '+hai.quality+'\nTrailer: '+hai.trailer+'\nLink: '+hai.watch });
    }).catch(e => {
         console.log(e);
   })
})

bot.command('terbaru', (ctx) => {
    ctx.reply('Waitt...')
    ctx.deleteMessage
    let input = ctx.message.text;
    let inputArray = input.split("film ");
    inputArray.shift();
              pesan = inputArray.join(" ");                                                                                                                                                                 
    axios.get('https://zahirr-web.herokuapp.com/api/lk21/terbaru?apikey='+zhirr)
    .then(res => {
    	const baka = res.data.result.result
    const bo = baka[Math.floor(Math.random() * (baka.length))]                                                                                                                                                                                          
         //console.log(res);                                                                                                                                                                                                                              
         ctx.replyWithPhoto({ url: bo.thumbnail }, { caption: 'Judul: '+bo.title+'\nGenre: '+bo.genre+'\nRate: '+bo.rating+'\nDurasi: '+bo.duration+'\nKualitas: '+bo.quality+'\nTrailer: '+bo.trailer+'\nLink: '+bo.watch });
    }).catch(e => {
         console.log(e);
   })
})

bot.command('soon', (ctx) => {
    ctx.reply('Waitt...')
    ctx.deleteMessage
    let input = ctx.message.text;
    let inputArray = input.split("film ");
    inputArray.shift();
              pesan = inputArray.join(" ");                                                                                                                                                                 
    axios.get('https://zahirr-web.herokuapp.com/api/lk21/comingsoon?apikey='+zhirr)
    .then(res => {
    	const y = res.data.result.result
    const h = y[Math.floor(Math.random() * (y.length))]                                                                                                                                                                                                                                                                                                                                                                         
         //console.log(res);                                                                                                                                                                                                                              
         ctx.replyWithPhoto({ url: h.thumbnail }, { caption: 'Judul: '+h.title+'\nGenre: '+h.genre+'\nRate: '+h.rating+'\nDurasi: '+h.duration+'\nKualitas: '+h.quality+'\nTrailer: '+h.trailer+'\nLink: '+h.watch });
    }).catch(e => {
         console.log(e);
   })
})

bot.launch()
