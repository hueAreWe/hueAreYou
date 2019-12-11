import React, { Component } from 'react';
import products from './image/sectionTwoPreload.gif';

class SectionTwo extends Component {
    constructor() {
        super();
        this.state = {
            color: '',
        }
    } 

    componentDidMount () {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.toTheBottom.scrollIntoView({ behavior: "smooth" });
    }

    isItInitialLoad = () => {
        this.setState({
            initialLoad: this.props.sectionTwoPageLoad,
        })
    }
    
    render() {
        
        return (
            
            
            <section className="sectionTwo">
                <h2>You chose the brand: <span>{this.props.chosenBrandProp}</span> </h2>

                {( this.props.preload === true ?
                    <div className="preloader">
                        <img src={products} alt="many make up products" />
                        
                    </div>

                    :

                    null

                )}




                {/* <h1>You chose the brand: {this.props.chosenBrandProp}</h1> */}

                {
                    this.props.brandArray.map((product, index) => {
                        
                        
                        const productName = product.slice(-2)[0]
                        const productImgLink = product.slice(-1)[0]
                    
                        if (this.props.counter === (index)) {
                                return (
                                
                            
                                <div>
                                    <h2>
                                        {
                                            index + 1
                                        } / {this.props.brandArray.length}
                                    </h2>

                                
                                    <div className="productInfo sectionTwoWrapper">
                                        <div value={productName} className="arrowButton arrowLeft"
                                        onClick={this.props.counterClickSub}>
                                            <img src={require('./image/arrow.png')} alt="" />
                                        </div>

                                        <div className="pallette">
                                            <div className="makeUpInfo">
                                                <div className="makeUpDetails">
                                                    <h3>{productName}</h3>   
                                                </div>
                                                <div className="makeUpImg">
                                                    <img src={productImgLink} alt={`${this.props.chosenBrandProp}'s ${productName}`} />
                                                </div>
                                            </div>

                                            <div className="makeUpColors">
                                                <button className="colorButton" style={{ background: product[0].hex }} onClick={this.props.storeColor} value={product[0].hex}></button>
                                                <button className="colorButton" style={{ background: product[1].hex }} onClick={this.props.storeColor} value={product[1].hex}></button>
                                                <button className="colorButton" style={{ background: product[2].hex }} onClick={this.props.storeColor} value={product[2].hex}></button>
                                                <button className="colorButton" style={{ background: product[3].hex }} onClick={this.props.storeColor} value={product[3].hex}></button>
                                                <button className="colorButton" style={{ background: product[4].hex }} onClick={this.props.storeColor} value={product[4].hex}></button>
                                                <button className="colorButton" style={{ background: product[5].hex }} onClick={this.props.storeColor} value={product[5].hex}></button>
                                                <button className="colorButton" style={{ background: product[6].hex }} onClick={this.props.storeColor} value={product[6].hex}></button>
                                            </div>
                                        </div>

                                        <div value={productName} className="arrowButton arrowRight" onClick={this.props.counterClickAdd}>
                                            <img src={require('./image/arrow.png')} alt="" />
                                        </div>
                                    </div>

                            </div>)}
                        else {
                            return(
                                <div className="visuallyHidden">
                                

                                    <div className="productInfo sectionTwoWrapper">
                                        <div value={productName} className="arrowButton arrowLeft" onClick={this.props.counterClickSub}>
                                            <img src={require('./image/arrow.png')} alt="" />
                                        </div>

                                        <div className="pallette">
                                            <div className="makeUpInfo">
                                                <div className="makeUpDetails">
                                                    <h3>{productName}</h3>
                                                    
                                                </div>
                                                <div className="makeUpImg">
                                                    <img src={productImgLink} alt={`${this.props.chosenBrandProp}'s ${productName}`} />
                                                </div>
                                            </div>
                                            <div className="makeUpColors">
                                                <button className="colorButton" style={{ background: product[0].hex }} onClick={this.props.storeColor} value={product[0].hex}></button>
                                                <button className="colorButton" style={{ background: product[1].hex }} onClick={this.props.storeColor} value={product[1].hex}></button>
                                                <button className="colorButton" style={{ background: product[2].hex }} onClick={this.props.storeColor} value={product[2].hex}></button>
                                                <button className="colorButton" style={{ background: product[3].hex }} onClick={this.props.storeColor} value={product[3].hex}></button>
                                                <button className="colorButton" style={{ background: product[4].hex }} onClick={this.props.storeColor} value={product[4].hex}></button>
                                                <button className="colorButton" style={{ background: product[5].hex }} onClick={this.props.storeColor} value={product[5].hex}></button>
                                                <button className="colorButton" style={{ background: product[6].hex }} onClick={this.props.storeColor} value={product[6].hex}></button>
                                            </div>
                                        </div>
                                        <div value={productName} className="arrowButton arrowRight" onClick={this.props.counterClickAdd}
                                        >
                                            <img src={require('./image/arrow.png')} alt="" />
                                        </div>
                                    </div>

                                </div>)
                                }
                    })
                }
                    <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { this.toTheBottom = el; }}>
                        </div>
            </section>
        )
    }

}

export default SectionTwo;