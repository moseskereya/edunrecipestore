import React, { Component } from 'react';
import {Link} from "react-router-dom"
import { v4 as uuid_v4 } from "uuid";
import axios from "axios"
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            search: ""
         }
    }

    GetRecipes = (e) => {
        e.preventDefault();
        const APP_ID = '4e9f05eb';
        const APP_KEY = '9b904d703fa0d46a88ce1ac63f29f498';
        const query = this.state.search
        const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=100&health=alcohol-free`;
        axios.get(`${url}`)
        .then(
            res => {
                console.log(res.data.hits);
                const results = res.data.hits
                this.setState({ recipes: results})
            }
        )
            .catch(
             err => {
                console.log("We have an erro", err)
            }
        )
    }

 FindRecipe = (e) => {
     this.setState({ search: e.target.value })
}
    render() {
        const recipe = this.state.recipes;
        return (
            <div>
                <form onSubmit={this.GetRecipes}>
                    <input type="text" placeholder="Search Your Recipe here" onChange={this.FindRecipe} />
                    <button>Search</button>
                </form>
                <div className="main_container">
                    {recipe.map((item) => {
                        return (
                            <div className="min_container" key={uuid_v4()}>
                                <Link to={{
                                    pathname: `/DetailsPage/${item.recipe.label}`,
                                    state: {food:item.recipe.label}
                                }}>
                                    <img src={item.recipe.image} alt="image_recipe" />
                                </Link>
                                <h5>{item.recipe.label}</h5>
                            </div>
                        )
                    })}
                </div>
            </div>
         );
    }
}
 
export default Home;