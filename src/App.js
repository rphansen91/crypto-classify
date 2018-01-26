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
      coin: null
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
    console.log(p, 'Next', this.rendering)
    if (!this.rendering) {
      return this.renderPage({ page: page + 1, query })
    }
    return Promise.resolve()
  }

  renderPage ({ query, page }) {
    const coinIncludesQuery = coinIncludes(query)
    const coins = this.coins
    .filter(coinIncludesQuery)
    .slice(0, BATCH_SIZE * page)

    this.rendering = true
    return Promise.all(
      coins
      .map(image)
      .map(loadImage)
    ).then((images) => {
      this.setState({ page, query, coins, images, loaded: true })
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
    const { loaded, coins, images, coin, query } = this.state
    return (
      <div className="App">
        <Input onChange={this.handleChange.bind(this)} />
        <Loader loaded={loaded} color="#fff">
          {
            !coins.length ?
            <p>Nothing found</p>:
            <MasonryInfiniteScroller
              pageStart={0}
              initialLoad={false}
              hasMore={true}
              style={{margin: 'auto'}}
              loadMore={this.nextPage.bind(this)}>
              {
                coins.map((coin, i) =>
                  <Coin key={i}
                  className="coin"
                  image={images[i]}
                  coin={coin}
                  onClick={() => this.setState({ coin })} />)
              }
            </MasonryInfiniteScroller>
          }
        </Loader>
        <Modal
          style={{
            overlay: {backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 2},
            content: {backgroundColor: "#222", zIndex: 2},
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