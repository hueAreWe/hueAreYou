import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import firebase from './firebase';
import Tilt from 'react-parallax-tilt';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Parallax } from 'react-scroll-parallax';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'


class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            paintings: [],
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();
        
        dbRef.on('value', (gallery) => {
            let paintingsArray = []
            const gallery2 = gallery.val();
            for (let painting in gallery2) {
                for (let i in gallery2[painting]) {
                    paintingsArray.push(gallery2[painting][i])
                }

            }
            console.log(paintingsArray)
            this.setState({
                paintings: paintingsArray,
            })

        }) 
        
    }
    
    render() {
        // console.log(this.state.paintings)
        return (
            <div className='sectionGallery'>
                <div className="galleryHeader">
                    <h1>Gallery</h1>
                </div>

                <ParallaxProvider>
                    <div className="paintingGallery">
                        <div className="galleryBackground"> 
                            <ul className="galleryWrapper">

                        
                {
                this.state.paintings.reverse().map((art, index) => {
                    return (

                        <Parallax className="parallax" >

                        <li className="artworkGallery" tabIndex={index}>
                                <Tilt tiltMaxAngleX="5" tiltMaxAngleY="5">
                                <div className="frame">
                                    <div className="galleryImage">
                            <img src= {art.paintingImage} alt={`image of ${this.paintingTitle}`}/>

                                </div>
                                
                                </div>
                                </Tilt>

                            <div className="infoGallery visuallyHidden">
                                <h2>{art.paintingTitle}</h2>
                                <h3>{art.paintingArtist}</h3>
                            </div>
                        </li>
                        
                        
                        </Parallax>
                    
                    )
                })
            
                }
                            </ul>
                    </div>
                </div>

                </ParallaxProvider>

                <Link to='/'><FontAwesomeIcon className="shimmer galleryLink" icon={faHome} /></Link>

            </div>
            
        )
    }
}

export default Gallery;
