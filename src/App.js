import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import Gallery from './Gallery';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Qs from 'qs';

class App extends Component {
  constructor() {
    super()
    this.state = {
      userInput: "",
      showSectionOne: true,
      showSectionTwo: false,
      showSectionThree: true,
      chosenBrand: "",
      sectionTwoPreload: true,
      finalPainting: {},
      chosenColor: false,
      topProducts: [],
      colorsArray: [],
      brandObject: {},
      brandArray: [],
      counter: 0,
      productImage: '',
      sectionTwoPageLoad: false,
    }
  }
  startCarousel = (e) => {
    this.setState({
      nextProduct: e.target.value
    })
  }

  storeColor = (e) => {
    this.setState({
      chosenColor: e.target.value,
    })
  } 
  
  makeUpCall = (b) => {
    axios({
      method: 'GET',
      url: 'http://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${b}`,
        params: {
          queryParam: 'value'
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
    })

      .then((makeUpData) => {

        this.setState({ sectionTwoPreload: false})
        
        const arrayOfProducts = ['product1', 'product2', 'product3']
        const brandInfo = []
        
        makeUpData.data.map((products, index) => {
          if (products.product_colors.length >= 7) {
            const colorArray = products.product_colors.map((color, index) => {
              if (index < 8) {
                
                
                return {
                  hex: color.hex_value,
                  nameColor: color.colour_name,
                }
              }
            })

            colorArray.push(products.name)
            colorArray.push(products.image_link)
            const newColorArray = colorArray.filter((colorObject) => {
              if (typeof colorObject !== undefined) {
                return colorObject
              }
            })

            arrayOfProducts.push(products.name);            
            if (brandInfo.length > 2) {
              return
            } else {
              brandInfo.push(newColorArray);


              this.setState({
                productImage: products.image_link,
              })
            }
          }
        })
        if (typeof brandInfo !== undefined) {

          this.setState({
            topProducts: arrayOfProducts.join("and "),
            brandArray: brandInfo,
            
          })

        }

      })
  }

  counterClickAdd = () => {
    if (this.state.counter < (this.state.brandArray.length - 1)) {
      this.setState({
        counter: this.state.counter + 1,
        sectionTwoPageLoad: false,
      })
    } else {
      this.setState({
        counter: 0,
        sectionTwoPageLoad: false,
      })
    }
  }

  counterClickSub = () => {
    if (this.state.counter > 0) {
      this.setState({
        counter: this.state.counter - 1,
        sectionTwoPageLoad: false,
      })
    } else {
      this.setState({
        counter: this.state.brandArray.length - 1,
        sectionTwoPageLoad: false,
      })
    }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the chosenbrand handler
  chosenBrandHandler = (b) => {
    this.setState({ 
      chosenBrand: b,
      showSectionTwo: true,
      sectionTwoPageLoad: true,
      counter: 0,
    });
    this.makeUpCall(b);
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  render() {
    return (
      <Router basename="/hueAreYou">
        
      <div className="App">

        <Route exact path='/' 
            render={
              () => {
                return (
                  <div> 
                  <Link to='/gallery' className="galleryLink shimmer">Gallery</Link>
                    {
                      this.state.showSectionOne === true
                        ?
                        <SectionOne chosenBrandHandler={this.chosenBrandHandler} />
                        :
                        null
                    }
                    {
                      this.state.showSectionTwo === true
                        ? (

                          <SectionTwo preload={this.state.sectionTwoPreload} counterClickAdd={this.counterClickAdd} counterClickSub={this.counterClickSub} counter={this.state.counter}sectionTwoPageLoad={this.state.sectionTwoPageLoad} storeColor={this.storeColor} brandArray={this.state.brandArray} makeUpCallProp={this.makeUpCall} chosenBrandProp={this.state.chosenBrand} topProductsProp={this.state.topProducts} colorsArrayProp={this.state.colorsArray} productColorsProp={this.appendBrandInfo} productImageProp={this.state.productImage} />
                        )
                        : null
                    }
                    {
                      (
                        this.state.showSectionThree === true
                          ?
                          ///////////////////////////////////////////////////////////////////////////////////////
                          // (<SectionThree paintingColorProp={this.state.paintingColor} />)
                          (<SectionThree paintingColorProp={this.state.chosenColor} />)
                          :
                          (null)
                      )

                    }
                  </div>
                )
              }
            }
        />
          <Route path='/gallery'
            render={
              () => {
                return (
                  <Gallery galleryItemArray='[]' />
                )
              }
            } />
        
      </div>
      </Router>
    );

  }

  
}

export default App;