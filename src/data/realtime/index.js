/* global io CCC */

const socket = io.connect('https://streamer.cryptocompare.com/');

export function subscribtion ({
  id=5,
  market='CCCAGG',
  from='BTC',
  to='USD'
}={}) {
  //Use SubscriptionId 0 for TRADE, 2 for CURRENT and 5 for CURRENTAGG
  //For aggregate quote updates use CCCAGG as market
  return [id, market, from, to].join('~')
}

function unpack (cb) {
  let current = {}
  return function (message) {
    const [type] = message.split('~')
    if (type === CCC.STATIC.TYPE.CURRENTAGG) {
      cb(
        Object.assign(current, CCC.CURRENT.unpack(message)),
        message
      )
    }
  }
}


export default function (subs, cb) {
  socket.on('m', unpack(cb));
  socket.emit('SubAdd', {
    subs: [].concat(subs)
  });

  return function unsubscribe () {
    socket.emit('SubRemove', {
      subs: [].concat(subs)
    })
  }
}
