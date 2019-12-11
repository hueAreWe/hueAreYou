import React, { Component } from 'react';

class SectionOne extends Component {
    constructor() {
        super()
        this.state = {
            searchValue: "",
            filterBrand: [],
            allBrands: [
                "almay",
                "anna sui",
                "benefit",
                "boosh",
                "burt's bees",
                "butter london",
                "cargo cosmetics",
                "clinique",
                "coastal classic creation",
                "colourpop",
                "covergirl",
                "dior",
                "dr. hauschka",
                "e.l.f.",
                "essie",
                "l'oreal",
                "marcelle",
                "marienatie",
                "maybelline",
                "milani",
                "misa",
                "nudus",
                "nyx",
                "orly",
                "penny lane organics",
                "piggy paint",
                "pure anada",
                "rejuva minerals",
                "revlon",
                "salon perfect",
                "sinful colours",
                "smashbox",
                "suncoat"
            ],
        }
    }

    componentDidMount() {
        this.setFilteredBrandsArray()
    }
    
    setFilteredBrandsArray = () => {
        this.setState({
            filterBrand: [...this.state.allBrands]
        })
    }

    handleChange = e => {
        this.setState({
            errorMessage: "",
            searchValue: e.target.value.toLowerCase(),
            
        })
        
        setTimeout(() => {
            this.setState({
    
                filterBrand: [...this.state.allBrands].filter(item => item.includes(this.state.searchValue))
            })            
        }, 200);


    }

    handleSubmit = e => {
        e.preventDefault()
            
        if (this.state.searchValue !== "") {
        
            this.setState({
                errorMessage: "Sorry, we can't find that brand."
            })

            this.state.allBrands.forEach((i)=>{
                if (i === this.state.searchValue) {
                    this.setState({
                        errorMessage: "",
                    })
                    this.props.chosenBrandHandler(this.state.searchValue)
                }
            })

        } else {
            this.setState({
                errorMessage: "Please choose a brand."
            })
        }        
    }

    brandButtonSubmit = e => {
        e.preventDefault()
        this.props.chosenBrandHandler(e.target.id)
    }


render() {
    return (
        <div className="sectionOne">
            <div className="title">
                <div className="titleText">
                <h1>Hue <span className="h1">Are You?</span></h1>
                </div>
            </div>
            <form action="">
                <label htmlFor="searchBar" className="visuallyHidden">Enter your favourite brand</label>
                <input 
                    type="search" 
                    placeholder="ex: L'Oreal" 
                    id="searchBar" 
                    onChange={this.handleChange}
                    value={this.state.searchValue}
                >
                </input>
                <button onClick={this.handleSubmit} className="visuallyHidden submitButton">
                    Submit
                </button>
            </form>
            {this.state.errorMessage !== "" ? <div className="errorMessage">{this.state.errorMessage}</div> : ""}

            <div className="brandsContainer">
                {this.state.filterBrand.map((i)=>{
                    return <button key={i} id={i} onClick={this.brandButtonSubmit}> {i} </button>
                })}
            </div>
            
        </div>
        )
    }

}

export default SectionOne;