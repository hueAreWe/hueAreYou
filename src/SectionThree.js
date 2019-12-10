import React, { Component } from 'react';
import axios from 'axios';
import firebase from './firebase';
import Tilt from 'react-parallax-tilt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
// import { ParallaxProvider } from 'react-scroll-parallax';
// import { Parallax } from 'react-scroll-parallax';
import makeupPaintPalette from './image/makeupPaintPalette.png';
import easelPainting from './image/easelPainting.gif';

class SectionThree extends Component {
    constructor(){
        super()
        this.state = {
            paintingArray: undefined,
            normalizedColors: {
                darkGreen: "#367614",
                pink: "#DF4C93",
                brown: "#B35A1F",
                orange: "#E09714",
                lightBlue: "#B5BFCC",
                black: "#000000",
                darkYellow: "#E0CC91",
                turqoise: "#62AD77",
                darkBlue: "#2F4F4F",
                lightPink: "#F6ECF3",
                lightYellow: "#FBF6E1",
                darkGray: "#737C84",
            }
        }
    }

    componentDidMount(){
        console.log(this.props.paintingColorProp);
        // axios({
        //     method: 'GET',
        //     url: `https://www.rijksmuseum.nl/api/en/collection?`,
        //     dataResponse: 'json',
        //     params: {
        //         key: 'e2KwL8qU',
        //         "normalized32Colors.hex": this.props.paintingColorProp,
        //         type: 'painting'

        //     }
        // })
        //     .then((data) => {
        //         // this.setState({ arts: data.data.artObjects[0]})
        //         // console.log(this.state.arts);
        //         console.log('museum', data)
        //         this.setState({
        //             paintingArray: data.artObjects
        //         })


        //     })
        
    }

    scrollToBottom = () => {
        this.toTheBottom.scrollIntoView({ behavior: "smooth" });
    }

    getArt = (e) => {
        e.preventDefault()

        const nearestColor = require('nearest-color').from(this.state.normalizedColors);

        let matchedColor = nearestColor(this.props.paintingColorProp);
        console.log(matchedColor)



        axios({
            method: 'GET',
            url: `https://www.rijksmuseum.nl/api/en/collection?`,
            dataResponse: 'json',
            params: {
                key: 'e2KwL8qU',
                "f.normalized32Colors.hex": matchedColor.value,
                type: 'painting',
                imgonly: true,
                // s: 'relevance',
                ps: 100

            }
        })
            .then((data) => {
                // this.setState({ arts: data.data.artObjects[0]})
                // console.log(this.state.arts);
                console.log('museum', data.data)

                this.setState({
                    paintingArray: true
                })

                const shuffled = data.data.artObjects;

                this.scrollToBottom();

                setTimeout(() => {
                    this.setState({
                        paintingArray: shuffled.sort(() => 0.5 - Math.random())
                    })
                    
                }, 1500);

                setTimeout(() => {
                    this.scrollToBottom();

                }, 1800);



            })
    }

    storeColor = (e) => {
        console.log(e.target.value)
        this.setState({
            chosenColor: e.target.value,
        })
    } 

    saveGallery = (e) => {

        const dbRef = firebase.database().ref();

        console.log(this.state.paintingArray[0])

        const paintingObject = {
            paintingTitle: this.state.paintingArray[0].title,
            paintingImage: this.state.paintingArray[0].webImage.url,
            paintingArtist: this.state.paintingArray[0].principalOrFirstMaker,
        }

        dbRef.child('publicGallery').push(paintingObject);


    }


    render() {

        return (
            <div className='sectionThree'>
                
                <section className="makeArt">
                    <div className="generateContainer" >
                    <div>
                        <h2>Your Color Choice </h2>
                        <h3 style={{ background: this.props.paintingColorProp }}>{this.props.paintingColorProp}</h3>
                    </div>
                    
                    <img src={makeupPaintPalette} alt="a paint palette surronded with make up products" onClick={this.getArt}/>
                    <button onClick={this.getArt}>Let's Make Art</button>
                    </div>
                </section>  

                {
                    (
                        this.state.paintingArray === true
                            ?
                            <div className="preloader">
                                <img src={easelPainting} alt="A girl is painting" />

                                <div style={{ float: "left", clear: "both" }}
                                    ref={(el) => { this.toTheBottom = el; }}>
                                </div>
                            </div>
                            
                            :
                            (null)
                    )

                }

                {   
                    (
                        this.state.paintingArray !== undefined && this.state.paintingArray !== true
                            ?
                            ///////////////////////////////////////////////////////////////////////////////////////
                        // <ParallaxProvider>
                            
                            <ul className="individualPainting">
                                <div className="backgroundArt">  

                                    {/* <Parallax className="parallax" y={[-20, 20]} tagOuter="figure"> */}

                                        <li className="rapper artwork ">
                                            <Tilt tiltMaxAngleX="7" tiltMaxAngleY="7">
                                                <div className="frame">
                                                    <img src={this.state.paintingArray[0].webImage.url} alt={this.state.paintingArray[0].title} />
                                                </div>
                                            </Tilt>
                                            <div className="rapper info ">
                                                <h2>{this.state.paintingArray[0].title}</h2>
                                                <h3>{this.state.paintingArray[0].principalOrFirstMaker}</h3>
                                            </div>
                                            <button className="saveIt" onClick={this.saveGallery}>
                                                <FontAwesomeIcon className="bookmark" icon={faBookmark}/> Save It!
                                            </button>
                                        </li>
                                
                                {/* {this.state.paintingArray.map((i) => {
                                    return (
                                    <li className="artwork rapper">
                                            <Tilt tiltMaxAngleX="7" tiltMaxAngleY="7">
                                        <div className="frame">
                                    <div key={i.id}>
                                        <div className="image">
                                            <img src={i.webImage.url} alt={i.title} />
                                        </div>
                                        </Tilt>
                                        <div className="info rapper">
                                            <h2>{i.title}</h2>
                                            <h3>{i.principalOrFirstMaker}</h3>
                                        </div>
                                    </li>
                                    )
                                })} */}
                                {/* </Parallax> */}
                            
                            </div>
                                <div style={{ float: "left", clear: "both" }}
                                    ref={(el) => { this.toTheBottom = el; }}>
                                </div>
                            </ul>
                        // </ParallaxProvider>    


                            :
                            (null)
                    )

                }
                

            </div>
        )
    }

}

export default SectionThree;