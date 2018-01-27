import React, { Component } from 'react';
import { allCoins } from './coins';
import { btcData } from './data';
import Loader from 'react-loader';
import Modal from 'react-modal';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import Coin from './components/Coin';
import DisplayCoin from './components/DisplayCoin';
import Input from './components/Input';
import { flow, curry, some } from 'lodash'
import { image } from './formatters/coin'
import './App.css';

const keysInclude = curry(function keysInclude (keys, query, coin) {
  if (!coin) return false
  if (!query.trim()) return true
  const regex = new RegExp(query.trim(), 'i')
  return some(keys, key => regex.test(coin[key]))
})

const imageCache = {}

function loadImage (src) {
  if (imageCache[src]) return imageCache[src]
  const promise = new Promise(function (res, rej) {
    const img = new Image()
    img.src = src
    img.onload = () => res(src)
    img.onerror = () => res('')
  })
  imageCache[src] = promise
  return promise
}

const coinIncludes = keysInclude(['symbol', 'name', 'id'])
const BATCH_SIZE = 24

class App extends Component {

  constructor (props) {
    super(props)
    this.coins = []
    this.state = {
      loaded: false,
      query: '',
      coins: [],
      page: 0,
      coin: null,
      hasMore: true
    }
  }

  componentDidMount () {
    allCoins.then(coins => {
      this.coins = coins
      this.nextPage()
    })
  }

  nextPage (p) {
    const { page, query } = this.state
    if (!this.rendering) return this.renderPage({ page: page + 1, query })
    return Promise.resolve()
  }

  renderPage ({ query, page }) {
    const coinIncludesQuery = coinIncludes(query)
    const filtered = this.coins.filter(coinIncludesQuery)
    const coins = filtered.slice(0, BATCH_SIZE * page)

    this.rendering = true
    return Promise.all(
      coins
      .map(image)
      .map(loadImage)
    ).then((images) => {
      const hasMore = coins.length < filtered.length
      this.setState({ hasMore, page, query, coins, images, loaded: true })
      this.rendering = false
    })
  }

  handleChange ({ value: query }) {
    const { page } = this.state
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({ coins: [], loaded: false })
      this.renderPage({ query, page })
    }, 400)
  }

  render() {
    const { loaded, coins, images, coin, query, hasMore } = this.state
    return (
      <div className="main">
        <Input onChange={this.handleChange.bind(this)} />

        <h1 className="header">Crypto Classify</h1>
        <div className="masonry">
          {
            !loaded || coins.length ?
            <MasonryInfiniteScroller
              pageStart={0}
              initialLoad={false}
              hasMore={hasMore}
              style={{margin: 'auto'}}
              loadMore={this.nextPage.bind(this)}
              loader={<div key="loader" style={{position: 'relative', height: '10em'}}>
                <Loader loaded={false} color="#fff" />
              </div>}>
              {
                coins.map((coin, i) =>
                  <Coin key={i}
                  className="coin"
                  image={images[i]}
                  coin={coin}
                  onClick={() => this.setState({ coin })} />)
              }
            </MasonryInfiniteScroller>:
            <p className="notfound">Nothing found</p>
          }
        </div>
        <Modal
          style={{
            overlay: {backgroundColor: "rgba(255, 255, 255, 0.2)", zIndex: 3},
            content: {background: "linear-gradient(to top, #222 70%, #333 80%, #444 100%)", border: "1px solid rgba(0,0,0,0.8)", boxShadow: "4px 4px 6px rgba(0,0,0,1)", zIndex: 2},
          }}
          isOpen={coin ? true : false}
          onRequestClose={() => this.setState({ coin: null })}
          closeTimeoutMS={0}>
          { coin ? <DisplayCoin coin={coin} /> : <div /> }
        </Modal>
      </div>
    );
  }
}

export default App;
